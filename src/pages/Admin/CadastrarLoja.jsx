import "./Admin.css";

export default function CadastrarLoja() {
  return (
    <div className="admin-page">
      <h1>Cadastrar Loja</h1>

      <form className="admin-form">
        <input type="text" placeholder="Nome da Loja" required />
        <input type="text" placeholder="Responsável" required />
        <input type="text" placeholder="Telefone" required />
        <input type="text" placeholder="CEP" required />
        <input type="text" placeholder="Rua" required />
        <input type="text" placeholder="Número" required />
        <input type="text" placeholder="Cidade" required />
        <input type="text" placeholder="Estado" required />

        <button>Cadastrar Loja</button>
      </form>
    </div>
  );
}
