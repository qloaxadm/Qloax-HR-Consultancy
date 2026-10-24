import { z } from "zod";

export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const consentField = z.literal(true, {
  message: "Please confirm you agree to our privacy policy.",
});

const emailField = z.string().trim().min(1, "Email is required.").email("Enter a valid email address.");
const nameField = (label: string) =>
  z.string().trim().min(2, `${label} is required.`).max(120);
const messageField = (label: string, min = 10) =>
  z.string().trim().min(min, `${label} is required.`).max(4000);

function resumeFileSchema({ required }: { required: boolean }) {
  return z
    .instanceof(File)
    .optional()
    .nullable()
    .refine(
      (file) => (required ? !!file && file.size > 0 : true),
      "Please attach your resume.",
    )
    .refine(
      (file) => !file || file.size === 0 || file.size <= MAX_RESUME_SIZE_BYTES,
      "Resume must be 5MB or smaller.",
    )
    .refine(
      (file) =>
        !file || file.size === 0 || ACCEPTED_RESUME_TYPES.includes(file.type),
      "Resume must be a PDF or Word document.",
    );
}

export const contactSchema = z.object({
  name: nameField("Name"),
  email: emailField,
  topic: z.enum(["General", "Employers", "Candidates", "Press", "Other"]),
  message: messageField("Message"),
  consent: consentField,
});
export type ContactInput = z.infer<typeof contactSchema>;

export const employerEnquirySchema = z.object({
  companyName: nameField("Company name"),
  contactName: nameField("Your name"),
  email: emailField,
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  roleTitle: nameField("Role title"),
  teamSize: z.enum(["1-10", "11-50", "51-200", "201-1000", "1000+"]),
  timeline: z.enum(["Immediate", "1-3 months", "Exploring options"]),
  message: messageField("Message"),
  consent: consentField,
});
export type EmployerEnquiryInput = z.infer<typeof employerEnquirySchema>;

export const candidateRegistrationSchema = z.object({
  fullName: nameField("Full name"),
  email: emailField,
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  currentRole: nameField("Current role"),
  industry: z.string().trim().min(1, "Please select an industry."),
  experienceLevel: z.enum([
    "Entry-level",
    "Mid-level",
    "Senior",
    "Leadership / Executive",
  ]),
  linkedinUrl: z
    .string()
    .trim()
    .url("Enter a valid URL.")
    .optional()
    .or(z.literal("")),
  message: messageField("A short note on your goals", 10),
  resume: resumeFileSchema({ required: false }),
  consent: consentField,
});
export type CandidateRegistrationInput = z.infer<
  typeof candidateRegistrationSchema
>;

export const jobApplicationSchema = z.object({
  fullName: nameField("Full name"),
  email: emailField,
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  linkedinUrl: z
    .string()
    .trim()
    .url("Enter a valid URL.")
    .optional()
    .or(z.literal("")),
  coverNote: z.string().trim().max(4000).optional().or(z.literal("")),
  resume: resumeFileSchema({ required: true }),
  consent: consentField,
});
export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
