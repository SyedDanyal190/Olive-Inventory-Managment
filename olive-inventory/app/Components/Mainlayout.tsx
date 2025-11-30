'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/app/Components/navigation-page';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: 'dashboard' | 'inventory' | 'tasks' | 'settings';
  onPageChange: (page: 'dashboard' | 'inventory' | 'tasks' | 'settings') => void;
}

export default function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background text-foreground`}>
      <div className="flex h-screen">
        {/* Sidebar */}
        {(!isMobile || isSidebarOpen) && (
          <div className="fixed md:relative w-64 h-full bg-card border-r border-border shadow-lg z-40">
            <div className="p-6 border-b border-border">
              <h1 className="text-2xl font-bold text-primary">🫒 Olive</h1>
              <p className="text-sm text-muted-foreground">Inventory System</p>
            </div>
            <Navigation currentPage={currentPage} onPageChange={onPageChange} onClose={() => isMobile && setIsSidebarOpen(false)} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-card border-b border-border shadow-sm sticky top-0 z-30">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden p-2 hover:bg-muted rounded-lg"
                >
                  {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <h2 className="text-xl font-semibold capitalize hidden md:block">
                  {currentPage === 'dashboard' && 'Dashboard'}
                  {currentPage === 'inventory' && 'Inventory Management'}
                  {currentPage === 'tasks' && 'Task Management'}
                  {currentPage === 'settings' && 'Settings'}
                </h2>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-muted rounded-lg transition"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6 bg-background">
            {children}
          </main>
        </div>

        {/* Mobile overlay */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}




// 'use client';

// import React from 'react';

// interface LayoutProps {
//   children: React.ReactNode;
//   currentPage: 'dashboard' | 'inventory' | 'tasks' | 'settings';
//   onPageChange: (page: 'dashboard' | 'inventory' | 'tasks' | 'settings') => void;
// }

// export default function Layout({ children, currentPage, onPageChange }: LayoutProps) {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <aside className="w-60 h-screen bg-gray-900 text-white p-4 space-y-4">

//         <button
//           onClick={() => onPageChange('dashboard')}
//           className={`${currentPage === 'dashboard' ? 'text-blue-400' : ''}`}
//         >
//           Dashboard
//         </button>

//         <button
//           onClick={() => onPageChange('inventory')}
//           className={`${currentPage === 'inventory' ? 'text-blue-400' : ''}`}
//         >
//           Inventory
//         </button>

//         <button
//           onClick={() => onPageChange('tasks')}
//           className={`${currentPage === 'tasks' ? 'text-blue-400' : ''}`}
//         >
//           Tasks
//         </button>

//         <button
//           onClick={() => onPageChange('settings')}
//           className={`${currentPage === 'settings' ? 'text-blue-400' : ''}`}
//         >
//           Settings
//         </button>

//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-gray-100">
//         {children}
//       </main>
//     </div>
//   );
// }
