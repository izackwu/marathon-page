import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { groupBy } from "lodash";
import { MarathonResult } from "../types/marathon";
import { formatDate, formatDuration } from "../utils/dateUtils";
import { getCountryFlag } from "../utils/countryUtils";

const markerSvg = `
<svg width="30" height="49" viewBox="0 0 30 49" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 0C6.71573 0 0 6.71573 0 15C0 26.25 15 49 15 49C15 49 30 26.25 30 15C30 6.71573 23.2843 0 15 0Z" fill="rgb(99, 102, 241)"/>
  <circle cx="15" cy="15" r="10" fill="white"/>
  <text x="15" y="19" font-family="Arial" font-size="11" fill="rgb(99, 102, 241)" font-weight="bold" text-anchor="middle">%count%</text>
</svg>
`;

function createCustomIcon(count: number): L.Icon {
  const svg = markerSvg.replace("%count%", count > 1 ? count.toString() : "");
  return new L.Icon({
    iconSize: [30, 49],
    iconAnchor: [15, 49],
    popupAnchor: [0, -45],
    iconUrl: "data:image/svg+xml;base64," + btoa(svg),
  });
}

interface MapViewProps {
  results: MarathonResult[];
}

export function MapView({ results }: MapViewProps) {
  const groupedResults = groupBy(
    results,
    (r) => `${r.location.coordinates.lat},${r.location.coordinates.lng}`,
  );
  const bounds = L.latLngBounds(
    Object.values(groupedResults).map((races) => [
      races[0].location.coordinates.lat,
      races[0].location.coordinates.lng,
    ]),
  );

  return (
    <div className="h-[400px] rounded-lg overflow-hidden">
      <MapContainer
        bounds={bounds}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {Object.entries(groupedResults).map(([key, races]) => {
          const [lat, lng] = key.split(",").map(Number);
          const sortedRaces = [...races].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );

          return (
            <Marker
              key={key}
              position={[lat, lng]}
              icon={createCustomIcon(races.length)}
            >
              <Popup>
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    {React.createElement(
                      getCountryFlag(races[0].location.country),
                      {
                        className: "w-4 h-4",
                      },
                    )}
                    <div>
                      <h3 className="font-semibold text-indigo-600">
                        {races[0].location.name}, {races[0].location.country}
                      </h3>
                    </div>
                  </div>
                  {sortedRaces.map((race) => (
                    <div
                      key={`${race.date}-${race.name}`}
                      className="border-t pt-2 first:border-t-0 first:pt-0"
                    >
                      <div className="text-gray-600">
                        <div className="flex items-center gap-2">
                          <span>{race.name}</span>
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                              race.type === "full"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {race.type === "full" ? "M" : "HM"}
                          </span>
                        </div>
                        <div className="text-sm">{formatDate(race.date)}</div>
                      </div>
                      <div className="font-medium">
                        {formatDuration(race.finishTime)}
                      </div>
                    </div>
                  ))}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
