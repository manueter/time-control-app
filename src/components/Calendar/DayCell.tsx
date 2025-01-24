import React from "react";
import {daysOfWeekTitles, isSameDate, monthNames} from  "../../utils/dateUtils";

interface DayCellProps {
  date: Date | null;
  selectedDates: Date[];
  notes: Record<string, { value: string }>;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, date: Date) => void;
  isListView: boolean;
}

const DayCell: React.FC<DayCellProps> = ({
  date,
  selectedDates,
  notes,
  handleClick,
  isListView
}) => {
  const isSelected = date
    ? selectedDates.some((d) => d.toISOString() === date.toISOString())
    : false;


  // const renderEntries = (entriesForDate: { entry_id: string; entry_type: string; time: string }[]) =>
  //   entriesForDate.map((entry) => (
  //     <div key={entry.entry_id} className="entry-preview">
  //       {entry.entry_type} at {entry.time}
  //     </div>
  //   ));

  const cellClassName = (): string => {

    const isCurrentDate = isSameDate(date, new Date());
    let classNameTo = 'day-cell ';
    if(isCurrentDate){
      classNameTo += 'current-day ';
    }

    if (!date) {
      if (isListView) {
        return ''
      }
      else {
        classNameTo += 'empty ';
      }
    }
    else {
      if (isListView) { classNameTo += 'list-cell '; }
      classNameTo += isSelected ? "selected " : "";
    }
    return classNameTo
  }

  const dateTitle = (): string => {
    if (!date) return ""; 
    if (isListView) {
      const dayName = daysOfWeekTitles[date.getDay()];
      const day = date.getDate(); 
      const month = monthNames[date.getMonth()]; 
      return `${dayName} ${day} de ${month}`;
    } else {
      return `${date.getDate()}`;
    }
  };

  return (
    (isListView && !date) ?
      (<></>)
      :
      (<div
        className={cellClassName()}
      >
        <button
          className="button-cell"
          onClick={(event) => date && handleClick(event, date)}>
          {date && (
            <>
              <div className="day-number">{dateTitle()}</div>
              {notes[date.toISOString()] && (
                <div className="note-preview">{notes[date.toISOString()].value}</div>
              )}
              {/* {entries[date.toISOString()] && renderEntries(entries[date.toISOString()])} */}
            </>
          )}
        </button>
      </div>)
  );
};

export default DayCell;
