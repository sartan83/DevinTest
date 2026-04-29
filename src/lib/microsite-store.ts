import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { MicrositeData } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "microsites");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export function generateMicrositeId(): string {
  return crypto.randomBytes(8).toString("hex");
}

export async function saveMicrosite(
  id: string,
  data: MicrositeData,
): Promise<void> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, `${id}.json`);
  await fs.writeFile(filePath, JSON.stringify(data), "utf-8");
}

export async function getMicrosite(
  id: string,
): Promise<MicrositeData | null> {
  try {
    const filePath = path.join(DATA_DIR, `${id}.json`);
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as MicrositeData;
  } catch {
    return null;
  }
}
