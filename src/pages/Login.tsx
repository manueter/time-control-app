import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePost } from "../hooks/usePost";
import Badge from "../components/shared/Badge";
import "../styles/shared/form-styles.css";
import { useAlerts } from "../contexts/AlertContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [showCard, setShowCard] = useState(false);
  const { showAlert } = useAlerts();
  
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const { postData, isLoading, error } = usePost(`${API_BASE_URL}/auth`, false);

  useEffect(() => {
    if (user) {
      navigate("/clock");
    }
    const timer = setTimeout(() => setShowCard(true), 70);
    return () => clearTimeout(timer);
  }, []);
  
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailOrUsername || !password) {
      showAlert("Por favor, complete todos los campos.", "error");
      return;
    }
    try {
      const email = emailOrUsername.includes("@")
        ? emailOrUsername
        : emailOrUsername.concat("@mail.com");
      const payload = {
        email,
        password,
      };
      const data = await postData(payload);

      if (error) {
        showAlert(error.message||"No se pudo iniciar sesión. Inténtelo de nuevo.", "error");
        return;
      }

      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_uuid", data.user_uuid);

        login({ user_uuid: data.user_uuid, token: data.token });

        
        showAlert("Sesión iniciada con éxito.", "success");
        navigate("/clock");
      }
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error.message || "No se pudo iniciar sesión.", "error");
      }
    }
  };

  const badgeContent = [
    "<strong>User:</strong> test",
    "<strong>Password:</strong> test",
  ];

  return (
    <>
      <Badge content={badgeContent} />

      <div className={`card ${showCard ? "show" : ""}`}>
        <h1 className="heading">Iniciar sesión</h1>
        <form onSubmit={handleLogin} className="flex">
          <div className="wrapper-input">
            <input
              type="text"
              placeholder="Ingrese email o usuario"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="input"
            ></input>
            <label htmlFor="username" className="labelin">
              <BiUser /> Email
            </label>
          </div>
          <div className="wrapper-input">
            <input
              id="pwd"
              type="password"
              className="input"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="pwd">
              <AiOutlineLock /> Contraseña
            </label>
          </div>
          <div className="wrapper">
            <button className="form-button" type="submit" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </button>
            <div className="wrapper-center">
              <Link to="" className="link">
                Olvidé mi contraseña{" "}
              </Link>
            </div>
            <div>
              ¿No tienes una cuenta?{" "}
              <Link to="/Register" className="link">
                Registrate
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
