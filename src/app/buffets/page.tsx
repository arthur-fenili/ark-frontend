"use client";

import BuffetCard from "@/components/BuffetCard";
import { useState, useEffect, useRef } from "react";
import { BuffetService } from "@/service/BuffetService";
import BuffetCardProps from "@/components/BuffetCard/interface";


export default function Buffets() {


  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarModalExclusao, setMostrarModalExclusao] = useState(false);
  const [buffetSelecionado, setBuffetSelecionado] = useState<string>("");
  const [novoBuffet, setNovoBuffet] = useState({
    nome: "",
    nomeDono: "",
    endereco: ""
  });
  const [buffets, setBuffets] = useState<BuffetCardProps[]>([]);
  const buffetService = new BuffetService();



  const handleSalvar = () => {
    if (!novoBuffet.nome || !novoBuffet.nomeDono || !novoBuffet.endereco) {
      alert("Preencha todos os campos!");
      return;
    }

    buffetService
      .cadastrar(novoBuffet)
      .then((response) => {
        setBuffets([...buffets, response.data]);
        setNovoBuffet({ nome: "", nomeDono: "", endereco: "" });
        setMostrarFormulario(false);
        // TODO: adicionar um pop-up de sucesso que nao seja alert
      })
      .catch((error) => {
        console.error("Erro ao cadastrar buffet:", error);
      });
  };

  const handleExcluir = () => {
    if (!buffetSelecionado){
      alert("Selecione um buffet para excluir");
      return;
    }

    buffetService
      .excluir(Number(buffetSelecionado))
      .then(() => {
        setBuffets(buffets.filter((b) => b.id !== Number(buffetSelecionado)));
        setMostrarModalExclusao(false);
      })
      .catch((error) => {
        console.error("Erro ao excluir buffet:", error);
      });
  }


  useEffect(() => {
    buffetService.listarTodos()
      .then((response) => {
        setBuffets(response.data);
      })
      .catch((error) => {
        console.error("Erro ao listar buffets:",error);
      }); 
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-center m-4">BUFFETS CADASTRADOS</h1>

      <div className="flex justify-center">
        <button 
          className="border p-3 ml-7 bg-green-500 hover:bg-green-600 rounded-md" 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cancelar" : "Cadastrar Buffet"}
        </button>
        
        <button 
        className="border p-3 ml-7 bg-red-500 hover:bg-red-600 rounded-md"
        onClick={() => setMostrarModalExclusao(true)}>
          Excluir Buffet
        </button>
      </div>
      
      {mostrarFormulario && (
        <div className="border p-4 m-7 rounded-md">
          <h2 className="text-xl mb-4">Cadastrar Novo Buffet</h2>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nome do Buffet"
              value={novoBuffet.nome}
              onChange={(e) => setNovoBuffet({ ...novoBuffet, nome: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Nome do Dono"
              value={novoBuffet.nomeDono}
              onChange={(e) => setNovoBuffet({ ...novoBuffet, nomeDono: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Endereço"
              value={novoBuffet.endereco}
              onChange={(e) => setNovoBuffet({ ...novoBuffet, endereco: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={handleSalvar}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </div>
      )}

      {mostrarModalExclusao && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Excluir Buffet</h2>
            <select
              value={buffetSelecionado}
              onChange={(e) => setBuffetSelecionado(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Selecione um buffet</option>
              {buffets.map((buffet) => (
                <option key={buffet.id} value={buffet.id}>
                  {buffet.nome}
                </option>
              ))}
            </select>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setMostrarModalExclusao(false)}
                className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleExcluir}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

      {buffets.map((buffet) => (
        <BuffetCard 
          key={buffet.id}
          nomeDono={buffet.nomeDono}
          nome={buffet.nome}
          endereco={buffet.endereco}
          id={buffet.id} 
        />
      ))}
    </div>
  );
}