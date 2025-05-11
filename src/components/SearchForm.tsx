import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { SearchCriteria } from '../types/types';

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const companySizeOptions = [
  "1-10 empleados",
  "11-50 empleados",
  "51-200 empleados",
  "201-500 empleados",
  "500+ empleados"
];

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [industry, setIndustry] = useState<string>('');
  const [companySize, setCompanySize] = useState<string>('');
  const [contactPosition, setContactPosition] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const criteria: SearchCriteria = {
      industry,
      companySize,
      contactPosition,
    };
    onSearch(criteria);
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6 transition-all">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Criterios de búsqueda</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
              Industria del Cliente Ideal
            </label>
            <input
              id="industry"
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Ej: SaaS B2B, E-commerce, Fintech"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
              Tamaño de la Empresa
            </label>
            <select
              id="companySize"
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            >
              <option value="" disabled>Selecciona un rango</option>
              {companySizeOptions.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="contactPosition" className="block text-sm font-medium text-gray-700">
              Puesto del Contacto Clave
            </label>
            <input
              id="contactPosition"
              type="text"
              value={contactPosition}
              onChange={(e) => setContactPosition(e.target.value)}
              placeholder="Ej: CEO, Director de Marketing, Jefe de Ventas"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Search className="mr-2 h-5 w-5" />
            Buscar Prospectos
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
