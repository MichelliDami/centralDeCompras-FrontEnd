import { useState, useEffect } from "react";
import "./Admin.css";

export default function CadastrarProduto() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    supplier_id: "",
    status: "on"
  });

  const [fornecedores, setFornecedores] = useState([]);

  // -----------------------------------
  //  BUSCAR LISTA DE FORNECEDORES
  // -----------------------------------
  useEffect(() => {
    async function carregarFornecedores() {
      try {
        const res = await fetch("https://centraldecompras.onrender.com/suppliers");
        const data = await res.json();
        setFornecedores(data);
      } catch (err) {
        console.log("Erro ao carregar fornecedores:", err);
      }
    }
    carregarFornecedores();
  }, []);

  // -----------------------------------
  //  HANDLE INPUT
  // -----------------------------------
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // -----------------------------------
  //  SUBMIT PARA API
  // -----------------------------------
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const sendData = {
        ...form,
        price: Number(form.price),
        stock_quantity: Number(form.stock_quantity),
      };

      const response = await fetch(
        "https://centraldecompras.onrender.com/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendData),
        }
      );

      if (!response.ok) throw new Error("Erro ao cadastrar produto");

      alert("Produto cadastrado com sucesso!");

      setForm({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        supplier_id: "",
        status: "on"
      });

    } catch (err) {
      alert("Erro ao conectar com o servidor.");
      console.error(err);
    }
  }

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
        <h1 className="admin-title-main">Cadastrar Produto</h1>

        <div className="admin-card-form">
          <form className="admin-form" onSubmit={handleSubmit}>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome do Produto"
              required
            />

            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descrição"
              required
            />

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Preço"
              required
            />

            <input
              type="number"
              name="stock_quantity"
              value={form.stock_quantity}
              onChange={handleChange}
              placeholder="Quantidade em Estoque"
              required
            />

            {/* SELECT DE FORNECEDOR */}
            <select
              name="supplier_id"
              value={form.supplier_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o fornecedor</option>

              {fornecedores.length > 0 &&
                fornecedores.map((f) => (
                  <option key={f._id} value={f._id}>
                    {f.supplier_name}
                  </option>
                ))}
            </select>

            {/* STATUS */}
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="on">Ativo</option>
              <option value="off">Inativo</option>
            </select>

            <button className="admin-btn" type="submit">
              Cadastrar Produto
            </button>

          </form>
        </div>

      </main>
    </div>
  );
}
