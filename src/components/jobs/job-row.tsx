import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Job } from "@/lib/types";

export function JobRow({ job }: { job: Job }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group relative grid gap-4 border-b border-line py-7 transition-colors duration-300 hover:bg-surface/70 focus-visible:bg-surface/70 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_7rem_6.5rem_2rem] md:items-center md:gap-6 md:px-4 md:py-8"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-y-100 group-focus-visible:scale-y-100"
      />
      <span className="transition-transform duration-500 ease-out-expo md:group-hover:translate-x-2">
        <span className="block text-lg font-medium tracking-[-0.015em] text-ink md:text-xl">{job.title}</span>
        <span className="mt-1 block text-sm text-muted">{job.companyLabel}</span>
      </span>
      <span className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted md:contents">
        <span className="md:text-ink/85">{job.location}</span>
        <span aria-hidden="true" className="text-line md:hidden">/</span>
        <span>{job.type}</span>
        <span aria-hidden="true" className="text-line md:hidden">/</span>
        <span>{job.arrangement}</span>
      </span>
      <ArrowRight
        aria-hidden
        className="hidden size-5 justify-self-end text-muted transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-accent md:block"
      />
    </Link>
  );
}
