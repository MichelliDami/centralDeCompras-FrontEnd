import "./Admin.css";

export default function GerarSenhas() {
  const gerarSenha = () => {
    const senha = Math.random().toString(36).slice(-10);
    alert(`Senha gerada:\n${senha}`);
  };

  return (
    <div className="admin-page">
      <h1>Gerar Senhas</h1>

      <div className="admin-form">
        <button onClick={gerarSenha}>Gerar Senha Automática</button>
      </div>
    </div>
  );
}
