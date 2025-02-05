import { Entry } from "../types/interfaces";
import { dateToString_DDMMYYYY } from "./dateUtils";

export const filterEntriesByDate = (entries: Entry[], date:Date): Entry[] => {
  return entries.filter((entry) => entry.date === dateToString_DDMMYYYY(date));
};