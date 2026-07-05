/**
 * Render-tier heuristics for the Convergence Reveal hero (build spec §4.4).
 * No user-agent sniffing — capability signals only.
 */
export type RenderTier = "full3d" | "css" | "static";

export type TierInput = {
  reducedMotion: boolean;
  viewportWidth: number;
  webglOk: boolean;
  hardwareConcurrency: number;
};

export function getRenderTier(input: TierInput): RenderTier {
  if (input.reducedMotion) return "static";
  if (
    input.viewportWidth < 768 ||
    !input.webglOk ||
    input.hardwareConcurrency < 4
  ) {
    return "css";
  }
  return "full3d";
}

function probeWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return canvas.getContext("webgl2") !== null || canvas.getContext("webgl") !== null;
  } catch {
    return false;
  }
}

/** Browser-side detection. SSR always returns "static" (poster renders first). */
export function detectRenderTier(): RenderTier {
  if (typeof window === "undefined") return "static";
  return getRenderTier({
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    viewportWidth: window.innerWidth,
    webglOk: probeWebgl(),
    hardwareConcurrency: navigator.hardwareConcurrency ?? 4,
  });
}
