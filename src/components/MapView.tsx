import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { MarathonResult } from "../types/marathon";
import { formatDuration } from "../utils/dateUtils";
import { format, parseISO } from "date-fns";
import tailwindConfig from "../../tailwind.config.js";

countries.registerLocale(enLocale);

const colors = tailwindConfig.theme.extend.colors;

// Token-derived colors
const COLOR_PRIMARY = colors.primary;
const COLOR_PAGE = colors.page;
const COLOR_MUTED = colors.muted;
const COLOR_HEADING = colors.heading;
// Map-specific colors (no matching token)
const COLOR_OCEAN = colors.page;
const COLOR_LAND = "#F0EDE6";
const COLOR_LAND_STROKE = "#D8D3CA";
const COLOR_TOOLTIP_TEXT = "#F0EDE8";



interface MapViewProps {
  results: MarathonResult[];
}

interface CityData {
  name: string;
  lat: number;
  lng: number;
  count: number;
  races: {
    name: string;
    time: string;
    year: number;
    month: string;
    type: "full" | "half";
  }[];
}

export function MapView({ results }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous render
    container.innerHTML = "";

    const W = container.clientWidth;
    const H = 340;

    // Group results by location
    const grouped: Record<string, MarathonResult[]> = {};
    for (const r of results) {
      const key = `${r.location.coordinates.lat},${r.location.coordinates.lng}`;
      (grouped[key] ??= []).push(r);
    }

    const cities: CityData[] = Object.values(grouped).map((races) => {
      const sorted = [...races].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      return {
        name: sorted[0].location.name,
        lat: sorted[0].location.coordinates.lat,
        lng: sorted[0].location.coordinates.lng,
        count: sorted.length,
        races: sorted.map((r) => {
          const date = parseISO(r.date);
          return {
            name: r.name,
            time: formatDuration(r.finishTime),
            year: date.getFullYear(),
            month: format(date, "MMM yyyy"),
            type: r.type,
          };
        }),
      };
    });

    // Countries where races have occurred — map to ISO numeric codes for TopoJSON lookup
    const racedCountries = [...new Set(results.map((r) => r.location.country))];
    const countryNumericCodes = new Map<string, string>();
    for (const name of racedCountries) {
      const alpha3 = countries.getAlpha3Code(name, "en");
      if (alpha3) {
        const numeric = countries.alpha3ToNumeric(alpha3);
        if (numeric) countryNumericCodes.set(numeric, name);
      }
    }

    // SVG setup
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", W)
      .attr("height", H)
      .style("display", "block")
      .style("cursor", "grab");

    svg
      .append("rect")
      .attr("width", W)
      .attr("height", H)
      .attr("fill", COLOR_OCEAN);

    const gLand = svg.append("g");
    const gLabels = svg.append("g");
    const gMarkers = svg.append("g");

    // Build a GeoJSON MultiPoint from race locations, then use fitExtent
    // to center and zoom the projection on them with pixel-space padding.
    const racePoints: GeoJSON.Feature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiPoint",
        coordinates: cities.map((c) => [c.lng, c.lat]),
      },
    };

    // Use fitExtent with generous pixel padding so markers aren't at the very edge
    const padPx = 30;
    const proj = d3.geoMercator().fitExtent(
      [
        [padPx, padPx],
        [W - padPx, H - padPx],
      ],
      racePoints,
    );

    const path = d3.geoPath().projection(proj);

    let currentTransform = d3.zoomIdentity;

    function markerPos(d: CityData): [number, number] {
      const [x, y] = proj([d.lng, d.lat])!;
      return currentTransform.apply([x, y]);
    }

    interface CountryLabel {
      name: string;
      // Base projected coordinates (before zoom transform)
      baseX: number;
      baseY: number;
    }

    function updateMarkers() {
      gMarkers
        .selectAll<SVGGElement, CityData>(".mk")
        .attr("transform", (d) => {
          const [x, y] = markerPos(d);
          return `translate(${x},${y})`;
        });
    }

    function updateLabels() {
      gLabels
        .selectAll<SVGTextElement, CountryLabel>(".country-label")
        .attr("x", (d) => {
          const [x] = currentTransform.apply([d.baseX, d.baseY]);
          return x;
        })
        .attr("y", (d) => {
          const [, y] = currentTransform.apply([d.baseX, d.baseY]);
          return y;
        });
    }

    // Tooltip
    const tt = d3
      .select(container)
      .append("div")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background", `rgba(${parseInt(COLOR_HEADING.slice(1, 3), 16)},${parseInt(COLOR_HEADING.slice(3, 5), 16)},${parseInt(COLOR_HEADING.slice(5, 7), 16)},0.95)`)
      .style("color", COLOR_TOOLTIP_TEXT)
      .style("font-size", "12px")
      .style("line-height", "1.6")
      .style("padding", "10px 14px")
      .style("border-radius", "4px")
      .style("opacity", "0")
      .style("transition", "opacity 0.12s")
      .style("max-width", `${Math.min(280, W - 16)}px`)
      .style("z-index", "10");

    // Load world data and render
    d3.json(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json",
    ).then((world: any) => {
      const countries_geo = topojson.feature(world, world.objects.countries);

      gLand
        .selectAll("path")
        .data((countries_geo as any).features)
        .enter()
        .append("path")
        .attr("d", path as any)
        .attr("fill", COLOR_LAND)
        .attr("stroke", COLOR_LAND_STROKE)
        .attr("stroke-width", 0.5);

      // Country labels — geographic centroid from TopoJSON, with fallback
      // to race location coordinates for small territories (HK, Singapore)
      // Group features by country, then use the largest polygon for centroid
      const countryFeatures = (countries_geo as any).features as any[];
      const featuresByCountry = new Map<string, any[]>();

      for (const feature of countryFeatures) {
        const numericId = feature.id?.toString();
        const name = countryNumericCodes.get(numericId);
        if (name) {
          if (!featuresByCountry.has(name)) featuresByCountry.set(name, []);
          featuresByCountry.get(name)!.push(feature);
        }
      }

      const countryLabels: CountryLabel[] = [];
      for (const [name, features] of featuresByCountry) {
        // Pick the largest feature (by bounding box area) for centroid
        const largest = features.reduce((best, f) => {
          const area = path.area(f);
          const bestArea = path.area(best);
          return area > bestArea ? f : best;
        });
        const centroid = path.centroid(largest);
        countryLabels.push({ name, baseX: centroid[0], baseY: centroid[1] });
      }

      gLabels
        .selectAll(".country-label")
        .data(countryLabels)
        .enter()
        .append("text")
        .attr("class", "country-label")
        .attr("x", (d) => d.baseX)
        .attr("y", (d) => d.baseY)
        .attr("text-anchor", "middle")
        .attr("fill", COLOR_MUTED)
        .attr("font-size", 9)
        .attr("font-weight", "400")
        .attr("font-family", "system-ui, sans-serif")
        .attr("letter-spacing", "0.12em")
        .text((d) => d.name.toUpperCase());

      // Markers
      const mk = gMarkers
        .selectAll(".mk")
        .data(cities)
        .enter()
        .append("g")
        .attr("class", "mk")
        .attr("transform", (d) => {
          const [x, y] = proj([d.lng, d.lat])!;
          return `translate(${x},${y})`;
        })
        .style("cursor", "pointer");

      // Glow circle
      mk.append("circle")
        .attr("r", (d) => (d.count > 1 ? 13 : 10))
        .attr("fill", COLOR_PRIMARY)
        .attr("opacity", 0.15);

      // Inner circle
      mk.append("circle")
        .attr("r", (d) => (d.count > 1 ? 7 : 5))
        .attr("fill", COLOR_PRIMARY)
        .attr("stroke", COLOR_PAGE)
        .attr("stroke-width", 2);

      // Count text for multi-race markers
      mk.filter((d) => d.count > 1)
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("fill", "#fff")
        .attr("font-size", 7)
        .attr("font-weight", "700")
        .attr("font-family", "system-ui, sans-serif")
        .text((d) => d.count);

      // Tooltip interaction
      mk.on("mousemove", (ev: MouseEvent, d: CityData) => {
        const [mx, my] = d3.pointer(ev, svg.node());
        const rows = d.races
          .map((r) => {
            const badgeBg = r.type === "full" ? "#E8F4EE" : "#F2F1EF";
            const badgeColor = r.type === "full" ? "#155436" : COLOR_MUTED;
            const badgeText = r.type === "full" ? "M" : "HM";
            return `<div style="margin-top:6px;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
                <span style="font-size:11px;color:#aaa;overflow:hidden;text-overflow:ellipsis;max-width:150px;white-space:nowrap;">${r.name}</span>
                <div style="display:flex;align-items:center;gap:6px;">
                  <span style="background:${badgeBg};color:${badgeColor};font-size:9px;font-weight:600;padding:1px 5px;border-radius:9px;">${badgeText}</span>
                  <span style="white-space:nowrap;color:${COLOR_TOOLTIP_TEXT};">${r.time}</span>
                </div>
              </div>
              <div style="font-size:10px;color:#777;">${r.month}</div>
            </div>`;
          })
          .join("");

        tt.html(
          `<div style="font-weight:500;font-size:13px;margin-bottom:2px;">${d.name} <span style="font-weight:400;font-size:11px;color:#777;">${d.count} race${d.count > 1 ? "s" : ""}</span></div>${rows}`,
        );
        tt.style("opacity", "1");

        const ttNode = tt.node()!;
        const ttW = ttNode.offsetWidth || 260;
        const ttH = ttNode.offsetHeight || 60;
        // Clamp tooltip to stay within the map container on all sides
        let left = mx + 16;
        if (left + ttW > W) left = mx - ttW - 8;
        left = Math.max(4, Math.min(left, W - ttW - 4));
        let top = my - 10;
        if (top + ttH > H) top = my - ttH - 8;
        top = Math.max(4, Math.min(top, H - ttH - 4));
        tt.style("left", left + "px").style("top", top + "px");
      }).on("mouseleave", () => {
        tt.style("opacity", "0");
      });

      // Zoom
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.85, 14])
        .on("zoom", (ev) => {
          currentTransform = ev.transform;
          gLand.attr("transform", ev.transform.toString());
          updateMarkers();
          updateLabels();
        });

      svg.call(zoom);
      svg
        .on("mousedown", () => svg.style("cursor", "grabbing"))
        .on("mouseup", () => svg.style("cursor", "grab"));
    }).catch(() => {
      svg
        .append("text")
        .attr("x", W / 2)
        .attr("y", H / 2)
        .attr("text-anchor", "middle")
        .attr("fill", COLOR_MUTED)
        .attr("font-size", 13)
        .text("Map failed to load");
    });

    return () => {
      container.innerHTML = "";
    };
  }, [results]);

  return (
    <div>
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: 340 }}
      />
      <div className="flex gap-[18px] mt-2.5 px-4 pb-3 items-center">
        <div className="flex items-center gap-1.5">
          <svg width="10" height="10">
            <circle
              cx="5"
              cy="5"
              r="4"
              fill={COLOR_PRIMARY}
              stroke={COLOR_PAGE}
              strokeWidth="1.5"
            />
          </svg>
          <span className="text-[11px] text-muted">1 race</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14">
            <circle
              cx="7"
              cy="7"
              r="6"
              fill={COLOR_PRIMARY}
              stroke={COLOR_PAGE}
              strokeWidth="1.5"
            />
            <text
              x="7"
              y="7"
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize="7"
              fontWeight="700"
              fontFamily="system-ui"
            >
              3
            </text>
          </svg>
          <span className="text-[11px] text-muted">Multiple races</span>
        </div>
        <span className="text-[11px] ml-auto" style={{ color: "#C8C5BF" }}>
          Scroll to zoom · drag to pan
        </span>
      </div>
    </div>
  );
}
