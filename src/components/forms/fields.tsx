"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type ReactNode } from "react";
import { ChevronDown, FileText, Upload, X } from "lucide-react";
import { RESUME_ACCEPT, formatFileSize, resumeProblem } from "@/lib/resume";
import { cn } from "@/lib/utils";
import { useFormField } from "./form-shell";

const control =
  "w-full rounded-[2px] border border-line bg-surface/50 px-4 text-[15px] text-ink placeholder:text-muted/60 transition-[border-color,background-color,box-shadow] duration-300 hover:border-ink/25 focus:border-accent focus:bg-surface focus:outline-none focus:ring-4 focus:ring-accent/10 aria-[invalid=true]:border-danger/80 aria-[invalid=true]:focus:ring-danger/10";

function Label({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="mb-2.5 flex items-baseline justify-between gap-3 text-[13px] font-medium text-ink/90">
      {label}
      {!required && <span className="text-xs font-normal text-muted">Optional</span>}
    </label>
  );
}

function Message({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error) {
    return (
      <p id={`${id}-error`} className="mt-2 text-[13px] text-danger">
        {error}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={`${id}-hint`} className="mt-2 text-[13px] text-muted">
        {hint}
      </p>
    );
  }
  return null;
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

type BaseProps = {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  className?: string;
};

export function TextField({
  name,
  label,
  required,
  hint,
  className,
  type = "text",
  autoComplete,
  placeholder,
  maxLength = 200,
}: BaseProps & { type?: "text" | "email" | "tel" | "url"; autoComplete?: string; placeholder?: string; maxLength?: number }) {
  const { errors, values, clear } = useFormField();
  const id = `field-${name}`;
  const error = errors[name];
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        defaultValue={values[name] ?? ""}
        data-label={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        onInput={() => clear(name)}
        className={cn(control, "h-12")}
      />
      <Message id={id} error={error} hint={hint} />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  required,
  hint,
  className,
  placeholder,
  minLength,
}: BaseProps & { placeholder?: string; minLength?: number }) {
  const { errors, values, clear } = useFormField();
  const id = `field-${name}`;
  const error = errors[name];
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <textarea
        id={id}
        name={name}
        required={required}
        minLength={minLength}
        maxLength={4000}
        rows={5}
        placeholder={placeholder}
        defaultValue={values[name] ?? ""}
        data-label={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        onInput={() => clear(name)}
        className={cn(control, "min-h-36 resize-y py-3.5 leading-relaxed")}
      />
      <Message id={id} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  required,
  hint,
  className,
  options,
  placeholder = "Select an option",
}: BaseProps & { options: readonly (string | { value: string; label: string })[]; placeholder?: string }) {
  const { errors, values, clear } = useFormField();
  const id = `field-${name}`;
  const error = errors[name];
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue={values[name] ?? ""}
          data-label={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          onChange={() => clear(name)}
          className={cn(control, "h-12 cursor-pointer appearance-none pr-11")}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => {
            const value = typeof option === "string" ? option : option.value;
            const text = typeof option === "string" ? option : option.label;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
      </div>
      <Message id={id} error={error} hint={hint} />
    </div>
  );
}

export function ResumeField({ required, className }: { required?: boolean; className?: string }) {
  const { errors, clear } = useFormField();
  const [file, setFile] = useState<{ name: string; size: number } | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const id = "field-resume";
  const error = errors.resume ?? localError ?? undefined;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    clear("resume");
    const input = event.currentTarget;
    const selected = input.files?.[0];
    const problem = selected ? resumeProblem(selected) : null;
    input.setCustomValidity(problem ?? "");
    setLocalError(problem);
    setFile(selected && !problem ? { name: selected.name, size: selected.size } : null);
  }

  function removeFile() {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (input) {
      input.value = "";
      input.setCustomValidity("");
    }
    setLocalError(null);
    setFile(null);
  }

  return (
    <div className={className}>
      <Label id={id} label="Resume" required={required} />
      <div className="relative">
        <input
          id={id}
          name="resume"
          type="file"
          accept={RESUME_ACCEPT}
          required={required}
          data-label="Resume"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : `${id}-hint`}
          onChange={handleChange}
          className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
        <div
          className={cn(
            "flex items-center gap-4 rounded-[2px] border border-dashed px-5 py-5 transition-[border-color,background-color] duration-300 peer-hover:border-ink/30 peer-hover:bg-surface peer-focus-visible:border-accent peer-focus-visible:ring-4 peer-focus-visible:ring-accent/10",
            error ? "border-danger/80" : file ? "border-accent/50 bg-accent/[0.03]" : "border-line bg-surface/50",
          )}
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-muted">
            {file ? <FileText aria-hidden className="size-4 text-accent" /> : <Upload aria-hidden className="size-4" />}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm text-ink">{file ? file.name : "Drop your resume here, or browse"}</span>
            <span className="mt-0.5 block text-xs text-muted">
              {file ? formatFileSize(file.size) : "PDF or Word document, up to 5MB"}
            </span>
          </span>
        </div>
        {file && (
          <button
            type="button"
            onClick={removeFile}
            className="absolute right-3 top-1/2 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-raised hover:text-ink"
            aria-label={`Remove ${file.name}`}
          >
            <X aria-hidden className="size-4" />
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[13px] text-danger">
          {error}
        </p>
      ) : (
        <p id={`${id}-hint`} className="mt-2 text-[13px] text-muted">
          Your file is checked before upload and stored securely with your application.
        </p>
      )}
    </div>
  );
}

export function ConsentField({ children }: { children?: ReactNode }) {
  const { errors, values, clear } = useFormField();
  const id = "field-consent";
  const error = errors.consent;
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          id={id}
          name="consent"
          type="checkbox"
          required
          defaultChecked={values.consent === "on"}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={() => clear("consent")}
          className="mt-0.5 size-[18px] shrink-0 cursor-pointer rounded-[2px] accent-accent"
        />
        <span>
          {children ?? (
            <>
              I agree to Vantage People storing and processing these details to respond to my enquiry, as
              described in the{" "}
              <Link href="/privacy-policy" className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
                privacy policy
              </Link>
              .
            </>
          )}
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-2 pl-[30px] text-[13px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
