import { User } from "../types/interfaces";
import { useGet } from "./useGet";

export const useFetchUsers = () => {
  const { data, isLoading, error, fetchData: fetchUsers } = useGet<{ users: User[] }>(`users`);

  return {
    users: data?.users || [], // Ensure users is always an array
    isLoading,
    error,
    fetchUsers,
  };
};
