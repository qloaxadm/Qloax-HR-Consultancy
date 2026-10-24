"use client";

import Link from "next/link";
import { useActionState, useMemo } from "react";
import { submitJobApplication } from "@/app/actions";
import type { FormState } from "@/lib/types";
import { FormShell } from "./form-shell";
import { ConsentField, ResumeField, TextAreaField, TextField } from "./fields";
import { SubmitButton } from "./submit-button";

const initialState: FormState = { status: "idle" };

export function JobApplicationForm({ jobSlug }: { jobSlug: string }) {
  const action = useMemo(() => submitJobApplication.bind(null, jobSlug), [jobSlug]);
  const [state, formAction] = useActionState(action, initialState);

  return (
    <FormShell
      action={formAction}
      state={state}
      label="Job application"
      success={
        <>
          <p>A consultant will review your application. If your experience matches the brief, we&apos;ll be in touch about next steps.</p>
          <Link href="/careers" className="mt-5 inline-block text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
            Back to all roles
          </Link>
        </>
      }
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <TextField name="fullName" label="Full name" required autoComplete="name" />
        <TextField name="email" label="Email" type="email" required autoComplete="email" />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" maxLength={40} />
        <TextField name="linkedinUrl" label="LinkedIn or portfolio" type="url" autoComplete="url" placeholder="https://" maxLength={300} />
      </div>
      <ResumeField required />
      <TextAreaField
        name="coverNote"
        label="Anything you'd like us to know?"
        placeholder="A few lines on why this role interests you."
      />
      <ConsentField />
      <SubmitButton>Submit application</SubmitButton>
    </FormShell>
  );
}
