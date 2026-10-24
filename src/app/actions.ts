"use server";

import type { ZodError } from "zod";
import {
  candidateRegistrationSchema,
  contactSchema,
  employerEnquirySchema,
  jobApplicationSchema,
} from "@/lib/validation";
import { appendRecord, hasResumeSignature, saveUploadedFile } from "@/lib/storage";
import { resumeProblem } from "@/lib/resume";
import { getJobBySlug } from "@/content/jobs";
import type { FormState } from "@/lib/types";

type Values = Record<string, string>;

function read(formData: FormData, names: string[]): Values {
  return Object.fromEntries(
    names.map((name) => {
      const value = formData.get(name);
      return [name, typeof value === "string" ? value.slice(0, 5000) : ""];
    }),
  );
}

function issuesToFields(error: ZodError) {
  const fields: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    fields[key] = [...(fields[key] ?? []), issue.message];
  }
  return fields;
}

function invalid(values: Values, fieldErrors: Record<string, string[]>): FormState {
  return {
    status: "error",
    message: "Please check the highlighted fields.",
    fieldErrors,
    values,
  };
}

async function checkResume(formData: FormData, required: boolean) {
  const entry = formData.get("resume");
  const file = entry instanceof File && entry.size > 0 ? entry : null;
  if (!file) return { file: null, error: required ? "Please attach your resume." : null };
  const problem = resumeProblem(file);
  if (problem) return { file: null, error: problem };
  if (!(await hasResumeSignature(file))) {
    return { file: null, error: "That file doesn't look like a valid PDF or Word document." };
  }
  return { file, error: null };
}

/**
 * Development persistence only (see src/lib/storage.ts). A failure here is
 * reported honestly to the user rather than shown as a success.
 */
async function persist(
  collection: string,
  record: Record<string, unknown>,
  values: Values,
  successMessage: string,
): Promise<FormState> {
  try {
    await appendRecord(collection, { ...record, consent: true });
    return { status: "success", message: successMessage };
  } catch (error) {
    console.error(`[forms] Could not store ${collection}`, error);
    return {
      status: "error",
      message: "We couldn't send this right now. Please try again in a moment.",
      values,
    };
  }
}

export async function submitContactForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = read(formData, ["name", "email", "topic", "message", "consent"]);
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) return invalid(values, issuesToFields(parsed.error));
  return persist(
    "contact-messages.json",
    parsed.data,
    values,
    "Thank you — your message has been received. We'll reply as soon as we can.",
  );
}

export async function submitEmployerEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = read(formData, [
    "companyName",
    "contactName",
    "email",
    "phone",
    "roleTitle",
    "teamSize",
    "timeline",
    "message",
    "consent",
  ]);
  const parsed = employerEnquirySchema.safeParse(values);
  if (!parsed.success) return invalid(values, issuesToFields(parsed.error));
  return persist(
    "employer-enquiries.json",
    parsed.data,
    values,
    "Thank you — your hiring enquiry has been received. A consultant will be in touch to discuss the brief.",
  );
}

export async function submitCandidateRegistration(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = read(formData, [
    "fullName",
    "email",
    "phone",
    "currentRole",
    "industry",
    "experienceLevel",
    "linkedinUrl",
    "message",
    "consent",
  ]);
  const parsed = candidateRegistrationSchema.safeParse(values);
  const resume = await checkResume(formData, false);
  const fieldErrors = parsed.success ? {} : issuesToFields(parsed.error);
  if (resume.error) fieldErrors.resume = [resume.error];
  if (!parsed.success || resume.error) return invalid(values, fieldErrors);

  try {
    const stored = resume.file ? await saveUploadedFile(resume.file) : null;
    return persist(
      "candidate-registrations.json",
      { ...parsed.data, resume: stored },
      values,
      "Thank you for introducing yourself. We'll be in touch when a relevant opportunity comes up.",
    );
  } catch (error) {
    console.error("[forms] Could not store resume", error);
    return { status: "error", message: "We couldn't upload your resume right now. Please try again.", values };
  }
}

export async function submitJobApplication(
  jobSlug: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const job = getJobBySlug(jobSlug);
  if (!job) return { status: "error", message: "This role is no longer available." };

  const values = read(formData, ["fullName", "email", "phone", "linkedinUrl", "coverNote", "consent"]);
  const parsed = jobApplicationSchema.safeParse(values);
  const resume = await checkResume(formData, true);
  const fieldErrors = parsed.success ? {} : issuesToFields(parsed.error);
  if (resume.error) fieldErrors.resume = [resume.error];
  if (!parsed.success || resume.error || !resume.file) return invalid(values, fieldErrors);

  try {
    const stored = await saveUploadedFile(resume.file);
    return persist(
      "job-applications.json",
      { jobSlug: job.slug, jobTitle: job.title, isSampleRole: job.isSample, ...parsed.data, resume: stored },
      values,
      `Thank you — your application for ${job.title} has been received. We'll review it against the brief and follow up if there's a fit.`,
    );
  } catch (error) {
    console.error("[forms] Could not store resume", error);
    return { status: "error", message: "We couldn't upload your resume right now. Please try again.", values };
  }
}
