import { useState } from "react";
import { EntryType } from "../../types/interfaces";
import "../../styles/form-styles.css";
import "../../styles/clock-styles.css";

interface EntriesButtonsProps {
  onSubmit: (entryId: number) => void;
  isLoading:boolean;
  types:EntryType[];
}

const EntriesButtons:React.FC<EntriesButtonsProps> = ({ onSubmit, isLoading, types }) => {

  const [selectedEntryType, setSelectedEntryType] = useState<EntryType | null>(null);
  
  if(isLoading) return <></>

  const handleEntrySelect = (value:string) => {
    const type = types?.find((type) => type.value === value); 
    if (type) {
      setSelectedEntryType(type);
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedEntryType) {
      onSubmit(selectedEntryType.id); 
    } else {
      alert("Por favor selecciona un evento.");
    }
  };

  if (types?.length === 0) {
    return <p>No hay entradas disponibles.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        className="entryDropdown"
        value={selectedEntryType?.value?? ""}
        onChange={(e) => handleEntrySelect(e.target.value)}
        disabled={isLoading}
        required
      >
        <option value="" disabled>
          Elija un tipo de marca
        </option>
        {types?.map((entry:EntryType) => (
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
