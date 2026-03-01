import { focusAreas, profile, toolbox } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function AboutSection() {
  return (
    <Section id="about" eyebrow="Profile" title="About">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="space-y-4">
          <p className="text-sm text-slate-200 md:text-base">{profile.summary}</p>
          <p className="text-sm text-slate-300">
            I focus on systems that are clear to users and reliable in production: microservice-oriented backends,
            maintainable frontend architectures, and cloud-native deployment pipelines with testing built in.
          </p>
          <p className="text-sm text-slate-300">
            Current target: engineering roles where I can own feature delivery end-to-end, from architecture decisions to UX outcomes.
          </p>
        </Card>
        <Card>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Toolbox</h3>
          <div className="flex flex-wrap gap-2">
            {toolbox.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {focusAreas.map((area) => (
          <Card key={area} className="text-sm text-slate-100">
            {area}
          </Card>
        ))}
      </div>
    </Section>
  );
}
