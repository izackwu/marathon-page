import { UpcomingRace } from "../types/marathon";
import { locations } from "./locations";
import { createISODate } from "../utils/dateUtils";

export const upcomingRaces: UpcomingRace[] = [
  {
    name: "Bay to Bay Running Festival",
    date: createISODate("2026-06-14"),
    type: "half",
    location: {
      name: locations.gosford.name,
      country: locations.gosford.country,
    },
    notes: "Tune-up race before Gold Coast",
  },
  {
    name: "Gold Coast Marathon",
    date: createISODate("2026-07-05"),
    type: "full",
    location: {
      name: locations.goldCoast.name,
      country: locations.goldCoast.country,
    },
    notes: "My favorite race in Australia",
  },
];
