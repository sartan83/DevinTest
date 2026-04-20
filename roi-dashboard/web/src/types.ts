export type SessionStatus =
  | "running"
  | "blocked"
  | "suspended"
  | "exit"
  | "error"
  | "unknown";

export interface SessionSummary {
  session_id: string;
  title: string | null;
  status: SessionStatus;
  status_detail: string | null;
  tags: string[];
  created_at: number | null;
  updated_at: number | null;
  acu: number | null;
  repo: string | null;
  url: string | null;
  is_running: boolean;
}

export interface ProjectSummary {
  tag: string;
  session_count: number;
  running_count: number;
  total_acu: number;
  devin_cost_usd: number;
  baselines: {
    vanilla_usd: number;
    cursor_usd: number;
    copilot_usd: number;
  };
  roi: {
    vs_vanilla_pct: number;
    vs_cursor_pct: number;
    vs_copilot_pct: number;
  };
  last_activity: number | null;
  sessions: SessionSummary[];
}

export interface ProjectsResponse {
  projects: ProjectSummary[];
  totals: {
    projects: number;
    sessions: number;
    running: number;
    acu: number;
    devin_cost_usd: number;
    vanilla_usd: number;
    cursor_usd: number;
    copilot_usd: number;
  };
  fetched_at: number;
}

export interface RoiConfig {
  acu_rate_usd: number;
  hourly_rate_usd: number;
  hours_per_acu_vanilla: number;
  cursor_multiplier: number;
  copilot_multiplier: number;
  tag_prefix: string | null;
}

export const DEFAULT_CONFIG: RoiConfig = {
  acu_rate_usd: 2.25,
  hourly_rate_usd: 75,
  hours_per_acu_vanilla: 0.75,
  cursor_multiplier: 0.5,
  copilot_multiplier: 0.7,
  tag_prefix: null,
};
