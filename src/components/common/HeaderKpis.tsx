import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Incident } from '../../types';

interface HeaderKpisProps {
  incidents: Incident[];
}

export function HeaderKpis({ incidents }: HeaderKpisProps) {
  const { alerts, success, overrideRate, ackRate } = useMemo(() => {
    const a = incidents.filter(i => i.tab === "alert").length;
    const s = incidents.filter(i => i.tab === "success").length;
    const overrides = a; // simplification
    const shown = a + s || 1;
    return { 
      alerts: a, 
      success: s, 
      overrideRate: Math.round((overrides / shown) * 100), 
      ackRate: Math.round((s / shown) * 100) 
    };
  }, [incidents]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>High‑risk overrides</CardDescription>
          <CardTitle className="text-3xl">{alerts}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Successful safe‑sends</CardDescription>
          <CardTitle className="text-3xl">{success}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Override rate</CardDescription>
          <CardTitle className="text-3xl">{overrideRate}%</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Nudge ack rate</CardDescription>
          <CardTitle className="text-3xl">{ackRate}%</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
