import ClockDisplay from "./ClockDisplay";
import ClockWise from "./ClockWise";
import EntriesButtons from "./EntriesButtons";
import { EntryType } from "../../types/interfaces";
import { Link } from "react-router";

interface ClockCardProps {
  time: Date | null;
  isLoading: boolean;
  showCard: boolean;
  userIsLogged: boolean;
  entriesTypes: EntryType[];
  handleEntrySubmit: (entry: EntryType) => void;
}
const ClockCard: React.FC<ClockCardProps> = ({
  showCard,
  time,
  isLoading,
  userIsLogged,
  entriesTypes,
  handleEntrySubmit,
}) => {
  return (
    <div className={`card ${showCard ? "show" : ""}`}>
      <h1 className="heading">
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date())}
      </h1>
      <ClockWise serverTime={time} />
      <ClockDisplay serverTime={time} showFormatToggle={true} />
      {userIsLogged ? (
        <EntriesButtons
          onSubmit={handleEntrySubmit}
          isLoading={isLoading}
          types={entriesTypes}
        />
      ) : (
        <span>
          <Link to="/Login" className="link">
            Iniciar sesion
          </Link>
        </span>
      )}
    </div>
  );
};

export default ClockCard;
