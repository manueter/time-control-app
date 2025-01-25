import { EntryType } from "../types/interfaces";
import { useFetch } from "./useFetch";
import { useGet } from "./useGet";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetchServerTime = () => {
  
  const { data: serverTime, isLoading, error, fetchData: fetchServerTime } = useGet<{ serverTime: string }>(
    `${API_BASE_URL}/clocks/server-time`
  );

  return {
    serverTime: serverTime ? new Date(serverTime.serverTime) : null,
    isLoading,
    error,
    fetchServerTime,
  };
};

export const useFetchEntriesTypes = () => {

  const { data: entriesTypes, isLoading, error, fetchData: fetchEntriesTypes } = useGet<EntryType[]>(
    `${API_BASE_URL}/clocks/entry-types`
  );
  return { entriesTypes: entriesTypes || [], isLoading, error, fetchEntriesTypes };
};