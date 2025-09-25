export const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "BarChart3" },
  { key: "incidents", label: "Incident Center", icon: "Bell" },
  { key: "policies", label: "Policy Studio", icon: "Layers" },
  { key: "users", label: "Users & Endpoints", icon: "Users2" },
  { key: "reports", label: "Reports & Exports", icon: "FileText" },
  { key: "audit", label: "Audit", icon: "History" },
  { key: "settings", label: "Settings", icon: "Settings" },
] as const;

export const ENTITY_COLORS = {
  PAN: "secondary",
  Aadhaar: "outline",
  Secret: "destructive",
  Contract: "default",
  Email: "secondary",
} as const;
