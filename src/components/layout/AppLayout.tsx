import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Download } from 'lucide-react';
import { Icons, Sidebar } from './Sidebar';
import type { Incident } from '../../types';

interface AppLayoutProps {
  onAddIncident: (incident: Incident) => void;
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const currentRoute = location.pathname.substring(1) || 'dashboard';
const Icon = Icons[currentRoute as keyof typeof Icons];
  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-background text-foreground font-sans antialiased">
        <Sidebar />
        <main className="mx-auto w-full p-4 sm:p-6">
          {children}
        </main>
      </div>
    </TooltipProvider>
  );
}
