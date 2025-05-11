import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center animate-pulse">
      <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-700 animate-spin mb-4"></div>
      <p className="text-gray-700 font-medium">Buscando prospectos...</p>
      <p className="text-sm text-gray-500 mt-2">Esto puede tomar unos segundos</p>
    </div>
  );
};

export default LoadingState;