import { EntryType } from "../types/interfaces";
import { supabase } from "../utils/supabase";
import { useGet } from "./useGet";

export const getServerTime = async () => {
  try {
    const { data, error } = await supabase
      .rpc('get_current_time');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error('Error fetching server time:', error);
    return null; 
  }
};

export const useFetchEntriesTypes = () => {
  const { data: entriesTypes, isLoading, error, fetchData: fetchEntriesTypes } = useGet<EntryType[]>(`entry_types`);
  return {
    entriesTypes: entriesTypes || [],
    isLoading,
    error,
    fetchEntriesTypes,
  };
};