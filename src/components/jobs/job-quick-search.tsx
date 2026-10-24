"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";

export function JobQuickSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.push(`/careers${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search roles"
      className="flex w-full items-center gap-3 border-b border-line pb-2 sm:w-auto"
    >
      <Search className="size-4 shrink-0 text-muted" aria-hidden />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search by keyword or location"
        className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none sm:w-56"
      />
      <button
        type="submit"
        className="shrink-0 text-xs uppercase tracking-wide text-muted transition-colors hover:text-accent"
      >
        Go
      </button>
    </form>
  );
}
