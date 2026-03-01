import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <article className={cn("glass rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-neon", className)}>{children}</article>;
}
