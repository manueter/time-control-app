
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface Note {
  uuid: string;
  type: string;
  value: string;
  date: string;
  time: string;
  createdAt: string;
  username: string;
}

interface NoteProps {
  selectedDates: Date[];
  currentNote: Note | null;
  isModalOpen: boolean;
  closeModal: () => void;
  handleNoteSubmit: (e: React.FormEvent) => Promise<void>;
}

const Note: React.FC<NoteProps> = ({
  selectedDates,
  currentNote,
  isModalOpen,
  closeModal,
  handleNoteSubmit,
}) => {
  const [noteValue, setNoteValue] = useState(currentNote?.value ?? "");

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteValue(e.target.value);
  };

  if (!isModalOpen && selectedDates) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>
            Notes for:{" "}
            {selectedDates
              .map((date) =>
                date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              )
              .join(", ")}
          </h3>
          <button onClick={closeModal} className="close-modal-button">
            <FaTimes />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNoteSubmit(e);
          }}
        >
          <textarea
            value={noteValue}
            onChange={handleInputChange}
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
};

export default Note;
