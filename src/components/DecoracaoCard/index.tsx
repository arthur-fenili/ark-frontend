import DecoracaoCardProps from "./interface";

export default function DecoracaoCard( decoracao  : DecoracaoCardProps) {
    return (
        <div className="border p-3 m-7 rounded flex flex-col">
            <p className="">ID: <b>{decoracao.id}</b></p>
            <h2 className="">Tema: <b>{decoracao.tema}</b></h2>
            <p className="">Descrição: <b>{decoracao.descricao}</b></p>
        </div>
    );
}