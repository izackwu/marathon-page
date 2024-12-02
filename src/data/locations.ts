import { Location } from '../types/marathon';

export const locations: Record<string, Location> = {
  singapore: {
    name: "Singapore",
    coordinates: {
      lat: 1.357107,
      lng: 103.8194992,
    },
    country: "Singapore",
  },
  sydney: {
    name: "Sydney",
    coordinates: {
      lat: -33.8698439,
      lng: 151.2082848,
    },
    country: "Australia",
  },
  goldCoast: {
    name: "Gold Coast",
    coordinates: {
      lat: -28.0023731,
      lng: 153.4145987,
    },
    country: "Australia",
  },
  hongKong: {
    name: "Hong Kong",
    coordinates: {
      lat: 22.350627,
      lng: 114.1849161,
    },
    country: "China",
  },
};
