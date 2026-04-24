import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("fileagent", {
  getConfig: (): Promise<{ host: string; port: number; token: string }> =>
    ipcRenderer.invoke("fileagent:get-config"),
  pickFolder: (): Promise<string | null> => ipcRenderer.invoke("fileagent:pick-folder"),
  openPath: (p: string): Promise<void> => ipcRenderer.invoke("fileagent:open-path", p),
});
