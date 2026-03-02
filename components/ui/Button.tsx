import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", external, className }: Props) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
        variant === "primary"
          ? "border border-cyan-300/60 bg-cyan-500/15 text-cyan-100 shadow-neon hover:bg-cyan-400/20"
          : "border border-slate-700 bg-slate-900/60 text-slate-200 hover:border-cyan-300/40",
        className
      )}
    >
      {children}
    </Link>
  );
}
