import "./Admin.css";

export default function GerarUsuarios() {
  const gerar = () => {
    const user = "user_" + Math.random().toString(36).slice(2, 8);
    const pass = Math.random().toString(36).slice(2, 10);

    alert(`Usuário Gerado:\nLogin: ${user}\nSenha: ${pass}`);
  };

  return (
    <div className="admin-page">
      <h1>Gerar Usuários</h1>

      <div className="admin-form">
        <button onClick={gerar}>Gerar Usuário para Loja</button>
        <button onClick={gerar}>Gerar Usuário para Fornecedor</button>
        <button onClick={gerar}>Gerar Usuário para Televendas</button>
      </div>
    </div>
  );
}
