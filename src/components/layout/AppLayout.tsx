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
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <h1 className="text-xl font-semibold capitalize">
                {currentRoute.replace("_", " ")}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </header>
          {children}
        </main>
      </div>
    </TooltipProvider>
  );
}
