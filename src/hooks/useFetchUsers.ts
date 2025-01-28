import { User } from "../types/interfaces";
import { useGet } from "./useGet";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useFetchUsers = () => {
  const {
    data,
    isLoading,
    error,
    fetchData: fetchUsers,
  } = useGet<{ users: User[] }>(`${API_BASE_URL}/users`);

  return {
    users: data?.users || [], // Ensure users is always an array
    isLoading,
    error,
    fetchUsers,
  };
};