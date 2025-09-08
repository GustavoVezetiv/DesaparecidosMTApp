import React from 'react';
import type { Person } from '../types/Person';

interface PersonCardProps {
  person: Person;
  onClick: (id: string) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, onClick }) => {
  const statusColor = person.status === 'Desaparecida' 
    ? 'bg-red-100 text-red-800 border-red-200' 
    : 'bg-green-100 text-green-800 border-green-200';

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200"
      onClick={() => onClick(person.id)}
    >
      <div className="p-4">
        {person.foto && (
          <div className="mb-4">
            <img 
              src={person.foto} 
              alt={`Foto de ${person.nome}`}
              className="w-full h-48 object-cover rounded-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/300x200?text=Sem+Foto';
              }}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {person.nome}
          </h3>
          
          <p className="text-sm text-gray-600">
            Idade: {person.idade} anos
          </p>
          
          <div className="flex justify-between items-center">
            <span 
              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${statusColor}`}
            >
              {person.status}
            </span>
            
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Ver detalhes →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;

