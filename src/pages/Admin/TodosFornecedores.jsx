import React, { useEffect, useState } from "react";
import "./Admin.css";

export default function TodosFornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  // controle do modal
  const [modalAberto, setModalAberto] = useState(false);
  const [fornecedorEditando, setFornecedorEditando] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch("https://centraldecompras.onrender.com/suppliers");
        const data = await res.json();
        setFornecedores(data);
      } catch (err) {
        console.log("Erro ao buscar fornecedores:", err);
      }
      setLoading(false);
    }

    carregar();
  }, []);

  // Abrir modal e carregar dados do fornecedor
  async function abrirModal(id) {
    try {
      const res = await fetch(`https://centraldecompras.onrender.com/suppliers/${id}`);
      const data = await res.json();

      setFornecedorEditando(id);
      setForm(data);
      setModalAberto(true);
    } catch (err) {
      console.log("Erro ao carregar fornecedor:", err);
    }
  }

  // Atualizar campos no modal
  function handleChange(e) {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
}


  // Salvar edição
  async function salvar() {
  try {
    const res = await fetch(
      `https://centraldecompras.onrender.com/suppliers/${fornecedorEditando}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (!res.ok) {
      alert("Erro ao atualizar fornecedor");
      return;
    }

    alert("Fornecedor atualizado com sucesso!");

    setFornecedores((prev) =>
      prev.map((f) => (f._id === fornecedorEditando ? form : f))
    );

    setModalAberto(false);
  } catch (err) {
    console.log("Erro ao salvar", err);
  }
}


  const fornecedoresFiltrados = fornecedores.filter((f) => {
    const termo = busca.toLowerCase();
    return (
      f.supplier_name.toLowerCase().includes(termo) ||
      f.supplier_category.toLowerCase().includes(termo) ||
      f.contact_email.toLowerCase().includes(termo) ||
      f.phone_number.toLowerCase().includes(termo) ||
      f.status.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-title">Administrador</h2>
        <p className="admin-username">nome do usuário cadastrado</p>

        <nav className="admin-menu">
          <a className="admin-btn" href="/admin">Dashboard</a>
          <a className="admin-btn" href="/admin/cadastrar-loja">Cadastrar Loja</a>
          <a className="admin-btn" href="/admin/cadastrar-fornecedor">Cadastrar Fornecedor</a>
          <a className="admin-btn" href="/admin/cadastrar-produto">Cadastrar Produto</a>
          <a className="admin-btn" href="/admin/gerar-usuarios">Gerar Usuários</a>
          <a className="admin-btn" href="/admin/gerar-senhas">Gerar Senhas</a>
          <a className="admin-btn" href="/admin/todos-fornecedores">Todos Fornecedores</a>
          <a className="admin-btn" href="/admin/todos-logistas">Todos Logistas</a>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="admin-content">

        <h1 className="admin-title-main">Todos os Fornecedores</h1>

        <div className="admin-search-box">
          <input
            type="text"
            placeholder="Pesquisar fornecedor..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="admin-search-input"
          />
        </div>

        <div className="admin-grid">
          {fornecedoresFiltrados.map((f) => (
            <div key={f._id} className="admin-card">
              <h3>{f.supplier_name}</h3>
              <p><strong>Categoria:</strong> {f.supplier_category}</p>
              <p><strong>Email:</strong> {f.contact_email}</p>
              <p><strong>Telefone:</strong> {f.phone_number}</p>
              <p><strong>Status:</strong> {f.status}</p>

              <button
                className="admin-edit-btn"
                onClick={() => abrirModal(f._id)}
              >
                Editar
              </button>
            </div>
          ))}
        </div>

      </main>

      {/* MODAL DE EDIÇÃO COMPLETO */}
{modalAberto && (
  <div className="modal-overlay">
    <div className="modal-container">
      <h2>Editar Fornecedor</h2>

      <div className="admin-form">

        <input
          name="supplier_name"
          value={form.supplier_name}
          onChange={handleChange}
          placeholder="Nome do fornecedor"
        />

        <input
          name="supplier_category"
          value={form.supplier_category}
          onChange={handleChange}
          placeholder="Categoria"
        />

        <input
          name="contact_email"
          value={form.contact_email}
          onChange={handleChange}
          placeholder="E-mail"
          type="email"
        />

        <input
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          placeholder="Telefone"
        />

        <input
          name="status"
          value={form.status}
          onChange={handleChange}
          placeholder="Status (on/off)"
        />

        <input
          name="cnpj"
          value={form.cnpj}
          onChange={handleChange}
          placeholder="CNPJ"
        />

        <input
          name="cep"
          value={form.cep}
          onChange={handleChange}
          placeholder="CEP"
        />

        <input
          name="rua"
          value={form.rua}
          onChange={handleChange}
          placeholder="Rua"
        />

        <input
          name="numero"
          value={form.numero}
          onChange={handleChange}
          placeholder="Número"
        />

        <input
          name="cidade"
          value={form.cidade}
          onChange={handleChange}
          placeholder="Cidade"
        />

        <input
          name="estado"
          value={form.estado}
          onChange={handleChange}
          placeholder="Estado"
        />
      </div>

      <div className="modal-buttons">
        <button className="admin-btn" onClick={salvar}>Salvar</button>
        <button
          className="admin-btn"
          style={{ background: "#ff6b6b" }}
          onClick={() => setModalAberto(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
