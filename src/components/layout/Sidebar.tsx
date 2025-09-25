/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Bell, Layers, Users2, FileText, History, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

// eslint-disable-next-line react-refresh/only-export-components
export const Icons = {
  dashboard: BarChart3,
  incidents: Bell,
  policies: Layers,
  settings: Settings,
}

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: BarChart3, path: "/dashboard" },
  { key: "incidents", label: "Incident Center", icon: Bell, path: "/incidents" },
  { key: "policies", label: "Policy Studio", icon: Layers, path: "/policies" },
  // { key: "users", label: "Users & Endpoints", icon: Users2, path: "/users" },
  // { key: "reports", label: "Reports & Exports", icon: FileText, path: "/reports" },
  // { key: "audit", label: "Audit", icon: History, path: "/audit" },
  { key: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();
  const currentRoute = location.pathname.substring(1) || 'incidents';

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 border-r p-4 md:block">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-lg font-bold tracking-tight">safeshare.ai</div>
        {/* <Badge variant="secondary">Admin</Badge> */}
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
              asChild
            >
              <Link to={n.path}>
                <Icon className="mr-2 h-4 w-4" />
                {n.label}
              </Link>
            </Button>
          );
        })}
      </nav>
      {/* <Separator className="my-4" /> */}
      {/* <div className="space-y-2">
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
      </div> */}
    </aside>
  );
}
