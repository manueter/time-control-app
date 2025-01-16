import React from "react";
import DayCell from "./DayCell";

interface ListViewProps {
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

const ListView: React.FC<ListViewProps> = ({
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

export default ListView;
