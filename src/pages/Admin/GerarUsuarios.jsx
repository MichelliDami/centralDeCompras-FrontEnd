import "./Admin.css";

export default function GerarUsuarios() {
  const gerar = () => {
    const user = "user_" + Math.random().toString(36).slice(2, 8);
    const pass = Math.random().toString(36).slice(2, 10);

    alert(`Usuário Gerado:\nLogin: ${user}\nSenha: ${pass}`);
  };

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
        <h1 className="admin-title-main">Gerar Usuários</h1>

        <div className="admin-card-form" style={{ maxWidth: "450px" }}>
          <div className="admin-form">

            <button className="admin-btn" onClick={gerar}>
              Gerar Usuário para Loja
            </button>

            <button className="admin-btn" onClick={gerar}>
              Gerar Usuário para Fornecedor
            </button>

            <button className="admin-btn" onClick={gerar}>
              Gerar Usuário para Televendas
            </button>

          </div>
        </div>

      </main>
    </div>
  );
}
