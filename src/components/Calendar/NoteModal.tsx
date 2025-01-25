import React from "react";
import { FaTimes } from "react-icons/fa";
import { selectedDatesToString } from "../../utils/dateUtils";
import { Entry } from "../../types/interfaces";

interface NoteModalProps {
  selectedDates: Date[];
  entries: Entry[];
  currentNote: string;
  setCurrentNote: (note: string) => void;
  closeModal: () => void;
  handleNoteSubmit: (e: React.FormEvent) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
  selectedDates,
  entries,
  currentNote,
  setCurrentNote,
  closeModal,
  handleNoteSubmit,
}) => (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <h3>Nota para: {selectedDatesToString(selectedDates)}</h3>
        <button onClick={closeModal} className="close-modal-button">
          <FaTimes />
        </button>
      </div>
      {entries.length > 0 && (
        <div className="entries-list">
          <h4>Entradas:</h4>
          <ul>
            {entries.map((entry) => (
              <li key={`${entry.entry_id}-${entry.time}`}>
                <strong>{entry.entry_type}:</strong> {entry.time.substring(0, 8)}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleNoteSubmit}>
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          className="note-textarea"
          rows={4}
          placeholder="Ingrese una nota aqui..."
        />
        {/** TODO agregar logica para guardar NOTAS */}
        <button type="submit" className="save-note-button" disabled>
          Guardar
        </button>
      </form>
    </div>
  </div>
);

export default NoteModal;
