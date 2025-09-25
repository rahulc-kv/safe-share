import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CheckCircle2, Download } from 'lucide-react';
import { SeverityBadge, EntityPills } from '../common';
import type { Incident } from '../../types';

interface IncidentDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incident: Incident | null;
  updateIncident: (fn: (incident: Incident) => Incident) => void;
}

export function IncidentDetailSheet({ 
  open, 
  onOpenChange, 
  incident, 
  updateIncident 
}: IncidentDetailSheetProps) {
  if (!incident) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[560px] sm:w-[680px]">
        <SheetHeader>
          <SheetTitle>Incident {incident.id}</SheetTitle>
          <SheetDescription>Review context, user action, and evidence</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Severity</CardDescription>
                <CardTitle>
                  <SeverityBadge value={incident.severity} />
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Decision</CardDescription>
                <CardTitle className="text-base">{incident.decision}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Status</CardDescription>
                <CardTitle className="text-base capitalize">{incident.status}</CardTitle>
              </CardHeader>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Who & Where</CardTitle>
              <CardDescription>Actor, endpoint, and channel</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2 md:grid-cols-2 text-sm">
              <div>
                <span className="text-muted-foreground">User</span>
                <div>{incident.user.name} · {incident.user.email}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Dept</span>
                <div>{incident.user.dept}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Endpoint</span>
                <div>
                  {incident.endpoint.host} · {incident.endpoint.os} · agent {incident.endpoint.agent}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Channel/App</span>
                <div>
                  {incident.channel.type} {incident.channel.name} · {incident.channel.app}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What</CardTitle>
              <CardDescription>Entities and masked snippet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <EntityPills entities={incident.entities} />
              <div className="rounded-md border p-3 text-sm bg-muted/30">
                <div className="mb-1 text-xs text-muted-foreground">Snippet (masked)</div>
                <div className="font-mono">{incident.snippet_masked}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Action & Evidence</CardTitle>
              <CardDescription>User action and suggestions shown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">User action:</span>{" "}
                {incident.user_action.type === "override" 
                  ? `override (${incident.user_action.reason})` 
                  : incident.user_action.type
                }
              </div>
              {incident.user_action.type === "override" && (
                <div className="rounded-md border p-3 bg-amber-50">
                  Justification: {incident.user_action.text}
                </div>
              )}
              <div className="rounded-md border p-3 bg-emerald-50">
                Suggestions shown: mask PAN → <code>ABCDE****F</code>; replace attachment with secure link
              </div>
            </CardContent>
          </Card>
          
          <div className="flex items-center gap-2 justify-end">
            <Button 
              variant="secondary" 
              onClick={() => updateIncident((x) => ({ ...x, status: "resolved" }))}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark resolved
            </Button>
            <Button 
              variant="outline" 
              onClick={() => alert("Evidence export (mock)")}
            >
              <Download className="h-4 w-4 mr-2" />
              Export evidence
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
