"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/ui/container";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80svh] items-center">
      <Container className="py-40">
        <p className="eyebrow flex items-center gap-3 text-ink/80">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-danger" />
          Something went wrong
        </p>
        <h1 className="mt-6 max-w-3xl text-display font-medium text-ink">We hit an unexpected problem.</h1>
        <p className="mt-6 max-w-md text-lead text-muted">
          Please try again. If it keeps happening, let us know and we&apos;ll look into it.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="h-12 rounded-[2px] bg-accent px-6 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-[2px] border border-line px-6 text-sm text-ink transition-colors hover:border-ink/35 hover:bg-surface"
          >
            Back to home
          </Link>
        </div>
      </Container>
    </section>
  );
}
