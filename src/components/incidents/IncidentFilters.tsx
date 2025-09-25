/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';
import type { IncidentFilters as IncidentFiltersType } from '../../types';
import { ENTITIES } from '../../data/mockData';

interface IncidentFiltersProps {
  filters: IncidentFiltersType;
  setFilters: React.Dispatch<React.SetStateAction<IncidentFiltersType>>;
}

export function IncidentFilters({ filters, setFilters }: IncidentFiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="w-40">
        <Label className="mb-1 block">Severity</Label>
        <Select 
          value={filters.sev} 
          onValueChange={(v:any) => setFilters((f) => ({ ...f, sev: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="All">
              {filters.sev === "all" ? "All" : 
               filters.sev === "high" ? "High" : 
               filters.sev === "med" ? "Medium" : 
               filters.sev === "low" ? "Low" : "All"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="med">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-40">
        <Label className="mb-1 block">Entity</Label>
        <Select 
          value={filters.entity} 
          onValueChange={(v: any) => setFilters((f) => ({ ...f, entity: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any">
              {filters.entity === "any" ? "Any" : 
               ENTITIES.find(e => e.type === filters.entity)?.type || "Any"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {ENTITIES.map(e => (
              <SelectItem key={e.type} value={e.type}>{e.type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-56">
        <Label className="mb-1 block">Search</Label>
        <Input 
          placeholder="User, channel, snippet…" 
          value={filters.q} 
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))} 
        />
      </div>
      <Button 
        variant="outline" 
        onClick={() => setFilters({ sev: "all", entity: "any", q: "" })}
      >
        <Filter className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}
