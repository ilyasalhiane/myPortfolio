import Link from "next/link";
import { notFound } from "next/navigation";
import { highlights } from "@/data/profile";

const caseStudies: Record<string, { overview: string; architecture: string[]; outcomes: string[] }> = {
  "cloud-native-microservices-platform": {
    overview:
      "This work focused on shaping service boundaries around business capabilities while keeping deployment, debugging, and iteration practical for a fast-moving product team.",
    architecture: [
      "Node/Express services separated by domain responsibility",
      "Containerized workloads for reproducible local and staging environments",
      "Kubernetes-oriented deployment strategy for scaling and resilience"
    ],
    outcomes: [
      "Cleaner ownership model for backend features",
      "Improved deployment consistency",
      "Better maintainability as service surface area expanded"
    ]
  },
  "ai-assisted-matching-integration": {
    overview:
      "The integration goal was to introduce AI-assisted decision support without disrupting the existing user journey.",
    architecture: [
      "Service endpoint integration for matching outputs",
      "Validation and fallback paths for uncertain model outcomes",
      "UI flow alignment so recommendations remained understandable"
    ],
    outcomes: [
      "Lower manual matching effort",
      "Higher workflow clarity for internal users",
      "Stronger foundation for future model iteration"
    ]
  },
  "data-visualization-frontend": {
    overview:
      "The frontend effort prioritized dense data readability, reusable UI patterns, and responsiveness under real operational usage.",
    architecture: [
      "React component architecture with reusable visualization building blocks",
      "Tailwind-driven design system for consistency",
      "Information hierarchy optimized for quick scan and action"
    ],
    outcomes: [
      "Improved UX for dashboard consumers",
      "Faster comprehension of key metrics",
      "More maintainable frontend structure"
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const highlight = highlights.find((item) => item.slug === params.slug);
  const details = caseStudies[params.slug];

  if (!highlight || !details) {
    notFound();
  }

  const project = highlight;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-10">
      <Link href="/#highlights" className="text-sm text-cyan-200">← Back to highlights</Link>
      <h1 className="mt-5 text-3xl font-semibold text-white">{project.title}</h1>
      <p className="mt-2 text-sm text-cyan-200">{project.company}</p>

      <section className="glass mt-8 space-y-5 rounded-2xl p-6 text-sm text-slate-200">
        <p>{details.overview}</p>

        <div>
          <h2 className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-200">Architecture choices</h2>
          <ul className="space-y-2">
            {details.architecture.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-200">Outcomes</h2>
          <ul className="space-y-2">
            {details.outcomes.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
