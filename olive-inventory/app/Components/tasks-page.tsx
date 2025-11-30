'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, X } from 'lucide-react';
import { translations } from '@/lib/translations';

interface Task {
  id: string;
  title: string;
  category: 'Procurement' | 'Packaging' | 'Shipping';
  completed: boolean;
}

export default function TasksPage() {
  const [lang, setLang] = useState('en');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Procurement' | 'Packaging' | 'Shipping'>('Procurement');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setLang(savedLang);

    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  const t = translations[lang as keyof typeof translations];

  const handleAddTask = () => {
    if (!title.trim()) {
      alert(t.fillAllFields);
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      category,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTitle('');
    setShowForm(false);
  };

  const handleToggleTask = (id: string) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const categories = ['Procurement', 'Packaging', 'Shipping'] as const;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t.taskManagement}</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus size={18} /> {t.addNew}
        </Button>
      </div>

      {/* Add Task Form */}
      {showForm && (
        <Card className="border-primary">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t.addTask}</CardTitle>
            <button onClick={() => setShowForm(false)} className="p-1 hover:bg-muted rounded">
              <X size={20} />
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder={t.taskTitle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <Button onClick={handleAddTask} className="flex-1">{t.add}</Button>
                <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">{t.cancel}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tasks by Category */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const catTasks = tasks.filter(t => t.category === cat);
          return (
            <Card key={cat}>
              <CardHeader>
                <CardTitle className="text-lg">{cat} ({catTasks.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {catTasks.length === 0 ? (
                    <p className="text-muted-foreground text-sm">{t.noData}</p>
                  ) : (
                    catTasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition">
                        <Checkbox
                          checked={task.completed}
                          onChange={() => handleToggleTask(task.id)}
                        />
                        <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                          {task.title}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="ml-auto p-1 hover:bg-destructive/20 rounded"
                        >
                          <Trash2 size={16} className="text-destructive" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
