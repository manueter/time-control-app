import React from "react";
import { daysInWeek } from "../../utils/dateUtils";
import DayCell from "./DayCell";

interface MonthViewProps {
  currentDate: Date;
  days: (Date | null)[];
  entries: Record<string, { entry_id: string; entry_type: string; time: string }[]>;
  notes: Record<string, { value: string }>;
  handleDateClick: (event: React.MouseEvent<HTMLButtonElement>, date: Date) => void;
  selectedDates: Date[];
}

const MonthView: React.FC<MonthViewProps> = ({
  days,
  entries,
  notes,
  handleDateClick,
  selectedDates
}) => (
  <div className="calendar-grid">
    {daysInWeek.map((day) => (
      <div key={day} className="day-header">
        {day}
      </div>
    ))}
    {days.map((date, index) => (
      <DayCell
        key={index}
        date={date}
        selectedDates={selectedDates}
        notes={notes}
        entries={entries}
        handleClick={handleDateClick}
        isListView={false}
      />
    ))}
  </div>
);

export default MonthView;
