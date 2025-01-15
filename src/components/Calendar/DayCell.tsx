import React from "react";

interface Note {
  uuid: string;
  type: string;
  value: string;
  date: string;
  time: string;
  createdAt: string;
  username: string;
}

interface Entry {
  entry_id: string;
  user_uuid: string;
  entry_type: string;
  date: string;
  time: string;
  clock_id: string;
}

interface DayCellProps {
  date: Date | null;
  notes?: Note;
  entries?: Entry[];
  onClick: (date: Date) => void;
}

const DayCell: React.FC<DayCellProps> = ({ date, notes, entries, onClick }) => {
  if (!date) return <div className="day-cell empty"></div>;

  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <button
      className={`day-cell ${isToday ? "today" : ""}`}
      onClick={() => onClick(date)}
      aria-label={`Day ${date.getDate()}`}
    >
      <div className="day-number">{date.getDate()}</div>
      {notes && <div className="note-preview">{notes.value}</div>}
      {entries?.map((entry) => (
        <div key={entry.entry_id} className="entry-preview">
          {entry.entry_type} at {entry.time}
        </div>
      ))}
    </button>
  );
};

export default DayCell;
