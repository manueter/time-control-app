import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // Import the AuthContext
import ClockDisplay from "../components/ClockDisplay";
import EntriesButtons from "../components/EntriesButtons";
import ClockWise from "../components/ClockWise";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ClockPage = () => {
  const [showCard, setShowCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth(); // Get the logged-in user's data

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 70); // Show after 50ms
    return () => clearTimeout(timer);
  }, []);

  const handleEntrySubmit = async (entryValue: string , clockId: number) => {
    if (!user) {
      alert("You must be logged in to submit an entry.");
      return;
    }

    setIsLoading(true);

    //const currentTime = new Date().toLocaleTimeString();
    //const currentDate = new Date().toISOString().split("T")[0];

    try {
      const response = await fetch(`${API_BASE_URL}/addentry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Include the user's token
        },
        body: JSON.stringify({
          clock_id: clockId,
          entry_type: entryValue,
          user_uuid: user.user_uuid,
          // entry: entryValue,
          // time: currentTime,
          // date: currentDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit entry: ${response.statusText}`);
      }

      alert("Entry submitted successfully!");
    } catch (error) {
      console.error("Error submitting entry:", error);
      alert("Failed to submit entry.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={`card ${showCard ? "show" : ""}`}>
      <h1>
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date())}
      </h1>
      <ClockWise />
      <ClockDisplay showFormatToggle={true} />
      <EntriesButtons onSubmit={handleEntrySubmit} isLoading={isLoading} />
    </div>
  );
};

export default ClockPage;
