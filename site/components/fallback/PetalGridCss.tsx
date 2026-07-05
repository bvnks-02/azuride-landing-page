"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { BRANCHES } from "@/lib/branches";
import { BRANCH_ACCENT } from "@/lib/tokens";

/**
 * CSS/SVG tier of the Convergence Reveal (build spec §4.4): the same
 * mark and unfold idea as the 3D scene, driven by Motion useScroll —
 * no WebGL. Lands on the identical branch cards below the hero.
 * Petals are tappable links (mobile has no hover).
 */

const SIZE = 400;
const C = SIZE / 2;
// Vesica petal pointing up from the center, same silhouette as the 3D petal
const PETAL_PATH = "M0 -8 Q 52 -55 0 -148 Q -52 -55 0 -8 Z";

function Petal({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const branch = BRANCHES[index];
  const angle = index * 90;
  // outward = -y in the petal's own (rotated) coordinate system
  const y = useTransform(progress, [0, 0.6], [0, -64]);
  const fill = useTransform(
    progress,
    [0.25, 0.7],
    ["#F5F8FA", BRANCH_ACCENT[branch.branch]],
  );

  return (
    // static placement lives on the <g>; Motion's CSS transform would
    // otherwise override the SVG transform attribute on the same node
    <g transform={`translate(${C} ${C}) rotate(${angle})`}>
      <Link href={branch.href} aria-label={branch.title}>
        <motion.path
          d={PETAL_PATH}
          style={{ fill, y }}
          stroke="var(--color-hairline)"
          strokeWidth={1}
        />
      </Link>
    </g>
  );
}

export function PetalGridCss() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div ref={ref} className="flex h-full w-full items-center justify-center">
      {/* No role="img" — the four petal links inside must stay exposed to AT */}
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-auto overflow-visible">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-cerulean)" />
            <stop offset="100%" stopColor="var(--color-navy)" />
          </linearGradient>
          <radialGradient id="coreGrad">
            <stop offset="0%" stopColor="var(--color-emerald)" />
            <stop offset="85%" stopColor="var(--color-navy)" />
          </radialGradient>
        </defs>
        <circle cx={C} cy={C} r={160} fill="none" stroke="url(#ringGrad)" strokeWidth={26} />
        {BRANCHES.map((b, i) => (
          <Petal key={b.branch} index={i} progress={scrollYProgress} />
        ))}
        <rect
          x={C - 62}
          y={C - 62}
          width={124}
          height={124}
          rx={10}
          transform={`rotate(45 ${C} ${C})`}
          fill="url(#coreGrad)"
        />
      </svg>
    </div>
  );
}
