import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Clock, ClockProgram, EntryType } from "../types/interfaces";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_CLOCK_ID = import.meta.env.VITE_DEFAULT_CLOCK_ID;

export const useFetchEntriesTypes = () => {
  
  const [entries, setEntries] = useState<EntryType[]>();
  
  const fetchEntries = useCallback(async()=>{

    try {
      const response = await fetch(`${API_BASE_URL}/clocks`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data.clocks);
      setEntries(data.clocks[0]?.entries || []);
      //TODO: Change to get with clock_id the correspongin clock
    } catch (error) {
      console.error("Error fetching entries:", error);
    }

  }, []);

  return [entries, fetchEntries] as const;
};

export const useFetchClockProgram = async(clock_id?:number) => {
  const [clockProgram, setClockProgram] = useState<ClockProgram>();
  const [error, setError] = useState<Error | null>(null);

  const fetchClockProgram = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/clocks`);
      if (!response.ok) {
        throw new Error("Failed to fetch clock programs");
      }
      const data = await response.json();

      console.log(data);
      const clock = data.filter(
        (d: Clock) => d.clock_id === DEFAULT_CLOCK_ID
      ) as Clock;

      setClockProgram(clock.program);
      
    } catch (error) {
      setError(error as Error)
      //console.error(error);
    }
  }, []);

  return [clockProgram, fetchClockProgram] as const;
};
