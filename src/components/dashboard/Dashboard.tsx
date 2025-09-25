import React, { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle2, Download } from 'lucide-react';
import type { Incident } from '../../types';

interface DashboardProps {
  incidents: Incident[];
}

const ProgressBar = ({ 
  value, 
  target, 
  tone 
}: { 
  value: number; 
  target: number; 
  tone: 'ok' | 'warn' | 'info' | 'danger' 
}) => {
  const colors = {
    ok: "bg-emerald-500",
    warn: "bg-amber-500",
    info: "bg-blue-500",
    danger: "bg-red-500",
  };

  return (
    <div className="space-y-2">
      <div className="h-2 w-full rounded-full bg-muted">
        <div 
          className={`h-2 rounded-full ${colors[tone]}`} 
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Target: {target}%</span>
        <span>{value}%</span>
      </div>
    </div>
  );
};

const MiniBar = () => {
  const bars = [38, 45, 28, 31];
  return (
    <div className="grid h-40 w-full grid-cols-4 items-end gap-3">
      {bars.map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div 
            className="w-full rounded-md bg-emerald-500" 
            style={{ height: `${h * 2.2}px` }}
          />
          <div className="text-xs text-muted-foreground">Week {i + 1}</div>
        </div>
      ))}
    </div>
  );
};

export function Dashboard({ incidents }: DashboardProps) {
  const { ack, override } = useMemo(() => {
    const alerts = incidents.filter(i => i.tab === "alert").length;
    const success = incidents.filter(i => i.tab === "success").length;
    const shown = Math.max(1, alerts + success);
    return {
      ack: Math.round((success / shown) * 100),
      override: Math.round((alerts / shown) * 100),
    };
  }, [incidents]);

  // Pie chart data
  const total = 35 + 28 + 22 + 15;
  const a = (35 / total) * 360;
  const b = (28 / total) * 360;
  const c = (22 / total) * 360;
  const pieBg = `conic-gradient(#ef4444 0 ${a}deg,#f59e0b ${a}deg ${a + b}deg,#3b82f6 ${a + b}deg ${a + b + c}deg,#10b981 ${a + b + c}deg 360deg)`;

  return (
    <div className="space-y-4">
      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="gap-1 pb-2">
            <CardDescription>Nudge Acknowledgement Rate</CardDescription>
            <CardTitle className="text-3xl">{ack}%</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ProgressBar value={ack} target={80} tone="ok" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="gap-1 pb-2">
            <CardDescription>Override Rate</CardDescription>
            <CardTitle className="text-3xl">{override}%</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ProgressBar value={override} target={10} tone="warn" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="gap-1 pb-2">
            <CardDescription>Risk Reduction</CardDescription>
            <CardTitle className="text-3xl">52%</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ProgressBar value={52} target={50} tone="info" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="gap-1 pb-2">
            <CardDescription>Protected Users</CardDescription>
            <CardTitle className="text-3xl">1,247</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-muted-foreground">
            Across 3 workspaces
          </CardContent>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Nudge Performance Trends</CardTitle>
            <CardDescription>Weekly acknowledgement and override rates</CardDescription>
          </CardHeader>
          <CardContent>
            <MiniBar />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Violation Types Distribution</CardTitle>
            <CardDescription>Most common sensitive patterns detected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="h-40 w-40 rounded-full" style={{ background: pieBg }} />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  PAN Numbers: 35
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Email Addresses: 28
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  Phone Numbers: 22
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Aadhaar Numbers: 15
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent incidents */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Recent Incidents</CardTitle>
            <CardDescription>Latest policy violations requiring attention</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {incidents.slice(0, 3).map((i) => (
              <div key={i.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  {i.user_action.type === "override" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  )}
                  <div>
                    <div className="text-sm font-medium">
                      {i.id.toUpperCase()} — {i.entities[0].type}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {i.channel.name} · {i.user.email}
                    </div>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={
                    i.user_action.type === "override" 
                      ? "bg-red-100 text-red-700" 
                      : "bg-emerald-100 text-emerald-700"
                  }
                >
                  {i.user_action.type === "override" ? "open" : "resolved"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
