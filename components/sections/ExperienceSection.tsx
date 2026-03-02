import { experiences } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Career" title="Experience">
      <div className="space-y-6">
        {experiences.map((item) => (
          <div key={item.id} className="relative pl-6 before:absolute before:bottom-0 before:left-2 before:top-0 before:w-px before:bg-cyan-400/30">
            <span className="absolute left-0 top-6 h-4 w-4 rounded-full border border-cyan-300/70 bg-space" />
            <Card className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                  <p className="text-sm text-cyan-100">{item.company} · {item.location}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">{item.start} — {item.end}</p>
              </div>

              {item.metric ? (
                <div className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
                  <span className="font-semibold">{item.metric.value}</span> {item.metric.label}
                </div>
              ) : null}

              <ul className="space-y-2 text-sm text-slate-200">
                {item.highlights.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-200">What I owned</p>
                <div className="flex flex-wrap gap-2">
                  {item.ownership.map((owner) => (
                    <Badge key={owner}>{owner}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.tech.map((tech) => (
                  <Badge key={tech} className="border-slate-700 text-slate-200">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}
