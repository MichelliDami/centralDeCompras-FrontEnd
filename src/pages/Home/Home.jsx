import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Bem vindos!</h1>
      <h2 className="home-subtitle">Unimais</h2>

      <div className="home-box">
        <div className="home-top-btn">
          <span>Faça o seu login</span>
        </div>

        <div className="home-buttons">
          {}
          <button onClick={() => navigate("/login?type=seller")}>
            Fornecedor
          </button>

          {}
          <button onClick={() => navigate("/login?type=buyer")}>
            Lojista
          </button>
        </div>

        {}
        <button
          onClick={() => navigate("/login?type=admin")}
          className="admin-btn"
        >
          Admin
        </button>
      </div>
    </div>
  );
}
