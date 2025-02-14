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
    true
  );

  const submitEntry = async (entryId: number, entryDescription: string) => {
    if (!user?.token) {
      return { success: false, message: "Debes iniciar sesión para registrar una marca." };
    }

    setIsSubmitting(true);
    try {
      await postData({
        clock_id: DEFAULT_CLOCK_ID,
        entry_type_id: entryId,
        user_uuid: user.user_uuid,
      });
      return { success: true, message: `${entryDescription} registrada correctamente!` };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Ha ocurrido un error al registrar la entrada." };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitEntry, isSubmitting, isLoading, error };
};
