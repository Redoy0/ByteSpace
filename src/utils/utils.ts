import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const toTitleCase = (text: string) => {
  return text;
  // .toLowerCase()
  // .split(" ")
  // .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  // .join(" ");
};

export const formatLessonType = (type?: string | null): string => {
  if (!type) return "";
  const trimmed = type.trim();
  if (trimmed.toLowerCase() === "on-road") {
    return "In-Car Practice";
  }
  if (trimmed.toLowerCase() === "on-road & classroom") {
    return "In-Car Practice & Classroom";
  }
  return trimmed;
};

export function getDisplaySequenceTag(sequenceTag?: string | null): string {
  if (!sequenceTag) return "";

  return sequenceTag.replace(/^S(?=\d+$)/, "L");
}
