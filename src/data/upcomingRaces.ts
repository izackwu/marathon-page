import { UpcomingRace } from '../types/marathon';
import { locations } from './locations';
import { createISODate, createDuration } from '../utils/dateUtils';

export const upcomingRaces: UpcomingRace[] = [
  {
    name: 'Tokyo Marathon',
    date: createISODate('2025-03-02'),
    type: 'full',
    location: {
      name: locations.tokyo.name,
      country: locations.tokyo.country
    },
    goalTime: createDuration('04:05:00'),
    notes: 'One of the World Marathon Majors'
  },
  {
    name: 'Berlin Marathon',
    date: createISODate('2025-09-28'),
    type: 'full',
    location: {
      name: locations.berlin.name,
      country: locations.berlin.country
    },
    notes: 'Fast and flat course'
  },
  {
    name: 'Bangkok Midnight Marathon',
    date: createISODate('2024-12-08'),
    type: 'half',
    location: {
      name: locations.bangkok.name,
      country: locations.bangkok.country
    },
    goalTime: createDuration('02:15:00'),
    notes: 'Night race'
  }
];