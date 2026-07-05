"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
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
    alt={`${SITE_NAME} mark at rest — a gradient ring holding four white petals around a glowing emerald core`}
    width={320}
    height={320}
    priority
    className="h-full w-auto object-contain"
  />
);

/**
 * Tier switch for the Convergence Reveal (build spec §4.4):
 *   full3d — R3F canvas, scroll-scrubbed
 *   css    — DOM/Motion petal fallback (no WebGL)
 *   static — poster + plain 2×2 grid (reduced motion / SSR first paint)
 * All tiers land on the same four branch cards below the hero.
 */
export function ConvergenceHero() {
  const [tier, setTier] = useState<RenderTier>("static");
  const [ready, setReady] = useState(false);
  const hovered = useScrollStore((s) => s.hovered);
  const teaserPos = useScrollStore((s) => s.teaserPos);

  useEffect(() => {
    setTier(detectRenderTier());
    setReady(true);
  }, []);

  const handleDegrade = useCallback(() => setTier("css"), []);

  if (!ready || tier === "static") {
    return <div className="flex h-full items-center justify-center">{POSTER}</div>;
  }

  if (tier === "css") {
    return <PetalGridCss />;
  }

  const teaser = hovered ? BRANCHES.find((b) => b.branch === hovered) : null;
  const enableBloom = (navigator.hardwareConcurrency ?? 4) >= 6;

  return (
    <div className="relative h-full w-full" data-convergence-canvas>
      <ScrollDriver targetId="hero" />
      <div className="absolute inset-0" aria-hidden>
        <ConvergenceCanvas onDegrade={handleDegrade} enableBloom={enableBloom} />
      </div>
      {teaser && teaserPos && (
        <div
          data-branch={teaser.branch}
          className="pointer-events-none absolute z-10 max-w-xs -translate-x-1/2 rounded-card border border-hairline bg-white/95 px-4 py-3 text-left shadow-lg"
          style={{ left: teaserPos.x, top: Math.max(teaserPos.y - 64, 0) }}
          role="status"
        >
          <p className="text-eyebrow text-accent">{teaser.title}</p>
          <p className="mt-1 text-sm text-slate">{teaser.teaser}</p>
        </div>
      )}
    </div>
  );
}
