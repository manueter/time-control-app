import React from "react";
import { daysOfWeekTitles } from "../../utils/dateUtils";
import DayCell from "./DayCell";

interface CalendarViewProps {
  currentDate: Date;
  days: (Date | null)[];
  notes: Record<string, { value: string }>;
  handleDateClick: (event: React.MouseEvent<HTMLButtonElement>, date: Date) => void;
  selectedDates: Date[];
}

const CalendarView: React.FC<CalendarViewProps> = ({
  days,
  notes,
  handleDateClick,
  selectedDates
}) => (
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
        handleClick={handleDateClick}
        isListView={false}
      />
    ))}
  </div>
);

export default CalendarView;
