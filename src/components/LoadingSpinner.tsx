import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

// Spinner de carregamento com animacao suave
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = 'Carregando...'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Circulo externo */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
        {/* Circulo animado */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
      </div>
      {text && (
        <p className="mt-4 text-slate-300 font-medium animate-pulse-slow">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
