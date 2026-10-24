import { DISCIPLINES } from "@/content/disciplines";

export function DisciplinesStrip() {
  const loop = [...DISCIPLINES, ...DISCIPLINES];

  return (
    <section aria-labelledby="disciplines-label" className="border-y border-line bg-surface/50">
      <div className="flex flex-col md:flex-row md:items-stretch">
        <div className="flex shrink-0 items-center border-b border-line px-5 py-4 sm:px-8 md:w-56 md:border-b-0 md:border-r md:py-0 lg:w-64 lg:px-12 xl:px-16">
          <p id="disciplines-label" className="eyebrow">
            Hiring across
          </p>
        </div>
        <div className="relative flex-1 overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] md:py-7">
          <ul className="marquee-track flex w-max animate-marquee items-center">
            {loop.map((discipline, index) => (
              <li
                key={`${discipline}-${index}`}
                aria-hidden={index >= DISCIPLINES.length ? true : undefined}
                className="flex items-center text-[clamp(1.375rem,1rem+1.3vw,2.25rem)] font-medium tracking-[-0.025em] text-ink/85"
              >
                <span className="px-6 md:px-9">{discipline}</span>
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-accent/80" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
