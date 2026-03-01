import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({
  id,
  title,
  eyebrow,
  className,
  children
}: {
  id: string;
  title: string;
  eyebrow?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-20", className)}>
      <Container>
        <header className="mb-8 space-y-2">
          {eyebrow ? <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">{eyebrow}</p> : null}
          <h2 className="cyber-line w-max text-2xl font-semibold text-white md:text-3xl">{title}</h2>
        </header>
        {children}
      </Container>
    </section>
  );
}
