'use client';

import { useEffect, useState } from 'react';
import Layout from './Components/Mainlayout';
import Dashboard from './Components/dashboard';
import InventoryPage from './Components/inventory-page';
import TasksPage from './Components/tasks-page';
import SettingsPage from './Components/settings-page';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'inventory' | 'tasks' | 'settings'>('dashboard');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const pages = {
    dashboard: <Dashboard />,
    inventory: <InventoryPage />,
    tasks: <TasksPage />,
    settings: <SettingsPage />,
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {pages[currentPage]}
    </Layout>
  );
}
