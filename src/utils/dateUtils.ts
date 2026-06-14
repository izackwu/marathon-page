import {
  format,
  formatDistance,
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

export function formatTimeAgo(
  dateString: ISODateString,
  timeZone?: string,
): string {
  const date = parseISO(dateString);
  if (!isValid(date)) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  // Race dates only have day-level granularity (no time of day), so an
  // hour-precise distance like "about 6 hours ago" would imply accuracy we
  // don't have. Compare whole calendar days instead, anchoring "today" to the
  // race's own time zone when known (falling back to the viewer's zone).
  const todayString = timeZone
    ? new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date())
    : format(new Date(), "yyyy-MM-dd");
  const today = parseISO(todayString);

  const calendarDayDiff = differenceInCalendarDays(today, date);
  if (calendarDayDiff === 0) {
    return "today";
  }
  if (calendarDayDiff === 1) {
    return "yesterday";
  }
  if (calendarDayDiff === -1) {
    return "tomorrow";
  }
  // Both dates are local midnight, so the distance is a whole number of days.
  return formatDistance(date, today, { addSuffix: true });
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
