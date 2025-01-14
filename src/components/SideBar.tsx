import "../styles/sidebar-styles.css";
import { useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import {
  FiClock,
  FiUser,
  FiCalendar,
  FiBriefcase,
  FiEdit,
  FiSettings,
  FiAlignLeft,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Get user and logout function from context
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };
  const menuItems = [
    { icon: <FiClock size={20} />, title: "Reloj", route: "/clock" },
    { icon: <FiCalendar size={20} />, title: "Calendario", route: "/calendar" },
    { icon: <FiEdit size={20} />, title: "Notificar Incidencia", route: "/notifications" },
    { icon: <FiBriefcase size={20} />, title: "Registro Incidencias", route: "/incidences"},
    { icon: <FiAlignLeft size={20} />, title: "Listados", route: "/listados" },
  ];

  return (
    <div className="burger-sidebar">
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-content">
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <Link to={item.route} key={index} className="menu-item">
                {item.icon}
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          {user ? (
            <div>
              <Link to="/profile" className="menu-item">
                <FiUser size={20} />
                <span className="font-medium">Perfil</span>
              </Link>
              <button className="menu-item">
                <FiSettings size={20} />
                <span className="font-medium">Settings</span>
              </button>
              
              <button className="menu-item" onClick={handleLogout}>
                <FiLogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="menu-item">
                <FiUser size={20} />
                <span className="font-medium">Login</span>
              </Link>
              <Link to="/register" className="menu-item">
                <FiUser size={20} />
                <span className="font-medium">Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={toggleSidebar}
        className={`sidebar-toggle ${isOpen ? "open" : "closed"}`}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>
    </div>
  );
};

export default Sidebar;
