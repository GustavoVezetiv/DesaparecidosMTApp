import React from 'react';
import type { Person } from '../types/Person';

interface PersonCardProps {
  person: Person;
  onClick: (id: string) => void;
}

// Componente de card para exibir resumo da pessoa
const PersonCard: React.FC<PersonCardProps> = ({ person, onClick }) => {
  const isDesaparecida = !person.ultimaOcorrencia?.dataLocalizacao;

  const formatarData = (dataString?: string) => {
    if (!dataString) return 'Não informado';
    try {
      return new Date(dataString).toLocaleDateString('pt-BR');
    } catch {
      return dataString;
    }
  };

  return (
    <div
      className="person-card cursor-pointer animate-fadeIn"
      onClick={() => onClick(String(person.id))}
    >
      {/* Imagem da pessoa */}
      <div className="relative overflow-hidden h-52 bg-gradient-to-br from-slate-100 to-slate-200">
        {person.urlFoto ? (
          <img
            src={person.urlFoto}
            alt={`Foto de ${person.nome}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`${person.urlFoto ? 'hidden' : ''} absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300`}>
          <svg
            className="w-20 h-20 text-slate-400"
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

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full shadow-lg ${isDesaparecida
                ? 'status-missing'
                : 'status-found'
              }`}
          >
            {isDesaparecida ? '🔴 Desaparecido(a)' : '🟢 Localizado(a)'}
          </span>
        </div>
      </div>

      {/* Informacoes */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">
          {person.nome}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-slate-600">
            <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{person.idade > 0 ? `${person.idade} anos` : 'Idade não informada'}</span>
          </div>

          <div className="flex items-center text-sm text-slate-600">
            <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatarData(person.ultimaOcorrencia?.dtDesaparecimento)}</span>
          </div>

          {person.ultimaOcorrencia?.localDesaparecimentoConcat && (
            <div className="flex items-start text-sm text-slate-600">
              <svg className="w-4 h-4 mr-2 mt-0.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="line-clamp-2">{person.ultimaOcorrencia.localDesaparecimentoConcat}</span>
            </div>
          )}
        </div>

        <button
          className="w-full btn-primary text-sm py-2.5 flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onClick(String(person.id));
          }}
        >
          Ver detalhes
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PersonCard;
