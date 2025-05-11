import React, { useState } from 'react';
import SearchForm from './SearchForm';
import ResultsList from './ResultsList';
import { Prospect, SearchCriteria } from '../types/types';
import EmailModal from './EmailModal';

interface ProspectionAssistantProps {
  token: string;
}

const ProspectionAssistant: React.FC<ProspectionAssistantProps> = ({ token }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState<boolean>(false);
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateEmail = async (prospectId: string) => {
    setIsGeneratingEmail(true);
    setGeneratedEmail(null);
    setError(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiUrl}/prospects/${prospectId}/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedEmail(data);

    } catch (err: any) {
      setError(err.message || 'An unknown error occurred during email generation.');
      console.error('Email generation API error:', err);
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const handleSearch = async (criteria: SearchCriteria) => {
    setIsLoading(true);
    setSearchPerformed(true);
    setError(null);
    setProspects([]); // Clear previous results

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiUrl}/prospects/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(criteria),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      setProspects(data.prospects || []);

    } catch (err: any) {
      setError(err.message || 'An unknown error occurred during search.');
      console.error('Search API error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateEmailClick = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setShowEmailModal(true);
    generateEmail(prospect.id); // Trigger email generation API call
  };

  const handleCloseModal = () => {
    setShowEmailModal(false);
    setSelectedProspect(null);
    setGeneratedEmail(null); // Clear generated email on modal close
    setError(null); // Clear error on modal close
  };

  return (
    <div className="space-y-8">
      <SearchForm onSearch={handleSearch} />

      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}
      
      {searchPerformed && !error && (
        <ResultsList
          prospects={prospects}
          isLoading={isLoading}
          onGenerateEmail={handleGenerateEmailClick} // Use the new handler
        />
      )}

      {showEmailModal && selectedProspect && (
        <EmailModal
          prospect={selectedProspect}
          onClose={handleCloseModal}
          isGenerating={isGeneratingEmail} // Pass loading state
          generatedEmail={generatedEmail} // Pass generated email
        />
      )}
    </div>
  );
};

export default ProspectionAssistant;
