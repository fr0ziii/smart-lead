import React from 'react';
import { Prospect } from '../types/types';
import ProspectCard from './ProspectCard';
import LoadingState from './LoadingState';

interface ResultsListProps {
  prospects: Prospect[];
  isLoading: boolean;
  onGenerateEmail: (prospect: Prospect) => void;
}

const ResultsList: React.FC<ResultsListProps> = ({ prospects, isLoading, onGenerateEmail }) => {
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Resultados de la búsqueda
        </h2>
        <span className="text-sm text-gray-500">
          {prospects.length} prospectos encontrados
        </span>
      </div>

      {prospects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">
            No se encontraron prospectos con estos criterios. Intenta ampliar tu búsqueda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prospects.map((prospect) => (
            <ProspectCard 
              key={prospect.id} 
              prospect={prospect}
              onGenerateEmail={() => onGenerateEmail(prospect)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ResultsList;