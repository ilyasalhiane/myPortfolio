"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowDown, CheckCircle2, Cpu, Mail, Orbit, Play, Square } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type NodePoint = { id: number; x: number; y: number };
type ActionKey = "scale" | "rollback" | "cache";

type Scenario = {
  id: string;
  service: string;
  latency: number;
  errorRate: number;
  saturation: number;
  issue: string;
  bestAction: ActionKey;
};

const ROUND_TIME = 30;
const ACTIONS: Record<ActionKey, string> = {
  scale: "Scale deployment",
  rollback: "Rollback release",
  cache: "Enable cache + queue throttling"
};
const SCENARIOS: Scenario[] = [
  { id: "auth-spike", service: "Auth API", latency: 860, errorRate: 1.4, saturation: 94, issue: "CPU saturation from login spike", bestAction: "scale" },
  { id: "checkout-regression", service: "Checkout Service", latency: 920, errorRate: 8.7, saturation: 58, issue: "Error burst right after deploy", bestAction: "rollback" },
  { id: "feed-burst", service: "Feed Aggregator", latency: 670, errorRate: 3.2, saturation: 88, issue: "Queue pressure from cache misses", bestAction: "cache" },
  { id: "search-ramp", service: "Search API", latency: 710, errorRate: 1.1, saturation: 91, issue: "Healthy errors, infra is saturated", bestAction: "scale" },
  { id: "pricing-release", service: "Pricing Engine", latency: 790, errorRate: 9.4, saturation: 52, issue: "Failure pattern tied to newest release", bestAction: "rollback" },
  { id: "timeline-fanout", service: "Timeline Worker", latency: 640, errorRate: 2.2, saturation: 86, issue: "Burst traffic with repeated reads", bestAction: "cache" }
];

function getScenario(round: number): Scenario {
  const offset = Math.floor(Math.random() * SCENARIOS.length);
  return SCENARIOS[(round + offset) % SCENARIOS.length];
}

export function Hero() {
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const [statusIndex, setStatusIndex] = useState(0);
  const [gameOn, setGameOn] = useState(false);
  const [round, setRound] = useState(0);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
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
    setScenario(getScenario(round));
    setFeedback(null);
    setTimeLeft(ROUND_TIME);
    setStreak(0);
  }, [gameOn, round]);

  useEffect(() => {
    if (!gameOn) return;

    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setBest((currentBest) => Math.max(currentBest, score));
          setScore(0);
          setRound((current) => current + 1);
          return ROUND_TIME;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [gameOn, score]);

  const highlightedNode = gameOn && scenario ? nodes.find((node) => node.id === scenario.service.length % nodes.length)?.id : null;

  const toggleGame = () => {
    setGameOn((prev) => {
      const next = !prev;
      if (next) {
        setRound((value) => value + 1);
      } else {
        setScenario(null);
        setTimeLeft(ROUND_TIME);
        setStreak(0);
        setFeedback(null);
      }
      return next;
    });
  };

  const onActionSelect = (action: ActionKey) => {
    if (!gameOn || !scenario) return;

    if (action === scenario.bestAction) {
      const nextScore = score + 1;
      setScore(nextScore);
      setStreak((prev) => prev + 1);
      setBest((prev) => Math.max(prev, nextScore));
      setFeedback("correct");
      setRound((value) => value + 1);
      return;
    }

    setStreak(0);
    setFeedback("wrong");
    setTimeLeft((prev) => Math.max(0, prev - 3));
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
              const isTarget = gameOn && node.id === highlightedNode;
              const fillColor = isTarget ? "#00f0ff" : "#00ffaa";
              const baseRadius = isTarget ? 1.55 : 0.85;

              return (
                <g key={`node-${node.id}`}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={3.4}
                    fill="transparent"
                    className="pointer-events-none"
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
                            opacity: isTarget ? [0.78, 1, 0.78] : [0.45, 0.95, 0.45]
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
                <Orbit className="h-4 w-4 text-cyan-300" /> Cluster Operations Console
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
              <div className="space-y-2 text-[11px] text-cyan-100">
                <p>Mini-game: triage production incidents fast and pick the best engineering action.</p>
                {scenario && (
                  <div className="rounded-lg border border-cyan-400/30 bg-slate-950/50 p-2">
                    <p className="font-medium text-cyan-200">{scenario.service}</p>
                    <p className="text-slate-300">{scenario.issue}</p>
                    <p className="mt-1 text-[10px] text-slate-400">p95: {scenario.latency}ms · errors: {scenario.errorRate}% · saturation: {scenario.saturation}%</p>
                  </div>
                )}
                <div className="grid gap-1 sm:grid-cols-3">
                  {(Object.keys(ACTIONS) as ActionKey[]).map((action) => (
                    <button
                      key={action}
                      type="button"
                      onClick={() => onActionSelect(action)}
                      className="rounded-md border border-cyan-300/40 bg-cyan-500/5 px-2 py-1 text-left text-[10px] transition hover:border-cyan-200 hover:bg-cyan-500/15"
                    >
                      {ACTIONS[action]}
                    </button>
                  ))}
                </div>
                <p>Time: {timeLeft}s · Score: {score} · Streak: {streak} · Best: {best}</p>
                {feedback === "correct" && (
                  <p className="inline-flex items-center gap-1 text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5" /> Correct call. Next incident...</p>
                )}
                {feedback === "wrong" && (
                  <p className="inline-flex items-center gap-1 text-amber-300"><AlertTriangle className="h-3.5 w-3.5" /> Suboptimal decision. -3s penalty.</p>
                )}
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
