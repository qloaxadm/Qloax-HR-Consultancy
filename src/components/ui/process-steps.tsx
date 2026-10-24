import { METHODOLOGY_STEPS } from "@/content/methodology";

export function ProcessSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {METHODOLOGY_STEPS.map((step) => (
        <li key={step.index} className="bg-bg p-7 md:p-8">
          <span className="font-mono text-xs text-accent">{step.index}</span>
          <h3 className="mt-8 text-xl font-medium tracking-[-0.015em] text-ink">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
          <p className="mt-6 flex items-center gap-3 text-[13px] text-ink/80">
            <span aria-hidden="true" className="h-px w-4 bg-accent" />
            {step.outcome}
          </p>
        </li>
      ))}
    </ol>
  );
}
