import { useState, useCallback } from 'react';

interface ErrorState {
  message: string;
  code?: string;
  details?: any;
}

export const useErrorHandler = () => {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleError = useCallback((error: any) => {
    console.error('Erro capturado:', error);

    let errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';
    let errorCode = 'UNKNOWN_ERROR';

    if (error?.response) {
      // Erro de resposta HTTP
      const status = error.response.status;
      
      switch (status) {
        case 400:
          errorMessage = 'Dados inválidos enviados. Verifique as informações.';
          errorCode = 'BAD_REQUEST';
          break;
        case 401:
          errorMessage = 'Acesso não autorizado.';
          errorCode = 'UNAUTHORIZED';
          break;
        case 403:
          errorMessage = 'Acesso negado.';
          errorCode = 'FORBIDDEN';
          break;
        case 404:
          errorMessage = 'Recurso não encontrado.';
          errorCode = 'NOT_FOUND';
          break;
        case 429:
          errorMessage = 'Muitas tentativas. Aguarde um momento e tente novamente.';
          errorCode = 'TOO_MANY_REQUESTS';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
          errorCode = 'INTERNAL_SERVER_ERROR';
          break;
        case 503:
          errorMessage = 'Serviço temporariamente indisponível.';
          errorCode = 'SERVICE_UNAVAILABLE';
          break;
        default:
          errorMessage = `Erro ${status}: ${error.response.statusText || 'Erro desconhecido'}`;
          errorCode = `HTTP_${status}`;
      }
    } else if (error?.request) {
      // Erro de rede
      errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
      errorCode = 'NETWORK_ERROR';
    } else if (error?.message) {
      // Erro personalizado
      errorMessage = error.message;
      errorCode = 'CUSTOM_ERROR';
    }

    setError({
      message: errorMessage,
      code: errorCode,
      details: error
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const retryWithErrorHandling = useCallback(async (
    asyncFunction: () => Promise<any>,
    customErrorMessage?: string
  ) => {
    try {
      clearError();
      return await asyncFunction();
    } catch (err) {
      if (customErrorMessage) {
        setError({
          message: customErrorMessage,
          code: 'CUSTOM_ERROR',
          details: err
        });
      } else {
        handleError(err);
      }
      throw err;
    }
  }, [handleError, clearError]);

  return {
    error,
    handleError,
    clearError,
    retryWithErrorHandling
  };
};

