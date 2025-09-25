import React from 'react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Download, Shield } from 'lucide-react';
import { Sidebar } from './Sidebar';
import type { Incident } from '../../types';

interface AppLayoutProps {
  currentRoute: string;
  onRouteChange: (route: string) => void;
  onAddIncident: (incident: Incident) => void;
  children: React.ReactNode;
}

export function AppLayout({ 
  currentRoute, 
  onRouteChange, 
  onAddIncident, 
  children 
}: AppLayoutProps) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-background text-foreground font-sans antialiased">
        <Sidebar 
          currentRoute={currentRoute}
          onRouteChange={onRouteChange}
          onAddIncident={onAddIncident}
        />
        <main className="mx-auto w-full max-w-6xl p-4 sm:p-6">
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
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
