"use client";

import Image from "next/image";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Cpu, Orbit } from "lucide-react";

const tags = ["Next.js 15", "TypeScript", "Cloud-native", "WebGL-minded", "Cyber-Physical"];
const PROFILE_PICTURE_URL =
  "https://media.licdn.com/dms/image/v2/D4E03AQFMQMWyONHZew/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696337189875?e=1773878400&v=beta&t=tZ740Zcm-DxhCcd8DCF64Gwxxw9f1y8DNO--mw0Aqos";


export function Hero() {
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  const nodes = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 22;
        const radius = 30 + (i % 3) * 8;
        return {
          id: i,
          x: 50 + Math.cos(angle) * radius,
          y: 50 + Math.sin(angle) * radius
        };
      }),
    []
  );

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-24 md:px-10 lg:px-16">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-200"
          >
            <Cpu className="h-4 w-4" /> Digital Cyber-Physical Systems
          </motion.p>
          <div className="space-y-4">
            {["Ilyas Alhiane", "Full-Stack Software Engineer", "& Ingénieur d'État"].map((line, index) => (
              <motion.h1
                key={line}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.2 + index * 0.14, duration: 0.8 }}
                className="text-3xl font-semibold tracking-tight text-white md:text-5xl"
              >
                {line}
              </motion.h1>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="max-w-xl text-base text-slate-300 md:text-lg"
          >
            Engineering immersive software systems across frontend architecture, cloud infrastructure,
            and intelligent tooling with a premium motion-first product experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="flex flex-wrap gap-2"
          >
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-xs text-slate-200">
                {tag}
              </span>
            ))}
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToAbout}
            className="group inline-flex items-center gap-3 rounded-xl border border-cyan-300/60 bg-cyan-500/10 px-5 py-3 font-medium text-cyan-100 shadow-neon"
          >
            Initialize Connection
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </motion.button>
        </div>

        <motion.div
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            setCursor({
              x: ((event.clientX - rect.left) / rect.width) * 100,
              y: ((event.clientY - rect.top) / rect.height) * 100
            });
          }}
          className="glass relative h-[430px] overflow-hidden rounded-3xl"
        >
          <div
            className="pointer-events-none absolute h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/30 blur-3xl"
            style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
          />
          <div className="absolute right-4 top-4 z-20 w-32 rounded-2xl border border-cyan-300/40 bg-slate-900/60 p-2 shadow-neon backdrop-blur">
            <div className="overflow-hidden rounded-xl border border-cyan-200/40">
              <Image
                src={PROFILE_PICTURE_URL}
                alt="Ilyas Alhiane profile picture"
                width={128}
                height={128}
                className="h-28 w-full object-cover"
                priority
              />
            </div>
            <p className="mt-2 text-center text-[10px] uppercase tracking-[0.18em] text-cyan-200">Operator // Ilyas</p>
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
                  stroke="rgba(0,240,255,0.35)"
                  strokeWidth="0.25"
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  animate={{ pathLength: 1, opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.1 }}
                />
              );
            })}
            {nodes.map((node, idx) => (
              <motion.circle
                key={`node-${node.id}`}
                cx={node.x}
                cy={node.y}
                r="0.9"
                fill="#00ffaa"
                animate={{ r: [0.8, 1.5, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: idx * 0.05 }}
              />
            ))}
          </svg>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-slate-700/70 bg-slate-900/50 px-4 py-3 text-xs text-slate-200">
            <div className="inline-flex items-center gap-2">
              <Orbit className="h-4 w-4 text-cyan-300" />
              Realtime node telemetry
            </div>
            <span className="text-matrix">synced</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
