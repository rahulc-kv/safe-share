import type { User, Endpoint } from './user';

export interface Channel {
  type: string;
  name: string;
  app: string;
}

export interface Entity {
  type: string;
  confidence: number;
}

export interface Policy {
  id: string;
  name: string;
  version: string;
}

export interface UserAction {
  type: "override" | "masked" | "safesend";
  reason?: "business_need" | "false_positive" | "approved_exception";
  text?: string;
}

export interface Incident {
  id: string;
  time: string;
  severity: string;
  decision: "hard_block" | "soft_block" | "nudge";
  tab: "alert" | "success";
  channel: Channel;
  user: User;
  entities: Entity[];
  justification: string;
  external_recipients: string[];
  policy: Policy;
  user_action: UserAction;
  status: "open" | "resolved";
  assignee: string | null;
  endpoint: Endpoint;
}

export interface IncidentFilters {
  sev: string;
  entity: string;
  q: string;
}
