import "../../styles/clock-styles.css";
import { useState, useEffect } from "react";
import ToggleButton from "../ToggleButton";

interface ClockDisplayProps {
  showFormatToggle: boolean;
}

const ClockDisplay: React.FC<ClockDisplayProps> = ({ showFormatToggle }) => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    let hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    let period = "";

    if (!is24Hour) {
      period = hours >= 12 ? " PM" : " AM";
      hours = hours % 12 || 12;
    }

    return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}${period}`;
  };
  const handleToggle = (is24Hour: boolean) => {
    setIs24Hour(!is24Hour);
    formatTime();
  };

  return (
    <div className="clock-display">
      {showFormatToggle ? (
        <ToggleButton
          label_a="24 Hs"
          label_b="AM/PM"
          onToggle={handleToggle}
        />
      ) : (
        <></>
      )}
      <h1 className="heading">{formatTime()}</h1>
    </div>
  );
};

export default ClockDisplay;