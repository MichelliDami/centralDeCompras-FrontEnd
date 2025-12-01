export default function AdminDashboard() {
  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-title">Administrador</h2>
        <p className="admin-username">nome do usuário cadastrado</p>

        <nav className="admin-menu">
  <a href="/admin" className="admin-btn">Dashboard</a>
  <a href="/admin/cadastrar-loja" className="admin-btn">Cadastrar Loja</a>
  <a href="/admin/cadastrar-fornecedor" className="admin-btn">Cadastrar Fornecedor</a>
  <a href="/admin/cadastrar-produto" className="admin-btn">Cadastrar Produto</a>
  <a href="/admin/gerar-usuarios" className="admin-btn">Gerar Usuários</a>
  <a href="/admin/gerar-senhas" className="admin-btn">Gerar Senhas</a>
  <a href="/admin/Todos-Fornecedores" className="admin-btn">Todos Fornecedores</a>
  <a href="/admin/Todos-Logistas" className="admin-btn">Todos Logistas</a>

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
          <a href="/admin/Todos-Fornecedores" className="admin-card">Todos Fornecedores</a>
          <a href="/admin/Todos-Logistas" className="admin-card">Todos Logistas</a>

        </div>
      </main>

    </div>
  );
}