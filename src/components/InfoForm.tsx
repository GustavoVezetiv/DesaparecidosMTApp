import React, { useState } from 'react';
import type { InformationSubmission } from '../types/Person';

interface InfoFormProps {
  personId: string;
  personName: string;
  onSubmit: (data: InformationSubmission) => Promise<void>;
  onCancel: () => void;
}

const InfoForm: React.FC<InfoFormProps> = ({ 
  personId, 
  personName, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    observacoes: '',
    localizacao: '',
    telefone: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      telefone: formatted
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.observacoes.trim() && !formData.localizacao.trim()) {
      alert('Por favor, preencha pelo menos as observações ou a localização.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submissionData: InformationSubmission = {
        personId,
        observacoes: formData.observacoes,
        localizacao: formData.localizacao,
        fotos: files.length > 0 ? files : undefined
      };

      await onSubmit(submissionData);
      
      // Reset form
      setFormData({
        observacoes: '',
        localizacao: '',
        telefone: ''
      });
      setFiles([]);
      
      alert('Informações enviadas com sucesso! Obrigado por ajudar.');
    } catch (error) {
      alert('Erro ao enviar informações. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Enviar Informações
        </h3>
        <p className="text-gray-600">
          Você tem informações sobre <strong>{personName}</strong>? 
          Compartilhe conosco para ajudar na busca.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Observações */}
        <div>
          <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-2">
            Observações *
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleInputChange}
            rows={4}
            placeholder="Descreva qualquer informação relevante que você tenha sobre esta pessoa..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Localização */}
        <div>
          <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700 mb-2">
            Localização onde foi avistada
          </label>
          <input
            type="text"
            id="localizacao"
            name="localizacao"
            value={formData.localizacao}
            onChange={handleInputChange}
            placeholder="Ex: Rua das Flores, 123 - Centro, Cuiabá/MT"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Telefone de contato */}
        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
            Seu telefone para contato (opcional)
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handlePhoneChange}
            placeholder="(65) 99999-9999"
            maxLength={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Upload de fotos */}
        <div>
          <label htmlFor="fotos" className="block text-sm font-medium text-gray-700 mb-2">
            Fotos (opcional)
          </label>
          <input
            type="file"
            id="fotos"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {files.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              {files.length} arquivo(s) selecionado(s)
            </p>
          )}
        </div>

        {/* Aviso */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <svg 
              className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-yellow-800">
                Informação importante
              </h4>
              <p className="text-sm text-yellow-700 mt-1">
                Suas informações serão tratadas com confidencialidade e repassadas 
                às autoridades competentes para auxiliar na busca.
              </p>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Informações'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfoForm;

