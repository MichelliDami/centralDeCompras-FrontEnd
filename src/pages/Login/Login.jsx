import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();


  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  
  const labels = {
    seller: "fornecedor",
    buyer: "lojista",
    admin: "admin"
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://centraldecompras.onrender.com/users");
    const users = await response.json();

    
    const userFound = users.find(
      (u) =>
        u.contact_email === email &&
        u.pwd === senha &&
        u.level === type &&
        u.status === "on"
    );

    if (!userFound) {
      alert("Usuário não encontrado ou sem permissão.");
      return;
    }

    
    localStorage.setItem("user", JSON.stringify(userFound));

   
    navigate(`/${type}`);

  } catch (err) {
    console.error(err);
    alert("Erro ao conectar com o servidor.");
  }
};


  return (
    <div className="login-container">
      <h1 className="login-title">Bem vindos!</h1>
      <h2 className="login-subtitle">Unimais</h2>

      <div className="login-box">
        <div className="login-top">
          Faça o seu login como {labels[type]}
        </div>

        <form className="login-form" onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
