import React from "react";
import { Entry } from "../../types/interfaces";
import { filterEntriesByDate } from "../../utils/entryUtils";
import "../../styles/calendar/list.css";
import DayCell from "./DayCell";

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
  <section className="calendar-list">
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
  </section>
)};

export default ListView;
