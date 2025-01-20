import "../../styles/form-styles.css";
import "../../styles/clock-styles.css";
import { useState, useEffect } from "react";
import { EntryType } from "../../types/interfaces";

interface EntriesButtonsProps {
  onSubmit: (entryValue: string) => void;
  isLoading:boolean;
  entries?:EntryType[];
}

const EntriesButtons:React.FC<EntriesButtonsProps> = ({ onSubmit, isLoading, entries }) => {

  // const [entries, setEntries] = useState<Entry[]>([]);
  // const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  
  const handleEntrySelect = (value: string) => {
    setSelectedEntry(value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedEntry) {
      onSubmit(selectedEntry); 
    } else {
      alert("Por favor selecciona un evento.");
    }
  };

  if (entries?.length === 0) {
    return <p>No hay entradas disponibles.</p>;
  }

  //TODO dont show option if entries is undefined or null
  return (
    <form onSubmit={handleSubmit}>
      <select
        className="entryDropdown"
        value={selectedEntry || ""}
        onChange={(e) => handleEntrySelect(e.target.value)}
        disabled={isLoading}
        required
      >
        <option value="" disabled>
          Elija un tipo de marca
        </option>
        {entries?.map((entry:EntryType) => (
          <option key={entry.value} value={entry.value}>
            {entry.description}
          </option>
        ))}
      </select>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Cargando..." : "Registrar marca"}
      </button>
    </form>
  );
  // return (
  //   <div>
  //     <div className="entryWrapper">
  //       <form onSubmit={handleSubmit}>
  //         <select
  //           id="entry"
  //           className="entryDropdown"
  //           value={selectedEntry || ""}
  //           onChange={(e) => handleEntrySelect(e.target.value)}
  //           disabled={isLoading}
  //           required
  //         >
  //           <option value="" disabled className="dropdownOption">
  //             Selecciona una entrada
  //           </option>
  //           {entries.map((entry) => (
  //             <option
  //               key={entry.value}
  //               value={entry.value}
  //               className="dropdownOption"
  //             >
  //               {entry.description}
  //             </option>
  //           ))}
  //         </select>
  //         {!isLoading && (
  //       <button type="submit">Registrar Marca</button>
  //     )}

  //     {isLoading && (
  //       <div className="loading-indicator">Cargando...</div>
  //     )}
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default EntriesButtons;
