import React, { useState } from "react";
import "./Buyer.css";

export default function Buyer() {
  const [selectedPage, setSelectedPage] = useState("menu");
  const [selectedTab, setSelectedTab] = useState(null);

  const [collapsed, setCollapsed] = useState(false);

  const titles = {
    menu: "Menu Principal",
    fornecedor: "Fornecedor",
    visualizar: "Visualizar",
    cadastrar: "Cadastrar"
  };

  return (
    <div className={`buyer-container ${collapsed ? "collapsed" : ""}`}>

      {/* SIDEBAR */}
      <aside className="buyer-sidebar">
        {!collapsed && (
          <>
            <h2 className="buyer-hello">Olá!</h2>
            <p className="buyer-username">*nome do usuário cadastrado*</p>
          </>
        )}

        <nav className="buyer-menu">

          <button
            className={`menu-item ${selectedPage === "menu" ? "selected" : ""}`}
            onClick={() => { setSelectedPage("menu"); setSelectedTab(null); }}
          >
            <span>Menu principal</span>
          </button>

          <button
            className={`menu-item ${selectedPage === "fornecedor" ? "selected" : ""}`}
            onClick={() => { setSelectedPage("fornecedor"); setSelectedTab(null); }}
          >
            <span>Fornecedor</span>
          </button>

          <button
            className={`menu-item ${selectedPage === "visualizar" ? "selected" : ""}`}
            onClick={() => { setSelectedPage("visualizar"); setSelectedTab(null); }}
          >
            <span>Visualizar</span>
          </button>

          <button
            className={`menu-item ${selectedPage === "cadastrar" ? "selected" : ""}`}
            onClick={() => { setSelectedPage("cadastrar"); setSelectedTab(null); }}
          >
            <span>Cadastrar</span>
          </button>

        </nav>

        <button className="buyer-arrow" onClick={() => setCollapsed(!collapsed)}>
          <span>{collapsed ? ">" : "<"}</span>
        </button>
      </aside>

      {/* MAIN */}
      <main className="buyer-main">

        {/* HEADER */}
        {selectedPage !== "visualizar" && selectedPage !== "cadastrar" && (
          <div className="buyer-header">
            <span>{titles[selectedPage]}</span>
          </div>
        )}

        <div className="buyer-content">

          {selectedPage === "menu" && <div className="buyer-empty"></div>}

          {selectedPage === "fornecedor" && (
            <div className="buyer-box">
              <p className="buyer-placeholder">Aqui puxa os fornecedores</p>
            </div>
          )}

          {/* CADASTRAR */}
          {selectedPage === "cadastrar" && (
            <div className="buyer-visualizar-box">

              <div className="buyer-view-tabs">
                <button onClick={() => setSelectedTab("pedido")}><span>Pedido</span></button>
                <button onClick={() => setSelectedTab("geral")}><span>Geral</span></button>
                <button onClick={() => setSelectedTab("endereco")}><span>Endereço</span></button>
                <button onClick={() => setSelectedTab("contato")}><span>Contato</span></button>
              </div>

              <div className="buyer-info-box">

                {/* Pedido */}
                {selectedTab === "pedido" && (
                  <div className="cadastro-pedido-box">

                    <table className="cadastro-pedido-tabela">
                      <tbody>
                        <tr>
                          <td><input type="text" placeholder="Código" /></td>
                          <td><input type="text" placeholder="Produto" /></td>
                          <td><input type="text" placeholder="Embalagens" /></td>
                          <td><input type="number" placeholder="Qtde" /></td>
                          <td><input type="number" placeholder="Valor total" /></td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="imagem-importar">
                      <input type="file" id="imgUpload" />
                      <label htmlFor="imgUpload">Imagem (importar)</label>
                    </div>

                    <button className="btn-concluir"><span>Concluir pedido</span></button>

                  </div>
                )}

                {/* Geral */}
                {selectedTab === "geral" && (
                  <div className="cadastro-geral-box">

                    <div className="linha-inputs">
                      <input type="text" placeholder="Razão Social" />
                      <input type="text" placeholder="CNPJ" />
                      <input type="text" placeholder="Nome fantasia" />
                      <input type="text" placeholder="Classificação" />
                    </div>

                    <div className="linha-inputs">
                      <textarea placeholder="Observações"></textarea>
                    </div>

                    <button className="btn-salvar"><span>Salvar</span></button>

                  </div>
                )}

                {/* Endereço */}
                {selectedTab === "endereco" && (
                  <div className="cadastro-endereco-box">

                    <div className="linha-inputs">
                      <input type="text" placeholder="CEP" />
                      <input type="text" placeholder="Cidade" />
                      <input type="text" placeholder="Logradouro" />
                      <input type="text" placeholder="Bairro" />
                    </div>

                    <button className="btn-adicionar-endereco"><span>Adicionar</span></button>

                  </div>
                )}

                {/* Contato */}
                {selectedTab === "contato" && (
                  <div className="cadastro-contato-box">

                    <div className="linha-inputs">
                      <input type="text" placeholder="Nome do contato" />
                      <input type="text" placeholder="Celular" />
                      <input type="text" placeholder="E-mail" />
                      <input type="text" placeholder="Telefone" />
                    </div>

                    <button className="btn-adicionar"><span>Adicionar</span></button>

                  </div>
                )}

              </div>

            </div>
          )}

          {/* VISUALIZAR */}
          {selectedPage === "visualizar" && (
            <div className="buyer-visualizar-box">

              <div className="buyer-view-tabs">
                <button onClick={() => setSelectedTab("produto")}><span>Produto</span></button>
                <button onClick={() => setSelectedTab("campanha")}><span>Campanha</span></button>
                <button onClick={() => setSelectedTab("tabela")}><span>Tabela de preço</span></button>
                <button onClick={() => setSelectedTab("catalogo")}><span>Catálogo digital</span></button>
              </div>

              <div className="buyer-info-box">
                {selectedTab === "produto" && (<p>Aqui o backend vai trazer a tabela de produtos</p>)}
                {selectedTab === "campanha" && (<p>Aqui aparece a lista de campanhas</p>)}
                {selectedTab === "tabela" && (<p>Aqui aparece a tabela de preços</p>)}
                {selectedTab === "catalogo" && (<p>Aqui aparece o catálogo digital</p>)}
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}
