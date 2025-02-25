import { useEffect, useState } from "react";
import "../../styles/clock/clockwise-styles.css";

interface ClockWiseProps {
  serverTime: Date | null;
}

const ClockWise: React.FC<ClockWiseProps> = ({ serverTime }) => {
  const [time, setTime] = useState(serverTime || new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hourDegrees = (((hours % 12) * 30 + minutes / 2) % 360) + 180;
  const minuteDegrees = ((minutes * 6 + seconds / 10) % 360) + 180;
  const secondDegrees = ((seconds * 6) % 360) + 180;

  return (
    <div className="clock-container">
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

          <div className="clock-center"></div>

          <div
            className="clock-hand hour-hand"
            style={{ transform: `rotate(${hourDegrees}deg)` }}
          ></div>
          <div
            className="clock-hand minute-hand"
            style={{ transform: `rotate(${minuteDegrees}deg)` }}
          ></div>
          <div
            className="clock-hand second-hand"
            style={{ transform: `rotate(${secondDegrees}deg)` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ClockWise;
