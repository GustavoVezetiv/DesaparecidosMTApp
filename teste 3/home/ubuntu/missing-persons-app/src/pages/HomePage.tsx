import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { personService } from '../services/api';
import type { Person, PersonSearchParams } from '../types/Person';
import PersonCard from '../components/PersonCard';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const pageSize = 10;

  const fetchPersons = async (params: PersonSearchParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const searchParams: PersonSearchParams = {
        page: currentPage - 1, // API usa base 0
        size: pageSize,
        ...params
      };

      if (searchTerm) {
        searchParams.name = searchTerm;
      }

      if (statusFilter) {
        searchParams.status = statusFilter;
      }

      const response = await personService.getPersons(searchParams);
      setPersons(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('Erro ao carregar a lista de pessoas desaparecidas. Tente novamente.');
      console.error('Erro ao buscar pessoas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, [currentPage, searchTerm, statusFilter]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset para primeira página ao buscar
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset para primeira página ao filtrar
  };

  const handlePersonClick = (id: string) => {
    navigate(`/person/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRetry = () => {
    fetchPersons();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pessoas Desaparecidas
            </h1>
            <p className="text-gray-600">
              Sistema de busca e informações sobre pessoas desaparecidas
            </p>
          </div>
        </div>
      </header>

      {/* Filtros e Busca */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <SearchInput 
              onSearch={handleSearch}
              placeholder="Buscar por nome..."
            />
            
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os status</option>
                <option value="Desaparecida">Desaparecida</option>
                <option value="Localizada">Localizada</option>
              </select>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        {loading ? (
          <LoadingSpinner text="Carregando pessoas..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : (
          <>
            {/* Resultados */}
            <div className="mb-6">
              <p className="text-gray-600">
                {persons.length > 0 
                  ? `Mostrando ${persons.length} resultado(s)`
                  : 'Nenhuma pessoa encontrada'
                }
              </p>
            </div>

            {/* Grid de Cards */}
            {persons.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {persons.map((person) => (
                    <PersonCard
                      key={person.id}
                      person={person}
                      onClick={handlePersonClick}
                    />
                  ))}
                </div>

                {/* Paginação */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma pessoa encontrada
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros de busca ou remover alguns termos.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;

