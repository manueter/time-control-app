import React from "react";
import {
  daysOfWeekTitles,
  isSameDate,
  monthNames,
} from "../../utils/dateUtils";
import { Entry } from "../../types/interfaces";
import "../../styles/calendar/grid.css";
import "../../styles/calendar/entries.css";

interface DayCellProps {
  date: Date | null;
  selectedDates: Date[];
  notes?: Record<string, { value: string }>;
  entries: Entry[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, date: Date) => void;
  isListView: boolean;
}

const DayCell: React.FC<DayCellProps> = ({
  date,
  selectedDates,
  //notes,
  entries,
  handleClick,
  isListView,
}) => {
  if (!date) return <div className="empty-cell" />;

  const isSelected = selectedDates.some(
    (d) => d.toISOString() === date.toISOString()
  );
  const cellClassName = (): string => {
    const isCurrentDate = isSameDate(date, new Date());
    let classNameTo = "day-cell ";
    if (isCurrentDate) {
      classNameTo += "current-day ";
    }

    if (!date) {
      if (isListView) {
        return "";
      } else {
        classNameTo += "empty ";
      }
    } else {
      if (isListView) {
        classNameTo += "list-cell ";
      }
      else{classNameTo+="calendar-cell "}
      classNameTo += isSelected ? "selected " : "";
    }
    return classNameTo;
  };

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

  return isListView && !date ? (
    <></>
  ) : (

      <button
        className={cellClassName()}
        onClick={(event) => date && handleClick(event, date)}
      >
        {date && (
          <>
            <div className="day-number">{dateTitle()}</div>
            <div className="entry-preview">
              {entries.slice(0, 2).map((entry) => (
                <div key={`${entry.entry_id}-${entry.time}`} className="entry">
                  {entry.entry_type} * {entry.time.substring(0, 8)}
                </div>
              ))}
              {entries.length > 2 && <div className="more-entries">...</div>}
            </div>
          </>
        )}
      </button>
  );
};

export default DayCell;
