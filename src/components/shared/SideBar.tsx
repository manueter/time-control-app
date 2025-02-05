
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
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
import "../../styles/shared/sidebar-styles.css";

const Sidebar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  
  const menuItems = [
    { icon: <FiClock size={20} />, title: "Reloj", route: "/clock", implemented: true  },
    { icon: <FiCalendar size={20} />, title: "Calendario", route: "/calendar", implemented: true  },
    { icon: <FiEdit size={20} />, title: "Notificar Incidencia", route: "/notifications", implemented: false  },
    { icon: <FiBriefcase size={20} />, title: "Registro Incidencias", route: "/incidences", implemented: false },
    { icon: <FiAlignLeft size={20} />, title: "Listados", route: "/listados", implemented: false  },
  ];

  return (
    <div className="burger-sidebar" ref={sidebarRef}>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-content">
          <div className="space-y-4">
            {menuItems.map((item) => (
              <Link to={item.route} key={item.title} className={`menu-item ${!item.implemented ? 'disabled' : ''}`} >
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

              <Link to="/settingsPage" className="menu-item">
              <FiSettings size={20} />
                <span className="font-medium">Ajustes</span>
              </Link>
              
              <button className="menu-item" onClick={handleLogout}>
                <FiLogOut size={20} />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="menu-item">
                <FiUser size={20} />
                <span className="font-medium">Iniciar Sesión</span>
              </Link>
              <Link to="/register" className="menu-item">
                <FiUser size={20} />
                <span className="font-medium">Registro</span>
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
