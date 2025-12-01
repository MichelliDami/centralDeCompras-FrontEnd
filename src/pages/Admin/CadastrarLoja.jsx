import { useState } from "react";
import "./Admin.css";

export default function CadastrarLoja() {
  const [dados, setDados] = useState({
    store_name: "",
    store_category: "",
    cnpj: "",
    phone_number: "",
    contact_email: "",
    cep: "",
    rua: "",
    numero: "",
    cidade: "",
    estado: "",
    status: "on"
  });

  // -------------------------
  // MÁSCARAS
  // -------------------------
  function maskCNPJ(value) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  }

  function maskPhone(value) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }

  function maskCEP(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  }

  // -------------------------
  // HANDLE INPUTS
  // -------------------------
  async function handleChange(e) {
    let { name, value } = e.target;

    if (name === "cnpj") value = maskCNPJ(value);
    if (name === "phone_number") value = maskPhone(value);
    if (name === "cep") value = maskCEP(value);

    setDados({ ...dados, [name]: value });

    if (name === "cep" && value.length === 9) buscarCEP(value);
    if (name === "cnpj" && value.length === 18) buscarCNPJ(value);
  }

  // -------------------------
  // VIA CEP
  // -------------------------
  async function buscarCEP(cep) {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setDados((prev) => ({
          ...prev,
          rua: data.logradouro,
          cidade: data.localidade,
          estado: data.uf
        }));
      }
    } catch (err) {
      console.log("Erro no CEP:", err);
    }
  }

  // -------------------------
  // VIA CNPJ — API Pública
  // -------------------------
  async function buscarCNPJ(cnpj) {
    try {
      const res = await fetch(
        `https://publica.cnpj.ws/cnpj/${cnpj.replace(/\D/g, "")}`
      );
      const data = await res.json();

      if (data && !data.error) {
        setDados((prev) => ({
          ...prev,
          store_name: data.razao_social || prev.store_name,
          store_category: data.estabelecimento?.atividade_principal?.descricao || prev.store_category,
          phone_number: data.estabelecimento.telefone1 || prev.phone_number,
          contact_email: data.estabelecimento.email || prev.contact_email,
          rua: data.estabelecimento.logradouro || prev.rua,
          numero: data.estabelecimento.numero || prev.numero,
          cidade: data.estabelecimento.cidade?.nome || prev.cidade,
          estado: data.estabelecimento.estado?.sigla || prev.estado,
          cep: data.estabelecimento.cep
            ? data.estabelecimento.cep.replace(/^(\d{5})(\d{3})/, "$1-$2")
            : prev.cep
        }));
      }
    } catch (err) {
      console.log("Erro ao consultar CNPJ:", err);
    }
  }

  // -------------------------
  // LIMPAR FORM
  // -------------------------
  function limpar() {
    setDados({
      store_name: "",
      store_category: "",
      cnpj: "",
      phone_number: "",
      contact_email: "",
      cep: "",
      rua: "",
      numero: "",
      cidade: "",
      estado: "",
      status: "on"
    });
  }

  // -------------------------
  // ENVIAR PARA API
  // -------------------------
  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      store_name: dados.store_name,
      store_category: dados.store_category,
      cnpj: dados.cnpj.replace(/\D/g, ""),
      phone_number: dados.phone_number.replace(/\D/g, ""),
      contact_email: dados.contact_email,
      cep: dados.cep.replace(/\D/g, ""),
      rua: dados.rua,
      numero: dados.numero,
      cidade: dados.cidade,
      estado: dados.estado,
      status: "on"
    };

    try {
      const response = await fetch("https://centraldecompras.onrender.com/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        alert("Erro ao cadastrar loja!");
        return;
      }

      alert("Loja cadastrada com sucesso!");
      limpar();
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    }
  }

  // ============================================
  //   TELA IGUAL À DE CADASTRAR FORNECEDOR
  // ============================================

  return (
    <div className="admin-container">
      
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

      <main className="admin-content">
        <h1 className="admin-title-main">Cadastrar Loja</h1>

        <div className="admin-card-form">
          <form className="admin-form" onSubmit={handleSubmit}>

            <input name="store_name" value={dados.store_name} onChange={handleChange} placeholder="Nome da Loja" required />

            <input name="store_category" value={dados.store_category} onChange={handleChange} placeholder="Categoria" required />

            <input name="contact_email" type="email" value={dados.contact_email} onChange={handleChange} placeholder="E-mail" required />

            <input name="phone_number" value={dados.phone_number} onChange={handleChange} placeholder="Telefone" required />

            <input name="cnpj" value={dados.cnpj} onChange={handleChange} placeholder="CNPJ" required />

            <input name="cep" value={dados.cep} onChange={handleChange} placeholder="CEP" required />

            <input name="rua" value={dados.rua} onChange={handleChange} placeholder="Rua" required />

            <input name="numero" value={dados.numero} onChange={handleChange} placeholder="Número" required />

            <input name="cidade" value={dados.cidade} onChange={handleChange} placeholder="Cidade" required />

            <input name="estado" value={dados.estado} onChange={handleChange} placeholder="Estado" required />

            <button type="button" className="admin-btn" onClick={limpar}>
              Limpar Dados
            </button>

            <button type="submit" className="admin-btn">
              Cadastrar Loja
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}
