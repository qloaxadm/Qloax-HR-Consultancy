import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-sm border border-line bg-transparent px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-accent focus:outline-none";

export function FieldLabel({
  children,
  htmlFor,
  required,
}: {
  children: ReactNode;
  htmlFor: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-muted"
    >
      {children}
      {required && <span className="text-accent"> *</span>}
    </label>
  );
}

export function FieldError({
  id,
  messages,
}: {
  id: string;
  messages?: string[];
}) {
  if (!messages?.length) return null;
  return (
    <p id={id} className="mt-2 text-xs text-red-400">
      {messages[0]}
    </p>
  );
}

export function TextInput(
  props: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean },
) {
  const { className, invalid, ...rest } = props;
  return (
    <input
      className={cn(inputClasses, invalid && "border-red-400/70", className)}
      {...rest}
    />
  );
}

export function Textarea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean },
) {
  const { className, invalid, ...rest } = props;
  return (
    <textarea
      className={cn(
        inputClasses,
        "min-h-32 resize-y",
        invalid && "border-red-400/70",
        className,
      )}
      {...rest}
    />
  );
}

export function Select(
  props: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean },
) {
  const { className, invalid, children, ...rest } = props;
  return (
    <div className="relative">
      <select
        className={cn(
          inputClasses,
          "appearance-none bg-bg pr-10",
          invalid && "border-red-400/70",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
        aria-hidden
      />
    </div>
  );
}

export function FileInput(
  props: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean },
) {
  const { className, invalid, ...rest } = props;
  return (
    <input
      type="file"
      className={cn(
        "block w-full text-sm text-muted file:mr-4 file:rounded-sm file:border file:border-line file:bg-surface file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-ink file:transition-colors hover:file:border-accent",
        invalid && "rounded-sm border border-red-400/70 p-2",
        className,
      )}
      {...rest}
    />
  );
}

export function ConsentCheckbox({
  id,
  error,
  label,
}: {
  id: string;
  error?: string[];
  label: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          id={id}
          name="consent"
          required
          className="mt-0.5 size-4 shrink-0 rounded-[2px] border border-line bg-transparent accent-accent"
        />
        <span>{label}</span>
      </label>
      <FieldError id={`${id}-error`} messages={error} />
    </div>
  );
}
