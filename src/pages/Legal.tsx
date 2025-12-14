import { FileText } from 'lucide-react';
import Card from '../components/Card';

export default function Legal() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#1F6AE1]/10 flex items-center justify-center">
              <FileText className="w-8 h-8 text-[#1F6AE1]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Mentions légales
          </h1>
        </div>

        <Card>
          <div className="space-y-8 text-[#E5E5E5] leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Informations légales
              </h2>
              <div className="space-y-3">
                <p>
                  <strong className="text-white">Raison sociale :</strong> Baeza Marine
                </p>
                <p>
                  <strong className="text-white">Forme juridique :</strong> [À compléter]
                </p>
                <p>
                  <strong className="text-white">Siège social :</strong> [Adresse à compléter], Bassin d'Arcachon
                </p>
                <p>
                  <strong className="text-white">SIRET :</strong> [Numéro à compléter]
                </p>
                <p>
                  <strong className="text-white">Email :</strong> contact@baezamarine.fr
                </p>
                <p>
                  <strong className="text-white">Téléphone :</strong> 06 XX XX XX XX
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Directeur de la publication
              </h2>
              <p>
                Le directeur de la publication du site est [Nom à compléter], représentant légal de Baeza Marine.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. Hébergement
              </h2>
              <p>
                Le site est hébergé par :
              </p>
              <div className="mt-3 space-y-2">
                <p>
                  <strong className="text-white">Nom de l'hébergeur :</strong> [À compléter]
                </p>
                <p>
                  <strong className="text-white">Adresse :</strong> [À compléter]
                </p>
                <p>
                  <strong className="text-white">Téléphone :</strong> [À compléter]
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Propriété intellectuelle
              </h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété exclusive de Baeza Marine, sauf mention contraire. Toute reproduction, distribution, modification ou exploitation de tout ou partie du contenu du site sans autorisation préalable est strictement interdite et peut faire l'objet de poursuites judiciaires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Protection des données personnelles
              </h2>
              <p className="mb-3">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p className="mb-3">
                Les données collectées via les formulaires de contact et de prise de rendez-vous sont utilisées uniquement dans le cadre de la gestion de votre demande et ne sont en aucun cas transmises à des tiers.
              </p>
              <p>
                Pour exercer vos droits, vous pouvez nous contacter à l'adresse : contact@baezamarine.fr
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Cookies
              </h2>
              <p>
                Ce site n'utilise pas de cookies de suivi ou de tracking. Seuls des cookies techniques essentiels au fonctionnement du site peuvent être utilisés. Ces cookies ne collectent aucune donnée personnelle.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Responsabilité
              </h2>
              <p className="mb-3">
                Baeza Marine s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, Baeza Marine ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
              </p>
              <p>
                Baeza Marine ne pourra être tenue responsable des dommages directs ou indirects résultant de l'accès au site ou de l'utilisation de celui-ci.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Droit applicable
              </h2>
              <p>
                Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Crédits
              </h2>
              <p>
                Conception et réalisation du site : Baeza Marine
              </p>
            </section>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-[#9CA3AF] text-sm">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </div>
  );
}
