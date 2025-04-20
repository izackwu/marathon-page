import { UpcomingRace } from "../types/marathon";
import { locations } from "./locations";
import { createISODate } from "../utils/dateUtils";

export const upcomingRaces: UpcomingRace[] = [
  {
    name: "2XU Compression Run",
    date: createISODate("2025-04-27"),
    type: "half",
    location: {
      name: locations.singapore.name,
      country: locations.singapore.country,
    },
    notes: "Take it easy",
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
    notes: "My first world marathon major",
  },
  {
    name: "Kobe Marathon",
    date: createISODate("2025-11-16"),
    type: "full",
    location: {
      name: locations.kobe.name,
      country: locations.kobe.country,
    },
    notes: "Getting a taste of the running culture in Japan",
  }
];
