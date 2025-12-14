import React from 'react';
import { X } from 'lucide-react';

interface CGVProps {
  onNavigate?: (page: string) => void;
}

export default function CGV({ onNavigate }: CGVProps) {
  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => onNavigate?.('home')}
        className="fixed top-24 right-4 z-50 p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors"
        aria-label="Retour à l'accueil"
      >
        <X className="w-6 h-6" />
      </button>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Conditions Générales de Vente – Baeza Marine
          </h1>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Article 1 – Champ d'application
              </h2>
              <p className="leading-relaxed mb-4">
                Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les prestations de services réalisées par Baeza Marine, auprès de clients particuliers ou professionnels, dans le cadre d'interventions nautiques à domicile, sur site, à flot ou à sec.
              </p>
              <p className="leading-relaxed">
                Toute commande ou prise de rendez-vous implique l'acceptation pleine et entière des présentes CGV.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Article 2 – Prestations
              </h2>
              <p className="leading-relaxed mb-4">
                Baeza Marine réalise exclusivement les prestations clairement décrites et vendues lors de la commande (forfait(s) sélectionné(s), options éventuelles).
              </p>
              <p className="leading-relaxed mb-4">
                Seules les prestations effectivement vendues et réalisées par Baeza Marine sont garanties.
                En aucun cas Baeza Marine ne pourra être tenue responsable ou garantir :
              </p>
              <ul className="list-disc pl-8 mb-4 space-y-2">
                <li>des éléments ou prestations non réalisées,</li>
                <li>des travaux antérieurs effectués par un tiers,</li>
                <li>des défauts ou pannes existants avant l'intervention,</li>
                <li>des conséquences liées à une mauvaise utilisation du matériel.</li>
              </ul>
              <p className="leading-relaxed">
                Toute prestation non prévue initialement fera l'objet d'un accord préalable distinct.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Article 3 – Prise de rendez-vous et acompte
              </h2>
              <p className="leading-relaxed mb-4">
                La prise de rendez-vous est confirmée uniquement après le versement d'un acompte de 30 % du montant estimé de la prestation.
              </p>
              <p className="leading-relaxed mb-4">
                L'acompte a pour objet :
              </p>
              <ul className="list-disc pl-8 mb-4 space-y-2">
                <li>de bloquer la date d'intervention,</li>
                <li>de confirmer l'engagement du client.</li>
              </ul>
              <p className="leading-relaxed">
                Sans versement de l'acompte, Baeza Marine se réserve le droit d'annuler ou de reporter le rendez-vous.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Article 4 – Prix
              </h2>
              <p className="leading-relaxed mb-4">
                Les prix sont indiqués à titre indicatif selon la marque, le modèle, la puissance du moteur et les conditions d'accès au lieu d'intervention.
              </p>
              <p className="leading-relaxed mb-4">
                Baeza Marine se réserve le droit d'ajuster le prix final en cas de :
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>difficulté d'accès,</li>
                <li>intervention plus complexe que prévue,</li>
                <li>anomalie technique non détectable avant intervention.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Article 5 – Modalités de paiement
              </h2>
              <p className="leading-relaxed mb-4">
                Le solde de la prestation est exigible immédiatement à la fin de l'intervention, avant le départ du lieu d'intervention.
              </p>
              <p className="leading-relaxed mb-4">
                Les moyens de paiement acceptés sont :
              </p>
              <ul className="list-disc pl-8 mb-4 space-y-2">
                <li>Espèces</li>
                <li>Carte bancaire</li>
                <li>Virement instantané</li>
              </ul>
              <p className="leading-relaxed mb-4">
                Aucun chèque ne sera accepté.
              </p>
              <p className="leading-relaxed">
                En cas de non-paiement, Baeza Marine se réserve le droit de refuser toute future intervention.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Article 6 – Responsabilité
              </h2>
              <p className="leading-relaxed mb-4">
                Baeza Marine est tenue à une obligation de moyens et non de résultat.
              </p>
              <p className="leading-relaxed mb-4">
                La responsabilité de Baeza Marine ne saurait être engagée en cas de :
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>panne liée à une pièce non remplacée,</li>
                <li>usure normale des composants,</li>
                <li>défaut préexistant,</li>
                <li>utilisation non conforme du matériel après intervention.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Article 7 – Annulation
              </h2>
              <p className="leading-relaxed mb-4">
                Toute annulation de rendez-vous par le client doit être signalée dans un délai raisonnable.
              </p>
              <p className="leading-relaxed">
                L'acompte versé pourra être conservé en cas d'annulation tardive ou d'absence du client au rendez-vous.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Article 8 – Droit applicable
              </h2>
              <p className="leading-relaxed mb-4">
                Les présentes CGV sont soumises au droit français.
              </p>
              <p className="leading-relaxed">
                Tout litige relèvera de la compétence des tribunaux français.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
