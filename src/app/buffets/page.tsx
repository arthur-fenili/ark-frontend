"use client";

import BuffetCard from "@/components/BuffetCard";
import { useState, useEffect } from "react";
import { BuffetService } from "@/service/BuffetService";
import BuffetCardProps from "@/components/BuffetCard/interface";


export default function Buffets() {


  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
      })
      .catch((error) => {
        console.error("Erro ao cadastrar buffet:", error);
      });
  };

  useEffect(() => {
    buffetService.listarTodos()
      .then((response) => {
        setBuffets(response.data);
      })
      .catch((error) => {
        console.error(error);
      }); 
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-center m-4">BUFFETS CADASTRADOS</h1>
      <button 
        className="border p-3 ml-7 bg-green-500 hover:bg-green-600 rounded-md" 
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? "Cancelar" : "Cadastrar Buffet"}
      </button>
      <button className="border p-3 ml-7 bg-red-500 hover:bg-red-600 rounded-md">
        Excluir Buffet
      </button>

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