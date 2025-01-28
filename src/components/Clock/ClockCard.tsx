import { useEffect } from "react";
import { useFetchServerTime, useFetchEntriesTypes } from "../../hooks/useFetchClockProgram";
import ClockDisplay from "./ClockDisplay";
import ClockWise from "./ClockWise";
import EntriesButtons from "./EntriesButtons";

interface ClockCardProps {
    isLoading?:boolean;
    showCard:boolean;
    handleEntrySubmit: (entryId: number) => void;
}
const ClockCard: React.FC<ClockCardProps>  = ({ showCard, handleEntrySubmit}) => {

  const {entriesTypes, isLoading, fetchEntriesTypes} = useFetchEntriesTypes();
  const {serverTime, fetchServerTime } = useFetchServerTime();

  useEffect(() => {
    fetchServerTime();
    fetchEntriesTypes();
  }, [fetchServerTime, fetchEntriesTypes]);

  return <div className={`card ${showCard ? "show" : ""}`}>
  <h1>
    {new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date())}
  </h1>
  <ClockWise serverTime={serverTime} />
  <ClockDisplay serverTime={serverTime} showFormatToggle={true} />
  <EntriesButtons onSubmit={handleEntrySubmit} isLoading={isLoading} entries={entriesTypes} />
</div>;
  
};  

export default ClockCard;
