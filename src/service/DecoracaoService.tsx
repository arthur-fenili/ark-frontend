import DecoracaoCardProps from '@/components/DecoracaoCard/interface';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
});

export class DecoracaoService{
    listarTodos(){
        return axiosInstance.get('/api/decoracoes');
    }

    cadastrar(decoracao: DecoracaoCardProps){
        return axiosInstance.post('/api/decoracoes', decoracao);
    }

    excluir(id: number){
        return axiosInstance.delete(`/api/decoracoes/${id}`);
    }

    atualizar(decoracao: DecoracaoCardProps){
        return axiosInstance.put(`/api/decoracoes/${decoracao.id}`, decoracao);
    }
}