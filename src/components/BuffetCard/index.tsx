import BuffetCardProps from "./interface";

export default function BuffetCard( buffet  : BuffetCardProps) {



    return (
        <div className="border p-3 m-7 rounded flex flex-col"> 
            <p className="">ID: <b>{buffet.id}</b></p>
            <h2 className="">Buffet: <b>{buffet.nome}</b></h2>
            <p className="">Dono: <b>{buffet.nomeDono}</b></p>
            <p className="">Endereço: <b>{buffet.endereco}</b></p>
        </div>
    );
}