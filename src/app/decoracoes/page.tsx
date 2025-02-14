"use client";

import DecoracaoCard from "@/components/DecoracaoCard";
import { useState, useEffect } from "react";
import { DecoracaoService } from "@/service/DecoracaoService";
import DecoracaoCardProps from "@/components/DecoracaoCard/interface";

export default function Decoracoes() {

  const decoracaoService = new DecoracaoService();
  const [novaDecoracao, setNovaDecoracao] = useState({
    tema: "",
    descricao: "",
  });
  const [decoracoes, setDecoracoes] = useState<DecoracaoCardProps[]>([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);


  const handleSalvar = () => {
    if (!novaDecoracao.tema || !novaDecoracao.descricao) {
      alert("Preencha todos os campos!");
      return;
    }

    decoracaoService
      .cadastrar(novaDecoracao)
      .then((response) => {
        setDecoracoes([...decoracoes, response.data]);
        setNovaDecoracao({ tema: "", descricao: "" });
        setMostrarFormulario(false);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar decoração:", error);
      });
  };

  useEffect(() => {
    decoracaoService
      .listarTodos()
      .then((response) => {
        setDecoracoes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar decorações:", error);
      });
  })

  return (
    <div>
      <h1 className="text-2xl text-center m-4">DECORAÇÕES CADASTRADAS</h1>

      <div className="flex justify-center">
        <button 
          className="border p-3 ml-7 bg-green-500 hover:bg-green-600 rounded-md"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
          {mostrarFormulario ? "Cancelar" : "Cadastrar Decoração"}
        </button>

        <button
          className="border p-3 ml-7 bg-red-500 hover:bg-red-600 rounded-md"
          >
          Excluir Decoração
        </button>
      </div>

      {mostrarFormulario && (
        <div className="border p-4 m-7 rounded-md">
          <h2 className="text-xl mb-4">Cadastrar nova decoração</h2>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Tema da decoração"
              value={novaDecoracao.tema}
              onChange={(e) => setNovaDecoracao({ ...novaDecoracao, tema: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Descrição da decoração"
              value={novaDecoracao.descricao}
              onChange={(e) => setNovaDecoracao({ ...novaDecoracao, descricao: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={handleSalvar} 
              className="border p-3 bg-green-500 hover:bg-green-600 rounded-md">
              Salvar
            </button>
          </div>
        </div>
      )}


      {decoracoes.map((decoracao) => (
        <DecoracaoCard
          key={decoracao.id}
          id={decoracao.id}
          tema={decoracao.tema}
          descricao={decoracao.descricao}
        />))
      }

    </div>
  );
}