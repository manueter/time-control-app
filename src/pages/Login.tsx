import "../styles/form-styles.css";
import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePost } from "../hooks/usePost";
import Badge from "../components/Badge";
 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();

  const { user, login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
 

  const { postData, isLoading, error } = usePost(
    `${API_BASE_URL}/auth`,
    false 
  );

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
      alert("Por favor, complete todos los campos.");
      return;
    }
    try {
      const email = emailOrUsername.includes("@")? emailOrUsername : emailOrUsername.concat('@mail.com');
      const payload = {
        email,
        password,
      };
      const data = await postData(payload);
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_uuid", data.uuid);
        alert("Sesión iniciada con éxito.");

        login({ uuid: data.uuid, token: data.token });

        navigate("/clock");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || "No se pudo iniciar sesión.");
      }
    }
  };

  const badgeContent = [    
    '<strong>User:</strong> test',
    '<strong>Password:</strong> test',
  ]

  return (
    <>
    <Badge content={badgeContent} />
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
          <div className="wrapper-center">
            <Link to="" className="link">
              Olvidé mi contraseña{" "}
            </Link>
          </div>
        </div>
        <div className="wrapper-center">
        {error && <div className="error">{error.message}</div>}
        </div>

        <div>
          ¿No tienes una cuenta?{" "}
          <Link to="/Register" className="link">
            Registrate
          </Link>
        </div>
      </form>
    </div>
    </>
  );
};
export default Login;
