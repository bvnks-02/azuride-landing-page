import { HeroSection } from "@/components/home/HeroSection";
import { ConvergenceHero } from "@/components/three/ConvergenceHero";
import { TwinUpSection } from "@/components/home/TwinUpSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { StaticPetalGrid } from "@/components/fallback/StaticPetalGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SharpAccent } from "@/components/ui/SharpAccent";

export default function Home() {
  return (
    <>
      <HeroSection heroSlot={<ConvergenceHero />} />

      <section className="border-y border-hairline">
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-16">
          <Reveal>
            <p className="flex items-center gap-3 text-eyebrow text-slate">
              <SharpAccent /> Vision
            </p>
            <p className="text-h3 mt-4 max-w-2xl text-ink">
              Every project tells a story. Every building contains data.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="branch-grid" aria-label="Our four branches">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-16">
          <Reveal>
            <p className="flex items-center gap-3 text-eyebrow text-slate">
              <SharpAccent /> Four branches
            </p>
            <h2 className="text-h2 mt-4 text-ink">One core, four branches.</h2>
          </Reveal>
          <div className="mt-12">
            <StaticPetalGrid animated />
          </div>
        </div>
      </section>

      <TwinUpSection />
      <IndustriesSection />
      <ClosingCta />
    </>
  );
}
