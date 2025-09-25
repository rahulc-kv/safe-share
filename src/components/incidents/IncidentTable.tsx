import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SeverityBadge, EntityPills } from '../common';
import type { Incident } from '../../types';

interface IncidentTableProps {
  items: Incident[];
  hideAction?: boolean;
  onOpen: (incident: Incident) => void;
}

export function IncidentTable({ items, onOpen, hideAction = false }: IncidentTableProps) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Alert ID</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Entities(Confidence%)</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Channel</TableHead>
            {!hideAction && <TableHead>Action</TableHead>}
            <TableHead>Policy violated</TableHead>
            <TableHead>Created Time</TableHead>
            <TableHead>Justification</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((i) => (
            <TableRow key={i.id} className="cursor-pointer" onClick={() => onOpen(i)}>
              <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                {`INC-${i.id.slice(i.id.length-4)}`}
              </TableCell>
              <TableCell>
                <SeverityBadge value={i.severity} />
              </TableCell>
              <TableCell>
                <EntityPills entities={i.entities} />
              </TableCell>

              <TableCell className="text-sm truncate max-w-[200px]">
                {i.user.name}
                {/* <span className="text-muted-foreground"> · {i.user.dept}</span> */}
              </TableCell>
              <TableCell className="text-sm">
                {i.channel.name}
                {/* <span className="text-muted-foreground"> · {i.channel.app}</span> */}
              </TableCell>
              {!hideAction && <TableCell className="text-sm min-w-[110px]">
                {i.user_action.type === "override" ? (
                  <Badge variant="destructive">Override</Badge>
                ) : i.user_action.type === "masked" ? (
                  <Badge>Masked</Badge>
                ) : (
                  <Badge variant="secondary">SafeSend</Badge>
                )}
              </TableCell>}
              <TableCell className="text-sm truncate max-w-[200px]">
                {i.policy.name}
                {/* <span className="text-muted-foreground"> v{i.policy.version}</span> */}
              </TableCell>
              <TableCell className="whitespace-nowrap text-xs">
                {new Date(i.time).toLocaleString()}
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-sm">
                {i.justification}
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
