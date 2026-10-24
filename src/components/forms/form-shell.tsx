"use client";

import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, Check } from "lucide-react";
import type { FormState } from "@/lib/types";
import { cn } from "@/lib/utils";

type FieldContext = {
  errors: Record<string, string>;
  values: Record<string, string>;
  clear: (name: string) => void;
};

const FormFieldContext = createContext<FieldContext>({ errors: {}, values: {}, clear: () => {} });

export const useFormField = () => useContext(FormFieldContext);

function messageFor(element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  const label = element.dataset.label ?? "This field";
  const { validity } = element;
  if (validity.customError) return element.validationMessage;
  if (validity.valueMissing) {
    return element instanceof HTMLInputElement && element.type === "checkbox"
      ? "Please confirm you agree to the privacy policy."
      : element instanceof HTMLInputElement && element.type === "file"
        ? "Please attach your resume."
        : `${label} is required.`;
  }
  if (validity.typeMismatch) {
    return element.type === "email" ? "Enter a valid email address." : "Enter a full link starting with https://";
  }
  if (validity.tooShort) return "Please add a little more detail.";
  return element.validationMessage;
}

/**
 * Wraps a Server Action form. Native constraints give instant, styled inline feedback
 * (no round trip); the server re-validates everything and its errors win when present.
 */
export function FormShell({
  action,
  state,
  children,
  success,
  className,
  label,
}: {
  action: (formData: FormData) => void;
  state: FormState;
  children: ReactNode;
  success: ReactNode;
  className?: string;
  label: string;
}) {
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  // Server errors a user has started correcting; tied to the response they came from, so a new response resets it.
  const [dismissed, setDismissed] = useState<{ source: FormState; names: Set<string> }>({
    source: state,
    names: new Set(),
  });
  const bannerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "error") bannerRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  const dismissedNames = dismissed.source === state ? dismissed.names : null;
  const errors: Record<string, string> = {};
  for (const [name, messages] of Object.entries(state.fieldErrors ?? {})) {
    if (!dismissedNames?.has(name) && messages[0]) errors[name] = messages[0];
  }
  Object.assign(errors, clientErrors);

  const clear = (name: string) => {
    setClientErrors((current) => {
      if (!(name in current)) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    setDismissed((current) => {
      const names = new Set(current.source === state ? current.names : []);
      return names.has(name) ? current : { source: state, names: names.add(name) };
    });
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setClientErrors({});
      return;
    }
    event.preventDefault();
    const found: Record<string, string> = {};
    for (const element of Array.from(form.elements)) {
      if (
        (element instanceof HTMLInputElement ||
          element instanceof HTMLTextAreaElement ||
          element instanceof HTMLSelectElement) &&
        element.name &&
        !element.validity.valid &&
        !found[element.name]
      ) {
        found[element.name] = messageFor(element);
      }
    }
    setClientErrors(found);
    form.querySelector<HTMLElement>(":invalid")?.focus();
  }

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-[2px] border border-accent/30 bg-accent/[0.04] p-8 focus:outline-none md:p-10"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-ink">
          <Check aria-hidden className="size-5" />
        </span>
        <p className="mt-6 text-2xl font-medium tracking-[-0.02em] text-ink">{state.message}</p>
        <div className="mt-6 text-sm leading-relaxed text-muted">{success}</div>
      </div>
    );
  }

  return (
    <FormFieldContext.Provider value={{ errors, values: state.values ?? {}, clear }}>
      <form action={action} onSubmit={handleSubmit} noValidate aria-label={label} className={cn("space-y-7", className)}>
        {state.status === "error" && state.message && (
          <div
            ref={bannerRef}
            tabIndex={-1}
            role="alert"
            className="flex items-start gap-3 rounded-[2px] border border-danger/40 bg-danger/[0.06] px-5 py-4 text-sm text-ink focus:outline-none"
          >
            <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-danger" />
            {state.message}
          </div>
        )}
        {children}
      </form>
    </FormFieldContext.Provider>
  );
}
