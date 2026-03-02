"use client";

import { useState } from "react";
import { Copy, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <Section id="contact" eyebrow="Let's Build" title="Contact">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="space-y-4">
          <p className="text-sm text-slate-200">For full-stack product engineering roles, collaborations, or technical conversations, email is the fastest path.</p>
          <div className="flex flex-wrap gap-2">
            <a href={`mailto:${profile.contact.email}`} className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/50 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100">
              <Mail className="h-4 w-4" /> {profile.contact.email}
            </a>
            <button onClick={copyEmail} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200">
              <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="flex gap-3 text-sm">
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-200"><Linkedin className="h-4 w-4" /> LinkedIn</a>
            <a href={profile.contact.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-200"><Github className="h-4 w-4" /> GitHub</a>
          </div>
        </Card>

        <Card>
          <form
            action={`mailto:${profile.contact.email}`}
            method="post"
            encType="text/plain"
            className="space-y-3"
          >
            <label className="block text-xs text-slate-300">Name
              <input name="name" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100" required />
            </label>
            <label className="block text-xs text-slate-300">Email
              <input type="email" name="email" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100" required />
            </label>
            <label className="block text-xs text-slate-300">Message
              <textarea name="message" rows={5} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100" required />
            </label>
            <button type="submit" className="rounded-lg border border-cyan-300/60 bg-cyan-500/15 px-4 py-2 text-sm text-cyan-100">
              Send Message
            </button>
          </form>
        </Card>
      </div>
    </Section>
  );
}
