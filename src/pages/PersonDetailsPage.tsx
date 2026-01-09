import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { personService } from '../services/api';
import type { Person, InformationSubmission } from '../types/Person';
import InfoForm from '../components/InfoForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

// Pagina de detalhes da pessoa desaparecida
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
      setError('Não foi possível carregar os dados. Tente novamente.');
      console.error('Erro:', err);
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
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        <LoadingSpinner text="Carregando detalhes..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        <div className="max-w-md w-full">
          <ErrorMessage message={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Pessoa não encontrada
          </h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  const isDesaparecida = !person.ultimaOcorrencia?.dataLocalizacao;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      {/* Header */}
      <header className="header-gradient text-white py-6 relative">
        <div className="container-app relative z-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-200 hover:text-white transition-colors mb-4 group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
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
            Voltar para a busca
          </button>

          <h1 className="text-2xl md:text-3xl font-bold">
            Detalhes
          </h1>
        </div>
      </header>

      <div className="container-app py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da foto */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl overflow-hidden shadow-glow animate-fadeIn">
              <div className="relative h-80 md:h-96 bg-gradient-to-br from-slate-200 to-slate-300">
                {person.urlFoto ? (
                  <img
                    src={person.urlFoto}
                    alt={`Foto de ${person.nome}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-32 h-32 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center px-4 py-2 text-sm font-bold rounded-full ${isDesaparecida
                        ? 'status-missing'
                        : 'status-found'
                      }`}
                  >
                    {isDesaparecida ? '🔴 Desaparecido(a)' : '🟢 Localizado(a)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna das informacoes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Nome e info basica */}
            <div className="glass-card rounded-2xl p-6 animate-fadeIn">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                {person.nome}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-500">Idade</label>
                  <p className="text-lg font-semibold text-slate-800">
                    {person.idade > 0 ? `${person.idade} anos` : 'Não informada'}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-500">Sexo</label>
                  <p className="text-lg font-semibold text-slate-800">
                    {person.sexo || 'Não informado'}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-500">Data do Desaparecimento</label>
                  <p className="text-lg font-semibold text-slate-800">
                    {formatDate(person.ultimaOcorrencia?.dtDesaparecimento)}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-500">Local</label>
                  <p className="text-lg font-semibold text-slate-800">
                    {person.ultimaOcorrencia?.localDesaparecimentoConcat || 'Não informado'}
                  </p>
                </div>
              </div>
            </div>

            {/* Informacoes adicionais */}
            {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao && (
              <div className="glass-card rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Informações
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                </p>
              </div>
            )}

            {/* Vestimentas */}
            {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido && (
              <div className="glass-card rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: '150ms' }}>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Vestimentas
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
                </p>
              </div>
            )}

            {/* Botao para enviar informacoes */}
            {!showInfoForm && isDesaparecida && (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white animate-fadeIn" style={{ animationDelay: '200ms' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      Você tem informações?
                    </h3>
                    <p className="text-blue-100 mb-4">
                      Qualquer detalhe pode ajudar a encontrar essa pessoa.
                      Compartilhe o que você sabe de forma segura.
                    </p>
                    <button
                      onClick={() => setShowInfoForm(true)}
                      className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Enviar Informações
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Form de informacoes */}
            {showInfoForm && (
              <InfoForm
                personId={String(person.id)}
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
