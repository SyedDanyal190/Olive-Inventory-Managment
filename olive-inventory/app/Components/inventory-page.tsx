'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { translations } from '@/lib/translations';

interface Olive {
  id: string;
  name: string;
  variety: string;
  quantity: number;
  status: 'To Order' | 'In Stock' | 'Sold Out';
}

export default function InventoryPage() {
  const [lang, setLang] = useState('en');
  const [olives, setOlives] = useState<Olive[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Olive>>({
    name: '',
    variety: '',
    quantity: 0,
    status: 'In Stock',
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setLang(savedLang);

    const savedOlives = localStorage.getItem('olives');
    if (savedOlives) setOlives(JSON.parse(savedOlives));
  }, []);

  const t = translations[lang as keyof typeof translations];

  const handleAddEdit = () => {
    if (!formData.name || !formData.variety) {
      alert(t.fillAllFields);
      return;
    }

    if (editingId) {
      setOlives(olives.map(o => o.id === editingId ? { ...o, ...formData } as Olive : o));
    } else {
      const newOlive: Olive = {
        id: Date.now().toString(),
        name: formData.name || '',
        variety: formData.variety || '',
        quantity: formData.quantity || 0,
        status: (formData.status || 'In Stock') as any,
      };
      setOlives([...olives, newOlive]);
    }

    localStorage.setItem('olives', JSON.stringify(olives));
    resetForm();
  };

  const handleDelete = (id: string) => {
    setOlives(olives.filter(o => o.id !== id));
    localStorage.setItem('olives', JSON.stringify(olives.filter(o => o.id !== id)));
  };

  const handleEdit = (olive: Olive) => {
    setFormData(olive);
    setEditingId(olive.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', variety: '', quantity: 0, status: 'In Stock' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t.inventory}</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus size={18} /> {t.addNew}
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="border-primary">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{editingId ? t.editOlive : t.addOlive}</CardTitle>
            <button onClick={resetForm} className="p-1 hover:bg-muted rounded">
              <X size={20} />
            </button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder={t.oliveName}
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                placeholder={t.variety}
                value={formData.variety || ''}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
              />
              <Input
                type="number"
                placeholder={t.quantity}
                value={formData.quantity || 0}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option value="To Order">{t.toOrder}</option>
                <option value="In Stock">{t.inStock}</option>
                <option value="Sold Out">{t.soldOut}</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddEdit} className="flex-1">{editingId ? t.update : t.add}</Button>
              <Button onClick={resetForm} variant="outline" className="flex-1">{t.cancel}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Olives List */}
      <Card>
        <CardHeader>
          <CardTitle>{t.oliveVarieties} ({olives.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2">{t.oliveName}</th>
                  <th className="text-left py-2 px-2">{t.variety}</th>
                  <th className="text-center py-2 px-2">{t.quantity}</th>
                  <th className="text-left py-2 px-2">{t.status}</th>
                  <th className="text-center py-2 px-2">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {olives.length === 0 ? (
                  <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">{t.noData}</td></tr>
                ) : (
                  olives.map((olive) => (
                    <tr key={olive.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 px-2">{olive.name}</td>
                      <td className="py-2 px-2">{olive.variety}</td>
                      <td className="text-center py-2 px-2 font-semibold">{olive.quantity}</td>
                      <td className="py-2 px-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          olive.status === 'In Stock' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                          olive.status === 'To Order' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                          'bg-red-500/20 text-red-700 dark:text-red-400'
                        }`}>
                          {olive.status}
                        </span>
                      </td>
                      <td className="py-2 px-2">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleEdit(olive)} className="p-1 hover:bg-primary/20 rounded">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(olive.id)} className="p-1 hover:bg-destructive/20 rounded">
                            <Trash2 size={16} className="text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
