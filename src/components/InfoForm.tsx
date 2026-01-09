import React, { useState } from 'react';
import type { InformationSubmission } from '../types/Person';

interface InfoFormProps {
  personId: string;
  personName: string;
  onSubmit: (data: InformationSubmission) => Promise<void>;
  onCancel: () => void;
}

// Formulario para enviar informacoes sobre pessoa desaparecida
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
    const numbers = value.replace(/\D/g, '');
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
      alert('Preencha as observações ou a localização.');
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

      setFormData({
        observacoes: '',
        localizacao: '',
        telefone: ''
      });
      setFiles([]);

      alert('Informações enviadas! Obrigado pela colaboração.');
    } catch (error) {
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-fadeIn">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Enviar Informações
        </h3>
        <p className="text-slate-600">
          Informações sobre <strong className="text-slate-800">{personName}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Observacoes */}
        <div>
          <label htmlFor="observacoes" className="block text-sm font-semibold text-slate-700 mb-2">
            Observações *
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleInputChange}
            rows={4}
            placeholder="Descreva qualquer informação relevante..."
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {/* Localizacao */}
        <div>
          <label htmlFor="localizacao" className="block text-sm font-semibold text-slate-700 mb-2">
            Local onde foi avistada
          </label>
          <input
            type="text"
            id="localizacao"
            name="localizacao"
            value={formData.localizacao}
            onChange={handleInputChange}
            placeholder="Ex: Av. das Palmeiras, 456 - Centro"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Telefone */}
        <div>
          <label htmlFor="telefone" className="block text-sm font-semibold text-slate-700 mb-2">
            Seu telefone (opcional)
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handlePhoneChange}
            placeholder="(65) 99999-9999"
            maxLength={15}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Fotos */}
        <div>
          <label htmlFor="fotos" className="block text-sm font-semibold text-slate-700 mb-2">
            Fotos (opcional)
          </label>
          <div className="relative">
            <input
              type="file"
              id="fotos"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            />
          </div>
          {files.length > 0 && (
            <p className="mt-2 text-sm text-blue-600 font-medium">
              {files.length} arquivo(s) selecionado(s)
            </p>
          )}
        </div>

        {/* Aviso */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
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
              <h4 className="text-sm font-bold text-amber-800">
                Importante
              </h4>
              <p className="text-sm text-amber-700 mt-1">
                Suas informações serão tratadas com confidencialidade e repassadas às autoridades.
              </p>
            </div>
          </div>
        </div>

        {/* Botoes */}
        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : 'Enviar Informações'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfoForm;
