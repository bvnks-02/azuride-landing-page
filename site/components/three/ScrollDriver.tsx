"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollStore } from "./scrollStore";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins the hero and scrubs scroll into the shared progress store
 * (build spec §4.2). Mounted only on the full3d tier — the CSS tier uses
 * Motion's useScroll and the static tier has no scroll behavior at all.
 */
export function ScrollDriver({ targetId }: { targetId: string }) {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = document.getElementById(targetId);
    if (!target) return;

    const setProgress = useScrollStore.getState().setProgress;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: target,
        start: "top 64px", // pin just below the sticky nav
        end: "+=150%",
        pin: true,
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
      });
    });

    return () => {
      ctx.revert();
      setProgress(0);
    };
  }, [targetId]);

  return null;
}
