import { useAuth } from "../contexts/AuthContext";
import { Entry } from "../types/interfaces";
import { useFetch } from "./useFetch";

export const useFetchEntries = () => {
  const { user } = useAuth();

  const { data: entries, isLoading, error, fetchData: fetchEntries } = useFetch<Entry[]>(
    `${import.meta.env.VITE_API_BASE_URL}/entries`,
    {
      headers: user?.token ? { Authorization: `Bearer ${user.token}` } : undefined,
    }
  );
  return { entries, isLoading, error, fetchEntries };
};