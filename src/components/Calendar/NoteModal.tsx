import React from "react";
import { FaTimes } from "react-icons/fa";

interface NoteModalProps {
  selectedDate: Date;
  currentNote: string;
  setCurrentNote: (note: string) => void;
  closeModal: () => void;
  handleNoteSubmit: (e: React.FormEvent) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
  selectedDate,
  currentNote,
  setCurrentNote,
  closeModal,
  handleNoteSubmit,
}) => (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <h3>Note for {selectedDate.toLocaleDateString()}</h3>
        <button onClick={closeModal} className="close-modal-button">
          <FaTimes />
        </button>
      </div>
      <form onSubmit={handleNoteSubmit}>
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          className="note-textarea"
          rows={4}
          placeholder="Enter your note here..."
        />
        <button type="submit" className="save-note-button">
          Save Note
        </button>
      </form>
    </div>
  </div>
);

export default NoteModal;
