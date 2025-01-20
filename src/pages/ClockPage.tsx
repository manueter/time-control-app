import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ClockCard from "../components/Clock/ClockCard";
import { useSubmitEntry } from "../hooks/useSubmitEntry";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ClockPage = () => {
  const [showCard, setShowCard] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth(); 
  const { submitEntry, isSubmitting } = useSubmitEntry(user?.token??'');

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 70); 
    return () => clearTimeout(timer);
  }, []);

  // const handleEntrySubmit = async (entryValue: string , clock_id: string) => {
  //   if (!user) {
  //     alert("You must be logged in to submit an entry.");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/addentry`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`, // Include the user's token
  //       },
  //       body: JSON.stringify({
  //         clock_id: clock_id,
  //         entry_type: entryValue,
  //         user_uuid: user.user_uuid,
  //         // entry: entryValue,
  //         // time: currentTime,
  //         // date: currentDate,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to submit entry: ${response.statusText}`);
  //     }

  //     alert("Entry submitted successfully!");
  //   } catch (error) {
  //     console.error("Error submitting entry:", error);
  //     alert("Failed to submit entry.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  const handleEntrySubmit = (entryValue: string, clockId: string) => {
    if (!user) {
      alert("You must be logged in to submit an entry.");
      return;
    }
    submitEntry(entryValue, clockId, user.user_uuid);
  };
  return (
    <ClockCard showCard={showCard} isLoading={isSubmitting} handleEntrySubmit={handleEntrySubmit}/>
  );
};

export default ClockPage;
