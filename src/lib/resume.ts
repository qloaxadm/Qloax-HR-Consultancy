/* Shared by the browser (instant feedback) and the server (authoritative check). No dependencies. */

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function resumeProblem(file: { name: string; size: number; type: string }) {
  const typeOk = RESUME_TYPES.includes(file.type) || /\.(pdf|docx?)$/i.test(file.name);
  if (!typeOk) return "Upload a PDF or Word document.";
  if (file.size > MAX_RESUME_BYTES) return "Your resume must be 5MB or smaller.";
  if (file.size === 0) return "That file appears to be empty.";
  return null;
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
