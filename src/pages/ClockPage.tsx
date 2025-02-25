import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ClockCard from "../components/clock/ClockCard";
import { useSubmitEntry } from "../hooks/useSubmitEntry";
import {
  useFetchEntriesTypes,
  getServerTime,
} from "../hooks/useFetchClockProgram";
import { EntryType } from "../types/interfaces";
import { useAlerts } from "../contexts/AlertContext";

const ClockPage = () => {
  const [showCard, setShowCard] = useState(false);
  const { user } = useAuth();
  const { submitEntry } = useSubmitEntry();
  const [time, setTime] = useState<Date | null>(null); 
  const { entriesTypes, isLoading, fetchEntriesTypes } = useFetchEntriesTypes();
  const { showAlert } = useAlerts();


  const fetchServerTime = async () => {
    const serverTime = await getServerTime(); 
    if (serverTime) {
      setTime(new Date(serverTime)); 
      return new Date(serverTime); 
    } else {
      setTime(null); 
      return null; 
    }
  };
  
  useEffect(() => {
    fetchServerTime();
    fetchEntriesTypes();
  }, [fetchEntriesTypes]);

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 70);
    return () => clearTimeout(timer);
  }, []);

  const handleEntrySubmit = async (entry: EntryType) => {
    if (!user) {
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
      time={time}
      isLoading={isLoading}
      userIsLogged={!!user}
      entriesTypes={entriesTypes}
      handleEntrySubmit={handleEntrySubmit}
    />
  );
};

export default ClockPage;
