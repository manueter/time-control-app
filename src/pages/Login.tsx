import "../styles/form-styles.css"
import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const Login = () => {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 70); // Show after 50ms
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`card ${showCard ? "show" : ""}`}>
      <h1>Inicio sesion</h1>
      <form action="" className="flex">
        <div className="wrapper-input">
          <input
            id="email"
            type="email"
            className="input"
            placeholder="email@ejemplo.com"
          ></input>
          <label htmlFor="email" className="labelin">
            <BiUser /> Email
          </label>
        </div>
        <div className="wrapper-input">
          <input id="pwd" type="password" className="input" placeholder="" />
          <label htmlFor="pwd" >
            <AiOutlineLock /> Contrasena
          </label>
        </div>
        <div className="wrapper">
          <button type="submit">Iniciar sesion</button>
          <div className="wrapper-center">
            <div>
                <input id="chkbx" type="checkbox" />
                <label htmlFor="chkbx">Recordarme</label>
            </div>
            <Link to="" className="link">Olvidé mi contraseña </Link>   
          </div>
        </div>
        <div>
            ¿No tienes una cuenta? <Link to="/Register" className="link">Registrate</Link></div>
      </form>
    </div>
  );
};
export default Login;
