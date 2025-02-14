import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ClockCard from "../components/clock/ClockCard";
import { useSubmitEntry } from "../hooks/useSubmitEntry";
import {
  useFetchEntriesTypes,
  useFetchServerTime,
} from "../hooks/useFetchClockProgram";
import { EntryType } from "../types/interfaces";
import { useAlerts } from "../contexts/AlertContext";

const ClockPage = () => {
  const [showCard, setShowCard] = useState(false);
  const { user } = useAuth();
  const { submitEntry, isSubmitting } = useSubmitEntry();
  const { entriesTypes, isLoading, fetchEntriesTypes } = useFetchEntriesTypes();
  const { serverTime, fetchServerTime } = useFetchServerTime();

  const { showAlert } = useAlerts();
  useEffect(() => {
    fetchServerTime();
    fetchEntriesTypes();
  }, [fetchServerTime, fetchEntriesTypes]);

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 70);
    return () => clearTimeout(timer);
  }, []);

  const handleEntrySubmit = async (entry: EntryType) => {
    if (!user?.token) {
      showAlert("Tienes que iniciar sesion para registrar una marca.", "error");
      return;
    }
    try {
      const result = await submitEntry(entry.id, entry.description);
      if (result.success) {
        showAlert(result.message, "success");
      }
    } catch (e) {
      showAlert("Error", "error");
    }
  };
  return (
    <ClockCard
      showCard={showCard}
      serverTime={serverTime}
      isLoading={isSubmitting || isLoading}
      userIsLogged={!!user}
      entriesTypes={entriesTypes}
      handleEntrySubmit={handleEntrySubmit}
    />
  );
};

export default ClockPage;
