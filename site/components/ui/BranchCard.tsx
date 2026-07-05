"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ScanLine, Clapperboard, Cpu, HeartPulse, ArrowRight } from "lucide-react";
import type { BranchInfo } from "@/lib/branches";
import type { Branch } from "@/lib/tokens";
import { DURATION, EASE_OUT } from "@/lib/tokens";

const ICONS: Record<Branch, typeof ScanLine> = {
  construction: ScanLine,
  communication: Clapperboard,
  tech: Cpu,
  healthcare: HeartPulse,
};

export function BranchCard({ branch, title, teaser, href }: BranchInfo) {
  const Icon = ICONS[branch];
  return (
    <motion.div
      data-branch={branch}
      className="rounded-card border border-hairline bg-white p-6 md:p-8"
      whileHover={{
        y: -4,
        boxShadow: "0 12px 32px rgba(10, 30, 43, 0.10)",
        transition: { duration: DURATION.hover, ease: EASE_OUT },
      }}
    >
      <Icon aria-hidden strokeWidth={1.5} className="size-8 text-accent" />
      <h3 className="text-h3 mt-4 text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate">{teaser}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all duration-[250ms] hover:gap-2.5"
      >
        Explore <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
        <span className="sr-only">{title}</span>
      </Link>
    </motion.div>
  );
}
