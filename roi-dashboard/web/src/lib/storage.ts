import { DEFAULT_CONFIG } from "../types";
import type { RoiConfig } from "../types";

const KEY_API = "devin_roi.api_key";
const KEY_CFG = "devin_roi.config.v1";

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
    if (!raw) return { ...DEFAULT_CONFIG };
    const parsed = JSON.parse(raw) as Partial<RoiConfig>;
    return { ...DEFAULT_CONFIG, ...parsed };
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
