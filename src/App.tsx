import React, { useState } from 'react';
import Header from './components/Header';
import ProspectionAssistant from './components/ProspectionAssistant';

function App() {
  const [token, setToken] = useState<string | null>(null);

  // Simulate a login process
  const handleLogin = () => {
    // In a real application, this would involve calling an authentication API
    // and receiving a JWT token.
    const mockToken = 'mock-jwt-token-for-development';
    setToken(mockToken);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md">
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Pass the token down to components that need it */}
        <ProspectionAssistant token={token} />
      </main>
    </div>
  );
}

export default App;
