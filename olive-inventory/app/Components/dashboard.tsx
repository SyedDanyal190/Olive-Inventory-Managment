'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Package } from 'lucide-react';
import { translations } from '@/lib/translations';

interface Olive {
  id: string;
  name: string;
  quantity: number;
  status: 'To Order' | 'In Stock' | 'Sold Out';
}

interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

export default function Dashboard() {
  const [lang, setLang] = useState('en');
  const [olives, setOlives] = useState<Olive[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setLang(savedLang);

    const savedOlives = localStorage.getItem('olives');
    if (savedOlives) setOlives(JSON.parse(savedOlives));

    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  const t = translations[lang as keyof typeof translations];

  const toOrder = olives.filter(o => o.status === 'To Order').length;
  const inStock = olives.filter(o => o.status === 'In Stock').length;
  const soldOut = olives.filter(o => o.status === 'Sold Out').length;
  const pendingTasks = tasks.filter(t => !t.completed).length;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">{t.toOrder}</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toOrder}</div>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">{t.inStock}</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStock}</div>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">{t.soldOut}</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{soldOut}</div>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">{t.pendingTasks}</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.recentOlives}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {olives.slice(0, 5).map((olive) => (
                <div key={olive.id} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>{olive.name}</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    olive.status === 'In Stock' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                    olive.status === 'To Order' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                    'bg-red-500/20 text-red-700 dark:text-red-400'
                  }`}>
                    {olive.status}
                  </span>
                </div>
              ))}
              {olives.length === 0 && <p className="text-muted-foreground">{t.noData}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.upcomingTasks}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tasks.filter(t => !t.completed).slice(0, 5).map((task) => (
                <div key={task.id} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>{task.title}</span>
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-primary/20 text-primary">{task.category}</span>
                </div>
              ))}
              {tasks.filter(t => !t.completed).length === 0 && <p className="text-muted-foreground">{t.noData}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
