import { useEffect, useState } from "react";
import "../../styles/clockwise-styles.css"; // Import the CSS file

const ClockWise = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours(); // 0 to 23
  const minutes = time.getMinutes(); // 0 to 59
  const seconds = time.getSeconds(); // 0 to 59

  // Calculate the degrees for the clock hands based on time
  const hourDegrees = ((hours % 12) * 30 + minutes / 2) % 360 +180; // Hour hand, 30 degrees per hour and 0.5 degrees per minute
  const minuteDegrees = (minutes * 6) % 360 + 180; // Minute hand, 6 degrees per minute
  const secondDegrees = ((seconds * 6) % 360) + 180; // Second hand, 6 degrees per second

  return (
    <div className="clock-face">
      <div className="clock-circle">
        {/* Clock Numbers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="clock-number"
            style={{
              transform: `rotate(${i * 30}deg)`,
            }}
          >
            <span
              className="clock-number-text"
              style={{
                transform: `rotate(-${i * 30}deg)`,
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
          style={
            secondDegrees == 0 || secondDegrees === 360 
              ? {transform: `0`}
              : { transform: `rotate(${secondDegrees}deg)` }
          }
        ></div>
      </div>
    </div>
  );
};

export default ClockWise;
