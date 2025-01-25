import React from "react";
import { daysOfWeekTitles } from "../../utils/dateUtils";
import DayCell from "./DayCell";
import { Entry } from "../../types/interfaces";
import { groupEntriesByDate } from "../../utils/entryUtils";

interface CalendarViewProps {
  currentDate: Date;
  days: (Date | null)[];
  notes: Record<string, { value: string }>;
  entries:Entry[];
  handleDateClick: (event: React.MouseEvent<HTMLButtonElement>, date: Date) => void;
  selectedDates: Date[];
}

const CalendarView: React.FC<CalendarViewProps> = ({
  days,
  notes,
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
      {days.map((date, index) => (
        <DayCell
          key={index}
          date={date}
          selectedDates={selectedDates}
          notes={notes}
          entries={date ? groupedEntries[date.toISOString().split("T")[0]] || [] : []}
          handleClick={handleDateClick}
          isListView={false}
        />
      ))}
    </div>
  );
  
}
export default CalendarView;
