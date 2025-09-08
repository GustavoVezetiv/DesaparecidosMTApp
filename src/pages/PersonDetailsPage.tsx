import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { personService } from '../services/api';
import type { Person, InformationSubmission } from '../types/Person';
import InfoForm from '../components/InfoForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const PersonDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInfoForm, setShowInfoForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPersonDetails(id);
    }
  }, [id]);

  const fetchPersonDetails = async (personId: string) => {
    try {
      setLoading(true);
      setError(null);
      const personData = await personService.getPersonById(personId);
      setPerson(personData);
    } catch (err) {
      setError('Erro ao carregar os detalhes da pessoa. Tente novamente.');
      console.error('Erro ao buscar detalhes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitInformation = async (data: InformationSubmission) => {
    await personService.submitInformation(data);
    setShowInfoForm(false);
  };

  const handleRetry = () => {
    if (id) {
      fetchPersonDetails(id);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informado';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner text="Carregando detalhes..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full">
          <ErrorMessage message={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pessoa não encontrada
          </h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800"
          >
            Voltar à página inicial
          </button>
        </div>
      </div>
    );
  }

  const statusColor = person.status === 'Desaparecida' 
    ? 'bg-red-100 text-red-800 border-red-200' 
    : 'bg-green-100 text-green-800 border-green-200';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Voltar à busca
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Detalhes da Pessoa
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da foto */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {person.foto ? (
                <img 
                  src={person.foto} 
                  alt={`Foto de ${person.nome}`}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x400?text=Sem+Foto';
                  }}
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <svg 
                    className="w-24 h-24 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </div>
              )}
              
              <div className="p-4">
                <div className="flex justify-center">
                  <span 
                    className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${statusColor}`}
                  >
                    {person.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna das informações */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações básicas */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Informações Pessoais
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Nome Completo
                  </label>
                  <p className="text-lg font-medium text-gray-900">
                    {person.nome}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Idade
                  </label>
                  <p className="text-lg font-medium text-gray-900">
                    {person.idade} anos
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Data do Desaparecimento
                  </label>
                  <p className="text-lg font-medium text-gray-900">
                    {formatDate(person.dataDesaparecimento)}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Local do Desaparecimento
                  </label>
                  <p className="text-lg font-medium text-gray-900">
                    {person.localDesaparecimento || 'Não informado'}
                  </p>
                </div>
              </div>

              {person.telefoneContato && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-500">
                    Telefone para Contato
                  </label>
                  <p className="text-lg font-medium text-gray-900">
                    {person.telefoneContato}
                  </p>
                </div>
              )}
            </div>

            {/* Descrição */}
            {person.descricao && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Descrição
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {person.descricao}
                </p>
              </div>
            )}

            {/* Observações */}
            {person.observacoes && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Observações
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {person.observacoes}
                </p>
              </div>
            )}

            {/* Botão para enviar informações */}
            {!showInfoForm && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start">
                  <svg 
                    className="w-6 h-6 text-blue-600 mr-3 mt-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-blue-900 mb-2">
                      Você tem informações sobre esta pessoa?
                    </h3>
                    <p className="text-blue-700 mb-4">
                      Qualquer informação pode ser importante para ajudar na busca. 
                      Compartilhe o que você sabe de forma segura e anônima.
                    </p>
                    <button
                      onClick={() => setShowInfoForm(true)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Enviar Informações
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Formulário de informações */}
            {showInfoForm && (
              <InfoForm
                personId={person.id}
                personName={person.nome}
                onSubmit={handleSubmitInformation}
                onCancel={() => setShowInfoForm(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsPage;

