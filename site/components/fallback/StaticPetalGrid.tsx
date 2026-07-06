import { BranchCard } from "@/components/ui/BranchCard";
import { Reveal } from "@/components/ui/Reveal";
import { BRANCHES } from "@/lib/branches";
import type { Branch } from "@/lib/tokens";

/**
 * The always-available DOM path to the four branches (build spec §4.4):
 * reduced-motion fallback (animated=false), CSS-tier landing grid, and the
 * post-reveal grid the 3D hero hands off to.
 *
 * Deliberately asymmetric (taste checklist §1B: no forced equal card grids).
 * Tech & Innovation carries the most weight — it is the only branch with its
 * own sub-hub — so it gets the widest cell; DOM order stays the canonical
 * branch order and the grid collapses to one clean column on mobile.
 */
const SPANS: Record<Branch, string> = {
  construction: "lg:col-span-3",
  communication: "lg:col-span-3",
  tech: "lg:col-span-4",
  healthcare: "lg:col-span-2",
};

export function StaticPetalGrid({ animated = true }: { animated?: boolean }) {
  return (
    <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-6">
      {BRANCHES.map((b, i) =>
        animated ? (
          <Reveal key={b.branch} delay={i * 0.08} className={SPANS[b.branch]}>
            <BranchCard {...b} featured={b.branch === "tech"} />
          </Reveal>
        ) : (
          <div key={b.branch} className={SPANS[b.branch]}>
            <BranchCard {...b} featured={b.branch === "tech"} />
          </div>
        ),
      )}
    </div>
  );
}
