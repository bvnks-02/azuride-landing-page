import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function TwinUpSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-capture">
      {/* Navy scrim keeps white text AA-safe over the cerulean end of the gradient */}
      <div aria-hidden className="absolute inset-0 bg-navy/50" />
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 lg:px-16">
        <Reveal>
          <p className="text-eyebrow text-white/70">Flagship platform</p>
          <h2 className="text-h2 mt-4 text-white">Twin Up</h2>
          <p className="text-body-lg mt-4 max-w-xl text-white/85">
            Our digital-twin platform, under active certification. Capture a
            site once. Inspect it forever.
          </p>
          <div className="mt-8">
            <Button href="/construction-inspection" variant="inverse">
              Explore Construction &amp; Inspection
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
