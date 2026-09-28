import { UpcomingRace } from "../types/marathon";
import { locations } from "./locations";
import { createISODate } from "../utils/dateUtils";

export const upcomingRaces: UpcomingRace[] = [
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
  {
    name: "Osaka Marathon",
    date: createISODate("2027-02-28"),
    type: "full",
    location: {
      name: locations.osaka.name,
      country: locations.osaka.country,
      timezone: locations.osaka.timezone,
    },
  },
];
