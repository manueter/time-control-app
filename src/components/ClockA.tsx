import { useEffect, useState } from "react";
import "../styles/Clockwise-styles.css"; // Import the CSS file

const Clock = () => {
    const [time, setTime] = useState(new Date());
    const [is24Hour, setIs24Hour] = useState(true);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
  
    // Calculate the degrees for the clock hands based on time
    const hourDegrees = ((hours % 12) * 30) + (minutes / 2); 
    const minuteDegrees = (minutes * 6); 
    const secondDegrees = (seconds * 6); 
  
    const formattedTime = is24Hour
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      : `${String(hours % 12 || 12).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
  
    return (
      <div className="clock-container">
        <div className="clock-content">
          <div className="text-center">
            <button
              onClick={() => setIs24Hour(!is24Hour)}
              className="toggle-btn"
              aria-label="Toggle time format"
            >
              Switch to {is24Hour ? "12-hour" : "24-hour"} format
            </button>
            <div
              className="time-display"
              role="timer"
              aria-label={`Current time is ${formattedTime}`}
            >
              {formattedTime}
            </div>
          </div>
  
          <div className="clock-face">
            <div className="clock-circle">
              {/* Clock Numbers */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="clock-number"
                  style={{
                    transform: `rotate(${i * 30}deg)`
                  }}
                >
                  <span
                    className="clock-number-text"
                    style={{
                      transform: `rotate(-${i * 30}deg)`
                    }}
                  >
                    {i === 0 ? 12 : i}
                  </span>
                </div>
              ))}
  
              {/* Clock Center */}
              <div className="clock-center"></div>
  
              {/* Hour Hand */}
              <div
                className="clock-hand hour-hand"
                style={{ transform: `rotate(${hourDegrees}deg)` }}
              ></div>
  
              {/* Minute Hand */}
              <div
                className="clock-hand minute-hand"
                style={{ transform: `rotate(${minuteDegrees}deg)` }}
              ></div>
  
              {/* Second Hand */}
              <div
                className="clock-hand second-hand"
                style={{ transform: `rotate(${secondDegrees}deg)` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Clock;