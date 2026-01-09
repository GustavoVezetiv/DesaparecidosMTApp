import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

// Mensagem de erro com opcao de tentar novamente
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="glass-card rounded-2xl p-8 shadow-glow-danger animate-fadeIn">
      <div className="flex flex-col items-center text-center">
        {/* Icone de erro */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Ops! Algo deu errado
        </h3>

        <p className="text-slate-600 mb-6 max-w-sm">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
