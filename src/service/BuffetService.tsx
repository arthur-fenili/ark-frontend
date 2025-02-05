import BuffetCardProps from "@/components/BuffetCard/interface";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
});

export class BuffetService{
    listarTodos(){
        return axiosInstance.get('/api/buffets');
    }

    cadastrar(buffet: BuffetCardProps){
        return axiosInstance.post('/api/buffets', buffet);
    }

    excluir(id: number){
        return axiosInstance.delete(`/api/buffets/${id}`);
    }

    atualizar(buffet: BuffetCardProps){
        return axiosInstance.put(`/api/buffets/${buffet.id}`, buffet);
    }
}