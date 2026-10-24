"use client";

import { useFormStatus } from "react-dom";
import { ArrowRight, LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-[2px] bg-accent px-7 text-sm font-medium text-accent-ink transition-[background-color,transform] duration-300 hover:bg-accent-hover active:scale-[0.98] disabled:cursor-progress disabled:opacity-80 sm:w-auto"
    >
      {pending ? (
        <>
          <LoaderCircle aria-hidden className="size-4 animate-spin" />
          Sending…
        </>
      ) : (
        <>
          {children}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  );
}
