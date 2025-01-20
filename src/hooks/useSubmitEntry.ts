// src/hooks/useSubmitEntry.ts
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSubmitEntry = (userToken: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitEntry = async (entryValue: string, clockId: string, userUUID: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/addentry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          clock_id: clockId,
          entry_type: entryValue,
          user_uuid: userUUID,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit entry");
      }

      alert("Entry submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitEntry, isSubmitting };
};
