import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaList,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../styles/calendar-styles.css";
import { monthNames, daysInWeek } from "../utils/dateUtils";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
 
interface Note {
  uuid: string;
  type: string;
  value: string;
  date: string;
  time: string;
  createdAt: string;
  username: string;
}

interface NotesObject {
  [key: string]: Note;
}

const Calendar: React.FC = () => {
  const [viewType, setViewType] = useState("month");
  const [isListView, setIsListView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shiftPressed, setShiftPressed] = useState(false);
  const [ctrlPressed, setCtrlPressed] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());

  const [notes, setNotes] = useState<NotesObject>({});

  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const fetchNotes = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/user_notes.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const notesObject: NotesObject = data.reduce(
        (acc: NotesObject, note: Note) => {
          acc[note.date] = note;
          return acc;
        },
        {}
      );

      setNotes(notesObject);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };
  // FETCH DATA
  useEffect(() => {
    fetchNotes();
  }, []);

  //for KEY PRESSED
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") setShiftPressed(true);
      if (e.key === "Control") setCtrlPressed(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") setShiftPressed(false);
      if (e.key === "Control") setCtrlPressed(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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

  const getWeeksInMonth = (date: Date) => {
    const days = getDaysInMonth(date);
    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = [];

    days.forEach((day, index) => {
      if (index % 7 === 0 && currentWeek.length) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    });

    if (currentWeek.length) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const getMonthsInYear = (date: Date) => {
    const year = date.getFullYear();
    return Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDateClick = (date: Date | null) => {
    if (!date) return;

    if (shiftPressed && selectedDates.length > 0) {
      const lastSelected = new Date(selectedDates[selectedDates.length - 1]);
      const start = lastSelected < date ? lastSelected : date;
      const end = lastSelected < date ? date : lastSelected;
      const newDates: Date[] = [];

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        newDates.push(new Date(d));
      }

      setSelectedDates([...new Set([...selectedDates, ...newDates])]);
    } else if (ctrlPressed) {
      const dateStr = date.toISOString();
      if (selectedDates.some((d) => d.toISOString() === dateStr)) {
        setSelectedDates(
          selectedDates.filter((d) => d.toISOString() !== dateStr)
        );
      } else {
        setSelectedDates([...selectedDates, date]);
      }
    } else {
      const dateStr = date.toISOString();
      if (selectedDates.some((d) => d.toISOString() === dateStr)) {
        setSelectedDates(
          selectedDates.filter((d) => d.toISOString() !== dateStr)
        );
      } else {
        setSelectedDates([date]);
      }
    }
  };

  const handleNoteSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (currentNote && selectedDate && selectedTime) {
      const noteDate = selectedDate.toISOString();
      const noteTime = selectedTime.toISOString();
      // Create a new note with the correct structure
      const newNote: Note = {
        uuid: crypto.randomUUID(),
        type: "text",
        value: currentNote.value.trim(),
        date: noteDate,
        time: noteTime, // Get the current time
        createdAt: new Date().toISOString(), // Timestamp when the note was created
        username: "current_user", // Adjust to get the actual username
      };

      try {
        const response = await fetch(`${API_BASE_URL}/user_notes.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Update the local notes state with the new note
        setNotes({
          ...notes,
          [noteDate]: currentNote,
        });

        // Reset form fields
        setCurrentNote(currentNote);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to save note:", error);
      }
    }
  };

  const updateCurrentNote = (newValue: string) => {
    setCurrentNote((prevNote) => {
      // If prevNote is undefined, set currentNote as undefined
      if (prevNote) {
        // Update only the value field while keeping the other properties intact
        return {
          uuid: prevNote.uuid,
          type: prevNote.type,
          date: prevNote.date,
          time: prevNote.time,
          createdAt: prevNote.createdAt,
          username: prevNote.username,
          value: newValue,
        };
      }
      return null;
    });
  };

   const openNoteModal = (date: Date) => {
    setSelectedDate(date);
    setCurrentNote(notes[date.toISOString()] || {});
    setIsModalOpen(true);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="view-options">
          <button
            onClick={() => setIsListView(!isListView)}
            className="view-toggle-button"
          >
            {isListView ? <FaCalendarAlt /> : <FaList />}
          </button>
          <select
            value={viewType}
            onChange={(e) =>
              setViewType(e.target.value as "month" | "week" | "year")
            }
            className="view-select"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="year">Year</option>
          </select>
        </div>
        <div className="navigation">
          <button
            onClick={() => navigateMonth(-1)}
            className="navigation-button"
          >
            <FaChevronLeft />
          </button>
          <h2 className="current-month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="navigation-button"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {!isListView && viewType === "month" && (
        <div className="calendar-grid">
          {daysInWeek.map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
          {getDaysInMonth(currentDate).map((date, index) => (
            <div
              key={index}
              className={`day-cell ${
                date
                  ? selectedDates.some(
                      (d) => d.toISOString() === date.toISOString()
                    )
                    ? "selected"
                    : ""
                  : "empty"
              }`}
              onClick={() => date && handleDateClick(date)}
              onDoubleClick={() => date && openNoteModal(date)}
            >
              {date && (
                <>
                  <div className="day-number">{date.getDate()}</div>
                  {notes[date.toISOString()] && (
                    <div className="note-preview">
                      {notes[date.toISOString()].value}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedDate && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Note for {selectedDate.toLocaleDateString()}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="close-modal-button"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleNoteSubmit}>
              <textarea
                value={currentNote?.value}
                onChange={(e) => updateCurrentNote(e.target.value)}
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
      )}
    </div>
  );
};

export default Calendar;
