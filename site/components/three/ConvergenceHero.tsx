"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { detectRenderTier, type RenderTier } from "@/lib/device";
import { BRANCHES } from "@/lib/branches";
import { SITE_NAME } from "@/lib/site";
import { PetalGridCss } from "@/components/fallback/PetalGridCss";
import { useScrollStore } from "./scrollStore";
import { ScrollDriver } from "./ScrollDriver";

const ConvergenceCanvas = dynamic(() => import("./ConvergenceCanvas"), {
  ssr: false,
});

const POSTER = (
  <Image
    src="/logo-mark.png"
    alt={`${SITE_NAME} mark at rest: a gradient ring holding four white petals around a glowing emerald core`}
    width={320}
    height={320}
    priority
    className="h-full w-auto object-contain"
  />
);

// One-shot client capability read via useSyncExternalStore: the server
// snapshot is "static" (poster first paint), the client snapshot is detected
// once and cached. Capabilities never change mid-session, so subscribe is a
// no-op; the FPS-probe degrade path is separate state below.
let detectedTier: RenderTier | null = null;
const subscribeNoop = () => () => {};
const getClientTier = () => (detectedTier ??= detectRenderTier());
const getServerTier = (): RenderTier => "static";

/**
 * Tier switch for the Convergence Reveal (build spec §4.4):
 *   full3d — R3F canvas, scroll-scrubbed
 *   css    — DOM/Motion petal fallback (no WebGL)
 *   static — poster + plain 2×2 grid (reduced motion / SSR first paint)
 * All tiers land on the same four branch cards below the hero.
 */
export function ConvergenceHero() {
  const detected = useSyncExternalStore(subscribeNoop, getClientTier, getServerTier);
  const [degraded, setDegraded] = useState(false);
  const tier: RenderTier = degraded && detected === "full3d" ? "css" : detected;
  const hovered = useScrollStore((s) => s.hovered);
  const teaserPos = useScrollStore((s) => s.teaserPos);
  const router = useRouter();

  const handleDegrade = useCallback(() => setDegraded(true), []);
  const navigate = useCallback((href: string) => router.push(href), [router]);

  if (tier === "static") {
    return <div className="flex h-full items-center justify-center">{POSTER}</div>;
  }

  if (tier === "css") {
    return <PetalGridCss />;
  }

  const teaser = hovered ? BRANCHES.find((b) => b.branch === hovered) : null;

  return (
    <div className="relative h-full w-full" data-convergence-canvas>
      <ScrollDriver targetId="hero" />
      <div className="absolute inset-0" aria-hidden>
        <ConvergenceCanvas onDegrade={handleDegrade} navigate={navigate} />
      </div>
      {teaser && teaserPos && (
        <div
          data-branch={teaser.branch}
          className="pointer-events-none absolute z-10 max-w-xs -translate-x-1/2 rounded-card border border-hairline bg-white/95 px-4 py-3 text-left shadow-lg"
          style={{ left: teaserPos.x, top: Math.max(teaserPos.y - 64, 0) }}
          role="status"
        >
          <p className="flex items-center gap-2 text-eyebrow text-ink">
            <span aria-hidden className="inline-block size-2 rotate-45 bg-accent" />
            {teaser.title}
          </p>
          <p className="mt-1 text-sm text-slate">{teaser.teaser}</p>
        </div>
      )}
    </div>
  );
}
