import React from 'react';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-5xl flex items-center">
        <Brain className="h-8 w-8 text-blue-700 mr-3" />
        <div>
          <h1 className="text-xl font-bold text-gray-800">SmartLead</h1>
          <p className="text-sm text-gray-500">Demo</p>
        </div>
      </div>
    </header>
  );
};

export default Header;