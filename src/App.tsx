import  { useState } from 'react';
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
import { INITIAL_INCIDENTS, INITIAL_POLICIES } from './data/mockData';
import type { Incident, PolicyData } from './types';

function App() {
  const [route, setRoute] = useState("incidents");
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [policies, setPolicies] = useState<PolicyData[]>(INITIAL_POLICIES);

  const handleAddIncident = (incident: Incident) => {
    setIncidents(prev => [incident, ...prev]);
  };

  const renderContent = () => {
    switch (route) {
      case "dashboard":
        return <Dashboard incidents={incidents} />;
      case "incidents":
        return (
          <IncidentCenter 
            allIncidents={incidents} 
            setAllIncidents={setIncidents} 
          />
        );
      case "policies":
        return (
          <PolicyStudio 
            policies={policies} 
            setPolicies={setPolicies} 
          />
        );
      case "users":
        return <UsersEndpoints />;
      case "reports":
        return <ReportsPage />;
      case "audit":
        return <AuditLog />;
      case "settings":
        return <SettingsPage />;
      default:
        return <IncidentCenter allIncidents={incidents} setAllIncidents={setIncidents} />;
    }
  };

  return (
    <AppLayout
      currentRoute={route}
      onRouteChange={setRoute}
      onAddIncident={handleAddIncident}
    >
      {renderContent()}
    </AppLayout>
  );
}

export default App;