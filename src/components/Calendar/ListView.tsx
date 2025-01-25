import React from "react";
import DayCell from "./DayCell";
import { Entry } from "../../types/interfaces";
import { groupEntriesByDate } from "../../utils/entryUtils";

interface ListViewProps {
  currentDate: Date;
  days: (Date | null)[];
  notes: Record<string, { value: string }>;
  entries:Entry[];
  handleDateClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    date: Date
  ) => void;
  selectedDates: Date[];
}

const ListView: React.FC<ListViewProps> = ({
  currentDate,
  days,
  notes,
  entries,
  handleDateClick,
  selectedDates,
}) => {
  
    const groupedEntries = groupEntriesByDate(entries);
  return (
  <div className="calendar-list">
    {days.map((date, index) => (
      <DayCell
        key={index}
        date={date}
        selectedDates={selectedDates}
        notes={notes}
        entries={date ? groupedEntries[date.toISOString().split("T")[0]] || [] : []}
        handleClick={handleDateClick}
        isListView={true}
      />
    ))}
  </div>
)};

export default ListView;
