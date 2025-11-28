export default function AdminDashboard() {
  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-title">Administrador</h2>
        <p className="admin-username">nome do usuário cadastrado</p>

        <nav className="admin-menu">
          <button className="admin-btn">Dashboard</button>
          <button className="admin-btn">Cadastrar Loja</button>
          <button className="admin-btn">Cadastrar Fornecedor</button>
          <button className="admin-btn">Cadastrar Produto</button>
          <button className="admin-btn">Gerar Usuários</button>
          <button className="admin-btn">Gerar Senhas</button>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="admin-content">
        <h1 className="admin-title-main">Menu Principal</h1>

        <div className="admin-grid">
          <a href="/admin/cadastrar-loja" className="admin-card">Cadastrar Loja</a>
          <a href="/admin/cadastrar-fornecedor" className="admin-card">Cadastrar Fornecedor</a>
          <a href="/admin/cadastrar-produto" className="admin-card">Cadastrar Produto</a>
          <a href="/admin/gerar-usuarios" className="admin-card">Gerar Usuários</a>
          <a href="/admin/gerar-senhas" className="admin-card">Gerar Senhas</a>
        </div>
      </main>

    </div>
  );
}