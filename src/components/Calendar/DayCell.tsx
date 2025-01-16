import React from "react";

interface DayCellProps {
  date: Date | null;
  selectedDates: Date[];
  notes: Record<string, { value: string }>;
  entries: Record<string, { entry_id: string; entry_type: string; time: string }[]>;
  handleClick: (date: Date) => void;
  handleDoubleClick: (date: Date) => void;
}

const DayCell: React.FC<DayCellProps> = ({
  date,
  selectedDates,
  notes,
  entries,
  handleClick,
  handleDoubleClick,
}) => {
  const isSelected = date
    ? selectedDates.some((d) => d.toISOString() === date.toISOString())
    : false;

  const renderEntries = (entriesForDate: { entry_id: string; entry_type: string; time: string }[]) =>
    entriesForDate.map((entry) => (
      <div key={entry.entry_id} className="entry-preview">
        {entry.entry_type} at {entry.time}
      </div>
    ));

  return (
    <div
      className={`day-cell ${date ? (isSelected ? "selected" : "") : "empty"}`}
      onClick={() => date && handleClick(date)}
      onDoubleClick={() => date && handleDoubleClick(date)}
    >
      {date && (
        <>
          <div className="day-number">{date.getDate()}</div>
          {notes[date.toISOString()] && (
            <div className="note-preview">{notes[date.toISOString()].value}</div>
          )}
          {entries[date.toISOString()] && renderEntries(entries[date.toISOString()])}
        </>
      )}
    </div>
  );
};

export default DayCell;
