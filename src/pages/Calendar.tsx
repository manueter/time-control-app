import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/calendar/Header";
import ListView from "../components/calendar/ListView";
import CalendarView from "../components/calendar/CalendarView";
import NoteModal from "../components/calendar/NoteModal";
import {
  dateToString_DDMMYYYY,
  getDaysInMonth,
} from "../utils/dateUtils";
import "../styles/calendar/calendar.css";
import { useAuth } from "../contexts/AuthContext";
import { useCalendarEntries } from "../hooks/useCalendarEntries";
import { useDateSelection } from "../hooks/useDateSelection";
import { useAlerts } from "../contexts/AlertContext";

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

  const { showAlert } = useAlerts();
  const [isListView, setIsListView] = useState(false);
  const [visibleDates, setVisibleDates] = useState<(Date | null)[]>();
  const [visibleStartDate, setVisibleStartDate] = useState<string | null>(null);
  const [visibleEndDate, setVisibleEndDate] = useState<string | null>(null);

  const selectedEntries = useMemo(() => {
    if (entries.length > 0) {
      return entries.filter((entry) =>
        selectedDates.some((d) => entry.date === dateToString_DDMMYYYY(d) )
      );
    }
    return [];
  }, [entries, selectedDates]);

  useEffect(() => {
    const days = getDaysInMonth(currentDate);
    if (days) setVisibleDates(days);

    const firstValidDate = days.find((day) => day !== null) ?? null;
    const lastValidDate =
      [...days].reverse().find((day) => day !== null) ?? null;

    const startDate = firstValidDate
      ? dateToString_DDMMYYYY(firstValidDate)
      : null;
    const endDate = lastValidDate ? dateToString_DDMMYYYY(lastValidDate) : null;

    if (startDate !== visibleStartDate || endDate !== visibleEndDate) {
      setVisibleStartDate(startDate);
      setVisibleEndDate(endDate);
    }

    if (user && startDate && endDate) {
      fetchEntries(startDate, endDate);
    }
  }, [currentDate, visibleStartDate, visibleEndDate]);

  const navigateMonth = (direction: number) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1)
    );
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    showAlert("No se puede guardar notas actualmente.","error");
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
      <div className="calendar-header">
        <Header
          isListView={isListView}
          toggleListView={() => setIsListView(!isListView)}
          currentDate={currentDate}
          navigateMonth={navigateMonth}
        />
      </div>
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
          entries={selectedEntries}
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
