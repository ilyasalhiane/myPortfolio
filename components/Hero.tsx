"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Cpu, LockKeyhole, Mail, RotateCcw, Square } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type PuzzleState = "idle" | "active" | "unlocked" | "denied";

type Dot = {
  id: number;
  row: number;
  col: number;
  x: number;
  y: number;
};

const PATTERNS = [
  [1, 2, 5, 8],
  [1, 4, 7, 8],
  [3, 6, 5, 2],
  [7, 5, 3, 6]
];
const STORAGE_KEY = "pattern-lock-wins";

function pickPattern() {
  return PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
}

export function Hero() {
  const [statusIndex, setStatusIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [puzzleState, setPuzzleState] = useState<PuzzleState>("idle");
  const [targetPattern, setTargetPattern] = useState<number[]>(PATTERNS[0]);
  const [selectedDots, setSelectedDots] = useState<number[]>([]);
  const [wins, setWins] = useState(0);

  const reduceMotion = useReducedMotion();

  const dots = useMemo<Dot[]>(
    () =>
      Array.from({ length: 9 }, (_, index) => {
        const id = index + 1;
        const row = Math.floor(index / 3);
        const col = index % 3;
        return {
          id,
          row,
          col,
          x: 20 + col * 30,
          y: 20 + row * 30
        };
      }),
    []
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % profile.statusMessages.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isNaN(parsed)) {
      setWins(parsed);
    }
  }, []);

  const persistWins = (nextWins: number) => {
    setWins(nextWins);
    window.localStorage.setItem(STORAGE_KEY, String(nextWins));
  };

  const startGame = () => {
    setTargetPattern(pickPattern());
    setSelectedDots([]);
    setPuzzleState("active");
    setPlaying(true);
  };

  const exitGame = () => {
    setPlaying(false);
    setPuzzleState("idle");
    setSelectedDots([]);
  };

  const resetAttempt = () => {
    setSelectedDots([]);
    setPuzzleState("active");
  };

  const handleDotSelect = (dotId: number) => {
    if (!playing || puzzleState !== "active") return;
    if (selectedDots.includes(dotId)) return;

    const nextSelection = [...selectedDots, dotId];
    setSelectedDots(nextSelection);

    const currentIndex = nextSelection.length - 1;
    if (targetPattern[currentIndex] !== dotId) {
      setPuzzleState("denied");
      return;
    }

    if (nextSelection.length === targetPattern.length) {
      setPuzzleState("unlocked");
      persistWins(wins + 1);
    }
  };

  const selectedPoints = selectedDots
    .map((id) => dots.find((dot) => dot.id === id))
    .filter((dot): dot is Dot => Boolean(dot))
    .map((dot) => `${dot.x},${dot.y}`)
    .join(" ");

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

          <div className="flex items-center gap-4">
            <div className="rounded-full border border-cyan-300/60 p-1 shadow-neon">
              <Image src={profile.profileImage} alt="Ilyas Alhiane profile picture" width={72} height={72} className="h-[72px] w-[72px] rounded-full object-cover" priority />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{profile.name}</h1>
              <p className="text-lg text-cyan-100 md:text-2xl">{profile.title}</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 md:text-base">{profile.subtitle}</p>
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

        <div className="glass relative min-h-[430px] overflow-hidden rounded-3xl border border-cyan-400/20 p-6">
          <div className="absolute -top-16 right-8 h-40 w-40 rounded-full bg-cyan-500/15 blur-3xl" />

          {!playing && (
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="space-y-3">
                <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-cyan-200">
                  <LockKeyhole className="h-3.5 w-3.5" /> System Card
                </p>
                <h3 className="text-xl font-semibold text-white">Pattern Lock Console</h3>
                <p className="text-sm text-slate-300">{profile.statusMessages[statusIndex]}</p>
                <p className="text-xs text-cyan-100/90">Optional: unlock a hidden highlight.</p>
              </div>

              <button
                type="button"
                onClick={startGame}
                className="w-fit rounded-lg border border-cyan-300/60 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Play Pattern Lock
              </button>
            </div>
          )}

          {playing && (
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Target: {targetPattern.join("-")}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={resetAttempt}
                    className="inline-flex items-center gap-1 rounded-md border border-cyan-300/50 bg-cyan-500/10 px-2 py-1 text-[11px] text-cyan-100 transition hover:bg-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Reset
                  </button>
                  <button
                    type="button"
                    onClick={exitGame}
                    className="inline-flex items-center gap-1 rounded-md border border-cyan-300/50 bg-cyan-500/10 px-2 py-1 text-[11px] text-cyan-100 transition hover:bg-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <Square className="h-3.5 w-3.5" /> Exit
                  </button>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[280px] rounded-2xl border border-cyan-400/30 bg-slate-900/50 p-4">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {selectedPoints && <polyline points={selectedPoints} fill="none" stroke="rgba(0,240,255,0.9)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />}

                  {dots.map((dot) => {
                    const isSelected = selectedDots.includes(dot.id);
                    const isNextExpected = puzzleState === "active" && targetPattern[selectedDots.length] === dot.id;
                    const radius = isSelected ? 6 : 4.2;
                    return (
                      <g key={dot.id}>
                        <circle
                          cx={dot.x}
                          cy={dot.y}
                          r={9}
                          fill="transparent"
                          onPointerDown={() => handleDotSelect(dot.id)}
                          style={{ pointerEvents: puzzleState === "active" ? "auto" : "none" }}
                          className={puzzleState === "active" ? "cursor-pointer" : "pointer-events-none"}
                        />
                        <motion.circle
                          cx={dot.x}
                          cy={dot.y}
                          r={radius}
                          fill={isSelected ? "#00f0ff" : isNextExpected ? "#77f8ff" : "#0f2338"}
                          stroke={isSelected || isNextExpected ? "#00f0ff" : "rgba(0,240,255,0.4)"}
                          strokeWidth={isSelected ? 1.6 : 1.2}
                          animate={
                            reduceMotion
                              ? { opacity: isSelected ? 1 : 0.85 }
                              : isSelected
                                ? { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }
                                : { opacity: 0.95 }
                          }
                          transition={{ duration: 0.5, repeat: reduceMotion || !isSelected ? 0 : Infinity }}
                        />
                        <text x={dot.x} y={dot.y + 1.4} textAnchor="middle" className="fill-cyan-100 text-[4.5px] font-medium">
                          {dot.id}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="space-y-1 text-xs text-slate-200">
                {puzzleState === "active" && <p>Tap dots in order. No duplicate dots allowed per attempt.</p>}
                {puzzleState === "denied" && <p className="text-rose-300">Access denied. Adjust pattern and try again.</p>}
                {puzzleState === "unlocked" && (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0.5, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-emerald-300/50 bg-emerald-500/10 p-3"
                  >
                    <p className="font-semibold text-emerald-200">UNLOCKED</p>
                    <p className="mt-1 text-emerald-100">Cloud-native Microservices • Node/Express • Docker/K8s</p>
                  </motion.div>
                )}
                <p className="text-cyan-100/90">Pattern wins: {wins}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
