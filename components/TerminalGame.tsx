"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, TerminalSquare } from "lucide-react";

type TerminalLine = {
  id: number;
  type: "input" | "output" | "success";
  text: string;
};

const TECH_STACK = ["Next.js", "TypeScript", "Docker", "Kubernetes", "Python", "React", "AWS"];

export function TerminalGame() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: 1, type: "output", text: "Welcome to IlyasOS terminal. Type `help` to start." }
  ]);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const lineId = useRef(2);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, typingText]);

  const addLine = (type: TerminalLine["type"], text: string) => {
    setHistory((prev) => [...prev, { id: lineId.current++, type, text }]);
  };

  const typeStack = async () => {
    setIsTyping(true);
    let result = "";
    for (const tech of TECH_STACK) {
      const target = `${result}${result ? " | " : ""}${tech}`;
      for (let i = result.length; i <= target.length; i++) {
        setTypingText(target.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 28));
      }
      result = target;
    }
    addLine("output", `Stack loaded: ${result}`);
    setTypingText("");
    setIsTyping(false);
  };

  const handleCommand = async (raw: string) => {
    const command = raw.trim().toLowerCase();
    if (!command) return;

    addLine("input", `> ${command}`);

    if (command === "clear") {
      setHistory([]);
      return;
    }

    if (command === "help") {
      addLine(
        "output",
        "Available commands: help | skills | whoami | download_cv | clear"
      );
      return;
    }

    if (command === "skills") {
      await typeStack();
      return;
    }

    if (command === "whoami") {
      addLine("output", "Ilyas Alhiane - Ingénieur d'État");
      return;
    }

    if (command === "download_cv") {
      addLine("success", "Handshake complete. CV package ready.");
      addLine("output", "Download: https://ilyas.dev/assets/Ilyas_Alhiane_CV.pdf");
      return;
    }

    addLine("output", `Unknown command: ${command}`);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const command = input;
    setInput("");
    await handleCommand(command);
  };

  return (
    <section id="terminal" className="px-6 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center gap-3">
          <TerminalSquare className="h-5 w-5 text-matrix" />
          <h2 className="text-2xl font-semibold text-white">Easter Egg // Terminal Challenge</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="glass h-[420px] overflow-hidden rounded-2xl"
        >
          <div className="flex items-center gap-2 border-b border-slate-700/80 bg-slate-900/40 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/90" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/90" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
            <span className="ml-3 text-xs text-slate-300">terminal://ilyas.shell</span>
          </div>
          <div className="h-[calc(100%-56px)] bg-black/40 p-4 font-mono text-sm text-emerald-300">
            <div className="h-[calc(100%-48px)] overflow-y-auto pr-2">
              {history.map((line) => (
                <p
                  key={line.id}
                  className={line.type === "success" ? "text-cyan-300" : line.type === "input" ? "text-emerald-200" : "text-emerald-400"}
                >
                  {line.text}
                </p>
              ))}
              {isTyping && <p className="text-cyan-300">{typingText}</p>}
              <div ref={bottomRef} />
            </div>
            <form onSubmit={onSubmit} className="mt-3 flex items-center gap-2 border-t border-slate-800 pt-3">
              <span className="text-cyan-300">$</span>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="w-full bg-transparent text-emerald-200 outline-none placeholder:text-emerald-700"
                placeholder="enter command..."
                autoComplete="off"
                spellCheck={false}
              />
              <span className="h-4 w-[2px] animate-pulse bg-emerald-300" />
            </form>
          </div>
        </motion.div>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <Download className="h-4 w-4" /> Secret command includes a CV download endpoint.
        </div>
      </div>
    </section>
  );
}
