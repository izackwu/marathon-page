import { MarathonResult } from "../types/marathon";
import { locations } from "./locations";
import { createISODate, createDuration } from "../utils/dateUtils";

// The past weather data is not very accurate, and specifically, the "feels like"
// temperature is not always available and I have to manually generate it based
// on the temperature and humidity.
//
// I will need to keep a record of the race day weather for the future races.

export const marathonResults: MarathonResult[] = [
  {
    name: "Singapore Marathon",
    date: createISODate("2022-12-04"),
    type: "half",
    finishTime: createDuration("02:22:30"),
    location: locations.singapore,
    weather: {
      feelsLike: 28,
      condition: "Rainy",
    },
    course: {
      elevation: "flat",
    },
  },
  {
    name: "Gold Coast Marathon",
    date: createISODate("2023-07-01"),
    type: "half",
    finishTime: createDuration("02:02:52"),
    location: locations.goldCoast,
    weather: {
      feelsLike: 13,
      condition: "Cloudy",
    },
    course: {
      elevation: "flat",
    },
  },
  {
    name: "Melbourne Marathon",
    date: createISODate("2023-10-15"),
    type: "half",
    finishTime: createDuration("02:07:11"),
    location: locations.melbourne,
    weather: {
      feelsLike: 12,
      condition: "Cloudy",
    },
    course: {
      elevation: "flat",
    },
  },
  {
    name: "HK–Zhuhai–Macao Bridge Half Marathon",
    date: createISODate("2023-11-19"),
    type: "half",
    finishTime: createDuration("02:16:07"),
    location: locations.hongKong,
    weather: {
      feelsLike: 20,
      condition: "Sunny",
    },
    course: {
      elevation: "flat",
    },
  },
  {
    name: "Sydney Marathon",
    date: createISODate("2024-09-15"),
    type: "full",
    finishTime: createDuration("04:20:56"),
    location: locations.sydney,
    weather: {
      feelsLike: 12,
      condition: "Cloudy",
    },
    course: {
      elevation: "hilly",
      elevationGain: 316,
    },
  },
  {
    name: "Singapore Marathon",
    date: createISODate("2024-12-01"),
    type: "full",
    finishTime: createDuration("05:23:59"),
    location: locations.singapore,
    weather: {
      feelsLike: 30,
      condition: "Sunny",
    },
    course: {
      elevation: "flat",
    },
  },
];
