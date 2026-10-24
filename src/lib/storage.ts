import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Minimal file-based persistence for local development only.
 *
 * There is no production backend behind these forms yet. Submissions are
 * appended to JSON files under `.data/` (gitignored) so the success states
 * in the UI are honest rather than simulated. Before launch, replace these
 * calls with a real integration (ATS, CRM, database, or notification
 * service) — see README.md "Backend integration" for the documented
 * contract each form expects.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function ensureUploadsDir() {
  await mkdir(UPLOADS_DIR, { recursive: true });
}

export async function appendRecord(
  fileName: string,
  record: Record<string, unknown>,
) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);

  let existing: Record<string, unknown>[] = [];
  try {
    const raw = await readFile(filePath, "utf-8");
    existing = JSON.parse(raw) as Record<string, unknown>[];
  } catch {
    existing = [];
  }

  const entry = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    ...record,
  };

  existing.push(entry);
  await writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");
  return entry;
}

/** Checks the file's leading bytes: PDF (%PDF), DOCX (zip "PK"), or legacy DOC (OLE2). */
export async function hasResumeSignature(file: File) {
  const head = new Uint8Array(await file.slice(0, 4).arrayBuffer());
  const starts = (...bytes: number[]) => bytes.every((byte, index) => head[index] === byte);
  return starts(0x25, 0x50, 0x44, 0x46) || starts(0x50, 0x4b, 0x03, 0x04) || starts(0xd0, 0xcf, 0x11, 0xe0);
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_").slice(-150);
}

export async function saveUploadedFile(file: File) {
  await ensureUploadsDir();
  const safeName = sanitizeFileName(file.name || "resume");
  const storedName = `${randomUUID()}-${safeName}`;
  const storedPath = path.join(UPLOADS_DIR, storedName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(storedPath, buffer);
  return {
    originalName: file.name,
    storedName,
    size: file.size,
    type: file.type,
  };
}
