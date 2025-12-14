import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0B0B0B] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo_de_baeza_marine_blanc_fond_noir.png"
                alt="Baeza Marine"
                className="h-10 w-auto"
              />
              <span className="text-white font-bold text-lg">Baeza Marine</span>
            </div>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              Entretien professionnel de moteurs hors-bord 4 temps. L'atelier à votre bateau.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['Accueil', 'Forfaits', 'Contact', 'FAQ'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase())}
                    className="text-[#9CA3AF] text-sm hover:text-[#1F6AE1] transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Zone d'intervention</h3>
            <ul className="space-y-2 text-[#9CA3AF] text-sm">
              <li>Andernos-les-Bains</li>
              <li>Gironde</li>
              <li>Côte Atlantique</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-[#9CA3AF] text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:+33626831460" className="hover:text-[#1F6AE1] transition-colors">
                  06 26 83 14 60
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#9CA3AF] text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@baeza-marine.com" className="hover:text-[#1F6AE1] transition-colors">
                  contact@baeza-marine.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#9CA3AF] text-sm">
                <MapPin className="w-4 h-4" />
                <span>Andernos-les-Bains</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9CA3AF] text-sm">
            © {new Date().getFullYear()} Baeza Marine. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => onNavigate('cgv')}
              className="text-[#9CA3AF] text-sm hover:text-[#1F6AE1] transition-colors"
            >
              CGV
            </button>
            <button
              onClick={() => onNavigate('legal')}
              className="text-[#9CA3AF] text-sm hover:text-[#1F6AE1] transition-colors"
            >
              Mentions légales
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
