import { useMemo } from 'react';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DonutChart } from '@/components/ui/donut-chart';
import { LineChart } from '@/components/ui/line-chart';
// import { AlertTriangle, CheckCircle2, Download } from 'lucide-react';
import type { Incident } from '../../types';
import { supabaseApi } from '@/supabase/api';
import { Button } from '../ui/button';
import { Icons } from '../layout/Sidebar';
import { Download } from 'lucide-react';

interface DashboardProps {
  incidents: Incident[];
}

const ProgressBar = ({
  value,
  target,
  tone
}: {
  value: number;
  target: number;
  tone: 'ok' | 'warn' | 'info' | 'danger'
}) => {
  const colors = {
    ok: "bg-emerald-500",
    warn: "bg-amber-500",
    info: "bg-blue-500",
    danger: "bg-red-500",
  };

  return (
    <div className="space-y-2">
      <div className="h-2 w-full rounded-full bg-muted">
        <div
          className={`h-2 rounded-full ${colors[tone]}`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Target: {target}%</span>
        <span>{value}%</span>
      </div>
    </div>
  );
};

export function Dashboard({ incidents }: DashboardProps) {
  const { override } = useMemo(() => {
    const alerts = incidents.filter(i => i.tab === "alert").length;
    const success = incidents.filter(i => i.tab === "success").length;
    const shown = Math.max(1, alerts + success);
    return {
      ack: Math.round((success / shown) * 100),
      override: Math.round((alerts / shown) * 100),
    };
  }, [incidents]);
  supabaseApi.channel('users-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'users' },
      (payload) => {
        console.log('Realtime event:', payload)
      }
    )
    .subscribe()
  // Donut chart data for violation types
  const donutData = {
    labels: ['PAN Numbers', 'Email Addresses', 'Phone Numbers', 'Aadhaar Numbers'],
    datasets: [
      {
        data: [35, 28, 22, 15],
        backgroundColor: [
          '#ef4444', // red-500
          '#f59e0b', // amber-500
          '#3b82f6', // blue-500
          '#10b981', // emerald-500
        ],
        borderColor: [
          '#ef4444',
          '#f59e0b',
          '#3b82f6',
          '#10b981',
        ],
        borderWidth: 0,
      },
    ],
  };

  const totalViolations = 35 + 28 + 22 + 15; // Sum of all violation data

  const totalAlertData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [35, 28, 22],
        backgroundColor: [
          '#E53935', // red-500
          '#FB8C00', // amber-500
          '#1E88E5', // blue-500
        ],
        borderColor: [
          '#E53935',
          '#FB8C00',
          '#1E88E5',
        ],
        borderWidth: 0,
      },
    ],
  };

  const totalAlerts = 235 + 28 + 22; // Sum of all alert data

  // Line chart data for performance trends
  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Acknowledgement Rate',
        data: [38, 45, 28, 31],
        borderColor: '#10b981', // emerald-500
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.dashboard className="h-5 w-5" />
          <h1 className="text-xl font-semibold capitalize">
            Dashboard
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
        {/* KPI row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="gap-1 pb-4">
              <CardDescription>Total Alerts</CardDescription>
              <DonutChart
                data={totalAlertData}
                centerText={totalAlerts}
                centerSubtext="Alerts"
              />
              <div className='flex flex-row gap-2 text-[14px]'>
                <div className='bg-muted rounded-md px-2'>
                  <span className='inline-flex h-2 w-2 mr-1 rounded-full bg-[#E53935]' />
                  High</div>
                <div className='bg-muted rounded-md px-2'>
                  <span className='inline-flex h-2 w-2 mr-1 rounded-full bg-[#FB8C00]' />
                  Medium</div>
                <div className='bg-muted rounded-md px-2'>
                  <span className='inline-flex h-2 w-2 mr-1 rounded-full bg-[#1E88E5]' />
                  Low</div>
              </div>
              {/* <CardTitle className="text-3xl">{ack}%</CardTitle> */}
            </CardHeader>
            {/* <CardContent className="pt-0">
            <ProgressBar value={ack} target={80} tone="ok" />
          </CardContent> */}
          </Card>
          <Card>
            <CardHeader className="gap-1 pb-2">
              <CardDescription>Override Rate</CardDescription>
              critical/med/low
              <CardTitle className="text-3xl">{override}%</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ProgressBar value={override} target={10} tone="warn" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="gap-1 pb-2">
              <CardDescription>Risk Reduction</CardDescription>
              <CardTitle className="text-3xl">52%</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ProgressBar value={52} target={50} tone="info" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="gap-1 pb-2">
              <CardDescription>Protected Users</CardDescription>
              <CardTitle className="text-3xl">1,247</CardTitle>
            </CardHeader>
            {/* <CardContent className="pt-0 text-xs text-muted-foreground">
            Across 3 workspaces
          </CardContent> */}
          </Card>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Nudge Performance Trends</CardTitle>
              <CardDescription>Weekly acknowledgement and override rates</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart data={lineChartData} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Violation Types Distribution</CardTitle>
              <CardDescription>Most common sensitive patterns detected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <DonutChart
                  data={donutData}
                  centerText={totalViolations}
                  centerSubtext="Violations"
                />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    PAN Numbers: 35
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Email Addresses: 28
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Phone Numbers: 22
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Aadhaar Numbers: 15
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent incidents */}
        {/* <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Recent Incidents</CardTitle>
            <CardDescription>Latest policy violations requiring attention</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {incidents.slice(0, 3).map((i) => (
              <div key={i.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  {i.user_action.type === "override" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  )}
                  <div>
                    <div className="text-sm font-medium">
                      {i.id.toUpperCase()} — {i.entities[0].type}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {i.channel.name} · {i.user.email}
                    </div>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={
                    i.user_action.type === "override" 
                      ? "bg-red-100 text-red-700" 
                      : "bg-emerald-100 text-emerald-700"
                  }
                >
                  {i.user_action.type === "override" ? "open" : "resolved"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
      </div>
    </>
  );
}
