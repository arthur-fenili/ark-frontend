export default interface EventoRequestProps {
    id: number;
    descricao: string;
    data: string;
    hora: string;
    // referencia ao buffet	
    buffetId: number;
    // referencia a decoracao
    decoracaoId: number;
}


export default interface EventoResponseProps {
    id: number;
    descricao: string;
    dataHoraFormatada: string;
    buffet: {
        id: number;
        nome: string;
        endereco: string;
        nomeDono: string;
      };
      decoracao: {
        id: number;
        tema: string;
        descricao: string;
      };
}