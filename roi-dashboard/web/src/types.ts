export type SessionStatus =
  | "running"
  | "blocked"
  | "suspended"
  | "working"
  | "exit"
  | "error"
  | "unknown";

export type ApiMode = "v3" | "v1";

export interface SessionSummary {
  session_id: string;
  title: string | null;
  status: SessionStatus | string;
  status_detail: string | null;
  tags: string[];
  created_at: number | string | null;
  updated_at: number | string | null;
  acu: number | null;
  repo: string | null;
  url: string | null;
  is_running: boolean;
}

export interface Baselines {
  vanilla_usd: number;
  cursor_usd: number;
  copilot_usd: number;
}

export interface Roi {
  vs_vanilla_pct: number;
  vs_cursor_pct: number;
  vs_copilot_pct: number;
}

export interface ProjectSummary {
  tag: string;
  session_count: number;
  running_count: number;
  total_acu: number | null;
  devin_cost_usd: number | null;
  baselines: Baselines | null;
  roi: Roi | null;
  last_activity: number | string | null;
  sessions: SessionSummary[];
}

export interface ProjectsResponse {
  mode: ApiMode;
  cost_available: boolean;
  pause_available: boolean;
  projects: ProjectSummary[];
  totals: {
    projects: number;
    sessions: number;
    running: number;
    acu: number | null;
    devin_cost_usd: number | null;
    vanilla_usd: number | null;
    cursor_usd: number | null;
    copilot_usd: number | null;
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
