const PHRASE =
  "Recruitment built on trust, expertise, and long-term partnerships";

export function TrustStrip() {
  const repeated = Array.from({ length: 8 }, () => PHRASE);

  return (
    <section
      aria-label={PHRASE}
      className="overflow-hidden border-b border-line bg-bg-secondary py-6"
    >
      <div
        aria-hidden="true"
        className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap"
      >
        {repeated.map((text, index) => (
          <span
            key={index}
            className="flex items-center gap-10 text-sm uppercase tracking-[0.14em] text-muted"
          >
            {text}
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
