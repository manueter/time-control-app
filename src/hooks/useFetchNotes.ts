import { useState, useCallback } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface Note {
  note_id: string;
  user_uuid: string;
  value: string;
} 

interface NotesObject {
  [key: string]: Note[];
}
export const useFetchNotes = () => {
  const [notes, setNotes] = useState<{ [key: string]: any }>({});

  const fetchNotes = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`);
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [notes, fetchNotes] as const;
};
