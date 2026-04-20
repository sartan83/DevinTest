import { DEFAULT_CONFIG } from "../types";
import type { RoiConfig } from "../types";

const KEY_API = "devin_roi.api_key";
const KEY_CFG_V1 = "devin_roi.config.v1";
const KEY_CFG_V2 = "devin_roi.config.v2";
const KEY_CFG_V3 = "devin_roi.config.v3";
const KEY_CFG = "devin_roi.config.v4";
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
    // Migrate from earlier versions. We preserve tuned fields but force-reset
    // the two estimate-calibration fields whose defaults have been re-tuned:
    //   - estimated_acus_per_hour (1 -> 2, v1 -> v4)
    //   - hours_per_acu_vanilla   (3 -> 5, v3 -> v4)
    const legacy =
      localStorage.getItem(KEY_CFG_V3) ??
      localStorage.getItem(KEY_CFG_V2) ??
      localStorage.getItem(KEY_CFG_V1);
    if (legacy) {
      const parsed = JSON.parse(legacy) as Partial<RoiConfig>;
      const migrated: RoiConfig = {
        ...DEFAULT_CONFIG,
        ...parsed,
        estimated_acus_per_hour: DEFAULT_CONFIG.estimated_acus_per_hour,
        hours_per_acu_vanilla: DEFAULT_CONFIG.hours_per_acu_vanilla,
      };
      localStorage.setItem(KEY_CFG, JSON.stringify(migrated));
      localStorage.removeItem(KEY_CFG_V1);
      localStorage.removeItem(KEY_CFG_V2);
      localStorage.removeItem(KEY_CFG_V3);
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
