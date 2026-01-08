import { useState } from "react";
import "./LoginScreen.css";
import LoginBackground from "../../assets/images/LoginScreenImage.png";

const LoginScreen = ({ onStartGame }) => {
  const [mode, setMode] = useState(null);
  const [muted, setMuted] = useState(false);

  return (
    <div
      className="login-screen"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="overlay">
        <h1 className="title">Magic Coding Adventure</h1>

        <div className="main-buttons">
          <button onClick={() => setMode("register")}>Crear usuario</button>
          <button onClick={() => setMode("login")}>Iniciar sesión</button>
        </div>

        {mode === "register" && (
          <form className="panel">
            <button type="button" className="close-btn" onClick={() => setMode(null)}>✕</button>
            <h2>Crear usuario</h2>
            <input type="text" placeholder="Nombre de usuario" maxLength={15} />
            <input type="password" placeholder="Contraseña" />
            <input type="password" placeholder="Repetir contraseña" />
            <input type="email" placeholder="Correo electrónico" />
            <button type="submit">Registrar</button>
          </form>
        )}

        {mode === "login" && (
          <form className="panel">
            <button type="button" className="close-btn" onClick={() => setMode(null)}>✕</button>
            <h2>Iniciar sesión</h2>
            <input type="text" placeholder="Nombre de usuario" />
            <input type="password" placeholder="Contraseña" />
            <a href="#" className="forgot">¿Has olvidado la contraseña?</a>
            <button type="button" onClick={onStartGame}>Entrar al juego</button>
          </form>
        )}

        <div className="footer-buttons-container">
          <button>About us</button>
          <button onClick={() => setMuted(!muted)}>{muted ? "Unmute 🔊" : "Mute 🔇"}</button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
