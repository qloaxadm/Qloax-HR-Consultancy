"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} icon={!pending}>
      {pending ? "Submitting…" : children}
    </Button>
  );
}
