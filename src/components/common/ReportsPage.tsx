import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';

export function ReportsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports & Exports</CardTitle>
        <CardDescription>Download CSV/PDF or schedule deliveries</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          CSV (Incidents)
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Evidence PDF bundle
        </Button>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate monthly Board pack
        </Button>
      </CardContent>
    </Card>
  );
}
