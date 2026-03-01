import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { highlights } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function HighlightsSection() {
  return (
    <Section id="highlights" eyebrow="Selected Work" title="Engineering Highlights">
      <div className="grid gap-4 lg:grid-cols-2">
        {highlights.map((item) => (
          <Card key={item.slug} className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <span className="text-xs text-cyan-200">{item.company}</span>
            </div>
            <div className="space-y-2 text-sm text-slate-200">
              <p><span className="text-cyan-200">Problem:</span> {item.problem}</p>
              <p><span className="text-cyan-200">Approach:</span> {item.approach}</p>
              <p><span className="text-cyan-200">Result:</span> {item.result}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.tech.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            {item.detailed ? (
              <Link href={`/projects/${item.slug}`} className="inline-flex items-center gap-1 text-sm text-cyan-200 transition hover:text-cyan-100">
                View case study <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : (
              <p className="text-sm text-slate-400">Case study coming soon.</p>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
