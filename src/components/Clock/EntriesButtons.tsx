import { useState } from "react";
import { EntryType } from "../../types/interfaces";
import "../../styles/form-styles.css";
import "../../styles/clock-styles.css";

interface EntriesButtonsProps {
  onSubmit: (entryId: number) => void;
  isLoading:boolean;
  entries?:EntryType[];
}

const EntriesButtons:React.FC<EntriesButtonsProps> = ({ onSubmit, isLoading, entries }) => {

  const [selectedEntry, setSelectedEntry] = useState<EntryType | null>(null);
  
  if(isLoading) return <></>

  const handleEntrySelect = (value:string) => {
    const entry = entries?.find((entry) => entry.value === value); 
    if (entry) {
      setSelectedEntry(entry);
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedEntry) {
      onSubmit(selectedEntry.id); 
    } else {
      alert("Por favor selecciona un evento.");
    }
  };

  if (entries?.length === 0) {
    return <p>No hay entradas disponibles.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        className="entryDropdown"
        value={selectedEntry?.value?? ""}
        onChange={(e) => handleEntrySelect(e.target.value)}
        disabled={isLoading}
        required
      >
        <option value="" disabled>
          Elija un tipo de marca
        </option>
        {entries?.map((entry:EntryType) => (
          <option key={entry.id} value={entry.value}>
            {entry.description}
          </option>
        ))}
      </select>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Cargando..." : "Registrar marca"}
      </button>
    </form>
  );
};

export default EntriesButtons;
