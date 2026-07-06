/**
 * Tailwind v4 has no `tailwind.config` in this project (AGENTS.md), so the
 * standard shadcn `cn` helper (which depends on `tailwind-merge`) is kept
 * minimal here. `clsx` handles conditional class merging; `twMerge` is
 * omitted to avoid pulling a dependency the brand-token-locked palette
 * doesn't need (no conflicting utility classes to resolve).
 */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}