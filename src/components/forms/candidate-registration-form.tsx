"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitCandidateRegistration } from "@/app/actions";
import { EXPERIENCE_LEVELS } from "@/lib/validation";
import { INDUSTRIES } from "@/content/industries";
import type { FormState } from "@/lib/types";
import { FormShell } from "./form-shell";
import { ConsentField, ResumeField, SelectField, TextAreaField, TextField } from "./fields";
import { SubmitButton } from "./submit-button";

const initialState: FormState = { status: "idle" };

export function CandidateRegistrationForm() {
  const [state, formAction] = useActionState(submitCandidateRegistration, initialState);

  return (
    <FormShell
      action={formAction}
      state={state}
      label="Candidate registration"
      success={
        <>
          <p>Your details are with us. In the meantime, you&apos;re welcome to browse the roles we&apos;re working on.</p>
          <Link href="/careers" className="mt-5 inline-block text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
            Browse roles
          </Link>
        </>
      }
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <TextField name="fullName" label="Full name" required autoComplete="name" />
        <TextField name="email" label="Email" type="email" required autoComplete="email" />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" maxLength={40} />
        <TextField name="currentRole" label="Current or most recent role" required autoComplete="organization-title" />
        <SelectField
          name="industry"
          label="Industry"
          required
          options={[...INDUSTRIES.map((industry) => industry.name), "Other"]}
        />
        <SelectField name="experienceLevel" label="Experience level" required options={EXPERIENCE_LEVELS} />
      </div>
      <TextField
        name="linkedinUrl"
        label="LinkedIn or portfolio"
        type="url"
        autoComplete="url"
        placeholder="https://"
        maxLength={300}
      />
      <ResumeField />
      <TextAreaField
        name="message"
        label="What are you looking for next?"
        required
        minLength={10}
        placeholder="The kind of role, team, and environment where you'd do your best work."
      />
      <ConsentField />
      <SubmitButton>Register my profile</SubmitButton>
    </FormShell>
  );
}
