import Image from "next/image";
import { SITE_MOTTO, SITE_NAME } from "@/lib/site";

/**
 * Hero shell. `heroSlot` receives the Convergence Reveal (3D canvas or
 * tiered fallback); until it mounts, the static poster of the mark at rest
 * shows so first paint never waits on WebGL (build spec §4.3).
 */
export function HeroSection({ heroSlot }: { heroSlot?: React.ReactNode }) {
  return (
    <section
      id="hero"
      className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1200px] flex-col items-center justify-center bg-white px-6 py-16 text-center lg:px-16"
    >
      <div className="relative flex h-[44vh] min-h-[280px] w-full items-center justify-center">
        {heroSlot ?? (
          <Image
            src="/logo-mark.png"
            alt={`${SITE_NAME} mark at rest — a gradient ring holding four white petals around a glowing emerald core`}
            width={320}
            height={320}
            priority
            className="h-full w-auto object-contain"
          />
        )}
      </div>
      <h1 className="text-h1 mt-10 max-w-4xl text-ink">{SITE_MOTTO}</h1>
      <p className="text-body-lg mt-6 max-w-2xl text-slate">
        {SITE_NAME} is one technology ecosystem with four branches — reality
        capture, visual production, software engineering, and healthcare
        innovation — built around a single core.
      </p>
    </section>
  );
}
