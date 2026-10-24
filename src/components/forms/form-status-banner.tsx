import { cn } from "@/lib/utils";
import type { FormState } from "@/lib/types";

export function FormStatusBanner({ state }: { state: FormState }) {
  if (state.status === "idle") return null;

  return (
    <div
      role="status"
      className={cn(
        "rounded-sm border px-5 py-4 text-sm",
        state.status === "success"
          ? "border-accent/40 bg-accent/5 text-ink"
          : "border-red-400/40 bg-red-400/5 text-red-200",
      )}
    >
      {state.message}
    </div>
  );
}
