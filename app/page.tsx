import InteractiveHeroBento from '@/components/InteractiveHeroBento';
import InteractiveProjectShowcase from '@/components/InteractiveProjectShowcase';
import TechStackMatrix from '@/components/TechStackMatrix';
import JourneyTimeline from '@/components/JourneyTimeline';
import InteractivePhilosophyBento from '@/components/InteractivePhilosophyBento';
import ContactSection from '@/components/ContactSection';
import RevealSection from '@/components/RevealSection';

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
      <div className="space-y-1.5">
        <p className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-widest">{eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">{title}</h2>
      </div>
      <p className="text-xs text-zinc-400 max-w-sm leading-relaxed sm:text-right font-mono">{subtitle}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-20 sm:space-y-28">

      {/* Hero */}
      <section className="pt-2 sm:pt-4">
        <InteractiveHeroBento />
      </section>

      <div className="section-divider" />

      {/* Projects */}
      <RevealSection>
        <section id="projects" className="space-y-8 scroll-mt-20">
          <SectionHeader
            eyebrow="Systems Architecture"
            title="Production Projects"
            subtitle="Explore real systems, database internals, compilers, and AI platforms."
          />
          <InteractiveProjectShowcase />
        </section>
      </RevealSection>

      <div className="section-divider" />

      {/* Stack */}
      <RevealSection>
        <section id="skills" className="space-y-8 scroll-mt-20">
          <SectionHeader
            eyebrow="Technical Capabilities"
            title="Tech Stack & Tooling"
            subtitle="Mastered from first principles through real systems."
          />
          <TechStackMatrix />
        </section>
      </RevealSection>

      <div className="section-divider" />

      {/* Journey */}
      <RevealSection>
        <section id="journey" className="space-y-8 scroll-mt-20">
          <SectionHeader
            eyebrow="The Narrative"
            title="Self-Taught Trajectory"
            subtitle="How I engineered low-level systems, databases, and AI."
          />
          <JourneyTimeline />
        </section>
      </RevealSection>

      <div className="section-divider" />

      {/* Philosophy */}
      <RevealSection>
        <section id="philosophy" className="space-y-8 scroll-mt-20">
          <SectionHeader
            eyebrow="Engineering Values"
            title="Design Philosophy"
            subtitle="The trade-offs, contracts, and invariants behind every system."
          />
          <InteractivePhilosophyBento />
        </section>
      </RevealSection>

      <div className="section-divider" />

      {/* Contact */}
      <RevealSection>
        <section id="contact" className="scroll-mt-20">
          <ContactSection />
        </section>
      </RevealSection>

    </div>
  );
}
