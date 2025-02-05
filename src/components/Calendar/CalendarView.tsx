import React from "react";
import { Entry } from "../../types/interfaces";
import { filterEntriesByDate } from "../../utils/entryUtils";
import { daysOfWeekTitles } from "../../utils/dateUtils";
import DayCell from "./DayCell";
import "../../styles/calendar/grid.css";

interface CalendarViewProps {
  days: (Date | null)[] | undefined;
  entries:Entry[];
  handleDateClick: (event: React.MouseEvent<HTMLButtonElement>, date: Date) => void;
  selectedDates: Date[];
}

const CalendarView: React.FC<CalendarViewProps> = ({
  days,
  entries,
  handleDateClick,
  selectedDates
}) => {

  return(
  
    <div className="calendar-grid">
      {daysOfWeekTitles.map((day) => (
        <div key={day} className="day-header">
          {day.substring(0,3)}
        </div>
      ))}
      {days?.map((date, index) => (
        <DayCell
          key={index}
          date={date}
          selectedDates={selectedDates}
          entries={date ? filterEntriesByDate(entries, date) : []}
          handleClick={handleDateClick}
          isListView={false}
        />
      ))}
    </div>
  );
  
}
export default CalendarView;
