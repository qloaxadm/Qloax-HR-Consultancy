"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { JobRow } from "./job-row";
import { EMPTY_FILTERS, filterJobs, filtersToQuery } from "@/lib/jobs";
import type { Job, JobFilters } from "@/lib/types";
import { cn } from "@/lib/utils";

function ChipGroup({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: keyof JobFilters;
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="eyebrow mb-3">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {["", ...options].map((option) => (
          <label key={option || "all"} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="peer sr-only"
            />
            <span className="inline-flex h-9 items-center rounded-full border border-line px-4 text-[13px] text-muted transition-colors duration-300 hover:border-ink/30 hover:text-ink peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg">
              {option || "All"}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function JobBoard({
  jobs,
  initialFilters,
  locations,
  types,
  arrangements,
}: {
  jobs: Job[];
  initialFilters: JobFilters;
  locations: string[];
  types: readonly string[];
  arrangements: readonly string[];
}) {
  const [filters, setFilters] = useState(initialFilters);
  const deferred = useDeferredValue(filters);
  const results = useMemo(() => filterJobs(jobs, deferred), [jobs, deferred]);
  const active = Object.values(filters).some(Boolean);

  useEffect(() => {
    const url = `${window.location.pathname}${filtersToQuery(filters)}`;
    window.history.replaceState(window.history.state, "", url);
  }, [filters]);

  const update = (key: keyof JobFilters, value: string) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <form
        role="search"
        aria-label="Filter roles"
        action="/careers"
        method="get"
        onSubmit={(event) => event.preventDefault()}
        className="lg:col-span-4 xl:col-span-3"
      >
        <div className="space-y-8 lg:sticky lg:top-28">
          <div>
            <label htmlFor="job-q" className="eyebrow mb-3 block">
              Keyword
            </label>
            <div className="relative">
              <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                id="job-q"
                type="search"
                name="q"
                value={filters.q}
                onChange={(event) => update("q", event.target.value)}
                placeholder="Role, skill, or sector"
                className="h-12 w-full rounded-[2px] border border-line bg-surface/50 pl-11 pr-4 text-[15px] text-ink placeholder:text-muted/60 transition-colors duration-300 hover:border-ink/25 focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="job-location" className="eyebrow mb-3 block">
              Location
            </label>
            <div className="relative">
              <select
                id="job-location"
                name="location"
                value={filters.location}
                onChange={(event) => update("location", event.target.value)}
                className="h-12 w-full cursor-pointer appearance-none rounded-[2px] border border-line bg-surface/50 px-4 pr-11 text-[15px] text-ink transition-colors duration-300 hover:border-ink/25 focus:border-accent focus:outline-none"
              >
                <option value="">Any location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            </div>
          </div>

          <ChipGroup name="type" legend="Job type" options={types} value={filters.type} onChange={(value) => update("type", value)} />
          <ChipGroup
            name="arrangement"
            legend="Work arrangement"
            options={arrangements}
            value={filters.arrangement}
            onChange={(value) => update("arrangement", value)}
          />

          <noscript>
            <button type="submit" className="h-11 rounded-[2px] bg-accent px-6 text-sm font-medium text-accent-ink">
              Update results
            </button>
          </noscript>

          <button
            type="button"
            onClick={() => setFilters(EMPTY_FILTERS)}
            className={cn(
              "inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink",
              !active && "invisible",
            )}
          >
            <X aria-hidden className="size-4" />
            Clear all filters
          </button>
        </div>
      </form>

      <div className="lg:col-span-8 xl:col-span-9">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
          <p aria-live="polite" className="text-sm text-muted">
            Showing <span className="text-ink">{results.length}</span> of {jobs.length} roles
          </p>
        </div>

        {results.length > 0 ? (
          <ul>
            {results.map((job) => (
              <li key={job.slug}>
                <JobRow job={job} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-start gap-6 border-b border-line py-16">
            <p className="text-title font-medium text-ink">No roles match those filters.</p>
            <p className="max-w-md text-base leading-relaxed text-muted">
              Try a broader keyword or fewer filters — or register your profile and we&apos;ll get in touch when
              something relevant comes up.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="h-11 rounded-[2px] border border-line px-5 text-sm text-ink transition-colors hover:border-ink/35 hover:bg-surface"
              >
                Clear filters
              </button>
              <Link
                href="/candidate-registration"
                className="inline-flex h-11 items-center rounded-[2px] bg-accent px-5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
              >
                Register your profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
