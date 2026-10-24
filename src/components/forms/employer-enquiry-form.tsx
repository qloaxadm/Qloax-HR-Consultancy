"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitEmployerEnquiry } from "@/app/actions";
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

export function EmployerEnquiryForm() {
  const [state, formAction] = useActionState(
    submitEmployerEnquiry,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <FormStatusBanner state={state} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="companyName" required>
            Company Name
          </FieldLabel>
          <TextInput
            id="companyName"
            name="companyName"
            required
            invalid={!!state.fieldErrors?.companyName}
            aria-describedby="companyName-error"
          />
          <FieldError
            id="companyName-error"
            messages={state.fieldErrors?.companyName}
          />
        </div>
        <div>
          <FieldLabel htmlFor="contactName" required>
            Your Name
          </FieldLabel>
          <TextInput
            id="contactName"
            name="contactName"
            required
            invalid={!!state.fieldErrors?.contactName}
            aria-describedby="contactName-error"
          />
          <FieldError
            id="contactName-error"
            messages={state.fieldErrors?.contactName}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="email" required>
            Work Email
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
        <div>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <TextInput id="phone" name="phone" type="tel" />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="roleTitle" required>
          Role You&apos;re Hiring For
        </FieldLabel>
        <TextInput
          id="roleTitle"
          name="roleTitle"
          required
          invalid={!!state.fieldErrors?.roleTitle}
          aria-describedby="roleTitle-error"
        />
        <FieldError
          id="roleTitle-error"
          messages={state.fieldErrors?.roleTitle}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="teamSize" required>
            Company Size
          </FieldLabel>
          <Select id="teamSize" name="teamSize" defaultValue="1-10">
            <option value="1-10">1–10 employees</option>
            <option value="11-50">11–50 employees</option>
            <option value="51-200">51–200 employees</option>
            <option value="201-1000">201–1,000 employees</option>
            <option value="1000+">1,000+ employees</option>
          </Select>
        </div>
        <div>
          <FieldLabel htmlFor="timeline" required>
            Hiring Timeline
          </FieldLabel>
          <Select id="timeline" name="timeline" defaultValue="1-3 months">
            <option value="Immediate">Immediate</option>
            <option value="1-3 months">1–3 months</option>
            <option value="Exploring options">Exploring options</option>
          </Select>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="message" required>
          Tell Us About the Role
        </FieldLabel>
        <Textarea
          id="message"
          name="message"
          required
          invalid={!!state.fieldErrors?.message}
          aria-describedby="message-error"
          placeholder="What does this person need to achieve in their first year?"
        />
        <FieldError id="message-error" messages={state.fieldErrors?.message} />
      </div>

      <ConsentCheckbox
        id="employer-consent"
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

      <SubmitButton>Submit Hiring Enquiry</SubmitButton>
    </form>
  );
}
