import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  AppLayout,
  Dashboard,
  IncidentCenter,
  PolicyStudio,
  UsersEndpoints,
  AuditLog,
  SettingsPage,
  ReportsPage
} from './components';
import { INITIAL_POLICIES } from './data/mockData';
import type { Incident, PolicyData } from './types';

function App() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [policies, setPolicies] = useState<PolicyData[]>(INITIAL_POLICIES);

  const handleAddIncident = (incident: Incident) => {
    setIncidents(prev => [incident, ...prev]);
  };

  return (
    <Router>
      <AppLayout onAddIncident={handleAddIncident}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route 
            path="/dashboard" 
            element={<Dashboard incidents={incidents} />} 
          />
          <Route 
            path="/incidents" 
            element={
              <IncidentCenter 
                allIncidents={incidents} 
                setAllIncidents={setIncidents} 
              />
            } 
          />
          <Route 
            path="/policies" 
            element={
              <PolicyStudio 
                policies={policies} 
                setPolicies={setPolicies} 
              />
            } 
          />
          <Route path="/users" element={<UsersEndpoints />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/audit" element={<AuditLog />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;