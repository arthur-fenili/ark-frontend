import axios from 'axios';
import EventoRequestProps from '@/components/EventoCard/interface';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
});

export class EventoService{
    listarTodos(){
        return axiosInstance.get('/api/eventos');
    }

    cadastrar(evento: EventoRequestProps){
        return axiosInstance.post('/api/eventos', evento);
    }

    excluir(id: number){
        return axiosInstance.delete(`/api/eventos/${id}`);
    }

    atualizar(evento: EventoRequestProps){
        return axiosInstance.put(`/api/eventos/${evento.id}`, evento);
    }
}