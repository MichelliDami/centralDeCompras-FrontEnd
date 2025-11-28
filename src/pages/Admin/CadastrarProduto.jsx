import "./Admin.css";

export default function CadastrarProduto() {
  return (
    <div className="admin-page">
      <h1>Cadastrar Produto</h1>

      <form className="admin-form">
        <input type="text" placeholder="Nome do Produto" required />
        <input type="text" placeholder="Categoria" required />

        <select required>
          <option value="">Selecione o fornecedor</option>
          <option>Fornecedor 1</option>
          <option>Fornecedor 2</option>
        </select>

        <input type="number" placeholder="Preço" required />

        <button>Cadastrar Produto</button>
      </form>
    </div>
  );
}
