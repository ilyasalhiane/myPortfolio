import { Certifications } from "@/components/Certifications";
import { Hero } from "@/components/Hero";
import { TerminalGame } from "@/components/TerminalGame";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />

      <section id="about" className="px-6 py-14 md:px-10 lg:px-16">
        <div className="glass mx-auto max-w-6xl rounded-3xl p-8">
          <h2 className="cyber-line mb-4 w-max text-2xl font-semibold text-white">About</h2>
          <p className="max-w-4xl text-slate-300">
            I design and build robust, scalable, and visually immersive software experiences. My work
            bridges modern product engineering with systems thinking to deliver performant applications
            across frontend, backend, DevOps, and cloud-native environments.
          </p>
        </div>
      </section>

      <TerminalGame />
      <Certifications />
    </main>
  );
}
