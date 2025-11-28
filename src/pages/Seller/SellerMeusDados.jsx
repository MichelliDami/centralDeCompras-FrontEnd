import React, { useState } from "react";
import "./SellerMeusDados.css";

export default function SellerMeusDados() {
  const [activeTab, setActiveTab] = useState("geral");

  const [form, setForm] = useState({
    razaoSocial: "",
    cnpj: "",
    nomeFantasia: "",
    classificacao: "",
    observacoes: "",
    telefone: "",
    email: "",
    site: "",
    emailNfe: "",
    imagem: null
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleFile(e) {
    setForm({ ...form, imagem: e.target.files[0] });
  }

  
  const [novoEndereco, setNovoEndereco] = useState({
    cep: "",
    cidade: "",
    logradouro: "",
    bairro: "",
    estado: "",
    pais: ""
  });

  const [listaEnderecos, setListaEnderecos] = useState([]);

  function handleEnderecoChange(e) {
    const { name, value } = e.target;
    setNovoEndereco({ ...novoEndereco, [name]: value });
  }

  function adicionarEndereco() {
    if (Object.values(novoEndereco).some((v) => v === "")) {
      return alert("Preencha todos os campos!");
    }

    setListaEnderecos([...listaEnderecos, novoEndereco]);

    setNovoEndereco({
      cep: "",
      cidade: "",
      logradouro: "",
      bairro: "",
      estado: "",
      pais: ""
    });
  }

  function removerEndereco(i) {
    setListaEnderecos(listaEnderecos.filter((_, idx) => idx !== i));
  }

  const [novoContato, setNovoContato] = useState({
    nome: "",
    celular: "",
    email: "",
    telefone: ""
  });

  const [listaContatos, setListaContatos] = useState([]);

  function handleContatoChange(e) {
    const { name, value } = e.target;
    setNovoContato({ ...novoContato, [name]: value });
  }

  function adicionarContato() {
    if (Object.values(novoContato).some((v) => v === "")) {
      return alert("Preencha todos os campos!");
    }

    setListaContatos([...listaContatos, novoContato]);

    setNovoContato({
      nome: "",
      celular: "",
      email: "",
      telefone: ""
    });
  }

  function removerContato(i) {
    setListaContatos(listaContatos.filter((_, idx) => idx !== i));
  }

 
  const [novaCondicao, setNovaCondicao] = useState({
    pedidoMinimo: "",
    cashback: "",
    tabelaPreco: "",
    prazoEntrega: "",
    condicoesEspeciais: "",
    prazoPagamento: "",
    estadoCondicao: "",
    politicaDevolucao: "",
    descontoAvista: ""
  });

  const [listaCondicoes, setListaCondicoes] = useState([]);

  function handleCondicaoChange(e) {
    const { name, value } = e.target;
    setNovaCondicao({ ...novaCondicao, [name]: value });
  }

  function adicionarCondicao() {
    setListaCondicoes([...listaCondicoes, novaCondicao]);

    setNovaCondicao({
      pedidoMinimo: "",
      cashback: "",
      tabelaPreco: "",
      prazoEntrega: "",
      condicoesEspeciais: "",
      prazoPagamento: "",
      estadoCondicao: "",
      politicaDevolucao: "",
      descontoAvista: ""
    });
  }

  function removerCondicao(i) {
    setListaCondicoes(listaCondicoes.filter((_, idx) => idx !== i));
  }


  const [novoProduto, setNovoProduto] = useState({
    produto: "",
    embalagem: "",
    codigoBarras: "",
    valor: "",
    referencia: "",
    valorCampanha: "",
    imagem: null
  });

  const [listaProdutos, setListaProdutos] = useState([]);

  function handleProdutoChange(e) {
    const { name, value, files } = e.target;
    setNovoProduto({ ...novoProduto, [name]: files ? files[0] : value });
  }

  function adicionarProduto() {
    if (
      novoProduto.produto === "" ||
      novoProduto.embalagem === "" ||
      novoProduto.codigoBarras === "" ||
      novoProduto.valor === "" ||
      novoProduto.referencia === "" ||
      novoProduto.valorCampanha === ""
    ) {
      return alert("Preencha todos os campos!");
    }

    setListaProdutos([...listaProdutos, novoProduto]);

    setNovoProduto({
      produto: "",
      embalagem: "",
      codigoBarras: "",
      valor: "",
      referencia: "",
      valorCampanha: "",
      imagem: null
    });
  }

  function removerProduto(i) {
    setListaProdutos(listaProdutos.filter((_, idx) => idx !== i));
  }


  const [novaCampanha, setNovaCampanha] = useState({
    descricao: "",
    tempo: "",
    valorMeta: "",
    quantidadeMeta: "",
    imagem: null
  });

  const [listaCampanhas, setListaCampanhas] = useState([]);

  function handleCampanhaChange(e) {
    const { name, value, files } = e.target;
    setNovaCampanha({ ...novaCampanha, [name]: files ? files[0] : value });
  }

  function adicionarCampanha() {
    if (
      novaCampanha.descricao === "" ||
      novaCampanha.tempo === "" ||
      novaCampanha.valorMeta === "" ||
      novaCampanha.quantidadeMeta === ""
    ) {
      return alert("Preencha todos os campos!");
    }

    setListaCampanhas([...listaCampanhas, novaCampanha]);

    setNovaCampanha({
      descricao: "",
      tempo: "",
      valorMeta: "",
      quantidadeMeta: "",
      imagem: null
    });
  }

  function removerCampanha(i) {
    setListaCampanhas(listaCampanhas.filter((_, idx) => idx !== i));
  }


  return (
    <div className="meusdados-container">

      {}
      <div className="meusdados-tabs">
        <button className={activeTab === "geral" ? "active" : ""} onClick={() => setActiveTab("geral")}>Geral</button>
        <button className={activeTab === "enderecos" ? "active" : ""} onClick={() => setActiveTab("enderecos")}>Endereços</button>
        <button className={activeTab === "contatos" ? "active" : ""} onClick={() => setActiveTab("contatos")}>Contatos</button>
        <button className={activeTab === "condicoes" ? "active" : ""} onClick={() => setActiveTab("condicoes")}>Condições</button>
        <button className={activeTab === "produtos" ? "active" : ""} onClick={() => setActiveTab("produtos")}>Produtos</button>
        <button className={activeTab === "campanhas" ? "active" : ""} onClick={() => setActiveTab("campanhas")}>Campanhas</button>
      </div>

      {}

      {activeTab === "geral" && (
        <div className="meusdados-box">
          <div className="linha">
            <input name="razaoSocial" value={form.razaoSocial} onChange={handleChange} placeholder="Razão Social" />
            <input name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="CNPJ" />
          </div>

          <div className="linha">
            <input name="nomeFantasia" value={form.nomeFantasia} onChange={handleChange} placeholder="Nome Fantasia" />
            <input name="classificacao" value={form.classificacao} onChange={handleChange} placeholder="Classificação" />
          </div>

          <textarea name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Observações" />

          <div className="linha">
            <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="E-mail" />
            <input name="site" value={form.site} onChange={handleChange} placeholder="Site" />
            <input name="emailNfe" value={form.emailNfe} onChange={handleChange} placeholder="E-mail NFe" />
          </div>

          <h3 className="subtitulo">Logo / Imagem:</h3>
          <input type="file" onChange={handleFile} />
        </div>
      )}

      {}
      {activeTab === "enderecos" && (
        <>
          <div className="meusdados-box">
            <div className="linha">
              <input name="cep" value={novoEndereco.cep} onChange={handleEnderecoChange} placeholder="CEP" />
              <input name="cidade" value={novoEndereco.cidade} onChange={handleEnderecoChange} placeholder="Cidade" />
              <input name="logradouro" value={novoEndereco.logradouro} onChange={handleEnderecoChange} placeholder="Logradouro" />
              <input name="bairro" value={novoEndereco.bairro} onChange={handleEnderecoChange} placeholder="Bairro" />
            </div>

            <div className="linha">
              <input name="estado" value={novoEndereco.estado} onChange={handleEnderecoChange} placeholder="Estado" />
              <input name="pais" value={novoEndereco.pais} onChange={handleEnderecoChange} placeholder="País" />

              <button className="add-btn" onClick={adicionarEndereco}>Adicionar</button>
            </div>
          </div>

          <div className="enderecos-tabela-area">
            {listaEnderecos.length === 0 ? (
              <p className="texto-tabela-vazia">Nenhum endereço cadastrado</p>
            ) : (
              <table className="enderecos-tabela">
                <thead>
                  <tr>
                    <th>CEP</th>
                    <th>Cidade</th>
                    <th>Logradouro</th>
                    <th>Bairro</th>
                    <th>Estado</th>
                    <th>País</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {listaEnderecos.map((end, index) => (
                    <tr key={index}>
                      <td>{end.cep}</td>
                      <td>{end.cidade}</td>
                      <td>{end.logradouro}</td>
                      <td>{end.bairro}</td>
                      <td>{end.estado}</td>
                      <td>{end.pais}</td>
                      <td><button className="tabela-excluir" onClick={() => removerEndereco(index)}>Excluir</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {}
      {activeTab === "contatos" && (
        <>
          <div className="meusdados-box">
            <div className="linha">
              <input name="nome" value={novoContato.nome} onChange={handleContatoChange} placeholder="Nome" />
              <input name="celular" value={novoContato.celular} onChange={handleContatoChange} placeholder="Celular" />
              <input name="email" value={novoContato.email} onChange={handleContatoChange} placeholder="E-mail" />
              <input name="telefone" value={novoContato.telefone} onChange={handleContatoChange} placeholder="Telefone" />
            </div>

            <button className="add-btn" onClick={adicionarContato}>Adicionar Contato</button>
          </div>

          <div className="enderecos-tabela-area">
            {listaContatos.length === 0 ? (
              <p className="texto-tabela-vazia">Nenhum contato cadastrado</p>
            ) : (
              <table className="enderecos-tabela">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Celular</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {listaContatos.map((c, index) => (
                    <tr key={index}>
                      <td>{c.nome}</td>
                      <td>{c.celular}</td>
                      <td>{c.email}</td>
                      <td>{c.telefone}</td>
                      <td><button className="tabela-excluir" onClick={() => removerContato(index)}>Excluir</button></td>
                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </div>
        </>
      )}

      {}
      {activeTab === "condicoes" && (
        <>
          <div className="meusdados-box">
            <div className="linha">
              <input name="pedidoMinimo" value={novaCondicao.pedidoMinimo} onChange={handleCondicaoChange} placeholder="Pedido mínimo" />
              <input name="cashback" value={novaCondicao.cashback} onChange={handleCondicaoChange} placeholder="Cashback %" />
              <input name="tabelaPreco" value={novaCondicao.tabelaPreco} onChange={handleCondicaoChange} placeholder="Tabela de preço" />
            </div>

            <div className="linha">
              <input name="prazoEntrega" value={novaCondicao.prazoEntrega} onChange={handleCondicaoChange} placeholder="Prazo entrega" />
              <input name="condicoesEspeciais" value={novaCondicao.condicoesEspeciais} onChange={handleCondicaoChange} placeholder="Condições especiais" />
              <input name="estadoCondicao" value={novaCondicao.estadoCondicao} onChange={handleCondicaoChange} placeholder="Estado" />
            </div>

            <button className="add-btn" onClick={adicionarCondicao}>Adicionar Condição</button>
          </div>

          <div className="enderecos-tabela-area">
            {listaCondicoes.length === 0 ? (
              <p className="texto-tabela-vazia">Nenhuma condição cadastrada</p>
            ) : (
              <table className="enderecos-tabela">
                <thead>
                  <tr>
                    <th>Pedido mínimo</th>
                    <th>Cashback</th>
                    <th>Tabela</th>
                    <th>Entrega</th>
                    <th>Estado</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {listaCondicoes.map((c, index) => (
                    <tr key={index}>
                      <td>{c.pedidoMinimo}</td>
                      <td>{c.cashback}</td>
                      <td>{c.tabelaPreco}</td>
                      <td>{c.prazoEntrega}</td>
                      <td>{c.estadoCondicao}</td>
                      <td><button className="tabela-excluir" onClick={() => removerCondicao(index)}>Excluir</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {}
      {activeTab === "produtos" && (
        <>
          <div className="meusdados-box">

            <div className="linha">
              <input name="produto" value={novoProduto.produto} onChange={handleProdutoChange} placeholder="Produto" />
              <input name="embalagem" value={novoProduto.embalagem} onChange={handleProdutoChange} placeholder="Embalagem" />
            </div>

            <div className="linha">
              <input name="codigoBarras" value={novoProduto.codigoBarras} onChange={handleProdutoChange} placeholder="Código de barras" />
              <input name="valor" value={novoProduto.valor} onChange={handleProdutoChange} placeholder="Valor" />
            </div>

            <button className="add-btn" onClick={adicionarProduto}>Adicionar Produto</button>

          </div>

          <div className="enderecos-tabela-area">
            {listaProdutos.length === 0 ? (
              <p className="texto-tabela-vazia">Nenhum produto cadastrado</p>
            ) : (
              <table className="enderecos-tabela">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Embalagem</th>
                    <th>Código</th>
                    <th>Valor</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {listaProdutos.map((p, index) => (
                    <tr key={index}>
                      <td>{p.produto}</td>
                      <td>{p.embalagem}</td>
                      <td>{p.codigoBarras}</td>
                      <td>{p.valor}</td>
                      <td><button className="tabela-excluir" onClick={() => removerProduto(index)}>Excluir</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {}
      {activeTab === "campanhas" && (
        <>
          <div className="meusdados-box">

            <div className="linha">
              <input name="descricao" value={novaCampanha.descricao} onChange={handleCampanhaChange} placeholder="Descrição" />
              <input name="tempo" value={novaCampanha.tempo} onChange={handleCampanhaChange} placeholder="Tempo" />
            </div>

            <button className="add-btn" onClick={adicionarCampanha}>Adicionar Campanha</button>

          </div>

          <div className="enderecos-tabela-area">
            {listaCampanhas.length === 0 ? (
              <p className="texto-tabela-vazia">Nenhuma campanha cadastrada</p>
            ) : (
              <table className="enderecos-tabela">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Tempo</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {listaCampanhas.map((c, index) => (
                    <tr key={index}>
                      <td>{c.descricao}</td>
                      <td>{c.tempo}</td>
                      <td><button className="tabela-excluir" onClick={() => removerCampanha(index)}>Excluir</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

    </div>
  );
}
