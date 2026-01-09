import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { personService } from '../services/api';
import type { Person, PersonSearchParams } from '../types/Person';
import PersonCard from '../components/PersonCard';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

// Pagina principal com listagem de pessoas desaparecidas
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const pageSize = 12;

  const fetchPersons = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Monta os parametros conforme a API espera
      const searchParams: PersonSearchParams = {
        page: currentPage - 1, // API comeca em 0
        size: pageSize,
      };

      // Adiciona filtro de nome se tiver
      if (searchTerm.trim()) {
        searchParams.nome = searchTerm.trim();
      }

      // Adiciona filtro de status se tiver
      if (statusFilter) {
        searchParams.status = statusFilter;
      }

      const response = await personService.getPersons(searchParams);
      setPersons(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (err) {
      setError('Não foi possível carregar os dados. Tente novamente.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, pageSize]);

  useEffect(() => {
    fetchPersons();
  }, [fetchPersons]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Volta pra primeira pagina
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Volta pra primeira pagina
  };

  const handlePersonClick = (id: string) => {
    navigate(`/person/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    fetchPersons();
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      {/* Header estilizado */}
      <header className="header-gradient text-white py-8 md:py-12 relative">
        <div className="container-app relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight">
              Pessoas Desaparecidas
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Sistema de busca e informações sobre pessoas desaparecidas no Mato Grosso
            </p>

            {/* Stats rapidos */}
            {!loading && !error && (
              <div className="flex justify-center gap-8 mt-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{totalElements.toLocaleString()}</div>
                  <div className="text-sm text-blue-200">Registros</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{totalPages}</div>
                  <div className="text-sm text-blue-200">Páginas</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Area de busca e filtros */}
      <div className="container-app -mt-6 relative z-20">
        <div className="glass-card rounded-2xl p-6 shadow-glow">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <SearchInput
              onSearch={handleSearch}
              placeholder="Digite o nome para buscar..."
            />

            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="select-styled min-w-[180px]"
            >
              <option value="">Todos os status</option>
              <option value="DESAPARECIDO">Desaparecidos</option>
              <option value="LOCALIZADO">Localizados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Conteudo principal */}
      <div className="container-app py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner text="Buscando registros..." />
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        ) : (
          <>
            {/* Info de resultados */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-300">
                {persons.length > 0
                  ? `Mostrando ${persons.length} de ${totalElements.toLocaleString()} registros`
                  : 'Nenhum resultado encontrado'
                }
              </p>
              <p className="text-slate-400 text-sm">
                Página {currentPage} de {totalPages}
              </p>
            </div>

            {/* Grid de cards */}
            {persons.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                  {persons.map((person, index) => (
                    <div
                      key={person.id}
                      style={{ animationDelay: `${index * 50}ms` }}
                      className="animate-fadeIn"
                    >
                      <PersonCard
                        person={person}
                        onClick={handlePersonClick}
                      />
                    </div>
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 rounded-full mb-6">
                  <svg
                    className="w-10 h-10 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Tente mudar os termos da busca ou remover alguns filtros.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer simples */}
      <footer className="border-t border-slate-800 py-6">
        <div className="container-app text-center text-slate-500 text-sm">
          <p>Sistema de Pessoas Desaparecidas - Mato Grosso</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
