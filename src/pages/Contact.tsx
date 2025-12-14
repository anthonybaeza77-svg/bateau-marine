import { useState, FormEvent, useEffect } from 'react';
import { CheckCircle, Calendar, ShoppingCart, Info, MapPin } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useCart } from '../context/CartContext';
import { calculateTravelFeesFromAddress, formatTravelFees } from '../utils/travelFees';
import { getPowerLabel, type ExactPower } from '../utils/pricing';

interface ContactProps {
  onNavigate: (page: string) => void;
}

interface ContactFormData {
  appointmentDate: string;
  motorYear: string;
  motorHours: string;
  motorSerial: string;
  noSerial: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  message: string;
}

export default function Contact({ onNavigate }: ContactProps) {
  const { cartItems, motorSelection, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [travelFees, setTravelFees] = useState<number | string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [acceptedCGV, setAcceptedCGV] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    appointmentDate: '',
    motorYear: '',
    motorHours: '',
    motorSerial: '',
    noSerial: false,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    message: ''
  });

  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitted) {
      onNavigate('forfaits');
    }
  }, [cartItems, isSubmitted, onNavigate]);

  useEffect(() => {
    const calculateFees = async () => {
      if (formData.address && formData.postalCode && formData.city) {
        setIsCalculating(true);
        try {
          const result = await calculateTravelFeesFromAddress(
            formData.address,
            formData.postalCode,
            formData.city
          );

          if (result) {
            setDistance(result.distance);
            setTravelFees(result.fees);
          } else {
            setDistance(null);
            setTravelFees('à définir');
          }
        } catch (error) {
          console.error('Error calculating travel fees:', error);
          setDistance(null);
          setTravelFees('à définir');
        } finally {
          setIsCalculating(false);
        }
      } else {
        setDistance(null);
        setTravelFees(null);
      }
    };

    const timeoutId = setTimeout(() => {
      calculateFees();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData.address, formData.postalCode, formData.city]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', {
      cart: cartItems,
      motor: motorSelection,
      formData,
      travelFees,
      distance
    });
    setIsSubmitted(true);
    clearCart();
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().split('T')[0];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const totalEstimated = typeof travelFees === 'number' ? subtotal + travelFees : null;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="max-w-2xl w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#1F6AE1]/10 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-[#1F6AE1]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Demande de rendez-vous envoyée
          </h2>
          <p className="text-[#E5E5E5] leading-relaxed mb-6">
            Merci pour votre commande. Baeza Marine vous recontactera rapidement pour confirmer votre rendez-vous et vous communiquer le prix exact de l'intervention.
          </p>
          <p className="text-[#9CA3AF] text-sm mb-8">
            Vous recevrez une confirmation par email à l'adresse indiquée.
          </p>
          <Button onClick={() => onNavigate('home')} variant="primary">
            Retour à l'accueil
          </Button>
        </Card>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Finaliser votre commande
          </h1>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            Complétez vos informations pour valider votre rendez-vous
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-[#1F6AE1]" />
                    Date souhaitée de rendez-vous
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                      Date souhaitée *
                    </label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      min={minDateString}
                      required
                      className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors"
                    />
                    <p className="text-[#9CA3AF] text-xs mt-2">
                      La date sera confirmée par notre équipe après validation
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Informations moteur
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                        Année du moteur *
                      </label>
                      <input
                        type="text"
                        name="motorYear"
                        value={formData.motorYear}
                        onChange={handleChange}
                        required
                        placeholder="Ex: 2020"
                        className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                        Nombre d'heures moteur *
                      </label>
                      <input
                        type="text"
                        name="motorHours"
                        value={formData.motorHours}
                        onChange={handleChange}
                        required
                        placeholder="Ex: 150"
                        className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                        Numéro de série moteur {!formData.noSerial && '*'}
                      </label>
                      <input
                        type="text"
                        name="motorSerial"
                        value={formData.motorSerial}
                        onChange={handleChange}
                        required={!formData.noSerial}
                        disabled={formData.noSerial}
                        placeholder="Ex: ABC123456"
                        className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors disabled:opacity-50"
                      />
                      <label className="flex items-center gap-2 mt-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="noSerial"
                          checked={formData.noSerial}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-800 bg-[#0B0B0B] text-[#1F6AE1] focus:ring-[#1F6AE1] focus:ring-offset-0"
                        />
                        <span className="text-[#E5E5E5] text-sm">
                          Je ne connais pas le numéro de série
                        </span>
                      </label>
                      {formData.noSerial && (
                        <p className="text-[#9CA3AF] text-xs mt-2">
                          Nous vous aiderons à le retrouver lors du rendez-vous
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Vos coordonnées
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-[#1F6AE1]" />
                    Localisation du bateau
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                        Adresse (port, marina ou domicile) *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Ex: Port d'Andernos-les-Bains"
                        className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                        Code postal *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        placeholder="Ex: 33120"
                        className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                        Ville *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Ex: Andernos-les-Bains"
                        className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors"
                      />
                    </div>

                    {isCalculating && (
                      <div className="md:col-span-2 p-3 bg-[#1F6AE1]/10 border border-[#1F6AE1]/30 rounded-lg">
                        <p className="text-[#E5E5E5] text-sm">
                          Calcul des frais de déplacement en cours...
                        </p>
                      </div>
                    )}

                    {!isCalculating && travelFees !== null && distance !== null && (
                      <div className="md:col-span-2 p-3 bg-[#1F6AE1]/10 border border-[#1F6AE1]/30 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[#E5E5E5] text-sm font-medium">
                              Frais de déplacement : {formatTravelFees(travelFees)}
                            </p>
                            <p className="text-[#9CA3AF] text-xs mt-1">
                              Tarif indicatif calculé automatiquement selon la localisation.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                        Message complémentaire (facultatif)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Informations complémentaires..."
                        className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#1F6AE1]/10 border border-[#1F6AE1]/30 rounded-lg p-4">
                  <p className="text-[#E5E5E5] text-sm leading-relaxed">
                    En envoyant ce formulaire, vous acceptez d'être recontacté par Baeza Marine pour confirmation du rendez-vous et du prix final.
                  </p>
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedCGV}
                      onChange={(e) => setAcceptedCGV(e.target.checked)}
                      required
                      className="w-5 h-5 mt-0.5 rounded border-gray-800 bg-[#0B0B0B] text-[#1F6AE1] focus:ring-[#1F6AE1] focus:ring-offset-0"
                    />
                    <span className="text-[#E5E5E5] text-sm leading-relaxed">
                      J'ai lu et j'accepte les{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('cgv')}
                        className="text-[#1F6AE1] hover:underline font-medium"
                      >
                        Conditions Générales de Vente
                      </button>{' '}
                      de Baeza Marine *
                    </span>
                  </label>
                </div>

                <Button type="submit" variant="primary" fullWidth disabled={!acceptedCGV}>
                  Envoyer ma demande de rendez-vous
                </Button>
              </form>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="border-[#1F6AE1]">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#1F6AE1]" />
                  Votre commande
                </h3>

                {motorSelection && motorSelection.power && (
                  <div className="mb-4 p-3 bg-[#0A2540]/30 rounded-lg">
                    <div className="text-xs text-[#9CA3AF] mb-1">Moteur</div>
                    <div className="text-sm text-white font-medium">
                      {motorSelection.brand}
                    </div>
                    <div className="text-xs text-[#9CA3AF]">
                      {getPowerLabel(motorSelection.power as ExactPower)}
                    </div>
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  <div className="text-xs text-[#9CA3AF] mb-2 uppercase tracking-wide">
                    Forfaits sélectionnés
                  </div>
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[#0B0B0B] border border-gray-800 rounded-lg"
                    >
                      <div className="text-white font-medium text-sm">
                        {item.name}
                      </div>
                      <div className="text-white text-sm">
                        {item.price} €
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-800 pt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#9CA3AF]">Sous-total forfaits</span>
                    <span className="text-white font-semibold">{subtotal} €</span>
                  </div>

                  {travelFees !== null && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#9CA3AF]">Frais de déplacement</span>
                      <span className="text-white font-semibold">
                        {formatTravelFees(travelFees)}
                      </span>
                    </div>
                  )}

                  {totalEstimated !== null && (
                    <div className="pt-3 border-t border-gray-800">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">Total estimé</span>
                        <span className="text-xl font-bold text-[#1F6AE1]">
                          {totalEstimated} €
                        </span>
                      </div>
                    </div>
                  )}

                  {travelFees === null && (
                    <p className="text-[#9CA3AF] text-xs">
                      Renseignez l'adresse pour calculer les frais de déplacement
                    </p>
                  )}

                  {travelFees !== null && (
                    <p className="text-[#9CA3AF] text-xs leading-relaxed">
                      Total indicatif. Le déplacement peut être ajusté selon accessibilité (port, mise à sec, horaires).
                    </p>
                  )}
                </div>
              </Card>

              <Card className="bg-[#0A2540]/30 border-[#1F6AE1]/20">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#1F6AE1] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">
                      Important
                    </h4>
                    <p className="text-[#9CA3AF] text-xs leading-relaxed">
                      Votre rendez-vous sera confirmé par téléphone ou email. Le prix exact vous sera communiqué avant l'intervention.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
