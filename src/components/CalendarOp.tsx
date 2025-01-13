import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaList,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../styles/calendar-styles.css";
import { monthNames, daysInWeek } from "../utils/dateUtils";
import Note from "./Note"; // Import the Note component

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface NotesObject {
  [key: string]: Note;
}

const Calendar: React.FC = () => {
  const [viewType, setViewType] = useState("month");
  const [isListView, setIsListView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [shiftPressed, setShiftPressed] = useState(false);

  const [notes, setNotes] = useState<{ [key: string]: any }>({});
  const [currentNote, setCurrentNote] = useState<any | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") setShiftPressed(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") setShiftPressed(false);
     };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user_notes.json`);
      const data = await response.json();
      const notesObject: NotesObject = data.reduce(
        (acc: NotesObject, note: Note) => {
          acc[note.date] = note;
          return acc;
        },
        {}
      );
      setNotes(notesObject);
      console.log(notesObject)
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Un-comment this to prevent the default form submission behavior
  
    if (currentNote && selectedDates.length > 0) {
      try {
        // Create a note for each selected date
        const newNotes = selectedDates.map((date) => {
          const noteDate = date.toISOString();
          const newNote = {
            ...currentNote,
            date: noteDate,
            createdAt: new Date().toISOString(),
          };
  
          return newNote;
        });
  
        // Send the notes to the server
        const responses = await Promise.all(
          newNotes.map((note) =>
            fetch(`${API_BASE_URL}/user_notes.json`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(note),
            })
          )
        );
  
        // Update the local state with the newly created notes
        const notesObject: NotesObject = {};
        responses.forEach((response, index) => {
          if (response.ok) {
            const note = newNotes[index];
            notesObject[note.date] = note; // Add the note by its date as the key
          }
        });
  
        // Update the notes state and close the modal
        setNotes((prevNotes) => ({ ...prevNotes, ...notesObject }));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to save notes:", error);
      }
    }
  };
  const openNoteModal = (date: Date) => {
    //setSelectedDate(date);
    setCurrentNote(
      notes[date.toISOString()] || {
        uuid: "",
        type: "text",
        value: "",
        date: "",
        time: "",
        createdAt: "",
        username: "current_user",
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleDateClick = (date: Date | null, event: React.MouseEvent) => {
    if (!date) return;

    const dateStr = date.toISOString();

    // Handle single click (left-click)
    if (event.detail === 1) {
      setSelectedDates((prevSelectedDates) => {
        const isAlreadySelected = prevSelectedDates.some(
          (d) => d.toISOString() === dateStr
        );

        if (isAlreadySelected) {
          // Deselect the date if it's already selected
          return prevSelectedDates.filter((d) => d.toISOString() !== dateStr);
        } else {
          // Select the date if it's not already selected
          return [date]; // Reset the selection to only one date
        }
      });

      // Handle Shift key press for range selection
      if (shiftPressed && selectedDates.length > 0) {
        const lastSelected = selectedDates[selectedDates.length - 1];
        const start = lastSelected < date ? lastSelected : date;
        const end = lastSelected < date ? date : lastSelected;
        const newSelectedDates: Date[] = [];

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          if (!selectedDates.some((d) => d.toISOString() === dateStr)) {
            newSelectedDates.push(new Date(d));
          }
        }

        setSelectedDates((prevSelectedDates) => {
          // Avoid duplicates and update with the new range of selected dates
          return [...new Set([...prevSelectedDates, ...newSelectedDates])];
        });
      }
    }

    // Handle double click (right-click or double left-click)
    else if (event.detail === 2) {
      setSelectedDates((prevSelectedDates) => {
        const isAlreadySelected = prevSelectedDates.some(
          (d) => d.toISOString() === dateStr
        );
        if (isAlreadySelected) {
          return prevSelectedDates;
        } else {
          // Select the date if it's not already selected
          return [...new Set([...prevSelectedDates, date])];
        }
      });

      openNoteModal(date);
    }
    console.log(selectedDates); // Optional: log to inspect the current selected dates
  };

  const handleDeselectAll = () => {
    setSelectedDates([]);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const renderDayCell = (date: Date | null, index: number) => {
    const a = selectedDates.some(
      (d) => d.toISOString() === date?.toISOString()
    );

    function dayCell() {
      if (date) {
        if (selectedDates.some((d) => d.toISOString() === date?.toISOString()))
          return "selected";
        else {
          return "";
        }
      } else {
        return "empty";
      }
    }
    const dayCellClass = dayCell();

    return (
      <button
        key={index}
        className={`day-cell ${dayCellClass}`}
        onClick={(event) => handleDateClick(date, event)}
        onContextMenu={(event) => {
          event.preventDefault();
          handleDateClick(date, event);
        }}
      >
        {date && (
          <div className="day-cell-content">
            <div className="day-number">{date.getDate()}</div>
            {notes[date.toISOString()] && (
              <div className="note-preview">
                {notes[date.toISOString()].value}
              </div>
            )}
          </div>
        )}
      </button>
    );
  };

  const renderDays = () => {
    return (
      <div className="calendar-grid">
        {daysInWeek.map((day) => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}
        {getDaysInMonth(currentDate).map((date, index) =>
          renderDayCell(date, index)
        )}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      {/* Calendar Header */}
      <div className="calendar-header">
        {/* View Toggle */}
        <div className="m-2">
          <button
            onClick={() => setIsListView(!isListView)}
            className="view-toggle-button"
          >
            {isListView ? <FaCalendarAlt /> : <FaList />}
          </button>
          {selectedDates.length > 0 && (
            <button onClick={handleDeselectAll} className="deselect-all-button">
              Deselect All
            </button>
          )}
        </div>
        {/* Month Navigation */}
        <div className="navigation">
          <button
            className="navigation-button"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() - 1))
              )
            }
          >
            <FaChevronLeft />
          </button>
          <h2>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            className="navigation-button"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() + 1))
              )
            }
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      {/* Calendar Grid */}

      {!isListView && viewType === "month" && renderDays()}

      {/* Note Modal */}
      <Note
        selectedDates={selectedDates}
        currentNote={currentNote}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleNoteSubmit={handleNoteSubmit}
      />
    </div>
  );
};

export default Calendar;
