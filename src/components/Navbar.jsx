import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>🛒 UNIMAIS</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Conta">Conta</Link></li>
        <li><Link to="/buyer">Compras</Link></li>
      </ul>
    </nav>
  );
}
