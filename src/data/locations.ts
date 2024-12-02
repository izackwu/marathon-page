import { Location } from '../types/marathon';

export const locations: Record<string, Location> = {
  singapore: {
    name: 'Singapore',
    coordinates: {
      lat: 1.3521,
      lng: 103.8198
    },
    country: 'Singapore'
  },
  sydney: {
    name: 'Sydney',
    coordinates: {
      lat: -33.8688,
      lng: 151.2093
    },
    country: 'Australia'
  },
  wuhan: {
    name: 'Wuhan',
    coordinates: {
      lat: 30.5928,
      lng: 114.3055
    },
    country: 'China'
  },
  goldCoast: {
    name: 'Gold Coast',
    coordinates: {
      lat: -28.0167,
      lng: 153.4000
    },
    country: 'Australia'
  },
  tokyo: {
    name: 'Tokyo',
    coordinates: {
      lat: 35.6762,
      lng: 139.6503
    },
    country: 'Japan'
  },
  berlin: {
    name: 'Berlin',
    coordinates: {
      lat: 52.5200,
      lng: 13.4050
    },
    country: 'Germany'
  },
  bangkok: {
    name: 'Bangkok',
    coordinates: {
      lat: 13.7563,
      lng: 100.5018
    },
    country: 'Thailand'
  }
};