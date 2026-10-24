import { z } from "zod";

const requiredText = (label: string, max = 120) =>
  z.string().trim().min(1, `${label} is required.`).max(max, `${label} is too long.`);

const optionalText = (max = 120) => z.string().trim().max(max, "This is too long.");

const email = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .pipe(z.email("Enter a valid email address."));

const message = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .min(10, "Please add a little more detail.")
    .max(4000, "Please keep this under 4,000 characters.");

const optionalUrl = z.union([
  z.literal(""),
  z.url({ protocol: /^https?$/, error: "Enter a full link starting with https://" }),
]);

const consent = z.literal("on", "Please confirm you agree to the privacy policy.");

export const TEAM_SIZES = ["1-10", "11-50", "51-200", "201-1000", "1000+"] as const;
export const TIMELINES = ["Immediate", "1-3 months", "Exploring options"] as const;
export const EXPERIENCE_LEVELS = ["Early career", "Mid-level", "Senior", "Leadership / Executive"] as const;
export const CONTACT_TOPICS = ["General", "Employers", "Candidates", "Partnerships", "Other"] as const;

export const contactSchema = z.object({
  name: requiredText("Your name"),
  email,
  topic: z.enum(CONTACT_TOPICS, "Please choose a topic."),
  message: message("A message"),
  consent,
});

export const employerEnquirySchema = z.object({
  companyName: requiredText("Company name"),
  contactName: requiredText("Your name"),
  email,
  phone: optionalText(40),
  roleTitle: requiredText("Role title"),
  teamSize: z.enum(TEAM_SIZES, "Please choose a company size."),
  timeline: z.enum(TIMELINES, "Please choose a timeline."),
  message: message("A short description of the role"),
  consent,
});

export const candidateRegistrationSchema = z.object({
  fullName: requiredText("Full name"),
  email,
  phone: optionalText(40),
  currentRole: requiredText("Current or most recent role"),
  industry: requiredText("Industry"),
  experienceLevel: z.enum(EXPERIENCE_LEVELS, "Please choose your experience level."),
  linkedinUrl: optionalUrl,
  message: message("A note on what you're looking for"),
  consent,
});

export const jobApplicationSchema = z.object({
  fullName: requiredText("Full name"),
  email,
  phone: optionalText(40),
  linkedinUrl: optionalUrl,
  coverNote: optionalText(4000),
  consent,
});
