"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Cpu, Mail, Orbit, Play, RotateCcw, Square } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type NodePoint = { id: number; x: number; y: number };
type GamePhase = "idle" | "playback" | "input" | "end";

const INITIAL_LENGTH = 3;
const STORAGE_KEY = "signal-recall-best";

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function randomNodeId(total: number) {
  return Math.floor(Math.random() * total);
}

function createSequence(length: number, totalNodes: number) {
  return Array.from({ length }, () => randomNodeId(totalNodes));
}

export function Hero() {
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const [statusIndex, setStatusIndex] = useState(0);

  const [gameOn, setGameOn] = useState(false);
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [sequence, setSequence] = useState<number[]>([]);
  const [inputIndex, setInputIndex] = useState(0);
  const [level, setLevel] = useState(INITIAL_LENGTH);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [activePlaybackNode, setActivePlaybackNode] = useState<number | null>(null);

  const reduceMotion = useReducedMotion();

  const nodes = useMemo<NodePoint[]>(
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

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isNaN(parsed)) {
      setBest(parsed);
    }
  }, []);

  const persistBest = (nextBest: number) => {
    setBest(nextBest);
    window.localStorage.setItem(STORAGE_KEY, String(nextBest));
  };

  const startNewRun = () => {
    const initial = createSequence(INITIAL_LENGTH, nodes.length);
    setSequence(initial);
    setInputIndex(0);
    setLevel(INITIAL_LENGTH);
    setScore(0);
    setActivePlaybackNode(null);
    setPhase("playback");
  };

  const toggleGame = () => {
    setGameOn((prev) => {
      const next = !prev;
      if (next) {
        startNewRun();
      } else {
        setPhase("idle");
        setSequence([]);
        setInputIndex(0);
        setLevel(INITIAL_LENGTH);
        setScore(0);
        setActivePlaybackNode(null);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!gameOn || phase !== "playback" || sequence.length === 0) return;

    let cancelled = false;

    const playSequence = async () => {
      setInputIndex(0);
      setActivePlaybackNode(null);

      const onDuration = reduceMotion ? 240 : 450;
      const offDuration = reduceMotion ? 120 : 200;

      for (const nodeId of sequence) {
        if (cancelled) return;
        setActivePlaybackNode(nodeId);
        await sleep(onDuration);
        if (cancelled) return;
        setActivePlaybackNode(null);
        await sleep(offDuration);
      }

      if (cancelled) return;
      setPhase("input");
    };

    void playSequence();

    return () => {
      cancelled = true;
    };
  }, [gameOn, phase, reduceMotion, sequence]);

  const finishRun = () => {
    setPhase("end");
    setActivePlaybackNode(null);
    if (score > best) {
      persistBest(score);
    }
  };

  const onNodePointerDown = (nodeId: number) => {
    if (!gameOn || phase !== "input") return;

    const expected = sequence[inputIndex];
    if (nodeId !== expected) {
      finishRun();
      return;
    }

    const nextIndex = inputIndex + 1;
    if (nextIndex < sequence.length) {
      setInputIndex(nextIndex);
      return;
    }

    const completedLevel = level;
    const nextScore = completedLevel;

    setScore(nextScore);
    if (nextScore > best) {
      persistBest(nextScore);
    }

    const nextLevel = completedLevel + 1;
    setLevel(nextLevel);
    setSequence((prev) => [...prev, randomNodeId(nodes.length)]);
    setInputIndex(0);
    setPhase("playback");
  };

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

          <div className="absolute right-5 top-5 z-20 w-36 rounded-2xl border border-cyan-300/40 bg-slate-900/65 p-2 shadow-neon backdrop-blur-sm">
            <div className="overflow-hidden rounded-xl border border-cyan-200/40">
              <Image src={profile.profileImage} alt="Ilyas Alhiane profile picture" width={144} height={144} className="h-32 w-full object-cover" priority />
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

            {nodes.map((node, idx) => {
              const isPlaybackNode = gameOn && phase === "playback" && node.id === activePlaybackNode;
              const isExpectedNode = gameOn && phase === "input" && node.id === sequence[inputIndex];
              const baseRadius = isPlaybackNode ? 1.7 : isExpectedNode ? 1.2 : 0.85;
              const fillColor = isPlaybackNode ? "#00f0ff" : isExpectedNode ? "#67f3ff" : "#00ffaa";

              return (
                <g key={`node-${node.id}`}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={3.7}
                    fill="transparent"
                    onPointerDown={() => onNodePointerDown(node.id)}
                    style={{ pointerEvents: gameOn && phase === "input" ? "auto" : "none" }}
                    className={gameOn && phase === "input" ? "cursor-pointer" : "pointer-events-none"}
                  />
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={baseRadius}
                    fill={fillColor}
                    animate={
                      reduceMotion
                        ? { opacity: isPlaybackNode ? 1 : 0.85 }
                        : {
                            r: isPlaybackNode ? [baseRadius, baseRadius + 0.6, baseRadius] : [baseRadius, baseRadius + 0.35, baseRadius],
                            opacity: isPlaybackNode ? [0.85, 1, 0.85] : [0.45, 0.95, 0.45]
                          }
                    }
                    transition={{ duration: isPlaybackNode ? 0.7 : 2.1, repeat: reduceMotion ? 0 : Infinity, delay: idx * 0.05 }}
                  />
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-4 left-4 right-4 space-y-2 rounded-xl border border-slate-700/70 bg-slate-900/50 px-4 py-3 text-xs text-slate-200">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2">
                <Orbit className="h-4 w-4 text-cyan-300" /> Realtime node telemetry
              </span>
              <button
                type="button"
                onClick={toggleGame}
                className="inline-flex items-center gap-1 rounded-md border border-cyan-300/50 bg-cyan-500/10 px-2 py-1 text-[11px] text-cyan-100"
              >
                {gameOn ? <Square className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {gameOn ? "Exit" : "Play"}
              </button>
            </div>

            {!gameOn && <p className="text-[11px] text-cyan-100">{profile.statusMessages[statusIndex]}</p>}

            {gameOn && (
              <div className="space-y-1 text-[11px] text-cyan-100">
                <p>Signal Recall: memorize the playback sequence, then repeat it node-by-node.</p>
                <p>
                  Phase: {phase} · Level: {level} · Progress: {Math.min(inputIndex + 1, sequence.length)}/{sequence.length} · Score: {score} · Best: {best}
                </p>

                {phase === "playback" && <p className="text-cyan-200">System playback in progress…</p>}
                {phase === "input" && <p className="text-cyan-200">Your turn: reproduce the sequence in order.</p>}

                {phase === "end" && (
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <p className="text-rose-200">Run ended on a wrong node. Try again?</p>
                    <button
                      type="button"
                      onClick={startNewRun}
                      className="inline-flex items-center gap-1 rounded-md border border-cyan-300/50 bg-cyan-500/10 px-2 py-1 text-[11px] text-cyan-100"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Try again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
