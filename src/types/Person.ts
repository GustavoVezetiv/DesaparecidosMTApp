// Tipagem baseada na resposta real da API

export interface UltimaOcorrencia {
  dtDesaparecimento: string;
  dataLocalizacao: string | null;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: {
    informacao: string | null;
    vestimentasDesaparecido: string | null;
  } | null;
  listaCartaz: string[] | null;
  ocoId: number;
}

export interface Person {
  id: number;
  nome: string;
  idade: number;
  idadeQuandoDesapareceu: number;
  sexo: string;
  vivo: boolean;
  possuiDnaColetado: boolean;
  urlFoto: string | null;
  ultimaOcorrencia: UltimaOcorrencia;
}

export interface PersonSearchParams {
  page?: number;
  size?: number;
  nome?: string;
  status?: string;
}

export interface PersonResponse {
  content: Person[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface InformationSubmission {
  personId: string;
  observacoes: string;
  localizacao: string;
  fotos?: File[];
}
