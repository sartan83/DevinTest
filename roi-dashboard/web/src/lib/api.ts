import type { ApiMode, ProjectsResponse, RoiConfig } from "../types";
import { getApiKey } from "./storage";

const RAW_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ?? "/api";
export const API_BASE = RAW_BASE.replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  constructor(msg: string, status: number) {
    super(msg);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  config?: RoiConfig
): Promise<T> {
  const key = getApiKey();
  if (!key) throw new ApiError("Missing Devin API key", 401);

  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-devin-api-key": key,
    ...((init.headers as Record<string, string>) ?? {}),
  };
  if (config) headers["x-roi-config"] = btoa(JSON.stringify(config));

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.detail) msg = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail);
    } catch {
      /* ignore */
    }
    throw new ApiError(msg, res.status);
  }
  return (await res.json()) as T;
}

export function fetchProjects(config: RoiConfig): Promise<ProjectsResponse> {
  const qs = config.tag_prefix
    ? `?tag_prefix=${encodeURIComponent(config.tag_prefix)}`
    : "";
  return request<ProjectsResponse>(`/projects${qs}`, { method: "GET" }, config);
}

export interface PauseResult {
  paused_session_ids: string[];
  errors: { session_id: string; error: string }[];
}

export function pauseProject(tag: string): Promise<PauseResult> {
  return request<PauseResult>(
    `/projects/${encodeURIComponent(tag)}/pause`,
    { method: "POST" }
  );
}

export interface HealthResponse {
  ok: true;
  devin_api: "reachable" | "unreachable";
  mode: ApiMode;
  cost_available: boolean;
  pause_available: boolean;
  user?: Record<string, unknown>;
}

export function checkHealth(): Promise<HealthResponse> {
  return request<HealthResponse>(`/health`, { method: "GET" });
}
