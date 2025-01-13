import { useState } from "react";
import { FaCalendarAlt, FaListUl, FaTimes } from "react-icons/fa";
import "../styles/calendar-opt-styles.css";
const CalendarOpt = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDateForNote, setSelectedDateForNote] = useState<Date | null>(
    null
  );
  const [noteInput, setNoteInput] = useState<string>("");

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    setSelectedDateForNote(date);
    setNoteInput(notes[dateStr] || "");
    setShowModal(true);
  };

  const handleSaveNote = () => {
    if (!selectedDateForNote) return;

    const dateStr = selectedDateForNote.toISOString().split("T")[0];
    setNotes((prev) => ({
      ...prev,
      [dateStr]: noteInput,
    }));
    setSelectedDates((prev) =>
      prev.includes(dateStr) ? prev : [...prev, dateStr]
    );
    setShowModal(false);
    setNoteInput("");
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dateStr = date.toISOString().split("T")[0];
      const isSelected = selectedDates.includes(dateStr);
      const isToday = new Date().toISOString().split("T")[0] === dateStr;

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(date)}
          className={`calendar-day ${isSelected ? "selected" : ""} ${
            isToday ? "today" : ""
          }`}
        >
          <span className="block text-center">{day}</span>
          {notes[dateStr] && <div className="calendar-day-dot"></div>}
        </div>
      );
    }
    return days;
  };

  const renderListView = () => {
    return selectedDates.sort().map((dateStr) => {
      const date = new Date(dateStr);
      return (
        <div key={dateStr} className="list-view-item">
          <div className="list-view-item-date">
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="list-view-item-note">{notes[dateStr]}</div>
        </div>
      );
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="calendar-nav-buttons">
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() - 1))
              )
            }
            className="calendar-nav-button"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() + 1))
              )
            }
            className="calendar-nav-button"
          >
            Next
          </button>
        </div>
        <div className="calendar-view-buttons">
          <button
            onClick={() => setViewMode("calendar")}
            className={`calendar-view-button ${
              viewMode === "calendar" ? "selected" : ""
            }`}
          >
            <FaCalendarAlt />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`calendar-view-button ${
              viewMode === "list" ? "selected" : ""
            }`}
          >
            <FaListUl />
          </button>
        </div>
      </div>

      {viewMode === "calendar" ? (
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="day-label">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
      ) : (
        <div className="space-y-4">{renderListView()}</div>
      )}

      {showModal && selectedDateForNote && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-xl font-semibold">
                Add Note for{" "}
                {selectedDateForNote.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="close-button"
              >
                <FaTimes />
              </button>
            </div>
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="textarea"
              placeholder="Enter your note here..."
            ></textarea>
            <div className="button-group">
              <button
                onClick={() => setShowModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button onClick={handleSaveNote} className="save-button">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarOpt;
