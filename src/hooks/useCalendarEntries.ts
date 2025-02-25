import { useState } from "react";
import { useFetchEntries } from "./useFetchEntries";
import { Entry } from "../types/interfaces";

export const useCalendarEntries = () => {
    const { fetchEntries } = useFetchEntries();
    const [entries, setEntries] = useState<Entry[]>([]);
  
    const loadEntries = async (startDate: string, endDate: string) => {
      try {
        const fetchedEntries = await fetchEntries(startDate, endDate);
        setEntries(fetchedEntries);
      } catch (error) {
        console.error("Error al traer las entradas:", error);
      }
    };
  
    return {
      entries,
      fetchEntries: loadEntries,
    };
  };
