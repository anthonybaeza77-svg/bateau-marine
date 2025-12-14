import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Accueil', page: 'home' },
    { label: 'Forfaits', page: 'forfaits' },
    { label: 'Contact', page: 'contact' },
    { label: 'FAQ', page: 'faq' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo_de_baeza_marine_blanc_fond_noir.png"
              alt="Baeza Marine"
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg">Baeza Marine</span>
              <span className="text-[#9CA3AF] text-xs">L'atelier à votre bateau</span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-[#1F6AE1]'
                    : 'text-white hover:text-[#1F6AE1]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#0B0B0B] border-t border-gray-800">
          <nav className="px-4 py-4 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.page
                    ? 'text-[#1F6AE1] bg-[#1F6AE1]/10'
                    : 'text-white hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
