"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ScanLine, Clapperboard, Cpu, HeartPulse, ArrowRight } from "lucide-react";
import type { BranchInfo } from "@/lib/branches";
import type { Branch } from "@/lib/tokens";
import { DURATION, EASE_OUT } from "@/lib/tokens";
import { TECH_SUBPAGES } from "@/lib/techSubpages";

const ICONS: Record<Branch, typeof ScanLine> = {
  construction: ScanLine,
  communication: Clapperboard,
  tech: Cpu,
  healthcare: HeartPulse,
};

export function BranchCard({
  branch,
  title,
  teaser,
  href,
  featured = false,
}: BranchInfo & { featured?: boolean }) {
  const Icon = ICONS[branch];

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    rotateY.set(percentX * 6);
    rotateX.set(-percentY * 6);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      data-branch={branch}
      className="h-full rounded-card border border-hairline bg-white p-6 md:p-8"
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 32px rgba(10, 30, 43, 0.10)",
        transition: { duration: DURATION.hover, ease: EASE_OUT },
      }}
    >
      <Icon aria-hidden strokeWidth={1.5} className="size-8 text-accent" />
      <h3 className="text-h3 mt-4 text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate">{teaser}</p>
      {featured && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {TECH_SUBPAGES.map((s) => (
            <li
              key={s.slug}
              className="rounded-full border border-hairline bg-surface-alt px-3 py-1 text-xs text-slate"
            >
              {s.title}
            </li>
          ))}
        </ul>
      )}
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-all duration-[250ms] hover:gap-2.5"
      >
        Explore{" "}
        <ArrowRight aria-hidden className="size-4 text-accent" strokeWidth={1.5} />
        <span className="sr-only">{title}</span>
      </Link>
    </motion.div>
  );
}
