import React from "react";
import { daysInWeek } from "../../utils/dateUtils";
import DayCell from "./DayCell";

interface WeekViewProps {
  currentDate: Date;
  days: (Date | null)[];
  entries: Record<
    string,
    { entry_id: string; entry_type: string; time: string }[]
  >;
  notes: Record<string, { value: string }>;
  handleDateClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    date: Date
  ) => void;
  selectedDates: Date[];
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  days,
  entries,
  notes,
  handleDateClick,
  selectedDates,
}) => (
  <div className="calendar-list">
    {days.map((date, index) => (
      <DayCell
        key={index}
        date={date}
        selectedDates={selectedDates}
        notes={notes}
        entries={entries}
        handleClick={handleDateClick}
        isListView={true}
      />
    ))}
  </div>
);

export default WeekView;
