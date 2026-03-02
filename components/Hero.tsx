"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Cpu, Mail, Orbit, Play, Square } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type NodePoint = { id: number; x: number; y: number };

const ROUND_LENGTH = 6;
const ROUND_TIME = 20;

function buildSequence(nodes: NodePoint[], length: number): number[] {
  const ids = [...nodes.map((node) => node.id)];
  const output: number[] = [];

  while (output.length < length && ids.length > 0) {
    const index = Math.floor(Math.random() * ids.length);
    const [selected] = ids.splice(index, 1);
    output.push(selected);
  }

  return output;
}

export function Hero() {
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const [statusIndex, setStatusIndex] = useState(0);
  const [gameOn, setGameOn] = useState(false);
  const [round, setRound] = useState(0);
  const [sequence, setSequence] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
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
    if (!gameOn) return;
    setSequence(buildSequence(nodes, ROUND_LENGTH));
    setStep(0);
    setTimeLeft(ROUND_TIME);
  }, [gameOn, nodes, round]);

  useEffect(() => {
    if (!gameOn) return;

    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setBest((currentBest) => Math.max(currentBest, score));
          setScore(0);
          setRound((current) => current + 1);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [gameOn, score]);

  const currentTarget = sequence[step];

  const toggleGame = () => {
    setGameOn((prev) => {
      const next = !prev;
      if (next) {
        setRound((value) => value + 1);
      } else {
        setStep(0);
        setSequence([]);
        setTimeLeft(ROUND_TIME);
      }
      return next;
    });
  };

  const onNodeClick = (nodeId: number) => {
    if (!gameOn || timeLeft <= 0) return;

    if (nodeId === currentTarget) {
      const nextStep = step + 1;

      if (nextStep >= sequence.length) {
        const nextScore = score + 1;
        setScore(nextScore);
        setBest((prev) => Math.max(prev, nextScore));
        setRound((value) => value + 1);
      } else {
        setStep(nextStep);
      }
      return;
    }

    setStep(0);
    setTimeLeft((prev) => Math.max(0, prev - 2));
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
            {nodes.map((node, idx) => {
              const isTarget = gameOn && node.id === currentTarget;
              const isCompleted = gameOn && sequence.slice(0, step).includes(node.id);
              const fillColor = isTarget ? "#00f0ff" : isCompleted ? "#7affd9" : "#00ffaa";
              const baseRadius = isTarget ? 1.6 : isCompleted ? 1.15 : 0.85;

              return (
                <g key={`node-${node.id}`}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={3.2}
                    fill="transparent"
                    className={gameOn ? "cursor-pointer" : "pointer-events-none"}
                    onClick={() => onNodeClick(node.id)}
                    style={{ pointerEvents: gameOn ? "auto" : "none" }}
                  />
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={baseRadius}
                    fill={fillColor}
                    animate={
                      reduceMotion
                        ? { opacity: 0.85 }
                        : {
                            r: isTarget ? [baseRadius, baseRadius + 0.55, baseRadius] : [baseRadius, baseRadius + 0.35, baseRadius],
                            opacity: isTarget ? [0.7, 1, 0.7] : [0.45, 0.95, 0.45]
                          }
                    }
                    transition={{ duration: isTarget ? 1 : 2.2, repeat: reduceMotion ? 0 : Infinity, delay: idx * 0.05 }}
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

            {gameOn ? (
              <div className="space-y-1 text-[11px] text-cyan-100">
                <p>Click highlighted nodes in order.</p>
                <p>
                  Step: {Math.min(step + 1, sequence.length || ROUND_LENGTH)}/{sequence.length || ROUND_LENGTH} · Time: {timeLeft}s · Score: {score} · Best: {best}
                </p>
              </div>
            ) : (
              <p className="text-[11px] text-cyan-100">{profile.statusMessages[statusIndex]}</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
