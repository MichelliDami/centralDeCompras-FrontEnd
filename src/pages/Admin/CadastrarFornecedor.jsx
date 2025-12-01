import { useState } from "react";
import "./Admin.css";

export default function CadastrarFornecedor() {
  const [form, setForm] = useState({
    supplier_name: "",
    supplier_category: "",
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

  // ----------------------------
  //  MÁSCARAS
  // ----------------------------

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

  // ----------------------------
  //  BUSCA AUTOMÁTICA POR CNPJ
  // ----------------------------

  async function buscarCNPJ(cnpj) {
  try {
    const cleanCNPJ = cnpj.replace(/\D/g, "");

    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`);
    const data = await res.json();

    if (data.type === "error") {
      console.log("CNPJ não encontrado");
      return;
    }

    setForm((prev) => ({
      ...prev,
      supplier_name: data.nome_fantasia || data.razao_social || prev.supplier_name,
      supplier_category: data.cnae_fiscal_descricao || prev.supplier_category,
      phone_number: data.telefone || prev.phone_number,
      contact_email: data.email || prev.contact_email,
      rua: data.logradouro || prev.rua,
      numero: data.numero || prev.numero,
      cidade: data.municipio || prev.cidade,
      estado: data.uf || prev.estado,
      cep: data.cep ? data.cep.replace(/(\d{5})(\d)/, "$1-$2") : prev.cep
    }));

    console.log("Dados carregados pelo CNPJ:", data);

  } catch (err) {
    console.log("Erro ao buscar CNPJ:", err);
  }
}

  // ----------------------------
  //  HANDLE INPUTS
  // ----------------------------

  function handleChange(e) {
    let { name, value } = e.target;

    if (name === "cnpj") {
      value = maskCNPJ(value);
      const limpo = value.replace(/\D/g, "");
      if (limpo.length === 14) buscarCNPJ(limpo);
    }

    if (name === "phone_number") value = maskPhone(value);
    if (name === "cep") value = maskCEP(value);

    setForm({ ...form, [name]: value });

    if (name === "cep" && value.length === 9) buscarEndereco(value);
  }

  // ----------------------------
  //  VIA CEP API
  // ----------------------------

  async function buscarEndereco(cep) {
    try {
      const res = await fetch(
        `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
      );
      const data = await res.json();

      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          rua: data.logradouro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      }
    } catch (err) {
      console.log("Erro ao buscar CEP:", err);
    }
  }

  // ----------------------------
  //  SUBMIT PARA API
  // ----------------------------

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const sendData = {
        supplier_name: form.supplier_name,
        supplier_category: form.supplier_category,
        contact_email: form.contact_email,
        phone_number: form.phone_number.replace(/\D/g, ""),
        status: "on",
        cnpj: form.cnpj.replace(/\D/g, ""),
        cep: form.cep.replace(/\D/g, ""),
        rua: form.rua,
        numero: form.numero,
        cidade: form.cidade,
        estado: form.estado
      };

      const response = await fetch(
        "https://centraldecompras.onrender.com/suppliers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendData),
        }
      );

      if (!response.ok) throw new Error("Erro ao cadastrar fornecedor");

      alert("Fornecedor cadastrado com sucesso!");

      setForm({
        supplier_name: "",
        supplier_category: "",
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
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
      console.error(err);
    }
  }

  function limparFormulario() {
  setForm({
    supplier_name: "",
    supplier_category: "",
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
}


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
        <h1 className="admin-title-main">Cadastrar Fornecedor</h1>

        <div className="admin-card-form">
          <form className="admin-form" onSubmit={handleSubmit}>

            <input name="supplier_name" value={form.supplier_name} onChange={handleChange} placeholder="Nome do Fornecedor" required />
            <input name="supplier_category" value={form.supplier_category} onChange={handleChange} placeholder="Categoria" required />
            <input name="contact_email" type="email" value={form.contact_email} onChange={handleChange} placeholder="E-mail" required />
            <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Telefone" required />
            <input name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="CNPJ" required />
            <input name="cep" value={form.cep} onChange={handleChange} placeholder="CEP" required />
            <input name="rua" value={form.rua} onChange={handleChange} placeholder="Rua" required />
            <input name="numero" value={form.numero} onChange={handleChange} placeholder="Número" required />
            <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" required />
            <input name="estado" value={form.estado} onChange={handleChange} placeholder="Estado" required />

<button 
  type="button" 
  onClick={limparFormulario} 
  className="btn-clear"
>
  Limpar Dados
</button>

            <button type="submit">Cadastrar Fornecedor</button>
          </form>
        </div>
      </main>
    </div>
  );
}
