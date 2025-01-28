import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const SettingsPage = () => {
  const [showCard, setShowCard] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const timer = setTimeout(() => setShowCard(true), 70); // Show after 50ms
    return () => clearTimeout(timer);
  }, []);

  return (

    <div className={`card ${showCard ? "show" : ""}`}>
        <h1>Settings</h1>
  </div>
  );
};

export default SettingsPage;
