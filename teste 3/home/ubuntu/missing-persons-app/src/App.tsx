import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy loading das páginas
const HomePage = React.lazy(() => import('./pages/HomePage'));
const PersonDetailsPage = React.lazy(() => import('./pages/PersonDetailsPage'));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <LoadingSpinner text="Carregando página..." />
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/person/:id" element={<PersonDetailsPage />} />
            {/* Rota 404 */}
            <Route path="*" element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Página não encontrada</p>
                  <a 
                    href="/" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Voltar à página inicial
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

