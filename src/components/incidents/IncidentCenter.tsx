/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle2, Download } from 'lucide-react';
import { HeaderKpis } from '../common';
import { IncidentFilters } from './IncidentFilters';
import { IncidentTable } from './IncidentTable';
import { IncidentDetailSheet } from './IncidentDetailSheet';
import type { Incident, IncidentFilters as IncidentFiltersType } from '../../types';
// import { makeIncident } from '../../utils/helpers';
import { USERS, CHANNELS, ENTITIES } from '../../data/mockData';
import { supabaseApi } from '@/supabase/api';
import { Icons } from '../layout/Sidebar';

interface IncidentCenterProps {
  allIncidents: Incident[];
  setAllIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
}

type IncidentData = {
  id: string;
  channel: string;
  action: string;
  justification: string;
  created_at: string;
  entity_value: string;
  confidence: number;
  user: {
    id: string;
    name: string;
    department: string;
  };
  rule: {
    id: string;
    policy: {
      id: string;
      name: string;
      description: string;
    };
    severity: string;
    entity_type: string;
  };
}[]

// Transform function to convert Supabase data to Incident format
function transformIncidentData(data: IncidentData): Incident[] {
  return data.map(item => {
    const user = item.user; // Assuming first user from array
    const rule = item.rule; // Assuming first rule from array
    const policy = rule.policy; // Assuming first policy from array
    console.log('====', rule);

    // Determine decision based on action
    const decision: "delete" | "mask" | "override" =
      item.action === "block" ? "delete" :
        item.action === "warn" ? "mask" : "override";

    // Determine tab based on action
    const tab: "alert" | "success" =
      item.action === "allow" ? "success" : "alert";

    // Determine user action type
    const userActionType: "override" | "masked" | "safesend" =
      item.action === "override" ? "override" :
        item.action === "masked" ? "masked" : "safesend";

    return {
      id: item.id,
      time: item.created_at,
      severity: rule.severity,
      decision: decision,
      tab: tab,
      channel: {
        type: "email", // Default type, could be derived from channel field
        name: item.channel,
        app: "outlook" // Default app, could be derived from channel field
      },
      user: {
        id: user?.id || "",
        name: user?.name || "",
        email: `${user?.name?.toLowerCase().replace(/\s+/g, '.')}@company.com`, // Generate email
        dept: user?.department || "",
        manager: "Unknown" // Default manager
      },
      entities: [{
        type: rule?.entity_type || "unknown",
        confidence: item.confidence > 50 ? item.confidence <= 100 ? item.confidence : 100 : 50 // Default confidence
      }],
      justification: item.justification, // Mask the entity value
      external_recipients: [], // Default empty array
      policy: {
        id: policy.id,
        name: policy.name,
        version: "1.0" // Default version
      },
      user_action: {
        type: userActionType,
        reason: item.justification ? "business_need" : undefined,
        text: item.justification
      },
      status: "open" as const,
      assignee: null,
      endpoint: {
        host: "unknown-host",
        os: "unknown",
        agent: "unknown",
        last_seen: item.created_at
      }
    };
  });
}



export function IncidentCenter({ setAllIncidents }: IncidentCenterProps) {
  const [tab, setTab] = useState("alerts");
  const [filters, setFilters] = useState<IncidentFiltersType>({
    sev: "all",
    entity: "any",
    q: ""
  });
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Incident | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);


  useEffect(() => {
    const getInstruments = async () => {
      const { data } = await supabaseApi.from("incident").select(`
        id,
        channel,
        action,
        justification,
        created_at,
        confidence,
        entity_value,
        user:resource_id ( id, name, department ),
        rule:rule_id(id, policy:policy_id ( id, name, description ), severity, entity_type)`
      ).order('created_at', { ascending: false });

      if (data) {
        // setIncidents(data as unknown as IncidentData);
        // Transform the data and update allIncidents
        const transformedIncidents = transformIncidentData(data as unknown as IncidentData);
        setIncidents(transformedIncidents);
      }

      console.log(data);
    };
    getInstruments();
  }, []);


  function filtered(tabKey: string) {
    return incidents
      .filter(i => (tabKey === "alerts" ? i.user_action.type === "override" : i.user_action.type !== "override"))
      .filter(i =>
        filters.sev === "all" ||
        (filters.sev === "high" ? i.severity.toLowerCase() === 'high' :
          filters.sev === "med" ? i.severity.toLowerCase() === 'medium' :
            i.severity.toLowerCase() === 'low')
      )
      .filter(i =>
        filters.entity === "any" ||
        i.entities.some(e => e.type === filters.entity)
      )
      .filter(i =>
        !filters.q ||
        (i.user.name.toLowerCase().includes(filters.q.toLowerCase()) ||
          i.channel.name.toLowerCase().includes(filters.q.toLowerCase()) ||
          i.justification.toLowerCase().includes(filters.q.toLowerCase()))
      );
  }

  const alerts = filtered("alerts");
  const success = filtered("success");

  return (
    <>
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.incidents className="h-5 w-5" />
          <h1 className="text-xl font-semibold capitalize">
            Incidents
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </header>
      <div className="space-y-4">
        {/* <HeaderKpis incidents={allIncidents} /> */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Incident Center</CardTitle>
              <CardDescription>Review risky overrides and successful safe‑sends</CardDescription>
            </div>
            {/* <div className="flex gap-2">
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
          </div> */}
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <IncidentFilters filters={filters} setFilters={setFilters} />
            </div>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="alerts">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Overridden Alerts
                </TabsTrigger>
                <TabsTrigger value="success">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Safe‑send Alerts
                </TabsTrigger>
              </TabsList>
              <TabsContent value="alerts" className="mt-4">
                <IncidentTable
                  items={alerts}
                  hideAction={true}
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
    </>
  );
}
