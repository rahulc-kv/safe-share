import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SeverityBadge, EntityPills } from '../common';
import type { Incident } from '../../types';

interface IncidentTableProps {
  items: Incident[];
  onOpen: (incident: Incident) => void;
}

export function IncidentTable({ items, onOpen }: IncidentTableProps) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Entities</TableHead>
            <TableHead>Channel/App</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Policy</TableHead>
            <TableHead>Snippet</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((i) => (
            <TableRow key={i.id} className="cursor-pointer" onClick={() => onOpen(i)}>
              <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                {new Date(i.time).toLocaleString()}
              </TableCell>
              <TableCell>
                <SeverityBadge value={i.severity} />
              </TableCell>
              <TableCell>
                <EntityPills entities={i.entities} />
              </TableCell>
              <TableCell className="text-sm">
                {i.channel.type} {i.channel.name} 
                <span className="text-muted-foreground"> · {i.channel.app}</span>
              </TableCell>
              <TableCell className="text-sm">
                {i.user.name} 
                <span className="text-muted-foreground"> · {i.user.dept}</span>
              </TableCell>
              <TableCell className="text-sm">
                {i.user_action.type === "override" ? (
                  <Badge variant="destructive">Override</Badge>
                ) : i.user_action.type === "mask" ? (
                  <Badge>Masked</Badge>
                ) : (
                  <Badge variant="secondary">Deleted</Badge>
                )}
              </TableCell>
              <TableCell className="text-sm">
                {i.policy.name} 
                <span className="text-muted-foreground"> v{i.policy.version}</span>
              </TableCell>
              <TableCell className="max-w-[360px] truncate text-sm">
                {i.snippet_masked}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {items.length === 0 && (
        <div className="p-8 text-center text-sm text-muted-foreground">
          No incidents match your filters.
        </div>
      )}
    </div>
  );
}
