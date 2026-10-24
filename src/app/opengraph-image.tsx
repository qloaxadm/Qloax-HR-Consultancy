import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const alt = `${SITE.name} — Recruitment & Talent Partners`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#08090b",
          color: "#f3f1ea",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, letterSpacing: 6 }}>
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path d="M2.5 3.5L12 20.5L21.5 3.5" fill="none" stroke="#f3f1ea" strokeWidth="2" />
            <circle cx="12" cy="20.5" r="1.7" fill="#c7f36b" />
          </svg>
          {SITE.name.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 1, letterSpacing: -4 }}>
          <span>Great people.</span>
          <span style={{ display: "flex", paddingLeft: 96 }}>
            Move business forward<span style={{ color: "#c7f36b" }}>.</span>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#a3a7b0" }}>
          <span>Recruitment &amp; talent partners</span>
          <span>People. Potential. Progress.</span>
        </div>
      </div>
    ),
    size,
  );
}
