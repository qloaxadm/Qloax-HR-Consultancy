"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitContactForm } from "@/app/actions";
import {
  ConsentCheckbox,
  FieldError,
  FieldLabel,
  Select,
  TextInput,
  Textarea,
} from "./fields";
import { FormStatusBanner } from "./form-status-banner";
import { SubmitButton } from "./submit-button";
import type { FormState } from "@/lib/types";

const initialState: FormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <FormStatusBanner state={state} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="name" required>
            Name
          </FieldLabel>
          <TextInput
            id="name"
            name="name"
            required
            invalid={!!state.fieldErrors?.name}
            aria-describedby="name-error"
          />
          <FieldError id="name-error" messages={state.fieldErrors?.name} />
        </div>
        <div>
          <FieldLabel htmlFor="email" required>
            Email
          </FieldLabel>
          <TextInput
            id="email"
            name="email"
            type="email"
            required
            invalid={!!state.fieldErrors?.email}
            aria-describedby="email-error"
          />
          <FieldError id="email-error" messages={state.fieldErrors?.email} />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="topic" required>
          Topic
        </FieldLabel>
        <Select id="topic" name="topic" defaultValue="General">
          <option>General</option>
          <option>Employers</option>
          <option>Candidates</option>
          <option>Press</option>
          <option>Other</option>
        </Select>
      </div>

      <div>
        <FieldLabel htmlFor="message" required>
          Message
        </FieldLabel>
        <Textarea
          id="message"
          name="message"
          required
          invalid={!!state.fieldErrors?.message}
          aria-describedby="message-error"
        />
        <FieldError id="message-error" messages={state.fieldErrors?.message} />
      </div>

      <ConsentCheckbox
        id="contact-consent"
        error={state.fieldErrors?.consent}
        label={
          <>
            I agree to the{" "}
            <Link href="/privacy-policy" className="underline hover:text-accent">
              privacy policy
            </Link>
            .
          </>
        }
      />

      <SubmitButton>Send Message</SubmitButton>
    </form>
  );
}
