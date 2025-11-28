import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Buyer from "./pages/Buyer/Buyer";
import Seller from "./pages/Seller/Seller";
import Navbar from "./components/Navbar";

// ADMIN
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CadastrarLoja from "./pages/Admin/CadastrarLoja";
import CadastrarFornecedor from "./pages/Admin/CadastrarFornecedor";
import CadastrarProduto from "./pages/Admin/CadastrarProduto";
import GerarUsuarios from "./pages/Admin/GerarUsuarios";
import GerarSenhas from "./pages/Admin/GerarSenhas";

function AppContent() {
  const location = useLocation();

  const hideNavbarPaths = [
    "/", 
    "/login", 
    "/buyer", 
    "/seller", 
    "/admin"
  ];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        {/* PÁGINAS PRINCIPAIS */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/seller" element={<Seller />} />

        {/* ROTAS DO ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/cadastrar-loja" element={<CadastrarLoja />} />
        <Route path="/admin/cadastrar-fornecedor" element={<CadastrarFornecedor />} />
        <Route path="/admin/cadastrar-produto" element={<CadastrarProduto />} />
        <Route path="/admin/gerar-usuarios" element={<GerarUsuarios />} />
        <Route path="/admin/gerar-senhas" element={<GerarSenhas />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}