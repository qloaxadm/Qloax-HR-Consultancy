"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions";
import { CONTACT_TOPICS } from "@/lib/validation";
import type { FormState } from "@/lib/types";
import { FormShell } from "./form-shell";
import { ConsentField, SelectField, TextAreaField, TextField } from "./fields";
import { SubmitButton } from "./submit-button";

const initialState: FormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  return (
    <FormShell
      action={formAction}
      state={state}
      label="Contact form"
      success={<p>We read every message and will reply as soon as we can.</p>}
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <TextField name="name" label="Your name" required autoComplete="name" />
        <TextField name="email" label="Email" type="email" required autoComplete="email" />
      </div>
      <SelectField name="topic" label="What is this about?" required options={CONTACT_TOPICS} />
      <TextAreaField name="message" label="Message" required minLength={10} />
      <ConsentField />
      <SubmitButton>Send message</SubmitButton>
    </FormShell>
  );
}
