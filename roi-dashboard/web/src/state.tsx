import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { DEFAULT_CONFIG } from "./types";
import type { RoiConfig } from "./types";
import {
  getApiKey,
  getConfig,
  setApiKey as persistApiKey,
  setConfig as persistConfig,
} from "./lib/storage";

interface AppStateValue {
  apiKey: string | null;
  setApiKey: (k: string | null) => void;
  config: RoiConfig;
  setConfig: (c: RoiConfig) => void;
  resetConfig: () => void;
}

const Ctx = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [config, setConfigState] = useState<RoiConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    setApiKeyState(getApiKey());
    setConfigState(getConfig());
  }, []);

  const setApiKey = useCallback((k: string | null) => {
    persistApiKey(k);
    setApiKeyState(k && k.trim() ? k.trim() : null);
  }, []);

  const setConfig = useCallback((c: RoiConfig) => {
    persistConfig(c);
    setConfigState(c);
  }, []);

  const resetConfig = useCallback(() => {
    persistConfig(DEFAULT_CONFIG);
    setConfigState(DEFAULT_CONFIG);
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({ apiKey, setApiKey, config, setConfig, resetConfig }),
    [apiKey, setApiKey, config, setConfig, resetConfig]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState(): AppStateValue {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppState must be used within AppStateProvider");
  return v;
}
