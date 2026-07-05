import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Intelligence Gradient as a restrained emerald glow — white text stays
          on the navy field per design.md §2.5 (never white on emerald). */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 bg-gradient-intelligence"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 py-32 text-center lg:px-16">
        <Reveal>
          <h2 className="text-h2 text-white">Let&apos;s build what&apos;s next.</h2>
          <p className="text-body-lg mx-auto mt-4 max-w-xl text-white/85">
            Tell us what you need captured, built, or transformed.
          </p>
          <div className="mt-8">
            <Button href={`mailto:${CONTACT_EMAIL}`} variant="inverse">
              Talk to us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
