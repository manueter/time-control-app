import React from "react";
import { FaCalendarAlt, FaList, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { monthNames } from "../../utils/dateUtils";

interface HeaderProps {
  viewType: "month" | "week" | "year";
  setViewType: React.Dispatch<React.SetStateAction<"month" | "week" | "year">>;
  isListView: boolean;
  toggleListView: () => void;
  currentDate: Date;
  navigateMonth: (direction: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  viewType,
  setViewType,
  isListView,
  toggleListView,
  currentDate,
  navigateMonth,
}) => (
  <div className="calendar-header">
    <div className="view-options">
      <button onClick={toggleListView} className="view-toggle-button">
        {isListView ? <FaCalendarAlt /> : <FaList />}
      </button>
      <select
        value={viewType}
        onChange={(e) => setViewType(e.target.value as "month" | "week" | "year")}
        className="view-select"
      >
        <option value="month">Month</option>
        <option value="week">Week</option>
        <option value="year">Year</option>
      </select>
    </div>
    <div className="navigation">
      <button onClick={() => navigateMonth(-1)} className="navigation-button">
        <FaChevronLeft />
      </button>
      <h2 className="current-month">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
      <button onClick={() => navigateMonth(1)} className="navigation-button">
        <FaChevronRight />
      </button>
    </div>
  </div>
);

export default Header;
