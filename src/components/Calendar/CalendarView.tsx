import React from "react";
import { daysOfWeekTitles } from "../../utils/dateUtils";
import DayCell from "./DayCell";
import { Entry } from "../../types/interfaces";
import { groupEntriesByDate } from "../../utils/entryUtils";
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

  const groupedEntries = groupEntriesByDate(entries);
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
          entries={date ? groupedEntries[date.toISOString().split("T")[0]] || [] : []}
          handleClick={handleDateClick}
          isListView={false}
        />
      ))}
    </div>
  );
  
}
export default CalendarView;
