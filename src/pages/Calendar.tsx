import React, { useState, useEffect } from "react";
import Header from "../components/Calendar/Header";
import ListView from "../components/Calendar/ListView";
import CalendarView from "../components/Calendar/CalendarView";
import NoteModal from "../components/Calendar/NoteModal";
import {
  getDaysInMonth,
} from "../utils/dateUtils";
import "../styles/calendar-styles.css";
import { useAuth } from "../contexts/AuthContext";
import { useCalendarEntries } from "../hooks/useCalendarEntries";
import { useDateSelection } from "../hooks/useDateSelection";

const Calendar: React.FC = () => {
  const { user } = useAuth();
  const { entries, fetchEntries } = useCalendarEntries();

  const {
    currentDate,
    setCurrentDate,
    selectedDates,
    shiftPressed,
    ctrlPressed,
    handleDateClick,
    deselectAll,

    isModalOpen,
    setIsModalOpen,
    currentNote,
    setCurrentNote,
  } = useDateSelection();

  const [isListView, setIsListView] = useState(false);
  const [visibleDates, setVisibleDates] = useState<(Date | null)[]>();
  const [visibleStartDate, setVisibleStartDate] = useState<string | null>(null);
  const [visibleEndDate, setVisibleEndDate] = useState<string | null>(null);

  useEffect(() => {
    let days: (Date | null)[] = getDaysInMonth(currentDate);
    if (days) setVisibleDates(days);
  
    const firstValidDate = days.find(day => day !== null);
    const lastValidDate = [...days].reverse().find(day => day !== null);
  
    const startDate = firstValidDate ? firstValidDate.toISOString().split("T")[0] : null;
    const endDate = lastValidDate ? lastValidDate.toISOString().split("T")[0] : null;
  
    if (startDate !== visibleStartDate || endDate !== visibleEndDate) {
      setVisibleStartDate(startDate);
      setVisibleEndDate(endDate);
    }
    if(user && visibleStartDate && visibleEndDate){
      fetchEntries(visibleStartDate, visibleEndDate);
    }
  }, [currentDate, visibleStartDate, visibleEndDate]);

  const navigateMonth = (direction: number) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1)
    );
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("No se puede guardar notas actualmente.");
    setIsModalOpen(false);
  };

  const handleDateClickWithModifier = (
    event: React.MouseEvent<HTMLButtonElement>,
    date: Date
  ) => {
    handleDateClick(event, date, shiftPressed, ctrlPressed);
  };

  return (
    <div className="calendar-container">
      <Header
        isListView={isListView}
        toggleListView={() => setIsListView(!isListView)}
        currentDate={currentDate}
        navigateMonth={navigateMonth}
      />
      {isListView ? (
        selectedDates.length > 0 && (
          <button className="deselect-all-button" onClick={deselectAll}>
            Borrar seleccion
          </button>
        )
      ) : (
        <></>
      )}
      {!isListView ? (
        <CalendarView
          days={visibleDates}
          entries={entries}
          handleDateClick={handleDateClickWithModifier}
          selectedDates={selectedDates}
        />
      ) : (
        <ListView
          days={getDaysInMonth(currentDate)}
          entries={entries}
          handleDateClick={handleDateClickWithModifier}
          selectedDates={selectedDates}
        />
      )}
      {isModalOpen && selectedDates && (
        <NoteModal
          selectedDates={selectedDates}
          entries={entries}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          closeModal={() => setIsModalOpen(false)}
          handleNoteSubmit={handleNoteSubmit}
        />
      )}

      <div className="calendar-footer">
        {!isListView && selectedDates.length > 0 && (
          <button className="deselect-all-button" onClick={deselectAll}>
            Borrar selección
          </button>
        )}
      </div>
    </div>
  );
};

export default Calendar;
