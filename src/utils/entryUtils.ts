import { Entry } from "../types/interfaces";

export const groupEntriesByDate = (entries: Entry[]): Record<string, Entry[]> => {
  const grouped: Record<string, Entry[]> = {};

  entries.forEach((entry) => {
    const dateKey = new Date(entry.date).toISOString().split("T")[0]; // Format as YYYY-MM-DD
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(entry);
  });

  return grouped;
};