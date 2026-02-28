"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { SiCoursera, SiIbm, SiMeta, SiPython } from "react-icons/si";
import { certifications, type Certification } from "@/lib/data";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  meta: SiMeta,
  ibm: SiIbm,
  coursera: SiCoursera,
  python: SiPython
} as const;

function toExternalUrl(markdownLink: string) {
  const match = markdownLink.match(/\((https?:\/\/[^)]+)\)$/);
  return match?.[1] ?? markdownLink;
}

function CertificateCard({ cert }: { cert: Certification }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 18 });

  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(0,240,255,0.26), rgba(15,23,42,0.2) 35%, rgba(15,23,42,0.9) 75%)`;

  const Icon = ICON_MAP[cert.icon];

  return (
    <motion.article
      ref={cardRef}
      style={{ rotateX, rotateY, background }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        x.set(px - 0.5);
        y.set(py - 0.5);
        spotlightX.set(px * 100);
        spotlightY.set(py * 100);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="glass group relative rounded-2xl p-5 [transform-style:preserve-3d]"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-200/20" />
      <div
        className={cn(
          "pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60",
          cert.color
        )}
      />
      <div className="relative flex h-full flex-col justify-between gap-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Icon className="h-7 w-7 text-cyan-200" />
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
          </div>
          <h3 className="text-base font-semibold leading-snug text-white">{cert.title}</h3>
          <p className="text-sm text-slate-300">{cert.org}</p>
        </div>
        <a
          href={toExternalUrl(cert.link)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-max items-center gap-2 rounded-lg border border-cyan-300/40 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-200 transition hover:translate-x-1"
        >
          Verify Credential <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.article>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="px-6 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="cyber-line mb-8 w-max text-2xl font-semibold text-white">Interactive Certificate Vault</h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {certifications.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
