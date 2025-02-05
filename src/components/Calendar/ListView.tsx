import React from "react";
import DayCell from "./DayCell";
import { Entry } from "../../types/interfaces";
import { filterEntriesByDate } from "../../utils/entryUtils";

interface ListViewProps {
  days: (Date | null)[];
  notes?: Record<string, { value: string }>;
  entries:Entry[];
  handleDateClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    date: Date
  ) => void;
  selectedDates: Date[];
}

const ListView: React.FC<ListViewProps> = ({
  days,
  notes,
  entries,
  handleDateClick,
  selectedDates,
}) => {
  return (
  <div className="calendar-list">
    {days.map((date, index) => (
      <DayCell
        key={index}
        date={date}
        selectedDates={selectedDates}
        notes={notes}
        entries={date ? filterEntriesByDate(entries, date) : []}
        handleClick={handleDateClick}
        isListView={true}
      />
    ))}
  </div>
)};

export default ListView;
