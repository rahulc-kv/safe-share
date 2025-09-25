import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import type { PolicyData } from '../../types';
import { supabaseApi } from '@/supabase/api';

interface PolicyListProps {
  policies: PolicyData[];
  setPolicies: React.Dispatch<React.SetStateAction<PolicyData[]>>;
  openEditor: (policy?: PolicyData) => void;
}

export function PolicyList({ openEditor }: PolicyListProps) {
  const [policies, setPolicies] = useState<PolicyData[]>([]);
  useEffect(() => {
    const getInstruments = async () => {
      const { data } = await supabaseApi.from("policy").select(`
        id,
        name,
        description,
        is_enabled,
        version,
        tags,
        modes,
        created_at,
        prompt
      `);

      if (data) {
        // setIncidents(data as unknown as IncidentData);
        // Transform the data and update allIncidents
        // const transformedIncidents = transformIncidentData(data as unknown as IncidentData);
        // setIncidents(transformedIncidents)
        
        setPolicies(data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            status: item.is_enabled ? "active" : "inactive",
            version: item.version,
            tags: item.tags,
            mode: item.modes,
            prompt: item.prompt
          }
        }))
      }

      console.log(data);
    };
    getInstruments();
  }, []);
  return (
    <Card>
      <CardHeader className="flex justify-between items-start">
        <div>
          <CardTitle className="text-base">Policies</CardTitle>
          <CardDescription>Create, edit, and organize detection & enforcement rules</CardDescription>
        </div>
        {/* <div className="flex gap-2 ">
          <Button variant="outline" onClick={() => openEditor(undefined)}>
            <Plus className="mr-2 h-4 w-4" />
            New Policy
          </Button>
        </div> */}
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="space-x-1">
                    {p.tags.map((t: string) => (
                      <Badge key={t} variant="secondary">{t}</Badge>
                    ))}
                  </TableCell>
                  <TableCell className="space-x-1">
                  {p.mode.map((m: string) => (
                    <Badge key={m}>{m}</Badge>
                  ))}
                  </TableCell>
                  <TableCell>v{p.version}</TableCell>
                  <TableCell className="capitalize">{p.status}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4 rotate-90" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditor(p)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigator.clipboard.writeText(JSON.stringify(p, null, 2))}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy JSON
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => setPolicies((list) => list.filter(x => x.id !== p.id))}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {policies.length === 0 && (
          <div className="p-6 text-center text-sm text-muted-foreground">
            No policies yet. Create one to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
