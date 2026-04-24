export interface WatchedFolder {
  id: number;
  path: string;
  role: "downloads" | "documents" | "pictures" | "user" | string;
  enabled: number;
  created_at: string;
}

export interface OrganizationRule {
  id: number;
  key: string;
  name: string;
  description: string;
  enabled: number;
  risk: "safe" | "review" | "sensitive";
  mode: "off" | "preview" | "approval" | "auto";
  min_confidence: number;
  priority: number;
}

export interface ProposedAction {
  id: number;
  file_id: number;
  op_type: "move" | "rename" | "quarantine" | "create_folder" | "archive";
  before_path: string;
  after_path: string;
  reason: string;
  confidence: number;
  requires_approval: number;
  status: "pending" | "approved" | "rejected" | "executed" | "skipped";
  rule_key: string | null;
  rule_name: string | null;
  rule_risk: "safe" | "review" | "sensitive" | null;
}

export interface PlanSummary {
  plan_id: string;
  total_actions: number;
  auto_eligible: number;
  requires_approval: number;
  counts_by_rule: Record<string, number>;
}

export interface ExecutedAction {
  id: number;
  batch_id: string;
  op_type: string;
  before_path: string;
  after_path: string;
  success: number;
  error_message: string | null;
  reversible: number;
  executed_at: string;
  rule_key: string | null;
  rule_name: string | null;
}

export interface Batch {
  batch_id: string;
  started_at: string;
  action_count: number;
  success_count: number;
  reversible_count: number;
}

declare global {
  interface Window {
    fileagent: {
      getConfig(): Promise<{ host: string; port: number; token: string }>;
      pickFolder(): Promise<string | null>;
      openPath(p: string): Promise<void>;
    };
  }
}
