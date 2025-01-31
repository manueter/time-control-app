import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ClockCard from "../components/Clock/ClockCard";
import { useSubmitEntry } from "../hooks/useSubmitEntry";
import { useFetchEntriesTypes, useFetchServerTime } from "../hooks/useFetchClockProgram";
import { EntryType } from "../types/interfaces";

const ClockPage = () => {
  const [showCard, setShowCard] = useState(false);
  const { user } = useAuth();
  const { submitEntry, isSubmitting } = useSubmitEntry();
  console.log(user);
  const {entriesTypes, isLoading, fetchEntriesTypes} = useFetchEntriesTypes();
  const {serverTime, fetchServerTime } = useFetchServerTime();

  useEffect(() => {
    fetchServerTime();
    fetchEntriesTypes();
  }, [fetchServerTime, fetchEntriesTypes]);

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 70);
    return () => clearTimeout(timer);
  }, []);

  const handleEntrySubmit = async (entry:EntryType) => {
    if (!user?.token) {
      alert("Tienes que iniciar sesion para registrar una marca.");
      return;
    }
    try {
      await submitEntry(entry.id,entry.description);
    } catch (error) {
      alert("Error al registrar marca.");
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
