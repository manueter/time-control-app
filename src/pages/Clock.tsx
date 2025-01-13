import { useEffect, useState } from "react";
import ClockDisplay from "../components/ClockDisplay";
import EntriesButtons from "../components/EntriesButtons";
import ClockWise from "../components/ClockWise";

const ClockPage = () => {
  const [showCard, setShowCard] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 70); // Show after 50ms
    return () => clearTimeout(timer);
  }, []); 

  return (
    <div className={`card ${showCard ? "show" : ""}`}>
      <h1>       {new Intl.DateTimeFormat('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      }).format(new Date())} </h1>
      <ClockWise></ClockWise>
      <ClockDisplay showFormatToggle={true}  />
      <EntriesButtons />
      <button style={{ width: '100%' }}>Registrar Marca</button>
    </div>
  );
};

export default ClockPage;