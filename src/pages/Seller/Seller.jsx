import React, { useState } from "react";
import "./Seller.css";
import SellerMeusDados from "./SellerMeusDados";

export default function Seller() {
  const [selectedPage, setSelectedPage] = useState("menu");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const titles = {
    menu: "Menu principal",
    campanhas: "Campanhas",
    pedidos: "Pedidos",
    produtos: "Produtos",
    dados: "Meus dados"
  };

  return (
    <div className="seller-container">

      {}
      <aside className={sidebarOpen ? "seller-sidebar" : "seller-sidebar closed"}>
        
        <h2 className="seller-hello">Olá!</h2>
        <p className="seller-username">*nome do usuário cadastrado*</p>

        <nav className="seller-menu">
          <button 
            className={`menu-item ${selectedPage === "menu" ? "selected" : ""}`}
            onClick={() => setSelectedPage("menu")}
          >
            Menu principal
          </button>

          <button 
            className={`menu-item ${selectedPage === "campanhas" ? "selected" : ""}`}
            onClick={() => setSelectedPage("campanhas")}
          >
            Campanhas
          </button>

          <button 
            className={`menu-item ${selectedPage === "pedidos" ? "selected" : ""}`}
            onClick={() => setSelectedPage("pedidos")}
          >
            Pedidos
          </button>

          <button 
            className={`menu-item ${selectedPage === "produtos" ? "selected" : ""}`}
            onClick={() => setSelectedPage("produtos")}
          >
            Produtos
          </button>

          <button 
            className={`menu-item ${selectedPage === "dados" ? "selected" : ""}`}
            onClick={() => setSelectedPage("dados")}
          >
            Meus dados
          </button>
        </nav>

        {}
        <button className="seller-arrow" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? ">" : "<"}
        </button>

      </aside>

      {}
      <main className="seller-main">
        
        {}
        <div className="seller-header">
          <span>{titles[selectedPage]}</span>

          {selectedPage === "dados" && (
            <button className="seller-edit-btn">Editar</button>
          )}
        </div>

        {}
        <div className="seller-content">

          {selectedPage === "menu" && <div></div>}

          {selectedPage === "campanhas" && (
            <div>{/* Conteúdo futuro */}</div>
          )}

          {selectedPage === "pedidos" && (
            <div>{/* Conteúdo futuro */}</div>
          )}

          {selectedPage === "produtos" && (
            <div>{/* Conteúdo futuro */}</div>
          )}

          {selectedPage === "dados" && <SellerMeusDados />}

        </div>

      </main>

    </div>
  );
}
