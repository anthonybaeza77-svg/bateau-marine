import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

interface FAQProps {
  onNavigate: (page: string) => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ onNavigate }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: 'Intervenez-vous au port ou à domicile ?',
      answer: 'Oui, nous intervenons directement au port ou à votre domicile sur toute la zone du Bassin d\'Arcachon, la Gironde et la Côte Atlantique. Notre atelier mobile vient à vous avec tout le matériel et les pièces nécessaires pour effectuer l\'entretien de votre moteur hors-bord.'
    },
    {
      question: 'Travaillez-vous uniquement sur des moteurs 4 temps ?',
      answer: 'Oui, nous sommes spécialisés exclusivement dans l\'entretien des moteurs hors-bord 4 temps de toutes marques (Honda, Mercury, Tohatsu, Suzuki, Selva, Yamaha). Cette spécialisation nous permet de garantir une expertise pointue et un service de qualité optimale sur ces motorisations.'
    },
    {
      question: 'Quels sont vos délais d\'intervention ?',
      answer: 'Nous nous engageons à vous répondre sous 48h maximum après réception de votre demande. L\'intervention est ensuite planifiée selon vos disponibilités et notre planning, généralement sous 5 à 10 jours ouvrés. En période de haute saison, les délais peuvent être légèrement allongés.'
    },
    {
      question: 'Que comprend exactement un forfait d\'entretien ?',
      answer: 'Nos forfaits sont tout compris : pièces et main-d\'œuvre incluses. Le forfait Premium comprend la vidange complète (bloc moteur et embase), le remplacement des filtres (huile et essence), des joints, de l\'anode et des bougies. Le forfait Premium+ ajoute le kit turbine, le thermostat et l\'anode bloc moteur. Aucun frais caché, vous connaissez le prix à l\'avance.'
    },
    {
      question: 'Proposez-vous des devis personnalisés ?',
      answer: 'Absolument ! Pour les moteurs de forte puissance ou les configurations particulières affichées "Sur devis", nous établissons un devis gratuit et personnalisé après étude de votre demande. Vous pouvez également demander un devis si vous avez des besoins spécifiques en dehors de nos forfaits standards.'
    },
    {
      question: 'Comment se passe la prise de rendez-vous ?',
      answer: 'Vous pouvez faire une demande de rendez-vous directement en ligne via notre formulaire. Nous vous recontactons ensuite rapidement pour confirmer la date, l\'horaire et tous les détails de l\'intervention. Le rendez-vous n\'est confirmé qu\'après validation de notre part pour garantir notre disponibilité.'
    },
    {
      question: 'Quelles marques de moteurs entretenez-vous ?',
      answer: 'Nous intervenons sur toutes les grandes marques de moteurs hors-bord 4 temps : Honda, Mercury, Tohatsu, Suzuki, Selva et Yamaha. Nos techniciens sont formés et disposent de l\'expertise nécessaire sur l\'ensemble de ces marques.'
    },
    {
      question: 'Les pièces sont-elles d\'origine constructeur ?',
      answer: 'Nous utilisons des pièces de qualité conformes aux spécifications constructeurs. Selon les cas, il peut s\'agir de pièces d\'origine ou de pièces de qualité équivalente certifiées. Nous privilégions toujours la qualité et la durabilité pour garantir la longévité de votre moteur.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#1F6AE1]/10 flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-[#1F6AE1]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Questions fréquentes
          </h1>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            Retrouvez les réponses aux questions les plus courantes sur nos services d'entretien de moteurs hors-bord.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {faqItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <h3 className="text-lg font-semibold text-white">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-[#1F6AE1] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <p className="text-[#9CA3AF] leading-relaxed border-t border-gray-800 pt-4">
                  {item.answer}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-[#0A2540] to-[#1F6AE1]/50 border-[#1F6AE1]/30">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Vous avez d'autres questions ?
            </h2>
            <p className="text-[#E5E5E5] mb-6 leading-relaxed">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous conseiller sur l'entretien de votre moteur hors-bord.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onNavigate('contact')} variant="primary">
                Nous contacter
              </Button>
              <Button onClick={() => onNavigate('rdv')} variant="outline">
                Prendre rendez-vous
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
