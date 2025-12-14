import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, LogOut, Settings, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase, type Forfait } from '../../lib/supabase';
import Button from '../../components/Button';
import ForfaitForm from './ForfaitForm';

export default function Dashboard() {
  const { signOut, user } = useAuth();
  const [forfaits, setForfaits] = useState<Forfait[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingForfait, setEditingForfait] = useState<Forfait | null>(null);
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadForfaits();
  }, []);

  const loadForfaits = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('forfaits')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      showMessage('error', 'Erreur lors du chargement des forfaits');
    } else {
      setForfaits(data || []);
    }
    setLoading(false);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le forfait "${name}" ?`)) {
      return;
    }

    const { error } = await supabase
      .from('forfaits')
      .delete()
      .eq('id', id);

    if (error) {
      showMessage('error', 'Erreur lors de la suppression');
    } else {
      showMessage('success', 'Forfait supprimé avec succès');
      loadForfaits();
    }
  };

  const handleToggleActive = async (forfait: Forfait) => {
    const { error } = await supabase
      .from('forfaits')
      .update({ is_active: !forfait.is_active, updated_at: new Date().toISOString() })
      .eq('id', forfait.id);

    if (error) {
      showMessage('error', 'Erreur lors de la modification');
    } else {
      showMessage('success', `Forfait ${forfait.is_active ? 'désactivé' : 'activé'} avec succès`);
      loadForfaits();
    }
  };

  const handleEdit = (forfait: Forfait) => {
    setEditingForfait(forfait);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingForfait(null);
    setShowForm(true);
  };

  const handleFormClose = (success: boolean) => {
    setShowForm(false);
    setEditingForfait(null);
    if (success) {
      loadForfaits();
      showMessage('success', editingForfait ? 'Forfait modifié avec succès' : 'Forfait ajouté avec succès');
    }
  };

  const brands = ['all', ...Array.from(new Set(forfaits.map(f => f.brand).filter(Boolean)))];
  const filteredForfaits = filterBrand === 'all'
    ? forfaits
    : forfaits.filter(f => f.brand === filterBrand || (filterBrand === 'null' && !f.brand));

  if (showForm) {
    return <ForfaitForm forfait={editingForfait} onClose={handleFormClose} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Administration NautiCompare</h1>
              <p className="text-sm text-gray-600 mt-1">Connecté en tant que {user?.email}</p>
            </div>
            <Button
              onClick={signOut}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Settings className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Gestion des forfaits</h2>
            </div>
            <Button
              onClick={handleAddNew}
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Ajouter un forfait
            </Button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrer par marque
            </label>
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="all">Toutes les marques</option>
              <option value="null">Sans marque spécifique</option>
              {brands.filter(b => b !== 'all' && b).map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Chargement...</p>
            </div>
          ) : filteredForfaits.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucun forfait trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Forfait
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Marque
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Prestations
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Tarif
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredForfaits.map((forfait) => (
                    <tr key={forfait.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{forfait.name}</div>
                          <div className="text-sm text-gray-600">{forfait.description}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          forfait.brand
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {forfait.brand || 'Toutes marques'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-600">
                          {forfait.items.length} prestation{forfait.items.length > 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {forfait.price_label || 'Non défini'}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleToggleActive(forfait)}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                            forfait.is_active
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {forfait.is_active ? (
                            <>
                              <Eye className="w-3 h-3" />
                              Actif
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              Inactif
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(forfait)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(forfait.id, forfait.name)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
