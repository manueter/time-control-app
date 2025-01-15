import "../../styles/form-styles.css";
import "../../styles/clock-styles.css";
import { useState, useEffect } from "react";

interface Entry {
  value: string;
  description: string;
}

interface EntriesButtonsProps {
  onSubmit: (entryValue: string,clockId:number) => void;
  isLoading:boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EntriesButtons:React.FC<EntriesButtonsProps> = ({ onSubmit, isLoading }) => {
  
  const [clockId,setClockId] = useState<number>(0);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedEntry) {
      onSubmit(selectedEntry,clockId); // Pass the entry value to the parent component
    } else {
      alert("Please select an entry.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        //TODO: Change to get with clock_id the correspongin clock
        const response = await fetch(`${API_BASE_URL}/clocks`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data.clocks)
        setEntries(data.clocks[0]?.entries || []);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEntrySelect = (value: string) => {
    setSelectedEntry(value); // Set the selected entry
  };

  if (loading) {
    return <p>Cargando entradas...</p>;
  }

  if (entries.length === 0) {
    return <p>No hay entradas disponibles.</p>;
  }

  return (
    <div>
      <div className="entryWrapper">
        <form onSubmit={handleSubmit}>
          <select
            id="entry"
            className="entryDropdown"
            value={selectedEntry || ""}
            onChange={(e) => handleEntrySelect(e.target.value)}
            disabled={isLoading}
            required
          >
            <option value="" disabled className="dropdownOption">
              Selecciona una entrada
            </option>
            {entries.map((entry) => (
              <option
                key={entry.value}
                value={entry.value}
                className="dropdownOption"
              >
                {entry.description}
              </option>
            ))}
          </select>
          {!isLoading && (
        <button type="submit">Registrar Marca</button>
      )}

      {isLoading && (
        <div className="loading-indicator">Cargando...</div>
      )}
        </form>
      </div>
    </div>
  );
};

export default EntriesButtons;
