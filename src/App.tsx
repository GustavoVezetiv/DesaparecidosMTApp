import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

// Carregamento lazy das paginas pra melhorar performance
const HomePage = lazy(() => import('./pages/HomePage'));
const PersonDetailsPage = lazy(() => import('./pages/PersonDetailsPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
          <LoadingSpinner text="Carregando..." />
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/person/:id" element={<PersonDetailsPage />} />
          {/* Pagina 404 */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
              <div className="text-center glass-card rounded-2xl p-10 mx-4">
                <div className="text-7xl font-bold text-blue-600 mb-4">404</div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Página não encontrada</h2>
                <p className="text-slate-600 mb-6">A página que você procura não existe.</p>
                <a
                  href="/"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Voltar ao início
                </a>
              </div>
            </div>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
