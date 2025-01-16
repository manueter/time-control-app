import React from "react";
import {
  FaCalendarAlt,
  FaList,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { monthNames, ViewTypeEnum, ViewType } from "../../utils/dateUtils";

interface HeaderProps {
  // viewType: ViewType;
  // setViewType: React.Dispatch<React.SetStateAction<ViewType>>;
  isListView: boolean;
  toggleListView: () => void;
  currentDate: Date;
  navigateMonth: (direction: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  // viewType,
  // setViewType,
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
      

      {/* TODO a select to manage between Month, Year and Week view*/}
      {/* <select
        value={viewType}
        onChange={(e) => setViewType(e.target.value as ViewType)}
        className="view-select"
      >
        {Object.values(ViewTypeEnum).map((value) => (
          <option key={value} value={value}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </option>
        ))}
      </select> */}
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
