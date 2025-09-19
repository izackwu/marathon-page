import { SpecialMarkType, SpecialMark } from "../types/marathon";
import { Mountain, Star, Trophy, Flag, BriefcaseMedical } from "lucide-react";

/**
 * Returns the icon for a given SpecialMarkType.
 *
 * @param type - The type of the special mark.
 * @returns A React component representing the icon.
 */
function getIcon(type: SpecialMarkType): React.ElementType {
  switch (type) {
    case "First_time":
      return Flag;
    case "PB":
      return Trophy;
    case "Hilly_course":
      return Mountain;
    case "Injury":
      return BriefcaseMedical;
    case "World_major":
      return Star;
  }
}

/**
 * Returns the default description for a given SpecialMarkType.
 *
 * @param type - The type of the special mark.
 * @returns A string representing the default description.
 */
function getDefaultDescription(type: SpecialMarkType): string {
  switch (type) {
    case "First_time":
      return "First time";
    case "PB":
      return "New Personal Best";
    case "Hilly_course":
      return "Hilly course";
    case "Injury":
      return "Recovering from an injury";
    case "World_major":
      return "Part of Abbott World Marathon Majors";
  }
}

/**
 * Converts a SpecialMarkType to an icon with a description.
 * If a description is already provided, it will use that instead of the default.
 *
 * @param specialMark - The special mark to convert.
 * @returns An object containing the icon (as a React component) and description.
 */
export function convertSpecialMarkToIcon(specialMark: SpecialMark): {
  icon: React.ElementType;
  description: string;
} {
  const { type, description } = specialMark;
  return {
    icon: getIcon(type),
    description: description || getDefaultDescription(type),
  };
}
