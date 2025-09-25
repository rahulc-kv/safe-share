import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, CheckCircle2, BarChart3, Bell, Layers, Users2, FileText, History, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';
import { makeIncident } from '../../utils/helpers';
import { USERS, CHANNELS, ENTITIES } from '../../data/mockData';
import type { Incident } from '../../types';

interface SidebarProps {
  currentRoute: string;
  onRouteChange: (route: string) => void;
  onAddIncident: (incident: Incident) => void;
}

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: BarChart3 },
  { key: "incidents", label: "Incident Center", icon: Bell },
  { key: "policies", label: "Policy Studio", icon: Layers },
  { key: "users", label: "Users & Endpoints", icon: Users2 },
  { key: "reports", label: "Reports & Exports", icon: FileText },
  { key: "audit", label: "Audit", icon: History },
  { key: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ currentRoute, onRouteChange, onAddIncident }: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 border-r p-4 md:block">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-lg font-bold tracking-tight">safeshare.ai</div>
        <Badge variant="secondary">Admin</Badge>
      </div>
      <nav className="space-y-1">
        {NAV_ITEMS.map((n) => {
          const Icon = n.icon;
          const active = currentRoute === n.key;
          return (
            <Button
              key={n.key}
              variant={active ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                active ? "" : "hover:bg-muted"
              )}
              onClick={() => onRouteChange(n.key)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {n.label}
            </Button>
          );
        })}
      </nav>
      <Separator className="my-4" />
      <div className="space-y-2">
        <div className="text-xs uppercase text-muted-foreground">Preview</div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddIncident(makeIncident(true, USERS, CHANNELS, ENTITIES))}
          >
            <AlertTriangle className="mr-2 h-3 w-3" />
            Alert
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddIncident(makeIncident(false, USERS, CHANNELS, ENTITIES))}
          >
            <CheckCircle2 className="mr-2 h-3 w-3" />
            Success
          </Button>
        </div>
      </div>
    </aside>
  );
}
