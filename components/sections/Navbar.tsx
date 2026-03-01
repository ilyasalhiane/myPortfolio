"use client";

import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import { navLinks } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navLinks.forEach((item) => {
      const element = document.getElementById(item.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(item.id);
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: 0.1 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const links = useMemo(() => navLinks, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-space/80 backdrop-blur-xl">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded-md focus:bg-cyan-300 focus:px-3 focus:py-1 focus:text-black">
        Skip to content
      </a>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10 lg:px-12" aria-label="Primary">
        <a href="#top" className="text-sm font-semibold tracking-[0.2em] text-cyan-200">
          IA//PORTFOLIO
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                  active === link.id ? "bg-cyan-500/15 text-cyan-200" : "text-slate-300 hover:text-white"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/ilyas-alhiane-cv.pdf"
          className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/60 bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-100 shadow-neon transition hover:bg-cyan-400/20"
        >
          <Download className="h-3.5 w-3.5" /> Download CV
        </a>
      </nav>
    </header>
  );
}
