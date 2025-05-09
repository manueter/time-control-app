import { useState } from "react";
import { EntryType } from "../../types/interfaces";
import "../../styles/shared/form-styles.css";
import "../../styles/clock/clock-styles.css";
import { useAlerts } from "../../contexts/AlertContext";

interface EntriesButtonsProps {
  onSubmit: (entryType: EntryType) => void;
  isLoading: boolean;
  types: EntryType[];
}

const EntriesButtons: React.FC<EntriesButtonsProps> = ({
  onSubmit,
  isLoading,
  types,
}) => {
  const { showAlert } = useAlerts();
  const [selectedEntryType, setSelectedEntryType] = useState<EntryType | null>(
    null
  );

  const handleEntrySelect = (value: string) => {
    const type = types?.find((type) => type.value === value);
    if (type) {
      setSelectedEntryType(type);
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedEntryType) {
      onSubmit(selectedEntryType);
    } else {
      showAlert("Por favor selecciona un evento.", "error");
    }
  };

  if (types?.length === 0) {
    return <span>Cargando entradas...</span>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        className="entryDropdown"
        value={selectedEntryType?.value ?? ""}
        onChange={(e) => handleEntrySelect(e.target.value)}
        disabled={isLoading}
        required
      >
        <option value="" disabled>
          Elija un tipo de marca
        </option>
        {types?.map((entry: EntryType) => (
          <option key={entry.id} value={entry.value}>
            {entry.description}
          </option>
        ))}
      </select>
      <button className="form-button" type="submit" disabled={isLoading}>
        {isLoading ? "Cargando..." : "Registrar marca"}
      </button>
    </form>
  );
};

export default EntriesButtons;
