import React, { useEffect, useState } from "react";
import "./Admin.css";

export default function TodosLogistas() {
  const [logistas, setLogistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  // Estados do modal
  const [modalAberto, setModalAberto] = useState(false);
  const [lojaEditando, setLojaEditando] = useState(null);
  const [form, setForm] = useState({
    store_name: "",
    store_category: "",
    contact_email: "",
    phone_number: "",
    status: "on",
    cnpj: "",
    cep: "",
    rua: "",
    numero: "",
    cidade: "",
    estado: ""
  });

  // ============================
  // BUSCAR TODAS AS LOJAS
  // ============================
  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch("https://centraldecompras.onrender.com/stores");
        const data = await res.json();
        setLogistas(data);
      } catch (err) {
        console.log("Erro ao buscar logistas:", err);
      }
      setLoading(false);
    }

    carregar();
  }, []);

  // ============================
  // ABRIR MODAL E CARREGAR DADOS
  // ============================
  function abrirModal(loja) {
    setLojaEditando(loja._id);
    setForm({ ...loja });
    setModalAberto(true);
  }

  // ============================
  // ALTERAR CAMPOS DO FORM
  // ============================
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // ============================
  // SALVAR EDIÇÃO
  // ============================
  async function salvar() {
    try {
      const res = await fetch(
        `https://centraldecompras.onrender.com/stores/${lojaEditando}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );

      if (!res.ok) {
        alert("Erro ao atualizar loja");
        return;
      }

      alert("Loja atualizada com sucesso!");

      // Atualiza lista na tela
      setLogistas((prev) =>
        prev.map((l) => (l._id === lojaEditando ? form : l))
      );

      setModalAberto(false);
    } catch (err) {
      console.log("Erro ao salvar", err);
    }
  }

  // ============================
  // FILTRO DA BUSCA
  // ============================
  const logistasFiltrados = logistas.filter((l) => {
    const termo = busca.toLowerCase();

    return (
      l.store_name.toLowerCase().includes(termo) ||
      l.contact_email.toLowerCase().includes(termo) ||
      l.phone_number.toLowerCase().includes(termo) ||
      l.status.toLowerCase().includes(termo)
    );
  });

  if (loading) return <h2 className="admin-title-main">Carregando logistas...</h2>;

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

      {/* CONTEÚDO */}
      <main className="admin-content">
        <h1 className="admin-title-main">Todos os Logistas</h1>

        {/* Barra de Pesquisa */}
        <div className="admin-search-box">
          <input
            type="text"
            placeholder="Pesquisar logista..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="admin-search-input"
          />
        </div>

        {/* GRID */}
        <div className="admin-grid">
          {logistasFiltrados.map((l) => (
            <div key={l._id} className="admin-card">
              <h3>{l.store_name}</h3>
              <p><strong>Email:</strong> {l.contact_email}</p>
              <p><strong>Telefone:</strong> {l.phone_number}</p>
              <p><strong>Status:</strong> {l.status}</p>

              <button className="admin-edit-btn" onClick={() => abrirModal(l)}>
                Editar
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* ============================
          MODAL DE EDIÇÃO
      ============================ */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Editar Loja</h2>

            <div className="admin-form">

              <input name="store_name" value={form.store_name} onChange={handleChange} placeholder="Nome da loja" />

              <input name="store_category" value={form.store_category} onChange={handleChange} placeholder="Categoria" />

              <input name="contact_email" type="email" value={form.contact_email} onChange={handleChange} placeholder="E-mail" />

              <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Telefone" />

              <input name="status" value={form.status} onChange={handleChange} placeholder="Status (on/off)" />

              <input name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="CNPJ" />

              <input name="cep" value={form.cep} onChange={handleChange} placeholder="CEP" />

              <input name="rua" value={form.rua} onChange={handleChange} placeholder="Rua" />

              <input name="numero" value={form.numero} onChange={handleChange} placeholder="Número" />

              <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" />

              <input name="estado" value={form.estado} onChange={handleChange} placeholder="Estado" />
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
