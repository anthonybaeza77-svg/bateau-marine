import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Forfaits from './pages/Forfaits';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Legal from './pages/Legal';
import CGV from './pages/CGV';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, loading } = useAuth();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === 'admin') {
      setCurrentPage('admin');
    }
  }, []);

  useEffect(() => {
    if (currentPage !== 'admin') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page === 'admin') {
      window.location.hash = 'admin';
    } else {
      window.location.hash = '';
    }
  };

  const renderPage = () => {
    if (currentPage === 'admin') {
      if (loading) {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Chargement...</p>
            </div>
          </div>
        );
      }

      if (!user) {
        return <Login onLoginSuccess={() => setCurrentPage('admin')} />;
      }

      return <Dashboard />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'forfaits':
        return <Forfaits onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQ onNavigate={handleNavigate} />;
      case 'legal':
        return <Legal />;
      case 'cgv':
        return <CGV onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <CartProvider>
      {currentPage === 'admin' ? (
        <div className="min-h-screen">
          <main>{renderPage()}</main>
        </div>
      ) : (
        <div className="min-h-screen bg-[#0B0B0B]">
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
          <main>{renderPage()}</main>
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
    </CartProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
