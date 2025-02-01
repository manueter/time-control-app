import React from "react";
import {
  FaCalendarAlt,
  FaList,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../../styles/calendar/navigation.css";
import { monthNames } from "../../utils/dateUtils";
 
interface HeaderProps {
  isListView: boolean;
  toggleListView: () => void;
  currentDate: Date;
  navigateMonth: (direction: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  isListView,
  toggleListView,
  currentDate,
  navigateMonth,
}) => (
  <>
    <div className="view-options">
      <button onClick={toggleListView} className="view-toggle-button">
        {isListView ? <FaCalendarAlt /> : <FaList />}
      </button>
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
  </>
);

export default Header;
