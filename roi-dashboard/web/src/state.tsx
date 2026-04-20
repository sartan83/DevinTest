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
  getProjectNames,
  setApiKey as persistApiKey,
  setConfig as persistConfig,
  setProjectName as persistProjectName,
} from "./lib/storage";
import type { ProjectNames } from "./lib/storage";

interface AppStateValue {
  apiKey: string | null;
  setApiKey: (k: string | null) => void;
  config: RoiConfig;
  setConfig: (c: RoiConfig) => void;
  resetConfig: () => void;
  projectNames: ProjectNames;
  renameProject: (tag: string, name: string | null) => void;
}

const Ctx = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [config, setConfigState] = useState<RoiConfig>(DEFAULT_CONFIG);
  const [projectNames, setProjectNamesState] = useState<ProjectNames>({});

  useEffect(() => {
    setApiKeyState(getApiKey());
    setConfigState(getConfig());
    setProjectNamesState(getProjectNames());
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

  const renameProject = useCallback((tag: string, name: string | null) => {
    persistProjectName(tag, name);
    setProjectNamesState((prev) => {
      const next = { ...prev };
      if (name && name.trim()) next[tag] = name.trim();
      else delete next[tag];
      return next;
    });
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({
      apiKey,
      setApiKey,
      config,
      setConfig,
      resetConfig,
      projectNames,
      renameProject,
    }),
    [apiKey, setApiKey, config, setConfig, resetConfig, projectNames, renameProject]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState(): AppStateValue {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppState must be used within AppStateProvider");
  return v;
}
