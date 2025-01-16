import React from "react";

interface DayCellProps {
  date: Date | null;
  selectedDates: Date[];
  notes: Record<string, { value: string }>;
  entries: Record<string, { entry_id: string; entry_type: string; time: string }[]>;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, date: Date) => void;
  isListView:boolean;
}

const DayCell: React.FC<DayCellProps> = ({
  date,
  selectedDates,
  notes,
  entries,
  handleClick,
  isListView
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

    date && isListView? (<div
      className={`day-cell ${date ? (isSelected ? "selected" : ""):("empty")} ${isListView ? "list-cell" : ""}`}
      >
        <button 
        className="button-cell"
        onClick={(event) => date && handleClick(event, date)}>
        {date && (
          <>
            <div className="day-number">{date.getDate()}</div>
            {notes[date.toISOString()] && (
              <div className="note-preview">{notes[date.toISOString()].value}</div>
            )}
            {entries[date.toISOString()] && renderEntries(entries[date.toISOString()])}
          </>
        )}
        </button>
      </div>)
      :
    
    (date && !isListView ? (<div
      className={`day-cell ${date ? (isSelected ? "selected" : ""):("empty")} ${isListView ? "list-cell" : ""}`}
      >
        <button 
        className="button-cell"
        onClick={(event) => date && handleClick(event, date)}>
        {date && (
          <>
            <div className="day-number">{date.getDate()}</div>
            {notes[date.toISOString()] && (
              <div className="note-preview">{notes[date.toISOString()].value}</div>
            )}
            {entries[date.toISOString()] && renderEntries(entries[date.toISOString()])}
          </>
        )}
        </button>
      </div>):(<></>))
    
  );
};

export default DayCell;
