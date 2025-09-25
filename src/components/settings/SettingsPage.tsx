import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export function SettingsPage() {
  const [region, setRegion] = useState("india");
  const [incDays, setIncDays] = useState(365);
  const [evDays, setEvDays] = useState(180);
  const [maskDefault, setMaskDefault] = useState(true);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Data Residency</CardTitle>
          <CardDescription>Choose storage region</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label>Region</Label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="eu">European Union</SelectItem>
              <SelectItem value="us">United States</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Retention</CardTitle>
          <CardDescription>Evidence & incident windows</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3">
          <div className="space-y-1">
            <Label>Incidents (days)</Label>
            <Input 
              type="number" 
              value={incDays} 
              onChange={(e) => setIncDays(Number(e.target.value))}
            />
          </div>
          <div className="space-y-1">
            <Label>Evidence bundles (days)</Label>
            <Input 
              type="number" 
              value={evDays} 
              onChange={(e) => setEvDays(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-between rounded-md border p-3">
            <div>
              <div className="font-medium">Mask PII by default</div>
              <div className="text-sm text-muted-foreground">
                Analysts must break‑glass to reveal
              </div>
            </div>
            <Switch checked={maskDefault} onCheckedChange={setMaskDefault} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
