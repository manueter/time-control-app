import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ClockCard from "../components/Clock/ClockCard";
import { useSubmitEntry } from "../hooks/useSubmitEntry";

const ClockPage = () => {
  const [showCard, setShowCard] = useState(false);
  const { user } = useAuth();
  const { submitEntry, isSubmitting } = useSubmitEntry();

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 70);
    return () => clearTimeout(timer);
  }, []);

  const handleEntrySubmit = async (entryId: number) => {
    if (!user?.token) {
      alert("You must be logged in to submit an entry.");
      return;
    }
    console.log(entryId);
    try {
      await submitEntry(entryId);
    } catch (error) {
      console.error("Error submitting entry:", error);
      alert("Failed to submit entry.");
    }
  };
  return (
    <ClockCard
      showCard={showCard}
      isLoading={isSubmitting}
      handleEntrySubmit={handleEntrySubmit}
    />
  );
};

export default ClockPage;
