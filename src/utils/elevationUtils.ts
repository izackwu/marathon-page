import { MountainSnow, ChartNoAxesGantt } from "lucide-react";

export function getElevationIcon(elevation: "flat" | "hilly") {
  switch (elevation.toLowerCase()) {
    case "hilly":
      return MountainSnow;
    case "flat":
      return ChartNoAxesGantt;
    default:
      return ChartNoAxesGantt;
  }
}
