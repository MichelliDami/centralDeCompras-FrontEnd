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

  const [products, setProducts] = useState([]);


  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = async () => {
  try {
    const response = await fetch("https://centraldecompras.onrender.com/suppliers");
    const data = await response.json();
    setSuppliers(data);
  } catch (err) {
    console.error("Erro ao buscar fornecedores:", err);
  }
 };

 const fetchProducts = async () => {
  try {
    const response = await fetch("https://centraldecompras.onrender.com/products");
    const data = await response.json();
    setProducts(data);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
  }
};





  return (
    <div className={`buyer-container ${collapsed ? "collapsed" : ""}`}>

      {}
      <aside className="buyer-sidebar">
        <h2 className="buyer-hello">Olá!</h2>
        <p className="buyer-username">*nome do usuário cadastrado*</p>

        <nav className="buyer-menu">
          <button
            className={`menu-item ${selectedPage === "menu" ? "selected" : ""}`}
            onClick={() => { setSelectedPage("menu"); setSelectedTab(null); }}
          >
            Menu principal
          </button>

          <button
            className={`menu-item ${selectedPage === "fornecedor" ? "selected" : ""}`}
            onClick={() => {
            setSelectedPage("fornecedor");
            setSelectedTab(null);
            fetchSuppliers();   
            }}
          >
            Fornecedor
          </button>

          <button
            className={`menu-item ${selectedPage === "visualizar" ? "selected" : ""}`}
            onClick={() => { setSelectedPage("visualizar"); setSelectedTab(null); }}
          >
            Visualizar
          </button>

          <button
            className={`menu-item ${selectedPage === "cadastrar" ? "selected" : ""}`}
            onClick={() => { setSelectedPage("cadastrar"); setSelectedTab(null); }}
          >
            Cadastrar
          </button>
        </nav>

        {}
        <button className="buyer-arrow" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "<" : ">"}
        </button>
      </aside>

      {}
      <main className="buyer-main">

        {}
        {selectedPage !== "visualizar" && selectedPage !== "cadastrar" && (
          <div className="buyer-header">
            <span>{titles[selectedPage]}</span>
          </div>
        )}

        <div className="buyer-content">

          {}
          {selectedPage === "menu" && <div className="buyer-empty"></div>}

          {}
          {selectedPage === "fornecedor" && (
  <div className="buyer-box">
    <div className="supplier-list">
      {suppliers.length === 0 ? (
        <p>Nenhum fornecedor encontrado.</p>
      ) : (
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((s) => (
              <tr key={s._id}>
                <td>{s.supplier_name}</td>
                <td>{s.supplier_category}</td>
                <td>{s.contact_email}</td>
                <td>{s.phone_number}</td>
                <td>{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
)}


          {}
          {selectedPage === "cadastrar" && (
            <div className="buyer-visualizar-box">

              <div className="buyer-view-tabs">
                <button onClick={() => setSelectedTab("pedido")}>Pedido</button>
                <button onClick={() => setSelectedTab("geral")}>Geral</button>
                <button onClick={() => setSelectedTab("endereco")}>Endereço</button>
                <button onClick={() => setSelectedTab("contato")}>Contato</button>
              </div>

              <div className="buyer-info-box">

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

    <button className="btn-concluir">Concluir pedido</button>
  </div>
)}

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

    <button className="btn-salvar">Salvar</button>

  </div>
)}

               {selectedTab === "endereco" && (
  <div className="cadastro-endereco-box">

    <div className="linha-inputs">
      <input type="text" placeholder="CEP" />
      <input type="text" placeholder="Cidade" />
      <input type="text" placeholder="Logradouro" />
      <input type="text" placeholder="Bairro" />
    </div>

    <div className="linha-inputs">
      <input type="text" placeholder="País" className="campo-grande" />
    </div>

    <button className="btn-adicionar-endereco">Adicionar</button>

  </div>
)}


               {selectedTab === "contato" && (
  <div className="cadastro-contato-box">

    <div className="linha-inputs">
      <input type="text" placeholder="Nome do contato" />
      <input type="text" placeholder="Celular" />
      <input type="text" placeholder="E-mail" />
      <input type="text" placeholder="Telefone" />
    </div>

    <button className="btn-adicionar">Adicionar</button>

  </div>
)}

              </div>
            </div>
          )}

          {}
          {selectedPage === "visualizar" && (
            <div className="buyer-visualizar-box">

              <div className="buyer-view-tabs">
                <button
  onClick={() => {
    setSelectedTab("produto");
    fetchProducts();  // faz o GET de todos os produtos
  }}
>
  Produto
</button>
                <button onClick={() => setSelectedTab("campanha")}>Campanha</button>
                <button onClick={() => setSelectedTab("tabela")}>Tabela de preço</button>
                <button onClick={() => setSelectedTab("catalogo")}>Catálogo digital</button>
              </div>

              <div className="buyer-info-box">

                {selectedTab === "produto" && (
  <div className="product-list">

    {products.length === 0 ? (
      <p>Nenhum produto encontrado.</p>
    ) : (
      <table className="product-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>R$ {p.price}</td>
              <td>{p.stock_quantity}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

  </div>
)}


                {selectedTab === "campanha" && (
                  <p>Aqui aparece a lista de campanhas</p>
                )}

                {selectedTab === "tabela" && (
                  <p>Aqui aparece a tabela de preços</p>
                )}

                {selectedTab === "catalogo" && (
                  <p>Aqui aparece o catálogo digital</p>
                )}

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
