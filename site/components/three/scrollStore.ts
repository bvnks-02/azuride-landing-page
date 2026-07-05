import { create } from "zustand";
import type { Branch } from "@/lib/tokens";

/**
 * Shared state between the GSAP ScrollTrigger (DOM side) and the R3F scene
 * (build spec §4.2) — no prop drilling through the Canvas.
 */
type ScrollState = {
  /** Normalized scroll progress of the pinned hero, 0–1. */
  progress: number;
  setProgress: (p: number) => void;
  /** Petal currently hovered at rest state, if any. */
  hovered: Branch | null;
  setHovered: (b: Branch | null) => void;
  /** Screen-space position (px, canvas-relative) of the hovered petal. */
  teaserPos: { x: number; y: number } | null;
  setTeaserPos: (pos: { x: number; y: number } | null) => void;
};

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
  hovered: null,
  setHovered: (hovered) => set({ hovered }),
  teaserPos: null,
  setTeaserPos: (teaserPos) => set({ teaserPos }),
}));
