import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [showCard, setShowCard] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const timer = setTimeout(() => setShowCard(true), 70);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`card ${showCard ? "show" : ""}`}>
      <h1>Profile</h1>
      <ul>
        <li>Email: </li>
        <li>Username: </li>
      </ul>
    </div>
  );
};

export default ProfilePage;
