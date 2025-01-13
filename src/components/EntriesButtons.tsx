import "../styles/form-styles.css";
import "../styles/clock-styles.css";
import { useState, useEffect } from "react";

interface Entry {
  value: string;
  description: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EntriesButtons = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/clock_program.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEntries(data[0]?.entries || []);
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
    <div className="entryWrapper">
      <select
        className="entryDropdown"
        value={selectedEntry || ""}
        onChange={(e) => handleEntrySelect(e.target.value)}
      >
        <option value="" disabled className="dropdownOption">
          Selecciona una entrada
        </option>
        {entries.map((entry) => (
          <option key={entry.value} value={entry.value} className="dropdownOption">
            {entry.description}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EntriesButtons;
