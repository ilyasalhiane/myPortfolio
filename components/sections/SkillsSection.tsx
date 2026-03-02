import { skillGroups, stackCloud } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const levelClass = {
  Core: "text-emerald-300",
  Strong: "text-cyan-300",
  Familiar: "text-amber-300"
};

export function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Capability" title="Skills">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <Card key={group.category} className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">{group.category}</h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-center justify-between text-sm text-slate-100">
                  <span>{item.name}</span>
                  <span className={levelClass[item.level]}>{item.level}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Stack Cloud</h3>
        <div className="flex flex-wrap gap-2 text-xs text-slate-200">
          {stackCloud.map((item) => (
            <span key={item} className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1">
              {item}
            </span>
          ))}
        </div>
      </Card>
    </Section>
  );
}
