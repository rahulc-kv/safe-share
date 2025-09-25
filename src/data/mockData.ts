import type { User, Channel, Entity, PolicyData } from '../types';
// import { makeIncident } from '../utils/helpers';

export const USERS: User[] = [
  { id: "u1", name: "Anika Rao", email: "anika.rao@example.com", dept: "Finance", manager: "meera.k@example.com" },
  { id: "u2", name: "Rahul Iyer", email: "rahul.iyer@example.com", dept: "Sales", manager: "meera.k@example.com" },
  { id: "u3", name: "Meera Kapoor", email: "meera.k@example.com", dept: "Security", manager: "ciso@example.com" },
];

export const CHANNELS: Channel[] = [
  { type: "slack", name: "#general", app: "Slack Desktop" },
  { type: "slack", name: "#sales", app: "Slack Desktop" },
  { type: "gmail", name: "Compose", app: "Gmail (Chrome)" },
  { type: "outlook", name: "New Message", app: "Outlook Desktop" },
];

export const ENTITIES: Entity[] = [
  { type: "PAN", confidence: 0.95 },
  { type: "Aadhaar", confidence: 0.88 },
  { type: "Secret", confidence: 0.92 },
  { type: "Contract", confidence: 0.85 },
  { type: "Email", confidence: 0.90 },
];

export const INITIAL_POLICIES: PolicyData[] = [
  { 
    id: "pol_7", 
    name: "PII", 
    author: "Security Research", 
    tags: ["PAN", "Aadhar", "Internal"], 
    source_type: "internal", 
    source_mapping: ["DPDP §8"], 
    description: "Detect Indian PAN and cloud secrets.", 
    prompt: "Flag Indian PAN and cloud secrets with context.", 
    rule_logic: { 
      entities: [{ type: "PAN" }, { type: "AWS_SECRET" }], 
      thresholds: { severity: { nudge: 30, soft: 60, hard: 80 } } 
    }, 
    mode: ["soft"], 
    scope: { users: ["*"], groups: ["Finance", "Delivery"], apps: ["*"] }, 
    exceptions: [], 
    version: "1.2.0", 
    status: "active" 
  },
  { 
    id: "pol_2", 
    name: "CII", 
    author: "Compliance", 
    tags: ["PII", "External"], 
    source_type: "external", 
    source_mapping: ["DPDP §8"], 
    description: "Detect Aadhaar numbers", 
    prompt: "Identify Aadhaar sequences in Indian formats", 
    rule_logic: { 
      entities: [{ type: "Aadhaar" }], 
      thresholds: { severity: { nudge: 20, soft: 50, hard: 75 } }
    }, 
    mode: ["nudge"], 
    scope: { users: ["*"], groups: ["Sales"], apps: ["*"] }, 
    exceptions: [], 
    version: "1.0.3", 
    status: "active" 
  },
  { 
    id: "pol_2", 
    name: "DPDP", 
    author: "Compliance", 
    tags: ["PII", "External"], 
    source_type: "external", 
    source_mapping: ["DPDP §8"], 
    description: "Detect Aadhaar numbers", 
    prompt: "Identify Aadhaar sequences in Indian formats", 
    rule_logic: { 
      entities: [{ type: "Aadhaar" }], 
      thresholds: { severity: { nudge: 20, soft: 50, hard: 75 } }
    }, 
    mode: ["nudge"], 
    scope: { users: ["*"], groups: ["Sales"], apps: ["*"] }, 
    exceptions: [], 
    version: "1.0.3", 
    status: "active" 
  },
];

// export const INITIAL_INCIDENTS: Incident[] = [
//   ...Array.from({ length: 6 }, () => makeIncident(true, USERS, CHANNELS, ENTITIES)),
//   ...Array.from({ length: 10 }, () => makeIncident(false, USERS, CHANNELS, ENTITIES)),
// ];
