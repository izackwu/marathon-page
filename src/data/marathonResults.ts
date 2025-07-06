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
    specialMarks: [
      { type: "First_time", description: "My first half marathon!" }
      , { type: "PB" }
    ]
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

    specialMarks: [
      { type: "PB", description: "New Personal Best! Thanks to the good weather and flat course." }
    ]
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

    specialMarks: [
      { type: "First_time", description: "My first full marathon!" }
      , { type: "PB" }
      , { type: "Hilly_course", description: "317m elevation gain, 400m elevation loss" }
    ]
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

    specialMarks: [
      { type: "Injury", description: "Not fully recovered from the knee injury, and it got worse during the race" }
    ]
  },
  {
    name: "Wuhan Marathon",
    date: createISODate("2025-03-23"),
    type: "full",
    finishTime: createDuration("03:29:25"),
    location: locations.wuhan,
    weather: {
      feelsLike: 18,
      condition: "Rainy",
    },

    specialMarks: [
      { type: "PB", description: "New Personal Best! Pushed really hard." }
    ]
  },
  {
    name: "2XU Compression Run",
    date: createISODate("2025-04-27"),
    type: "half",
    finishTime: createDuration("01:44:56"),
    location: locations.singapore,
    weather: {
      feelsLike: 28,
      condition: "Cloudy" // before sunrise
    },

    specialMarks: [
      { type: "PB" }
    ]
  },
  {
    name: "Gold Coast Marathon",
    date: createISODate("2025-07-06"),
    type: "full",
    finishTime: createDuration("03:13:21"),
    location: locations.goldCoast,
    weather: {
      feelsLike: 16,
      condition: "Cloudy",
    },
    specialMarks: [
      { type: "PB", description: "New Personal Best! Sub 3:15 achieved." }
    ]
  },
];
