import { education } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function EducationSection() {
  const item = education[0];

  return (
    <Section id="education" eyebrow="Academic Foundation" title="Education">
      <Card className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-white">{item.degree}</h3>
            <p className="text-sm text-cyan-100">{item.school}</p>
          </div>
          <div className="text-right text-xs uppercase tracking-[0.15em] text-slate-300">
            <p>{item.dates}</p>
            <p>{item.level}</p>
          </div>
        </div>
        <p className="text-sm text-slate-300">{item.details}</p>

        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(item.coursework).map(([group, tags]) => (
            <div key={group}>
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-200">{group}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
