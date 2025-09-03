import type { Person, PersonResponse } from '../types/Person';

export const mockPersons: Person[] = [
  {
    id: '1',
    nome: 'Maria Silva Santos',
    idade: 28,
    status: 'Desaparecida',
    foto: 'https://via.placeholder.com/300x400?text=Maria+Silva',
    descricao: 'Mulher de 28 anos, cabelos castanhos longos, olhos castanhos, aproximadamente 1,65m de altura.',
    dataDesaparecimento: '2024-01-15',
    localDesaparecimento: 'Centro de Cuiabá, MT',
    telefoneContato: '(65) 99999-1234',
    observacoes: 'Última vez vista usando blusa azul e calça jeans. Possui tatuagem de borboleta no pulso direito.'
  },
  {
    id: '2',
    nome: 'João Carlos Oliveira',
    idade: 45,
    status: 'Localizada',
    foto: 'https://via.placeholder.com/300x400?text=João+Carlos',
    descricao: 'Homem de 45 anos, cabelos grisalhos, barba, aproximadamente 1,78m de altura.',
    dataDesaparecimento: '2024-02-20',
    localDesaparecimento: 'Várzea Grande, MT',
    telefoneContato: '(65) 98888-5678',
    observacoes: 'Encontrado em bom estado de saúde. Família foi notificada.'
  },
  {
    id: '3',
    nome: 'Ana Paula Costa',
    idade: 16,
    status: 'Desaparecida',
    foto: 'https://via.placeholder.com/300x400?text=Ana+Paula',
    descricao: 'Adolescente de 16 anos, cabelos loiros, olhos azuis, aproximadamente 1,60m de altura.',
    dataDesaparecimento: '2024-03-10',
    localDesaparecimento: 'Rondonópolis, MT',
    telefoneContato: '(65) 97777-9012',
    observacoes: 'Saiu de casa para a escola e não retornou. Usando uniforme escolar azul e branco.'
  },
  {
    id: '4',
    nome: 'Roberto Ferreira Lima',
    idade: 62,
    status: 'Desaparecida',
    foto: 'https://via.placeholder.com/300x400?text=Roberto+Lima',
    descricao: 'Idoso de 62 anos, cabelos brancos, usa óculos, aproximadamente 1,70m de altura.',
    dataDesaparecimento: '2024-02-28',
    localDesaparecimento: 'Sinop, MT',
    telefoneContato: '(65) 96666-3456',
    observacoes: 'Portador de Alzheimer. Pode estar desorientado. Última vez visto no Parque Florestal.'
  },
  {
    id: '5',
    nome: 'Carla Mendes Souza',
    idade: 34,
    status: 'Localizada',
    foto: 'https://via.placeholder.com/300x400?text=Carla+Mendes',
    descricao: 'Mulher de 34 anos, cabelos pretos cacheados, olhos verdes, aproximadamente 1,68m de altura.',
    dataDesaparecimento: '2024-01-05',
    localDesaparecimento: 'Tangará da Serra, MT',
    telefoneContato: '(65) 95555-7890',
    observacoes: 'Localizada e reunida com a família. Estava em outro estado visitando parentes.'
  }
];

export const createMockResponse = (
  page: number = 0,
  size: number = 10,
  searchTerm?: string,
  statusFilter?: string
): PersonResponse => {
  let filteredPersons = [...mockPersons];

  // Filtrar por nome se houver termo de busca
  if (searchTerm && searchTerm.trim() !== '') {
    filteredPersons = filteredPersons.filter(person =>
      person.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filtrar por status se especificado
  if (statusFilter && statusFilter !== '') {
    filteredPersons = filteredPersons.filter(person =>
      person.status === statusFilter
    );
  }

  const totalElements = filteredPersons.length;
  const totalPages = Math.ceil(totalElements / size);
  const startIndex = page * size;
  const endIndex = startIndex + size;
  const content = filteredPersons.slice(startIndex, endIndex);

  return {
    content,
    totalElements,
    totalPages,
    size,
    number: page
  };
};

