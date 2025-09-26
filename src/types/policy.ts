export interface PolicyEntity {
  type: string;
}

export interface PolicyThresholds {
  severity: {
    nudge: number;
    soft: number;
    hard: number;
  };
}

export interface PolicyRuleLogic {
  entities: PolicyEntity[];
  thresholds: PolicyThresholds;
}

export interface PolicyScope {
  users: string[];
  groups: string[];
  apps: string[];
}

export interface PolicyForm {
  name: string;
  // author: string;
  tags: string;
  // source_type: "internal" | "external" | "client";
  // source_mapping: string;
  description: string;
  prompt: string;
  mode: string[];
  version: string;
  status: "active" | "inactive";
}

export interface PolicyData {
  id: string;
  name: string;
  author?: string;
  tags: string[];
  source_type?: "internal" | "external" | "client";
  source_mapping?: string[];
  description: string;
  prompt: string;
  rule_logic?: PolicyRuleLogic;
  mode: string[];
  scope?: PolicyScope;
  exceptions?: string[];
  version: string;
  status: "active" | "inactive";
}
