import { useAuth } from "../contexts/AuthContext";
import { Entry } from "../types/interfaces";
import { convertDDMMYYToPostgresDate, formatStringDatePostgresToDDMMYY } from "../utils/dateUtils";
import { supabase } from "../utils/supabase";

export const useFetchEntries = () => {
  const { session } = useAuth();

  const fetchEntries = async (startDate: string, endDate: string): Promise<Entry[]> => {
    
    const startDateFormatted = convertDDMMYYToPostgresDate(startDate);
    const endDateFormatted = convertDDMMYYToPostgresDate(endDate);

    const { data, error } = await supabase
      .from("entries") 
      .select("*")
      .eq("user_uuid", session?.user.id)
      .gte("date", startDateFormatted) 
      .lte("date", endDateFormatted); 

    if (error) {
      throw new Error(`Error fetching entries: ${error.message}`);
    }

    return data.map((entry: Entry) => ({
      ...entry,
      date: formatStringDatePostgresToDDMMYY(entry.date),
      time: entry.time, // Format the time to local
    })) as Entry[];
  };

  return { fetchEntries };
};
