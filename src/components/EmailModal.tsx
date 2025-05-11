import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { Prospect } from '../types/types';
import { generateEmail } from '../utils/mockData';

interface EmailModalProps {
  prospect: Prospect;
  onClose: () => void;
  isGenerating: boolean;
  generatedEmail: { subject: string; body: string } | null;
}

const EmailModal: React.FC<EmailModalProps> = ({ prospect, onClose, isGenerating, generatedEmail }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (generatedEmail) {
      navigator.clipboard.writeText(`Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-fadeIn">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Borrador de Email para {prospect.contactName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {isGenerating ? (
            <div className="text-center text-gray-500">Generando email...</div>
          ) : generatedEmail ? (
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-gray-700 whitespace-pre-line font-mono text-sm">
              <strong>Subject: {generatedEmail.subject}</strong>
              <br />
              <br />
              {generatedEmail.body}
            </div>
          ) : (
            <div className="text-center text-red-500">No se pudo generar el email.</div>
          )}
        </div>

        <div className="border-t px-6 py-4 flex justify-end">
          <button
            onClick={handleCopy}
            disabled={!generatedEmail || isGenerating} // Disable if no email or generating
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
              copied
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-blue-700 text-white hover:bg-blue-800'
            } transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copiar Email al Portapapeles
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
