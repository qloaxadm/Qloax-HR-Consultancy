import type { Job, JobFilters } from "@/lib/types";

export const EMPTY_FILTERS: JobFilters = {
  q: "",
  location: "",
  type: "",
  arrangement: "",
};

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim().slice(0, 120) ?? "";
}

export function parseJobFilters(params: RawParams): JobFilters {
  return {
    q: first(params.q),
    location: first(params.location),
    type: first(params.type),
    arrangement: first(params.arrangement),
  };
}

export function filterJobs(jobs: Job[], filters: JobFilters) {
  const terms = filters.q.toLowerCase().split(/\s+/).filter(Boolean);

  return jobs.filter((job) => {
    if (filters.location && job.location !== filters.location) return false;
    if (filters.type && job.type !== filters.type) return false;
    if (filters.arrangement && job.arrangement !== filters.arrangement) return false;
    if (terms.length === 0) return true;

    const haystack = [
      job.title,
      job.summary,
      job.sector,
      job.companyLabel,
      job.location,
      job.type,
      job.arrangement,
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

export function filtersToQuery(filters: JobFilters) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}
