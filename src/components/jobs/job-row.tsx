import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Job } from "@/lib/types";

export function JobRow({ job }: { job: Job }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group flex flex-col gap-4 border-t border-line py-7 transition-colors duration-300 hover:bg-surface sm:flex-row sm:items-center sm:justify-between sm:px-4"
    >
      <div>
        <h3 className="text-lg font-medium text-ink sm:text-xl">
          {job.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{job.companyLabel}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-wide text-muted">
        <span>{job.location}</span>
        <span className="text-line">/</span>
        <span>{job.type}</span>
        <span className="text-line">/</span>
        <span>{job.arrangement}</span>
        <ArrowRight
          className="size-4 text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
          aria-hidden
        />
      </div>
    </Link>
  );
}
