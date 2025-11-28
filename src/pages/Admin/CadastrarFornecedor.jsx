import "./Admin.css";

export default function CadastrarFornecedor() {
  return (
    <div className="admin-page">
      <h1>Cadastrar Fornecedor</h1>

      <form className="admin-form">
        <input type="text" placeholder="Nome do Fornecedor" required />
        <input type="text" placeholder="CNPJ" required />
        <input type="text" placeholder="Telefone" required />
        <input type="email" placeholder="E-mail" required />
        <input type="text" placeholder="CEP" required />
        <input type="text" placeholder="Rua" required />
        <input type="text" placeholder="Número" required />
        <input type="text" placeholder="Cidade" required />
        <input type="text" placeholder="Estado" required />

        <button>Cadastrar Fornecedor</button>
      </form>
    </div>
  );
}
