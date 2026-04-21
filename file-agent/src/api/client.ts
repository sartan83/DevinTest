import type {
  Batch, ExecutedAction, OrganizationRule, PlanSummary, ProposedAction, WatchedFolder,
} from "../types";

let cached: { base: string; token: string } | null = null;

async function resolveConfig(): Promise<{ base: string; token: string }> {
  if (cached) return cached;
  if (typeof window !== "undefined" && window.fileagent) {
    const cfg = await window.fileagent.getConfig();
    cached = { base: `http://${cfg.host}:${cfg.port}`, token: cfg.token };
    return cached;
  }
  // Fallback for browser-only dev preview (no Electron bridge).
  cached = { base: "http://127.0.0.1:53117", token: "" };
  return cached;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const { base, token } = await resolveConfig();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${base}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${method} ${path} failed: ${res.status} ${text}`);
  }
  return (await res.json()) as T;
}

export const api = {
  health: () => request<{ ok: boolean; version: string }>("GET", "/health"),

  listFolders: () => request<WatchedFolder[]>("GET", "/api/folders"),
  addFolder: (path: string, role: string) =>
    request<WatchedFolder>("POST", "/api/folders", { path, role }),
  removeFolder: (id: number) => request<{ ok: boolean }>("DELETE", `/api/folders/${id}`),

  scan: (opts: { folder_ids?: number[]; compute_hashes?: boolean } = {}) =>
    request<{ scanned: Record<string, number>; total_files: number }>("POST", "/api/scan", opts),

  listRules: () => request<OrganizationRule[]>("GET", "/api/rules"),
  updateRule: (id: number, patch: Partial<OrganizationRule>) =>
    request<{ ok: boolean }>("PATCH", `/api/rules/${id}`, patch),

  createPlan: (opts: { folder_ids?: number[]; rule_keys?: string[] } = {}) =>
    request<{ plan_id: string; proposal_ids: number[]; summary: PlanSummary }>(
      "POST", "/api/plan", opts,
    ),
  getPlan: (planId: string) =>
    request<{ summary: PlanSummary; actions: ProposedAction[] }>("GET", `/api/plan/${planId}`),
  approve: (planId: string, actionIds: number[]) =>
    request<{ updated: number }>("POST", `/api/plan/${planId}/approve`, { action_ids: actionIds }),
  reject: (planId: string, actionIds: number[]) =>
    request<{ updated: number }>("POST", `/api/plan/${planId}/reject`, { action_ids: actionIds }),
  apply: (planId: string, mode: "manual" | "semi_auto" | "auto", actionIds?: number[]) =>
    request<{ batch_id: string; executed: ExecutedAction[] }>("POST", "/api/apply", {
      plan_id: planId, mode, action_ids: actionIds,
    }),

  listBatches: () => request<Batch[]>("GET", "/api/batches"),
  rollback: (opts: { batch_id?: string; executed_ids?: number[] }) =>
    request<{ results: Array<{ executed_id: number; success: boolean; error: string | null }> }>(
      "POST", "/api/rollback", opts,
    ),

  activity: () =>
    request<{ executed: ExecutedAction[]; rollback: ExecutedAction[] }>("GET", "/api/activity"),

  settings: () => request<Record<string, string>>("GET", "/api/settings"),
  updateSettings: (patch: Record<string, string>) =>
    request<{ ok: boolean }>("PATCH", "/api/settings", patch),
};
