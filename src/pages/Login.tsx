import "../styles/form-styles.css";
import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [showCard, setShowCard] = useState(false);
  const { login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 70); // Show after 50ms
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const isEmail = emailOrUsername.includes("@");
      const body = isEmail
        ? { email: emailOrUsername }
        : { username: emailOrUsername };

      // const response = await fetch(`${API_BASE_URL}/login`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username, password }),
      //   //body: JSON.stringify({ email, password }),
      // });
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, password }), // Add password to the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in");
      }

      const data = await response.json();
      login({ user_uuid: data.user_uuid, token: data.token });
      alert("Sesión iniciada!");
      navigate("/clock"); // Redirect to the Clock page
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al iniciar sesión:", error);
        alert(error.message || "No se pudo iniciar sesión.");
      }
    }
  };

  return (
    <div className={`card ${showCard ? "show" : ""}`}>
      <h1>Iniciar sesión</h1>
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
          <button type="submit">Iniciar sesión</button>
          <div className="wrapper-center">
            <Link to="" className="link">
              Olvidé mi contraseña{" "}
            </Link>
          </div>
        </div>
        <div>
          ¿No tienes una cuenta?{" "}
          <Link to="/Register" className="link">
            Registrate
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
