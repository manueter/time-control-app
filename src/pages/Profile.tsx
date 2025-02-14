import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useAlerts } from "../contexts/AlertContext";

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
  const { showAlert } = useAlerts();


  return (

    <div className={`card ${showCard ? "show" : ""}`}>
      <h1>Profile</h1>

      <ul>
        <li>Email: </li>
        <li>Username: </li>
      </ul>
      <button onClick={() => showAlert("Success!", "success")} style={{ marginRight: "10px" }}>
        Show Success
      </button>
      <button onClick={() => showAlert("Error!", "error")}>
        Show Error
      </button>
      <p></p>
    </div>
  );
};

export default ProfilePage;
