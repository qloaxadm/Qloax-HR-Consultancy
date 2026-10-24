import type { CSSProperties, ElementType, ReactNode } from "react";

export const delayStyle = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function LineReveal({
  lines,
  className,
  startDelay = 0,
  step = 110,
  as: Tag = "h1",
}: {
  lines: ReactNode[];
  className?: string;
  startDelay?: number;
  step?: number;
  as?: ElementType;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={index} className="line-mask">
          <span style={delayStyle(startDelay + index * step)}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
