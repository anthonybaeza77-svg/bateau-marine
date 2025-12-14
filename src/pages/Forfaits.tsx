import { useState, useEffect } from 'react';
import { Check, ShoppingCart, Trash2, ChevronRight, Info, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { motorBrands } from '../data/motors';
import { MotorBrand, ForfaitType } from '../types';
import { useCart } from '../context/CartContext';
import { supabase, type Forfait } from '../lib/supabase';
import { exactPowers, getPriceForForfait, getPowerLabel, type ExactPower } from '../utils/pricing';

interface ForfaitsProps {
  onNavigate: (page: string) => void;
}

export default function Forfaits({ onNavigate }: ForfaitsProps) {
  const { cartItems, motorSelection, addToCart, removeFromCart, setMotorInfo } = useCart();
  const [selectedBrand, setSelectedBrand] = useState<MotorBrand | ''>(motorSelection?.brand || '');
  const [selectedPower, setSelectedPower] = useState<ExactPower | ''>(
    (motorSelection?.power as ExactPower) || ''
  );
  const [showCart, setShowCart] = useState(false);
  const [expandedForfaits, setExpandedForfaits] = useState<Set<string>>(new Set());
  const [forfaits, setForfaits] = useState<Forfait[]>([]);
  const [loadingForfaits, setLoadingForfaits] = useState(true);

  useEffect(() => {
    loadForfaits();
  }, []);

  const loadForfaits = async () => {
    setLoadingForfaits(true);
    const { data, error } = await supabase
      .from('forfaits')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (!error && data) {
      setForfaits(data);
    }
    setLoadingForfaits(false);
  };

  const canAddToCart = selectedPower !== '';

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand as MotorBrand);
  };

  const handlePowerChange = (power: string) => {
    const powerValue = power === '' ? '' : Number(power) as ExactPower;
    setSelectedPower(powerValue);
    if (powerValue !== '') {
      setMotorInfo({
        brand: selectedBrand as MotorBrand || 'Honda',
        model: '',
        power: powerValue,
        powerRange: ''
      });
    }
  };

  const handleAddToCart = (forfaitType: ForfaitType, forfaitName: string) => {
    if (!canAddToCart) {
      alert('Veuillez sélectionner la puissance moteur avant d\'ajouter un forfait.');
      return;
    }

    const price = getPriceForForfait(forfaitType, selectedPower as ExactPower);
    if (price === null) {
      alert('Prix non disponible pour cette configuration.');
      return;
    }

    addToCart({
      forfaitType,
      name: forfaitName,
      price,
      powerRange: '',
      power: selectedPower as ExactPower,
      brand: selectedBrand as MotorBrand
    });
    setShowCart(true);
  };

  const handleValidateCart = () => {
    if (cartItems.length === 0) {
      alert('Veuillez ajouter au moins un forfait au panier.');
      return;
    }
    onNavigate('contact');
  };

  const toggleForfaitExpansion = (forfaitName: string) => {
    setExpandedForfaits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(forfaitName)) {
        newSet.delete(forfaitName);
      } else {
        newSet.add(forfaitName);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Commandez vos forfaits d'entretien
          </h1>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            Sélectionnez votre moteur, ajoutez les forfaits souhaités au panier, puis validez pour prendre rendez-vous.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6">
                1. Sélectionnez votre moteur
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                    Marque moteur
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors"
                  >
                    <option value="">Choisir une marque</option>
                    {motorBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-[#9CA3AF] mt-1">Information uniquement</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#E5E5E5] mb-2">
                    Puissance (CV) *
                  </label>
                  <select
                    value={selectedPower}
                    onChange={(e) => handlePowerChange(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0B0B0B] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#1F6AE1] transition-colors"
                  >
                    <option value="">Sélectionner la puissance</option>
                    {exactPowers.map((power) => (
                      <option key={power} value={power}>
                        {power} CV
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-[#9CA3AF] mt-1">Obligatoire pour calculer le tarif</p>
                </div>
              </div>

              {!canAddToCart && (
                <div className="mt-6 p-4 bg-[#1F6AE1]/10 border border-[#1F6AE1]/30 rounded-lg flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#1F6AE1] flex-shrink-0 mt-0.5" />
                  <p className="text-[#E5E5E5] text-sm">
                    Veuillez sélectionner la puissance moteur pour afficher les tarifs et pouvoir ajouter des forfaits au panier
                  </p>
                </div>
              )}
            </Card>

            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                2. Choisissez vos forfaits
              </h2>

              {loadingForfaits ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1F6AE1]"></div>
                  <p className="mt-4 text-[#9CA3AF]">Chargement des forfaits...</p>
                </div>
              ) : forfaits.length === 0 ? (
                <Card>
                  <p className="text-center text-[#9CA3AF] py-8">
                    Aucun forfait disponible
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {forfaits.map((forfait, index) => {
                    const isRecommended = forfait.name === 'Premium+';
                    const calculatedPrice = selectedPower !== ''
                      ? getPriceForForfait(forfait.name, selectedPower as ExactPower)
                      : null;

                    return (
                      <Card
                        key={forfait.id}
                        className={`relative ${
                          isRecommended ? 'border-[#1F6AE1] shadow-xl shadow-[#1F6AE1]/20' : ''
                        }`}
                      >
                        {isRecommended && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1F6AE1] text-white px-4 py-1 rounded-full text-sm font-semibold">
                            Recommandé
                          </div>
                        )}

                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-white mb-2">
                            Forfait {forfait.name}
                          </h3>
                          <p className="text-[#9CA3AF] text-sm">{forfait.description}</p>
                        </div>

                        <div className="mb-4 p-3 bg-[#0A2540]/30 rounded-lg">
                          {calculatedPrice !== null ? (
                            <>
                              <div className="text-2xl font-bold text-white">
                                {calculatedPrice} €
                              </div>
                              <div className="text-xs text-[#9CA3AF] mt-1">
                                Puissance sélectionnée : {getPowerLabel(selectedPower as ExactPower)}
                              </div>
                              <div className="text-xs text-[#9CA3AF] mt-1">
                                Tarif calculé automatiquement selon la puissance moteur sélectionnée
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-sm font-medium text-[#9CA3AF]">
                                Veuillez sélectionner la puissance moteur
                              </div>
                              <div className="text-xs text-[#9CA3AF] mt-1">
                                Tarif calculé automatiquement selon la puissance moteur sélectionnée
                              </div>
                            </>
                          )}
                        </div>

                        <div className="mb-4">
                          <h4 className="text-xs font-semibold text-[#E5E5E5] mb-2 uppercase tracking-wide">
                            Prestations incluses
                          </h4>
                          <ul className="space-y-2">
                            {(expandedForfaits.has(forfait.name) ? forfait.items : forfait.items.slice(0, 4)).map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-[#1F6AE1] flex-shrink-0 mt-0.5" />
                                <span className="text-[#E5E5E5] text-sm">{item}</span>
                              </li>
                            ))}
                            {forfait.items.length > 4 && (
                              <li>
                                <button
                                  onClick={() => toggleForfaitExpansion(forfait.name)}
                                  className="text-[#1F6AE1] hover:text-[#1557B0] text-sm pl-6 flex items-center gap-1 transition-colors"
                                >
                                  {expandedForfaits.has(forfait.name) ? (
                                    <>
                                      <ChevronUp className="w-4 h-4" />
                                      Voir moins
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="w-4 h-4" />
                                      + {forfait.items.length - 4} autres prestations
                                    </>
                                  )}
                                </button>
                              </li>
                            )}
                          </ul>
                        </div>

                        <Button
                          onClick={() => handleAddToCart(forfait.name as ForfaitType, `Forfait ${forfait.name}`)}
                          variant={isRecommended ? 'primary' : 'outline'}
                          fullWidth
                          disabled={!canAddToCart}
                        >
                          <ShoppingCart className="w-4 h-4 inline-block mr-2" />
                          Ajouter au panier
                        </Button>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-[#1F6AE1]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-[#1F6AE1]" />
                    Votre panier
                  </h3>
                  {cartItems.length > 0 && (
                    <span className="bg-[#1F6AE1] text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </div>

                {motorSelection && motorSelection.power && (
                  <div className="mb-4 p-3 bg-[#0A2540]/30 rounded-lg">
                    <div className="text-xs text-[#9CA3AF] mb-1">Puissance sélectionnée</div>
                    <div className="text-sm text-white font-medium">
                      {getPowerLabel(motorSelection.power as ExactPower)}
                    </div>
                    {motorSelection.brand && (
                      <div className="text-xs text-[#9CA3AF] mt-1">
                        Marque : {motorSelection.brand}
                      </div>
                    )}
                  </div>
                )}

                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3 opacity-50" />
                    <p className="text-[#9CA3AF] text-sm">
                      Votre panier est vide
                    </p>
                    <p className="text-[#9CA3AF] text-xs mt-2">
                      Ajoutez au moins un forfait pour continuer
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {cartItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-[#0B0B0B] border border-gray-800 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {item.name}
                            </div>
                            <div className="text-xs text-[#9CA3AF] mt-1">
                              {item.power ? getPowerLabel(item.power as ExactPower) : 'Puissance non définie'}
                            </div>
                            {item.brand && (
                              <div className="text-xs text-[#9CA3AF]">
                                {item.brand}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-white font-semibold">
                              {item.price} €
                            </div>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-red-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-6 p-3 bg-[#1F6AE1]/10 border border-[#1F6AE1]/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">Total</span>
                        <span className="text-xl font-bold text-white">
                          {cartItems.reduce((sum, item) => sum + item.price, 0)} €
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handleValidateCart}
                      variant="primary"
                      fullWidth
                      className="mb-3"
                    >
                      Valider le panier
                      <ChevronRight className="w-4 h-4 inline-block ml-2" />
                    </Button>

                    <p className="text-[#9CA3AF] text-xs text-center">
                      Vous serez redirigé vers la prise de rendez-vous
                    </p>
                  </>
                )}
              </Card>

              <Card className="mt-4 bg-[#0A2540]/30 border-[#1F6AE1]/20">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#1F6AE1] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">
                      À savoir
                    </h4>
                    <ul className="space-y-1 text-[#9CA3AF] text-xs">
                      <li>• Moteurs 4 temps uniquement</li>
                      <li>• Intervention à domicile ou au port</li>
                      <li>• Pièces et main-d'œuvre incluses</li>
                      <li>• Prix confirmé avant intervention</li>
                    </ul>
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
