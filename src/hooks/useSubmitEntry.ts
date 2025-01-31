import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePost } from "./usePost";

const DEFAULT_CLOCK_ID = import.meta.env.VITE_DEFAULT_CLOCK_ID;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSubmitEntry = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const { postData, isLoading, error } = usePost(
    `${API_BASE_URL}/entries/add`,
    true // `requiresAuth` 
  );

  const submitEntry = async (entryId: number) => {
    if (!user?.token) {
      alert("You must be logged in to submit an entry.");
      return;
    }

    setIsSubmitting(true);
    try {
      await postData({
        clock_id: DEFAULT_CLOCK_ID,
        entry_type_id: entryId,
        user_uuid: user.user_uuid,
      });
      alert("Entry submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitEntry, isSubmitting, isLoading, error };
};
