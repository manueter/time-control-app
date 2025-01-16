import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Entry {
  entry_id: string;
  user_uuid: string;
  entry_type: string;
  date: string;
  time: string;
  clock_id: string;
} 

interface EntriesObject {
  [key: string]: Entry[];
}
export const useFetchEntries = () => {

  
  const [entries, setEntries] = useState<{ [key: string]: any }>({});
  const { user } = useAuth();

  const fetchEntries = useCallback(async () => {

    if (!user) {
      console.log("User is not logged in, skipping fetch entries");
      return; 
    }

    try {
      const response = await fetch(`${API_BASE_URL}/entries`);
      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [entries, fetchEntries] as const;
};

// export const useFetchEntries = (): [EntriesObject, () => Promise<void>] => {
//   const [entries, setEntries] = useState<{ [key: string]: any }>({});
//   const fetchEntries = useCallback(async (): Promise<void> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/entries.json`);
//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);

//       const data: Entry[] = await response.json();
//       const entriesObject: EntriesObject = data.reduce((acc, entry) => {
//         acc[entry.date] = acc[entry.date] || [];
//         acc[entry.date].push(entry);
//         return acc;
//       }, {} as EntriesObject);
//       setEntries(entriesObject);
//     } catch (error) {
//       console.error("Failed to fetch entries:", error);
//     }
//   }, []); 
//   return [entries, fetchEntries] as const;
// };
