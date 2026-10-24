import { Search } from "lucide-react";
import { JOB_LOCATIONS } from "@/content/jobs";

/** A plain GET form: works without JavaScript and lands on a shareable /careers URL. */
export function JobQuickSearch() {
  return (
    <form
      action="/careers"
      method="get"
      role="search"
      aria-label="Search roles"
      className="grid gap-px overflow-hidden rounded-[2px] border border-line bg-line md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto]"
    >
      <label className="flex items-center gap-3 bg-bg px-5">
        <Search aria-hidden className="size-4 shrink-0 text-muted" />
        <span className="sr-only">Keyword</span>
        <input
          type="search"
          name="q"
          placeholder="Role, skill, or sector"
          className="h-14 w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
        />
      </label>
      <label className="flex items-center bg-bg px-5">
        <span className="sr-only">Location</span>
        <select
          name="location"
          defaultValue=""
          className="h-14 w-full cursor-pointer appearance-none bg-transparent text-sm text-ink focus:outline-none"
        >
          <option value="">Any location</option>
          {JOB_LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="h-14 bg-accent px-7 text-sm font-medium text-accent-ink transition-colors duration-300 hover:bg-accent-hover active:scale-[0.98]"
      >
        Search roles
      </button>
    </form>
  );
}
