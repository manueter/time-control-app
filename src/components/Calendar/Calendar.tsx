import React, { useState, useEffect } from "react";
import Header from "./Header";
import ListView from "./ListView";
import CalendarView from "./CalendarView";
import NoteModal from "./NoteModal";
import { useFetchEntries } from "../../hooks/useFetchEntries";
import { useFetchNotes } from "../../hooks/useFetchNotes";
import { getDatesInRange, getDaysInMonth, getWeekDays, ViewType, ViewTypeEnum } from "../../utils/dateUtils";
import "../../styles/calendar-styles.css";


const Calendar: React.FC = () => {

  const [viewType, setViewType] = useState<ViewType>(ViewTypeEnum.Month);
  const [isListView, setIsListView] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentNote, setCurrentNote] = useState<string>("");

  const [shiftPressed, setShiftPressed] = useState(false);
  const [ctrlPressed, setCtrlPressed] = useState(false);

  const [notes, fetchNotes] = useFetchNotes();
  const {entries, fetchEntries} = useFetchEntries();

  useEffect(() => {
    fetchEntries();
    fetchNotes();
  }, [fetchEntries, fetchNotes]);

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

  const navigateMonth = (direction: number) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1)
    );
  };


  const toggleDate = (date: Date) => {
    const dateStr = date.toISOString();
    setSelectedDates((prev) =>
      prev.some((d) => d.toISOString() === dateStr)
        ? prev.filter((d) => d.toISOString() !== dateStr)
        : [...prev, date]
    );
  };
  const handleDateClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    date: Date
  ) => {
    if (event.detail === 1) {
      if (shiftPressed && selectedDates.length > 0) {
        const lastSelected = new Date(selectedDates[selectedDates.length - 1]);
        const start = lastSelected < date ? lastSelected : date;
        const end = lastSelected < date ? date : lastSelected;
        const newDates = getDatesInRange(start, end);
        setSelectedDates((prev) => [...new Set([...prev, ...newDates])]);
      } else if (ctrlPressed) {
        toggleDate(date);
      } else {
        toggleDate(date);
      }
    } else if (event.detail === 2) {
      
      setSelectedDates((prev) =>
        prev.some((d) => d.toISOString() === date.toISOString())
          ? prev
          : [...prev, date]
      );
      
      setIsModalOpen(true);
    }
  };
  const deselectAll = () => {
    setSelectedDates([]);
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDates) {

      //TODO agregar logica
      alert("No se puede guardar notas actualmente.")
      // Save note logic
    }
    setIsModalOpen(false);
  };

  return (
    <div className="calendar-container">
      <Header
        // viewType={viewType}
        // setViewType={setViewType}
        isListView={isListView}
        toggleListView={() => setIsListView(!isListView)}
        currentDate={currentDate}
        navigateMonth={navigateMonth}
      />
              {isListView ? (selectedDates.length > 0 && (
          <button className="deselect-all-button" onClick={deselectAll}>
            Borrar seleccion
          </button>
        )):(<></>)}
      {!isListView ? (
        <CalendarView
          currentDate={currentDate}
          days={viewType===ViewTypeEnum.Month ? (getDaysInMonth(currentDate)):(getWeekDays(currentDate))}
          notes={notes}
          handleDateClick={handleDateClick}
          selectedDates={selectedDates}
        />
      ):(<ListView 
        currentDate={currentDate}
        days={viewType===ViewTypeEnum.Month ? (getDaysInMonth(currentDate)):(getWeekDays(currentDate))}
        notes={notes}
        handleDateClick={handleDateClick}
        selectedDates={selectedDates}
        />)}
      {isModalOpen && selectedDates && (
        <NoteModal
          selectedDates={selectedDates}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          closeModal={() => setIsModalOpen(false)}
          handleNoteSubmit={handleNoteSubmit}
        />
      )}

      <div className="calendar-footer">
        {!isListView ? (selectedDates.length > 0 && (
          <button className="deselect-all-button" onClick={deselectAll}>
            Borrar seleccion
          </button>
        )):(<></>)}
      </div>
    </div>
  );
};

export default Calendar;
