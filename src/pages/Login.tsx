import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Badge from "../components/shared/Badge";
import "../styles/shared/form-styles.css";
import { useAlerts } from "../contexts/AlertContext";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { session, login } = useAuth();

  const [showCard, setShowCard] = useState(false);
  const { showAlert } = useAlerts();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/clock");
    }
    const timer = setTimeout(() => setShowCard(true), 70);
    return () => clearTimeout(timer);
  }, [session, navigate]);


  const handleLogin = async (e: React.FormEvent) => {
    
    e.preventDefault();

    setIsLoading(true);
    const { error } = await login(email, password);
    if (error) {
      showAlert(error.message,"error")
    }
    else{

      showAlert("Se ha iniciado sesion","success")
      navigate("/clock"); 
    }
    
    setIsLoading(false);
  };

  const badgeContent = [
    "<strong>User:</strong> test@mail.com",
    "<strong>Password:</strong> testing",
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
