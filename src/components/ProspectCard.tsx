import React from 'react';
import { ExternalLink, Mail } from 'lucide-react';
import { Prospect } from '../types/types';

interface ProspectCardProps {
  prospect: Prospect;
  onGenerateEmail: () => void;
}

const ProspectCard: React.FC<ProspectCardProps> = ({ prospect, onGenerateEmail }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{prospect.companyName}</h3>
        
        <div className="mb-4">
          <a 
            href={prospect.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center mb-2"
          >
            {prospect.website} <ExternalLink className="ml-1 h-3 w-3" />
          </a>
          
          {prospect.industry && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {prospect.industry}
            </span>
          )}
        </div>
        
        <div className="mb-4">
          <h4 className="text-md font-semibold text-gray-700">{prospect.contactName}</h4>
          <p className="text-sm text-gray-600">{prospect.contactPosition}</p>
        </div>

        <button
          onClick={onGenerateEmail}
          className="w-full flex items-center justify-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Mail className="mr-2 h-4 w-4" />
          Generar Email
        </button>
      </div>
    </div>
  );
};

export default ProspectCard;