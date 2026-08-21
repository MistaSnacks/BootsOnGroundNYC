import type { ReactNode } from "react";

/** Renders CMS text where **double asterisks** mean <strong>. */
export function BoldText({ text }: { text: string }): ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
    </>
  );
}
