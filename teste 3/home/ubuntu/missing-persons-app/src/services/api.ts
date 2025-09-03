import axios, { AxiosError } from 'axios';
import type { Person, PersonResponse, PersonSearchParams, InformationSubmission } from '../types/Person';
import { mockPersons, createMockResponse } from './mockData';

const API_BASE_URL = 'https://abitus-api.geia.vip';
const USE_MOCK_DATA = true; // Altere para false quando a API estiver funcionando

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('Erro na API:', error);
    
    // Adiciona informações contextuais ao erro
    if (error.response) {
      // Erro de resposta do servidor
      const customError = new Error(`Erro ${error.response.status}: ${error.response.statusText}`);
      (customError as any).response = error.response;
      (customError as any).status = error.response.status;
      throw customError;
    } else if (error.request) {
      // Erro de rede
      const networkError = new Error('Erro de conexão. Verifique sua internet.');
      (networkError as any).request = error.request;
      throw networkError;
    } else {
      // Erro de configuração
      throw new Error('Erro na configuração da requisição.');
    }
  }
);

export const personService = {
  // Listar pessoas com paginação e filtros
  async getPersons(params: PersonSearchParams = {}): Promise<PersonResponse> {
    if (USE_MOCK_DATA) {
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return createMockResponse(
        params.page || 0,
        params.size || 10,
        params.name,
        params.status
      );
    }

    try {
      const response = await api.get('/api/v1/person', { params });
      
      // Validação básica da resposta
      if (!response.data || !Array.isArray(response.data.content)) {
        throw new Error('Formato de resposta inválido da API');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.status === 404) {
        throw new Error('Nenhuma pessoa encontrada com os critérios especificados');
      } else if (error.status >= 500) {
        throw new Error('Erro no servidor. Tente novamente mais tarde');
      }
      throw new Error(error.message || 'Erro ao buscar pessoas desaparecidas');
    }
  },

  // Obter detalhes de uma pessoa específica
  async getPersonById(id: string): Promise<Person> {
    if (USE_MOCK_DATA) {
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const person = mockPersons.find(p => p.id === id);
      if (!person) {
        throw new Error('Pessoa não encontrada');
      }
      return person;
    }

    try {
      if (!id || id.trim() === '') {
        throw new Error('ID da pessoa é obrigatório');
      }
      
      const response = await api.get(`/api/v1/person/${encodeURIComponent(id)}`);
      
      if (!response.data) {
        throw new Error('Dados da pessoa não encontrados');
      }
      
      return response.data;
    } catch (error: any) {
      if (error.status === 404) {
        throw new Error('Pessoa não encontrada');
      } else if (error.status >= 500) {
        throw new Error('Erro no servidor. Tente novamente mais tarde');
      }
      throw new Error(error.message || 'Erro ao buscar detalhes da pessoa');
    }
  },

  // Enviar informações sobre uma pessoa (simulado - pode não existir na API real)
  async submitInformation(data: InformationSubmission): Promise<void> {
    // A validação de dados (campos obrigatórios, tamanho e tipo de arquivo)
    // pode ser movida para o componente InfoForm.tsx para uma melhor separação de responsabilidades.
    // O serviço agora foca apenas na transmissão dos dados.
    try {
      // Como a API pode não ter esse endpoint, vamos simular o envio
      console.log('Informações enviadas:', {
        ...data,
        fotos: data.fotos?.map(f => ({ name: f.name, size: f.size, type: f.type }))
      });
      
      // Simulação de delay para parecer real
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulação de possível erro (5% de chance)
      if (Math.random() < 0.05) {
        throw new Error('Erro temporário no servidor. Tente novamente.');
      }
      
      // await api.post('/api/v1/information', formData);
      
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao enviar informações');
    }
  }
};

export default api;
