import {
  format,
  formatDistanceToNow,
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
