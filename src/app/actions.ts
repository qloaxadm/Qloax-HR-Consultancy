"use server";

import type { ZodError } from "zod";
import {
  candidateRegistrationSchema,
  contactSchema,
  employerEnquirySchema,
  jobApplicationSchema,
} from "@/lib/validation";
import { appendRecord, saveUploadedFile } from "@/lib/storage";
import type { FormState } from "@/lib/types";

function zodFieldErrors(error: ZodError) {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    fieldErrors[key] = [...(fieldErrors[key] ?? []), issue.message];
  }
  return fieldErrors;
}

function normalizeFile(value: FormDataEntryValue | null) {
  if (value instanceof File && value.size > 0 && value.name) return value;
  return null;
}

export async function submitContactForm(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    topic: formData.get("topic"),
    message: formData.get("message"),
    consent: formData.get("consent") === "on",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the fields below.",
      fieldErrors: zodFieldErrors(parsed.error),
    };
  }

  await appendRecord("contact-messages.json", parsed.data);

  return {
    status: "success",
    message:
      "Thanks for reaching out — your message has been received. We'll be in touch soon.",
  };
}

export async function submitEmployerEnquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = employerEnquirySchema.safeParse({
    companyName: formData.get("companyName"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    roleTitle: formData.get("roleTitle"),
    teamSize: formData.get("teamSize"),
    timeline: formData.get("timeline"),
    message: formData.get("message"),
    consent: formData.get("consent") === "on",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the fields below.",
      fieldErrors: zodFieldErrors(parsed.error),
    };
  }

  await appendRecord("employer-enquiries.json", parsed.data);

  return {
    status: "success",
    message:
      "Thank you — your hiring enquiry has been received. A consultant will follow up shortly.",
  };
}

export async function submitCandidateRegistration(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const resume = normalizeFile(formData.get("resume"));

  const parsed = candidateRegistrationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    currentRole: formData.get("currentRole"),
    industry: formData.get("industry"),
    experienceLevel: formData.get("experienceLevel"),
    linkedinUrl: formData.get("linkedinUrl"),
    message: formData.get("message"),
    resume,
    consent: formData.get("consent") === "on",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the fields below.",
      fieldErrors: zodFieldErrors(parsed.error),
    };
  }

  const { resume: resumeFile, ...rest } = parsed.data;
  const storedResume = resumeFile ? await saveUploadedFile(resumeFile) : null;

  await appendRecord("candidate-registrations.json", {
    ...rest,
    resume: storedResume,
  });

  return {
    status: "success",
    message:
      "Thanks for registering — we've received your details and will reach out when a relevant role comes up.",
  };
}

export async function submitJobApplication(
  jobSlug: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const resume = normalizeFile(formData.get("resume"));

  const parsed = jobApplicationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    linkedinUrl: formData.get("linkedinUrl"),
    coverNote: formData.get("coverNote"),
    resume,
    consent: formData.get("consent") === "on",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the fields below.",
      fieldErrors: zodFieldErrors(parsed.error),
    };
  }

  const { resume: resumeFile, ...rest } = parsed.data;
  const storedResume = resumeFile ? await saveUploadedFile(resumeFile) : null;

  await appendRecord("job-applications.json", {
    jobSlug,
    ...rest,
    resume: storedResume,
  });

  return {
    status: "success",
    message:
      "Your application has been received. We'll review it against the role and follow up if there's a fit.",
  };
}
