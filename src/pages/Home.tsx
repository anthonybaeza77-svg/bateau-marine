import { Wrench, MapPin, Clock, CheckCircle, Star } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540]/20 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <img
              src="/logo_de_baeza_marine_blanc_fond_noir.png"
              alt="Baeza Marine"
              className="h-24 w-auto"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Entretien moteur hors-bord<br />
            <span className="text-[#1F6AE1]">4 temps</span>
          </h1>

          <p className="text-xl text-[#E5E5E5] mb-4 max-w-2xl mx-auto">
            L'atelier à votre bateau
          </p>

          <p className="text-[#9CA3AF] mb-10 max-w-xl mx-auto leading-relaxed">
            Intervention à domicile ou au port • Bassin d'Arcachon • Gironde • Côte Atlantique
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => onNavigate('forfaits')} variant="primary">
              Commander mes forfaits
            </Button>
            <Button onClick={() => onNavigate('contact')} variant="outline">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-[#0A2540]/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto">
            Une commande simple et rapide en 3 étapes
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#1F6AE1]/10 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-[#1F6AE1]">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Sélectionnez votre moteur
                </h3>
                <p className="text-[#9CA3AF] leading-relaxed">
                  Choisissez la marque, le modèle et la puissance de votre moteur hors-bord 4 temps.
                </p>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#1F6AE1]/10 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-[#1F6AE1]">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Ajoutez vos forfaits au panier
                </h3>
                <p className="text-[#9CA3AF] leading-relaxed">
                  Choisissez un ou plusieurs forfaits d'entretien adaptés à vos besoins, puis validez votre panier.
                </p>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#1F6AE1]/10 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-[#1F6AE1]">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Prenez rendez-vous
                </h3>
                <p className="text-[#9CA3AF] leading-relaxed">
                  Indiquez votre date souhaitée et vos coordonnées. Nous vous recontactons pour confirmer et intervenir chez vous.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Nos avantages
          </h2>
          <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto">
            Un service professionnel adapté à vos besoins
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card padding="md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1F6AE1]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#1F6AE1]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Intervention à domicile ou au port
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    Nous venons directement à votre bateau, où qu'il soit amarré.
                  </p>
                </div>
              </div>
            </Card>

            <Card padding="md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1F6AE1]/10 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-6 h-6 text-[#1F6AE1]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Moteurs 4 temps uniquement
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    Expertise spécialisée sur les moteurs 4 temps de toutes marques.
                  </p>
                </div>
              </div>
            </Card>

            <Card padding="md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1F6AE1]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-[#1F6AE1]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Pièces + main-d'œuvre incluses
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    Forfaits tout compris sans surprise, toutes pièces fournies.
                  </p>
                </div>
              </div>
            </Card>

            <Card padding="md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1F6AE1]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#1F6AE1]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Intervention rapide
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    Réponse sous 48h et intervention dans les meilleurs délais.
                  </p>
                </div>
              </div>
            </Card>

            <Card padding="md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1F6AE1]/10 flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-[#1F6AE1]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Technicien qualifié
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    Formation constructeur et expérience marine reconnue.
                  </p>
                </div>
              </div>
            </Card>

            <Card padding="md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1F6AE1]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#1F6AE1]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Zone d'intervention étendue
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    Bassin d'Arcachon, Gironde et Côte Atlantique.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A2540]/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-[#9CA3AF] text-center mb-12">
            Témoignages de nos clients
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-[#1F6AE1] text-[#1F6AE1]" />
                ))}
              </div>
              <p className="text-[#E5E5E5] mb-4 leading-relaxed">
                Intervention rapide et très professionnelle sur mon hors-bord Honda. Tout a été expliqué clairement avant et après la prestation. Travail propre, sérieux, et surtout à domicile, ce qui est très pratique. Je referai appel à Anthony sans hésiter.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1F6AE1]/20 flex items-center justify-center">
                  <span className="text-[#1F6AE1] font-semibold">JM</span>
                </div>
                <div>
                  <p className="text-white font-medium">Jean-Marc L.</p>
                  <p className="text-[#9CA3AF] text-sm">Andernos-les-Bains</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-[#1F6AE1] text-[#1F6AE1]" />
                ))}
              </div>
              <p className="text-[#E5E5E5] mb-4 leading-relaxed">
                Entretien moteur réalisé directement sur le port, à l'heure prévue. Anthony est ponctuel, méthodique et connaît parfaitement son métier. Les forfaits sont clairs, pas de mauvaise surprise. Service fiable et efficace, je recommande.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1F6AE1]/20 flex items-center justify-center">
                  <span className="text-[#1F6AE1] font-semibold">PD</span>
                </div>
                <div>
                  <p className="text-white font-medium">Patrick D.</p>
                  <p className="text-[#9CA3AF] text-sm">Andernos-les-Bains</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-[#1F6AE1] text-[#1F6AE1]" />
                ))}
              </div>
              <p className="text-[#E5E5E5] mb-4 leading-relaxed">
                Très bon service d'entretien moteur. Diagnostic sérieux, conseils utiles et intervention soignée. Le fait de ne pas avoir à déplacer le bateau est un vrai plus. Professionnel de confiance.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1F6AE1]/20 flex items-center justify-center">
                  <span className="text-[#1F6AE1] font-semibold">LM</span>
                </div>
                <div>
                  <p className="text-white font-medium">Laurent M.</p>
                  <p className="text-[#9CA3AF] text-sm">Lège-Cap-Ferret</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-[#0A2540] to-[#1F6AE1]/50 border-[#1F6AE1]/30">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Prêt à commander votre entretien ?
              </h2>
              <p className="text-[#E5E5E5] mb-8 max-w-2xl mx-auto leading-relaxed">
                Commandez vos forfaits en quelques clics et bénéficiez d'une intervention professionnelle à domicile ou au port.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => onNavigate('forfaits')} variant="primary">
                  Commander mes forfaits
                </Button>
                <Button onClick={() => onNavigate('contact')} variant="outline">
                  Nous contacter
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
