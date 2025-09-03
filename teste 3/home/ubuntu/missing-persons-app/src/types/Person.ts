export interface Person {
  id: string;
  nome: string;
  idade: number;
  status: 'Desaparecida' | 'Localizada';
  foto?: string;
  descricao?: string;
  dataDesaparecimento?: string;
  localDesaparecimento?: string;
  telefoneContato?: string;
  observacoes?: string;
}

export interface PersonSearchParams {
  page?: number;
  size?: number;
  name?: string;
  status?: string;
}

export interface PersonResponse {
  content: Person[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface InformationSubmission {
  personId: string;
  observacoes: string;
  localizacao: string;
  fotos?: File[];
}

