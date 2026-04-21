// Electron main process. Spawns the Python sidecar and the UI window.
import { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
import { spawn, ChildProcess } from "node:child_process";
import * as crypto from "node:crypto";
import * as path from "node:path";
import * as fs from "node:fs";
import * as net from "node:net";

const SIDECAR_PORT = Number(process.env.FILEAGENT_PORT || 53117);
const SIDECAR_HOST = process.env.FILEAGENT_HOST || "127.0.0.1";
let apiToken: string = process.env.FILEAGENT_API_TOKEN || crypto.randomBytes(24).toString("hex");
let sidecar: ChildProcess | null = null;
let mainWindow: BrowserWindow | null = null;

function resolveSidecarCommand(): { cmd: string; args: string[] } {
  // Packaged: a PyInstaller one-folder build at resources/sidecar/fileagent(.exe)
  const bundled = path.join(
    process.resourcesPath || "",
    "sidecar",
    process.platform === "win32" ? "fileagent.exe" : "fileagent"
  );
  if (fs.existsSync(bundled)) {
    return { cmd: bundled, args: [] };
  }
  // Dev: run ``python -m fileagent.main`` using the local venv if present.
  const venvPython = path.join(
    __dirname, "..", "backend", ".venv",
    process.platform === "win32" ? "Scripts/python.exe" : "bin/python"
  );
  const py = fs.existsSync(venvPython) ? venvPython : (process.platform === "win32" ? "python" : "python3");
  return {
    cmd: py,
    args: ["-m", "fileagent.main", "--host", SIDECAR_HOST, "--port", String(SIDECAR_PORT)],
  };
}

function startSidecar(): void {
  const { cmd, args } = resolveSidecarCommand();
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    FILEAGENT_HOST: SIDECAR_HOST,
    FILEAGENT_PORT: String(SIDECAR_PORT),
    FILEAGENT_API_TOKEN: apiToken,
    // Keep DB under APPDATA in packaged builds; dev falls back to ~/.fileagent.
    PYTHONUNBUFFERED: "1",
  };
  const cwd = path.join(__dirname, "..", "backend");
  sidecar = spawn(cmd, args, { env, cwd, stdio: ["ignore", "pipe", "pipe"] });
  sidecar.stdout?.on("data", (d) => process.stdout.write(`[sidecar] ${d}`));
  sidecar.stderr?.on("data", (d) => process.stderr.write(`[sidecar] ${d}`));
  sidecar.on("exit", (code) => {
    console.log(`[sidecar] exited with code ${code}`);
    sidecar = null;
  });
}

function stopSidecar(): void {
  if (sidecar && !sidecar.killed) {
    sidecar.kill();
    sidecar = null;
  }
}

function waitForPort(host: string, port: number, timeoutMs = 10_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      const socket = net.createConnection({ host, port }, () => {
        socket.end();
        resolve();
      });
      socket.on("error", () => {
        socket.destroy();
        if (Date.now() > deadline) {
          reject(new Error(`Sidecar did not come up on ${host}:${port}`));
        } else {
          setTimeout(tryOnce, 200);
        }
      });
    };
    tryOnce();
  });
}

async function createWindow(): Promise<void> {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 960,
    minHeight: 640,
    title: "FileAgent",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    backgroundColor: "#0f1115",
  });

  const devUrl = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";
  if (app.isPackaged) {
    await mainWindow.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  } else {
    await mainWindow.loadURL(devUrl);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

app.on("ready", async () => {
  startSidecar();
  try {
    await waitForPort(SIDECAR_HOST, SIDECAR_PORT);
  } catch (err) {
    dialog.showErrorBox("FileAgent", `Sidecar failed to start: ${String(err)}`);
  }
  await createWindow();
});

app.on("window-all-closed", () => {
  stopSidecar();
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => {
  stopSidecar();
});

ipcMain.handle("fileagent:get-config", () => ({
  host: SIDECAR_HOST,
  port: SIDECAR_PORT,
  token: apiToken,
}));

ipcMain.handle("fileagent:pick-folder", async () => {
  const res = await dialog.showOpenDialog(mainWindow!, {
    properties: ["openDirectory"],
    title: "Select a folder to watch",
  });
  return res.canceled ? null : res.filePaths[0];
});

ipcMain.handle("fileagent:open-path", async (_e, p: string) => {
  await shell.openPath(p);
});
