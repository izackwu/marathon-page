import { UpcomingRace } from "../types/marathon";
import { locations } from "./locations";
import { createISODate } from "../utils/dateUtils";

export const upcomingRaces: UpcomingRace[] = [
  {
    name: "Wuhan Marathon",
    date: createISODate("2025-03-23"),
    type: "full",
    location: {
      name: locations.wuhan.name,
      country: locations.wuhan.country,
    },
    notes: "My first marathon in China",
  },
  {
    name: "Gold Coast Marathon",
    date: createISODate("2025-07-06"),
    type: "full",
    location: {
      name: locations.goldCoast.name,
      country: locations.goldCoast.country,
    },
    notes: "Fast and flat course. Looking for a PB.",
  },
  {
    name: "Sydney Marathon",
    date: createISODate("2025-08-31"),
    type: "full",
    location: {
      name: locations.sydney.name,
      country: locations.sydney.country,
    },
    notes: "Maybe my first World Marathon Major?",
  },
];
