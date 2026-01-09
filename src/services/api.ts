import axios, { AxiosError } from 'axios';
import type { Person, PersonResponse, PersonSearchParams, InformationSubmission } from '../types/Person';

const API_BASE_URL = 'https://abitus-api.geia.vip';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tratamento de erros da API
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('Erro na requisição:', error);

    if (error.response) {
      const customError = new Error(`Erro ${error.response.status}: ${error.response.statusText}`);
      (customError as any).response = error.response;
      (customError as any).status = error.response.status;
      throw customError;
    } else if (error.request) {
      const networkError = new Error('Falha na conexão. Verifique sua internet.');
      (networkError as any).request = error.request;
      throw networkError;
    } else {
      throw new Error('Erro ao processar a requisição.');
    }
  }
);

export const personService = {
  // Busca pessoas com paginacao e filtros
  async getPersons(params: PersonSearchParams = {}): Promise<PersonResponse> {
    try {
      // Converte os parametros para o formato da API
      const apiParams: Record<string, any> = {};

      // A API usa 'pagina' ao inves de 'page' (começa em 0)
      if (params.page !== undefined) {
        apiParams.pagina = params.page;
      }

      // A API usa 'porPagina' ao inves de 'size'
      if (params.size !== undefined) {
        apiParams.porPagina = params.size;
      }

      // A API usa 'nome' ao inves de 'name'
      if (params.nome && params.nome.trim() !== '') {
        apiParams.nome = params.nome.trim();
      }

      // Status filter se houver
      if (params.status) {
        apiParams.status = params.status;
      }

      console.log('Buscando com parametros:', apiParams);

      const response = await api.get('/v1/pessoas/aberto/filtro', { params: apiParams });

      if (!response.data || !Array.isArray(response.data.content)) {
        throw new Error('Resposta da API em formato incorreto');
      }

      return response.data;
    } catch (error: any) {
      if (error.status === 404) {
        throw new Error('Nenhum resultado encontrado');
      } else if (error.status >= 500) {
        throw new Error('Servidor indisponível. Tente mais tarde.');
      }
      throw new Error(error.message || 'Falha ao buscar dados');
    }
  },

  // Busca detalhes de uma pessoa
  async getPersonById(id: string): Promise<Person> {
    try {
      if (!id || id.trim() === '') {
        throw new Error('ID inválido');
      }

      const response = await api.get(`/v1/pessoas/${encodeURIComponent(id)}`);

      if (!response.data) {
        throw new Error('Pessoa não encontrada');
      }

      return response.data;
    } catch (error: any) {
      if (error.status === 404) {
        throw new Error('Pessoa não encontrada');
      } else if (error.status >= 500) {
        throw new Error('Servidor indisponível. Tente mais tarde.');
      }
      throw new Error(error.message || 'Falha ao buscar detalhes');
    }
  },

  // Envia informacoes sobre uma pessoa
  async submitInformation(data: InformationSubmission): Promise<void> {
    try {
      console.log('Dados enviados:', {
        ...data,
        fotos: data.fotos?.map(f => ({ name: f.name, size: f.size, type: f.type }))
      });

      await new Promise(resolve => setTimeout(resolve, 1500));

      if (Math.random() < 0.05) {
        throw new Error('Erro temporário. Tente novamente.');
      }

    } catch (error: any) {
      throw new Error(error.message || 'Falha ao enviar informações');
    }
  }
};

export default api;
