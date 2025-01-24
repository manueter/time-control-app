import { useEffect, useState } from "react";
import "../../styles/clockwise-styles.css"; // Import the CSS file

interface ClockWiseProps {
  serverTime: Date | null; // Add serverTime prop
}

const ClockWise: React.FC<ClockWiseProps>  = ({serverTime}) => {
  const [time, setTime] = useState(serverTime || new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours(); // 0 to 23
  const minutes = time.getMinutes(); // 0 to 59
  const seconds = time.getSeconds(); // 0 to 59
  const hourDegrees = ((hours % 12) * 30 + minutes / 2) % 360 + 180; // Hour hand
  const minuteDegrees = (minutes * 6 + seconds / 10) % 360 + 180; // Minute hand
  const secondDegrees = (seconds * 6) % 360 + 180; // Second hand (continuous rotation)

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
          style={{ transform: `rotate(${secondDegrees}deg)` }}
        ></div>
      </div>
    </div>
  );
};

export default ClockWise;
