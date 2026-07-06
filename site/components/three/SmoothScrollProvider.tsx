"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

/**
 * Layout-level smooth-scroll provider (build spec §9 polish). ScrollSmoother
 * wraps page content in a fixed-position container and proxies native scroll,
 * which smooths trackpad stutter and momentum inconsistency — important because
 * the hero is scroll-scrubbed and any native jank undercuts the signature moment.
 *
 * The existing ScrollTrigger pin/scrub in ScrollDriver.tsx auto-detects
 * ScrollSmoother and proxies through it — no change needed there.
 *
 * NavBar and Footer stay outside the smoother wrapper (NavBar is sticky;
 * Footer is fine outside). Guarded by prefers-reduced-motion: reduced-motion
 * users get native scroll with no smoothing.
 */
export function SmoothScrollProvider() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return null;
}