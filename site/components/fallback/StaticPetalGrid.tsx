import { BranchCard } from "@/components/ui/BranchCard";
import { Reveal } from "@/components/ui/Reveal";
import { BRANCHES } from "@/lib/branches";

/**
 * The always-available DOM path to the four branches (build spec §4.4):
 * reduced-motion fallback (animated=false), CSS-tier landing grid, and the
 * post-reveal grid the 3D hero hands off to.
 */
export function StaticPetalGrid({ animated = true }: { animated?: boolean }) {
  return (
    <div className="grid items-start gap-6 sm:grid-cols-2">
      {BRANCHES.map((b, i) =>
        animated ? (
          <Reveal key={b.branch} delay={i * 0.08}>
            <BranchCard {...b} />
          </Reveal>
        ) : (
          <BranchCard key={b.branch} {...b} />
        ),
      )}
    </div>
  );
}
