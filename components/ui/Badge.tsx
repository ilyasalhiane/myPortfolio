import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "rounded-full border border-cyan-400/30 bg-slate-900/70 px-3 py-1 text-xs text-cyan-100",
        className
      )}
    >
      {children}
    </span>
  );
}
