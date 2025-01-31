import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ClockCard from "../components/Clock/ClockCard";
import { useSubmitEntry } from "../hooks/useSubmitEntry";
import { useFetchEntriesTypes, useFetchServerTime } from "../hooks/useFetchClockProgram";

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

  const handleEntrySubmit = async (entryId: number) => {
    if (!user?.token) {
      alert("Tienes que estar para registrar una marca.");
      return;
    }
    try {
      await submitEntry(entryId);
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
