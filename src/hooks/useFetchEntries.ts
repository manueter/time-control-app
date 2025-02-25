import { useAuth } from "../contexts/AuthContext";
import { Entry } from "../types/interfaces";
import { supabase } from "../utils/supabase";

export const useFetchEntries = () => {
  const { session } = useAuth();

  const fetchEntries = async (startDate: string, endDate: string): Promise<Entry[]> => {
    
    const { data, error } = await supabase
      .from("entries") 
      .select("*")
      .eq("user_uuid", session?.user.id) // Filter by user_uuid
      .gte("start_date", startDate) //Check both columns name for date filtering
      .lte("end_date", endDate); 

    if (error) {
      throw new Error(`Error fetching entries: ${error.message}`);
    }

    return data as Entry[];
  };

  return { fetchEntries };
};
