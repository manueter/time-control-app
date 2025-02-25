import { useState, useCallback } from "react";
import { supabase } from "../utils/supabase";

interface UseGetResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
}

export const useGet = <T>(url: string): UseGetResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: fetchedData, error: fetchError } = await supabase
        .from(url)
        .select('*');

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      setData(fetchedData as T);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return { data, isLoading, error, fetchData };
};
