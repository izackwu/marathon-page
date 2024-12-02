import { MarathonResult } from '../types/marathon';
import { locations } from './locations';
import { createISODate, createDuration } from '../utils/dateUtils';

export const marathonResults: MarathonResult[] = [
  {
    name: 'Singapore Marathon',
    date: createISODate('2022-12-04'),
    type: 'half',
    finishTime: createDuration('02:20:00'),
    location: locations.singapore,
    weather: {
      feelsLike: 34,
      condition: 'Cloudy',
    },
    course: {
      elevation: 'flat',
      elevationGain: 280
    }
  },
  {
    name: 'Sydney Marathon',
    date: createISODate('2023-03-12'),
    type: 'full',
    finishTime: createDuration('04:20:00'),
    location: locations.sydney,
    weather: {
      feelsLike: 23,
      condition: 'Cloudy',
    },
    course: {
      elevation: 'flat',
      elevationGain: 150
    }
  },
  {
    name: 'Sundown Marathon Singapore',
    date: createISODate('2023-06-18'),
    type: 'full',
    finishTime: createDuration('04:45:30'),
    location: locations.singapore,
    weather: {
      feelsLike: 33,
      condition: 'Cloudy',
    },
    course: {
      elevation: 'flat',
      elevationGain: 320
    }
  },
  {
    name: 'Wuhan Marathon',
    date: createISODate('2023-09-24'),
    type: 'full',
    finishTime: createDuration('04:15:20'),
    location: locations.wuhan,
    weather: {
      feelsLike: 19,
      condition: 'Cloudy',
    },
    course: {
      elevation: 'hilly',
      elevationGain: 580
    }
  },
  {
    name: 'Gold Coast Marathon',
    date: createISODate('2024-02-15'),
    type: 'full',
    finishTime: createDuration('04:10:15'),
    location: locations.goldCoast,
    weather: {
      feelsLike: 25,
      condition: 'Sunny',
    },
    course: {
      elevation: 'flat',
      elevationGain: 120
    }
  }
];