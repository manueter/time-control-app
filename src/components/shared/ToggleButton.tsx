import React, { useState } from "react";
import "../../styles/shared/togglebutton-styles.css"

interface ToggleButtonProps {
  label_a: string;
  label_b: string;
  onToggle?: (isToggled: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  label_a,
  label_b,
  onToggle,
}) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    const newIsToggled = !isToggled;
    setIsToggled(newIsToggled);
    if (onToggle) onToggle(newIsToggled);
  };

  return (
    <button
      onClick={handleToggle}
      className={`toggle-button ${isToggled ? "toggled" : "nottoggled"}`}
      aria-label={`${isToggled ? label_a : label_b}`}
    >
      <span className="toggle-content">
        {isToggled ? (

            <span>{label_a}</span>

        ) : (

            <span>{label_b}</span>

        )}
      </span>
    </button>
  );
};

export default ToggleButton;
