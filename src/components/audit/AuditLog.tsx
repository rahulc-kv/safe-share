import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function AuditLog() {
  const rows = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    time: new Date(Date.now() - i * 3600e3).toISOString(),
    actor: "admin@acme.com",
    action: "policy_published",
    target: "PAN & Secrets Coaching"
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Log</CardTitle>
        <CardDescription>Immutable admin actions and evidence views</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.id}>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(r.time).toLocaleString()}
                </TableCell>
                <TableCell>{r.actor}</TableCell>
                <TableCell>{r.action}</TableCell>
                <TableCell>{r.target}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
