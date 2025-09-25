import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { USERS } from '../../data/mockData';

export function UsersEndpoints() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users & Endpoints</CardTitle>
        <CardDescription>Directory, risk, and device health</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Dept</TableHead>
              <TableHead>Risk score</TableHead>
              <TableHead>Devices</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {USERS.map(u => (
              <TableRow key={u.id}>
                <TableCell>
                  {u.name} <span className="text-muted-foreground">· {u.email}</span>
                </TableCell>
                <TableCell>{u.dept}</TableCell>
                <TableCell>{Math.floor(Math.random() * 70) + 10}</TableCell>
                <TableCell>{Math.floor(Math.random() * 3) + 1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
