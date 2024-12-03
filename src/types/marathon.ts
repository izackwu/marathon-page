export type ISODateString = string & { readonly __type: unique symbol };
export type DurationString = string & { readonly __type: unique symbol };

export interface Location {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
}

export interface MarathonResult {
  name: string;
  date: ISODateString;
  type: "half" | "full";
  finishTime: DurationString;
  location: Location;
  weather: {
    feelsLike: number; // in Celsius
    condition: string; // e.g., "Sunny", "Rainy", "Cloudy"
  };
  course: {
    elevation: "flat" | "hilly";
    elevationGain?: number; // in meters
  };
}

export interface MarathonStats {
  totalRaces: number;
  bestHalfTime?: DurationString;
  bestFullTime?: DurationString;
  firstRaceDate: ISODateString;
  lastRaceDate: ISODateString;
  uniqueCountries: number;
  nextRaceDate?: ISODateString;
}

export interface UpcomingRace {
  name: string;
  date: ISODateString;
  type: "half" | "full";
  location: Omit<Location, "coordinates">;
  goalTime?: DurationString;
  notes?: string; // Optional additional information
}
