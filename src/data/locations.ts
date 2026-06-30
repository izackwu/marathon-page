import { Location } from "../types/marathon";

// Use https://www.gps-coordinates.net/ to get the coordinates when adding a new location.
export const locations: Record<string, Location> = {
  singapore: {
    name: "Singapore",
    coordinates: { lat: 1.357107, lng: 103.8194992 },
    country: "Singapore",
    timezone: "Asia/Singapore",
  },
  sydney: {
    name: "Sydney",
    coordinates: { lat: -33.8698439, lng: 151.2082848 },
    country: "Australia",
    timezone: "Australia/Sydney",
  },
  gosford: {
    name: "Gosford",
    coordinates: { lat: -33.424098, lng: 151.341148 },
    country: "Australia",
    timezone: "Australia/Sydney",
  },
  goldCoast: {
    name: "Gold Coast",
    coordinates: { lat: -28.0023731, lng: 153.4145987 },
    country: "Australia",
    timezone: "Australia/Brisbane",
  },
  hongKong: {
    name: "Hong Kong",
    coordinates: { lat: 22.350627, lng: 114.1849161 },
    country: "Hong Kong",
    timezone: "Asia/Hong_Kong",
  },
  melbourne: {
    name: "Melbourne",
    coordinates: { lat: -37.8142454, lng: 144.9631732 },
    country: "Australia",
    timezone: "Australia/Melbourne",
  },
  wuhan: {
    name: "Wuhan",
    coordinates: { lat: 30.5951051, lng: 114.2999353 },
    country: "China",
    timezone: "Asia/Shanghai",
  },
  kobe: {
    name: "Kobe",
    coordinates: { lat: 34.6932379, lng: 135.1943764 },
    country: "Japan",
    timezone: "Asia/Tokyo",
  },
  tokyo: {
    name: "Tokyo",
    coordinates: { lat: 35.6768601, lng: 139.7638947 },
    country: "Japan",
    timezone: "Asia/Tokyo",
  },
  taipei: {
    name: "Taipei",
    coordinates: { lat: 25.0375198, lng: 121.5636796 },
    country: "Taiwan",
    timezone: "Asia/Taipei",
  },
};
