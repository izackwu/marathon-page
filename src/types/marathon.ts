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

// define a variant type of special marks, like `PB`, `Hilly_course`, `Injury`, `World_major`, `First_race` etc. Each of these should have an optional description.
export type SpecialMarkType =
  | "First_time"
  | "PB"
  | "Hilly_course"
  | "Injury"
  | "World_major"

export interface SpecialMark {
  type: SpecialMarkType;
  description?: string;
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
  specialMarks?: SpecialMark[];
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
  notes?: string; // Optional additional information
}
