import "../styles/form-styles.css"
import { useEffect, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router";

const Register = () => {
    const [showCard, setShowCard] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setShowCard(true), 70); // Show after 50ms
      return () => clearTimeout(timer);
    }, []);
  return (
    <div className={`card ${showCard ? "show" : ""}`}>
      <h1>Registro</h1>
      <form action="" className="flex">
        <div className="wrapper-input">
          <input
            id="email"
            type="email"
            className="input"
            placeholder="email@ejemplo.com"
          ></input>
          <label htmlFor="email">
            <BiUser /> Email
          </label>
        </div>
        <div className="wrapper-input">
          <input id="pwd" type="password" className="input" placeholder="" />
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
          <button type="submit">Registrarse</button>
        </div>

        <div>
          ¿Ya tienes una cuenta? <Link to="/Login" className="link">Iniciar sesion</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
