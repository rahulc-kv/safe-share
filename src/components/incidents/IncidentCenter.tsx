import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { HeaderKpis } from '../common';
import { IncidentFilters } from './IncidentFilters';
import { IncidentTable } from './IncidentTable';
import { IncidentDetailSheet } from './IncidentDetailSheet';
import type { Incident, IncidentFilters as IncidentFiltersType } from '../../types';
import { makeIncident } from '../../utils/helpers';
import { USERS, CHANNELS, ENTITIES } from '../../data/mockData';
import { supabaseApi } from '@/supabase/api';

interface IncidentCenterProps {
  allIncidents: Incident[];
  setAllIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
}


export function IncidentCenter({ allIncidents, setAllIncidents }: IncidentCenterProps) {
  const [tab, setTab] = useState("alerts");
  const [filters, setFilters] = useState<IncidentFiltersType>({ 
    sev: "all", 
    entity: "any", 
    q: "" 
  });
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Incident | null>(null);

  useEffect(() => {
    getInstruments();
  }, []);
  async function getInstruments() {
    const { data } = await supabaseApi.from("resource").select();
  console.log(data);
  }

  function filtered(tabKey: string) {
    return allIncidents
      .filter(i => (tabKey === "alerts" ? i.user_action.type === "override" : i.user_action.type !== "override"))
      .filter(i => 
        filters.sev === "all" || 
        (filters.sev === "high" ? i.severity > 80 : 
         filters.sev === "med" ? i.severity > 50 && i.severity <= 80 : 
         i.severity <= 50)
      )
      .filter(i => 
        filters.entity === "any" || 
        i.entities.some(e => e.type === filters.entity)
      )
      .filter(i => 
        !filters.q || 
        (i.user.name.toLowerCase().includes(filters.q.toLowerCase()) || 
         i.channel.name.toLowerCase().includes(filters.q.toLowerCase()) || 
         i.snippet_masked.toLowerCase().includes(filters.q.toLowerCase()))
      );
  }

  const alerts = filtered("alerts");
  const success = filtered("success");

  return (
    <div className="space-y-4">
      <HeaderKpis incidents={allIncidents} />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Incident Center</CardTitle>
            <CardDescription>Review risky overrides and successful safe‑sends</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setAllIncidents((prev) => [makeIncident(true, USERS, CHANNELS, ENTITIES), ...prev])}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Simulate Alert
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setAllIncidents((prev) => [makeIncident(false, USERS, CHANNELS, ENTITIES), ...prev])}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Simulate Success
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <IncidentFilters filters={filters} setFilters={setFilters} />
          </div>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="alerts">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Alerts (Overrides)
              </TabsTrigger>
              <TabsTrigger value="success">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Success (Safe‑sends)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="alerts" className="mt-4">
              <IncidentTable 
                items={alerts} 
                onOpen={(i) => { 
                  setCurrent(i); 
                  setOpen(true); 
                }} 
              />
            </TabsContent>
            <TabsContent value="success" className="mt-4">
              <IncidentTable 
                items={success} 
                onOpen={(i) => { 
                  setCurrent(i); 
                  setOpen(true); 
                }} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <IncidentDetailSheet 
        open={open} 
        onOpenChange={setOpen} 
        incident={current} 
        updateIncident={(fn) =>
          current && setAllIncidents((list) => 
            list.map(i => i.id === current.id ? fn(i) : i)
          )
        }
      />
    </div>
  );
}
