import { DurationString } from "../types/marathon";
import { parse } from "date-fns";

const DISTANCES = {
  half: 21.0975,
  full: 42.195,
} as const;

export function calculatePace(
  finishTime: DurationString,
  type: "half" | "full",
): string {
  const parsedTime = parse(finishTime, "HH:mm:ss", new Date());
  const hours = parsedTime.getHours();
  const minutes = parsedTime.getMinutes();
  const seconds = parsedTime.getSeconds();

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const paceSeconds = totalSeconds / DISTANCES[type];

  const paceMinutes = Math.floor(paceSeconds / 60);
  const remainingSeconds = Math.floor(paceSeconds % 60);

  return `${paceMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}
