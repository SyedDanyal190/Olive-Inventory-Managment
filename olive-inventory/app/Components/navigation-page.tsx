'use client';

import { LayoutGrid, Package, CheckSquare, Settings } from 'lucide-react';

interface NavigationProps {
  currentPage: 'dashboard' | 'inventory' | 'tasks' | 'settings';
  onPageChange: (page: 'dashboard' | 'inventory' | 'tasks' | 'settings') => void;
  onClose?: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Navigation({ currentPage, onPageChange, onClose }: NavigationProps) {
  return (
    <nav className="p-4 space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              onPageChange(item.id as any);
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? 'bg-primary text-primary-foreground font-semibold'
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
