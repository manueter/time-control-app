import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";


interface DropdownMenuProps {
  options: {
    id: number;
    label: string;
    value: string;
  }[];
  onOptionSelect: (value: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="dropdown-menu-container">
      <div className="dropdown-wrapper" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={`dropdown-button ${isOpen ? "dropdown-button-active" : ""}`}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span>Select Option</span>
          <FiChevronDown
            className={`dropdown-icon ${isOpen ? "rotate" : ""}`}
          />
        </button>

        {isOpen && (
          <div
            className="dropdown-menu"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="dropdown-menu-items">
              {options.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onOptionSelect(item.value);
                    setIsOpen(false);
                  }}
                  className="dropdown-menu-item"
                  role="menuitem"
                  tabIndex={0}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
