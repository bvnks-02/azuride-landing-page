/**
 * Typed mirror of the CSS design tokens (app/globals.css) for use in JS —
 * shader uniforms, Motion color lerps. Keep in sync with design.md §2.
 */
export const TOKENS = {
  emerald: "#14B88B",
  cerulean: "#008FC3",
  harbor: "#0075A1",
  navy: "#004869",
  ink: "#0A1E2B",
  slate: "#5B6B75",
} as const;

export type Branch = "construction" | "communication" | "tech" | "healthcare";

export const BRANCH_ACCENT: Record<Branch, string> = {
  construction: TOKENS.navy,
  communication: TOKENS.harbor,
  tech: TOKENS.cerulean,
  healthcare: TOKENS.emerald,
};

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const DURATION = { hover: 0.25, reveal: 0.6 } as const;
