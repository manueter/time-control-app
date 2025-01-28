import { useState } from "react";
import "../styles/badge-style.css"; // Import the CSS file

interface BadgeProps {
  content: string[]; 
}

const Badge = ({ content }: BadgeProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="badge">
      <div className="badge-content">
      {content.map((item) => (
        <div key={item} className="badge-text">
            <span  dangerouslySetInnerHTML={{ __html: item }} />
        </div>
      ))}
      </div>
      <button className="badge-close" onClick={() => setIsVisible(false)}>
        ✕
      </button>
    </div>
  );
};

export default Badge;
