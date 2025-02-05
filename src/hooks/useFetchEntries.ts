import { useAuth } from "../contexts/AuthContext";
import { Entry } from "../types/interfaces";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useFetchEntries = () => {
  const { user } = useAuth();

  const fetchEntries = async (startDate: string, endDate: string) => {

    const url = new URL(`${API_BASE_URL}/entries`);
    url.searchParams.append("user_uuid", user?.user_uuid ?? "");

    url.searchParams.append("start_date", startDate);
    url.searchParams.append("end_date", endDate);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${user?.token}`, 
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch entries.");
    }
    const data: Entry[] = await response.json();
    return data;
  };

  return { fetchEntries };
};
