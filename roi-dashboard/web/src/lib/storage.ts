import { DEFAULT_CONFIG } from "../types";
import type { RoiConfig } from "../types";

const KEY_API = "devin_roi.api_key";
const KEY_CFG_V1 = "devin_roi.config.v1";
const KEY_CFG = "devin_roi.config.v2";
const KEY_NAMES = "devin_roi.project_names.v1";

export function getApiKey(): string | null {
  try {
    return localStorage.getItem(KEY_API);
  } catch {
    return null;
  }
}

export function setApiKey(key: string | null) {
  try {
    if (key && key.trim()) localStorage.setItem(KEY_API, key.trim());
    else localStorage.removeItem(KEY_API);
  } catch {
    /* ignore */
  }
}

export function getConfig(): RoiConfig {
  try {
    const raw = localStorage.getItem(KEY_CFG);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<RoiConfig>;
      return { ...DEFAULT_CONFIG, ...parsed };
    }
    // Migrate from v1: preserve user's tuned multipliers / rates, but reset
    // `estimated_acus_per_hour` to the new (lower) default since the old 4.0
    // default produced unrealistically high cost estimates.
    const legacy = localStorage.getItem(KEY_CFG_V1);
    if (legacy) {
      const parsed = JSON.parse(legacy) as Partial<RoiConfig>;
      const migrated: RoiConfig = {
        ...DEFAULT_CONFIG,
        ...parsed,
        estimated_acus_per_hour: DEFAULT_CONFIG.estimated_acus_per_hour,
      };
      localStorage.setItem(KEY_CFG, JSON.stringify(migrated));
      localStorage.removeItem(KEY_CFG_V1);
      return migrated;
    }
    return { ...DEFAULT_CONFIG };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function setConfig(cfg: RoiConfig) {
  try {
    localStorage.setItem(KEY_CFG, JSON.stringify(cfg));
  } catch {
    /* ignore */
  }
}

export type ProjectNames = Record<string, string>;

export function getProjectNames(): ProjectNames {
  try {
    const raw = localStorage.getItem(KEY_NAMES);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? (parsed as ProjectNames) : {};
  } catch {
    return {};
  }
}

export function setProjectName(tag: string, name: string | null) {
  try {
    const current = getProjectNames();
    if (name && name.trim()) current[tag] = name.trim();
    else delete current[tag];
    localStorage.setItem(KEY_NAMES, JSON.stringify(current));
  } catch {
    /* ignore */
  }
}
