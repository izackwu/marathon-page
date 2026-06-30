import { UpcomingRace } from "../types/marathon";
import { locations } from "./locations";
import { createISODate } from "../utils/dateUtils";

export const upcomingRaces: UpcomingRace[] = [
  {
    name: "Gold Coast Marathon",
    date: createISODate("2026-07-05"),
    type: "full",
    location: {
      name: locations.goldCoast.name,
      country: locations.goldCoast.country,
      timezone: locations.goldCoast.timezone,
    },
    notes: "My favorite race in Australia",
  },
  {
    name: "Taipei Marathon",
    date: createISODate("2026-12-20"),
    type: "full",
    location: {
      name: locations.taipei.name,
      country: locations.taipei.country,
      timezone: locations.taipei.timezone,
    },
  },
];
