import {
  format,
  formatDistanceToNow,
  differenceInCalendarDays,
  parseISO,
  isValid,
  parse,
} from "date-fns";
import { ISODateString, DurationString } from "../types/marathon";

export function formatDate(dateString: ISODateString): string {
  const date = parseISO(dateString);
  if (!isValid(date)) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  return format(date, "yyyy-MM-dd");
}

export function formatTimeAgo(dateString: ISODateString): string {
  const date = parseISO(dateString);
  if (!isValid(date)) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  // Race dates only have day-level granularity (no time or timezone), so
  // showing an hour-precise distance like "about 6 hours ago" is misleading
  // for nearby dates. Compare by calendar day and fall back to coarser labels.
  const calendarDayDiff = differenceInCalendarDays(new Date(), date);
  if (calendarDayDiff === 0) {
    return "today";
  }
  if (calendarDayDiff === 1) {
    return "yesterday";
  }
  if (calendarDayDiff === -1) {
    return "tomorrow";
  }
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDuration(duration: DurationString): string {
  try {
    parse(duration, "HH:mm:ss", new Date());
    return duration;
  } catch {
    throw new Error(
      `Invalid duration format: ${duration}. Expected format: HH:mm:ss`,
    );
  }
}

export function createISODate(dateString: string): ISODateString {
  const date = parseISO(dateString);
  if (!isValid(date)) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  return dateString as ISODateString;
}

export function durationToSeconds(duration: DurationString): number {
  const [hours, minutes, seconds] = duration.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export function createDuration(duration: string): DurationString {
  try {
    parse(duration, "HH:mm:ss", new Date());
    return duration as DurationString;
  } catch {
    throw new Error(
      `Invalid duration format: ${duration}. Expected format: HH:mm:ss`,
    );
  }
}
