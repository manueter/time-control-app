import { useGet } from "./useGet"; // Make sure to import the useGet hook
import { useAuth } from "../contexts/AuthContext";


export const useFetchNotes = () => {
  const { user } = useAuth();
  const { data: notes, isLoading, error, fetchData: fetchNotes } = useGet<{ [key: string]: any }>(
    user ? `notes` : ''
  );

  return {
    notes: notes || {},
    isLoading,
    error,
    fetchNotes,
  };
};