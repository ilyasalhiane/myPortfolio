"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Cpu, Mail, Orbit } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const [statusIndex, setStatusIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const nodes = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 24;
        const radius = 32 + (i % 3) * 7;
        return { id: i, x: 50 + Math.cos(angle) * radius, y: 50 + Math.sin(angle) * radius };
      }),
    []
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % profile.statusMessages.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-16 md:pt-20">
      <div className="absolute inset-0 grid-overlay opacity-25" />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:px-12">
        <div className="space-y-7">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1 text-xs tracking-[0.15em] text-cyan-200"
          >
            <Cpu className="h-4 w-4" /> SYSTEM PROFILE
          </motion.p>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{profile.name}</h1>
            <p className="text-lg text-cyan-100 md:text-2xl">{profile.title}</p>
            <p className="text-sm text-slate-300 md:text-base">{profile.subtitle}</p>
          </div>
          <p className="max-w-2xl text-base text-slate-300 md:text-lg">{profile.positioning}</p>

          <div className="flex flex-wrap gap-2">
            {profile.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href="#experience">View Experience</Button>
            <Button href="#contact" variant="ghost">
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" /> Contact
              </span>
            </Button>
            <Button href="#about" variant="ghost">
              <span className="inline-flex items-center gap-2">
                <ArrowDown className="h-4 w-4" /> Initialize Connection
              </span>
            </Button>
          </div>
        </div>

        <motion.div
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            setCursor({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
          }}
          className="glass relative h-[430px] overflow-hidden rounded-3xl"
        >
          <div
            className="pointer-events-none absolute h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/30 blur-3xl"
            style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
          />
          <div className="absolute right-4 top-4 z-20 w-32 rounded-2xl border border-cyan-300/40 bg-slate-900/60 p-2 shadow-neon">
            <div className="overflow-hidden rounded-xl border border-cyan-200/40">
              <Image src={profile.profileImage} alt="Ilyas Alhiane profile picture" width={128} height={128} className="h-28 w-full object-cover" priority />
            </div>
            <p className="mt-2 text-center text-[10px] uppercase tracking-[0.16em] text-cyan-200">Operator // Ilyas</p>
          </div>

          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            {nodes.map((node, idx) => {
              const next = nodes[(idx + 3) % nodes.length];
              return (
                <motion.line
                  key={`line-${node.id}`}
                  x1={node.x}
                  y1={node.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="rgba(0,240,255,0.32)"
                  strokeWidth="0.25"
                  initial={reduceMotion ? false : { pathLength: 0, opacity: 0.3 }}
                  animate={reduceMotion ? { opacity: 0.35 } : { pathLength: 1, opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 4, repeat: reduceMotion ? 0 : Infinity, delay: idx * 0.09 }}
                />
              );
            })}
            {nodes.map((node, idx) => (
              <motion.circle
                key={`node-${node.id}`}
                cx={node.x}
                cy={node.y}
                r="0.85"
                fill="#00ffaa"
                animate={reduceMotion ? { opacity: 0.7 } : { r: [0.8, 1.45, 0.8], opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2.2, repeat: reduceMotion ? 0 : Infinity, delay: idx * 0.05 }}
              />
            ))}
          </svg>

          <div className="absolute bottom-4 left-4 right-4 space-y-2 rounded-xl border border-slate-700/70 bg-slate-900/50 px-4 py-3 text-xs text-slate-200">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2">
                <Orbit className="h-4 w-4 text-cyan-300" /> Realtime node telemetry
              </span>
              <span className="text-matrix">synced</span>
            </div>
            <p className="text-[11px] text-cyan-100">{profile.statusMessages[statusIndex]}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
