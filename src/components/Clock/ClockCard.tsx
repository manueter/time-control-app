import { useEffect } from "react";
import { useFetchEntriesTypes } from "../../hooks/useFetchClockProgram";
import ClockDisplay from "./ClockDisplay";
import ClockWise from "./ClockWise";
import EntriesButtons from "./EntriesButtons";

interface ClockCardProps {
    isLoading:boolean;
    showCard:boolean;
    handleEntrySubmit: (entryValue: string) => void;
}
const ClockCard: React.FC<ClockCardProps>  = ({isLoading, showCard, handleEntrySubmit}) => {

  const [entries, fetchEntries] = useFetchEntriesTypes();

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return <div className={`card ${showCard ? "show" : ""}`}>
  <h1>
    {new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date())}
  </h1>
  <ClockWise />
  <ClockDisplay showFormatToggle={true} />
  <EntriesButtons onSubmit={handleEntrySubmit} isLoading={isLoading} entries={entries} />
</div>;
  
};


export default ClockCard;
