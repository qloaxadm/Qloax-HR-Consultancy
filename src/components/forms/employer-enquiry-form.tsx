"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitEmployerEnquiry } from "@/app/actions";
import { TEAM_SIZES, TIMELINES } from "@/lib/validation";
import type { FormState } from "@/lib/types";
import { FormShell } from "./form-shell";
import { ConsentField, SelectField, TextAreaField, TextField } from "./fields";
import { SubmitButton } from "./submit-button";

const initialState: FormState = { status: "idle" };

const TEAM_SIZE_LABELS: Record<(typeof TEAM_SIZES)[number], string> = {
  "1-10": "1–10 employees",
  "11-50": "11–50 employees",
  "51-200": "51–200 employees",
  "201-1000": "201–1,000 employees",
  "1000+": "1,000+ employees",
};

export function EmployerEnquiryForm() {
  const [state, formAction] = useActionState(submitEmployerEnquiry, initialState);

  return (
    <FormShell
      action={formAction}
      state={state}
      label="Hiring enquiry"
      success={
        <>
          <p>We&apos;ll review the details and get in touch to talk through the role, timeline, and next steps.</p>
          <Link href="/services" className="mt-5 inline-block text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
            Explore our services while you wait
          </Link>
        </>
      }
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <TextField name="companyName" label="Company name" required autoComplete="organization" />
        <TextField name="contactName" label="Your name" required autoComplete="name" />
        <TextField name="email" label="Work email" type="email" required autoComplete="email" />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" maxLength={40} />
      </div>
      <TextField name="roleTitle" label="Role you're hiring for" required placeholder="e.g. Head of Operations" />
      <div className="grid gap-7 sm:grid-cols-2">
        <SelectField
          name="teamSize"
          label="Company size"
          required
          options={TEAM_SIZES.map((value) => ({ value, label: TEAM_SIZE_LABELS[value] }))}
        />
        <SelectField name="timeline" label="Hiring timeline" required options={TIMELINES} />
      </div>
      <TextAreaField
        name="message"
        label="Tell us about the role"
        required
        minLength={10}
        placeholder="What does this person need to achieve in their first year?"
      />
      <ConsentField />
      <SubmitButton>Submit hiring enquiry</SubmitButton>
    </FormShell>
  );
}
