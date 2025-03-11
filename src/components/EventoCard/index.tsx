import EventoResponseProps from "./interface";

export default function EventoCard(evento : EventoResponseProps) {
    return (
        <div className="border p-3 m-7 rounded flex flex-col">
            <p className="">ID: <b>{evento.id}</b></p>
            <h2 className="">Descrição: <b>{evento.descricao}</b></h2>
            <p className="">Data e Hora: <b>{evento.dataHoraFormatada}</b></p>
            <p className="">Buffet: <b>{evento.buffet.nome}</b></p>
            <p className="">Endereço do Buffet: <b>{evento.buffet.endereco}</b></p>
            <p className="">Nome do Dono do Buffet: <b>{evento.buffet.nomeDono}</b></p>
            <p className="">Tema da Decoração: <b>{evento.decoracao.tema}</b></p>
            <p className="">Descrição da Decoração: <b>{evento.decoracao.descricao}</b></p>
        </div>
    );

}