import React, { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { supabase, type Forfait } from '../../lib/supabase';
import Button from '../../components/Button';

interface ForfaitFormProps {
  forfait: Forfait | null;
  onClose: (success: boolean) => void;
}

export default function ForfaitForm({ forfait, onClose }: ForfaitFormProps) {
  const [name, setName] = useState(forfait?.name || '');
  const [brand, setBrand] = useState(forfait?.brand || '');
  const [description, setDescription] = useState(forfait?.description || '');
  const [items, setItems] = useState<string[]>(forfait?.items || ['']);
  const [priceLabel, setPriceLabel] = useState(forfait?.price_label || '');
  const [isActive, setIsActive] = useState(forfait?.is_active ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddItem = () => {
    setItems([...items, '']);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const filteredItems = items.filter(item => item.trim() !== '');

    if (filteredItems.length === 0) {
      setError('Veuillez ajouter au moins une prestation');
      setLoading(false);
      return;
    }

    const forfaitData = {
      name: name.trim(),
      brand: brand.trim() || null,
      description: description.trim(),
      items: filteredItems,
      price_label: priceLabel.trim() || null,
      is_active: isActive,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (forfait) {
      result = await supabase
        .from('forfaits')
        .update(forfaitData)
        .eq('id', forfait.id);
    } else {
      result = await supabase
        .from('forfaits')
        .insert({
          ...forfaitData,
          display_order: 999,
        });
    }

    if (result.error) {
      setError('Erreur lors de l\'enregistrement du forfait');
      setLoading(false);
    } else {
      onClose(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onClose(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au tableau de bord
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {forfait ? 'Modifier le forfait' : 'Ajouter un forfait'}
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom du forfait *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                placeholder="Premium, Premium+, etc."
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                Marque
                <span className="text-gray-500 font-normal ml-2">(optionnel - laissez vide pour toutes les marques)</span>
              </label>
              <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                placeholder="Honda, Yamaha, Mercury, etc."
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                placeholder="Description courte du forfait"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="priceLabel" className="block text-sm font-medium text-gray-700 mb-2">
                Tarif
                <span className="text-gray-500 font-normal ml-2">(ex: "À partir de 350 €", "Prix à définir")</span>
              </label>
              <input
                type="text"
                id="priceLabel"
                value={priceLabel}
                onChange={(e) => setPriceLabel(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                placeholder="Prix selon modèle"
                disabled={loading}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Prestations incluses *
                </label>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  disabled={loading}
                >
                  <Plus className="w-4 h-4" />
                  Ajouter une prestation
                </button>
              </div>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      placeholder={`Prestation ${index + 1}`}
                      disabled={loading}
                    />
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        disabled={loading}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
                disabled={loading}
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Forfait actif (visible sur le site public)
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer le forfait'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onClose(false)}
                disabled={loading}
              >
                Annuler
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
