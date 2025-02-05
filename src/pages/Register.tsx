import { useEffect, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { usePost } from "../hooks/usePost";
import "../styles/shared/form-styles.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();

  const { user} = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");

  const { postData, isLoading } = usePost(
    `${API_BASE_URL}/users/register`,
    false
  );

  useEffect(() => {
    if (user) {
      navigate("/clock");
    }
    const timer = setTimeout(() => setShowCard(true), 70);
    return () => clearTimeout(timer);
  }, []);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !username || !password) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    try {
      const payload = {
        email,
        username,
        password,
      };
      const data = await postData(payload);
      if (data) {
        alert("Registro con éxito.");
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || "No se pudo registrar.");
      }
    }
  };

  return (
    <div className={`card ${showCard ? "show" : ""}`}>
      <h1 className="heading">Registro</h1>
      <form onSubmit={handleRegister} className="flex">
        <div className="wrapper-input">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="email@ejemplo.com"
          />
          <label htmlFor="email">
            <BiUser /> Email
          </label>
        </div>
        <div className="wrapper-input">
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="usuario"
          />
          <label htmlFor="email">
            <BiUser /> Username
          </label>
        </div>
        <div className="wrapper-input">
          <input
            id="pwd"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder=""
          />
          <label htmlFor="pwd" className="label">
            <AiOutlineLock /> Contrasena
          </label>
        </div>
        <div className="wrapper-input">
          <input
            id="pwd_confirm"
            type="password"
            className="input"
            placeholder=""
          />
          <label htmlFor="pwd_confirm">
            <AiOutlineLock /> Repetir Contrasena
          </label>
        </div>
        <div className="wrapper">
          <button className="form-button" type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Registrarse"}
          </button>
        </div>

        <div>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/Login" className="link">
            Iniciar sesion
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
