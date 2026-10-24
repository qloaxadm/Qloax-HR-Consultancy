import type { ReactNode } from "react";

/* Re-mounts on every navigation, so each page arrives with the same restrained entrance. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>;
}
