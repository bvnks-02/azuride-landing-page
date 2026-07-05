"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { TECH_SUBPAGES } from "@/lib/techSubpages";
import { revealTransition, revealViewport, revealVariants } from "@/lib/motion";

/**
 * The homepage reveal pattern one level down (design.md §7), as pure
 * DOM/Motion — no second 3D scene (build spec §4.3). A 2×2 card grid with
 * the shared hub mark in the center that pulses subtly once on load.
 */
export function SubGrid() {
  return (
    <div className="relative">
      <div className="grid items-start gap-6 sm:grid-cols-2 sm:gap-y-24">
        {TECH_SUBPAGES.map((sub, i) => (
          <motion.div
            key={sub.slug}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={revealVariants}
            transition={{ ...revealTransition, delay: i * 0.08 }}
            className="rounded-card border border-hairline bg-white p-6 md:p-8"
          >
            <h3 className="text-h3 text-ink">{sub.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{sub.teaser}</p>
            <Link
              href={`/tech-innovation/${sub.slug}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all duration-[250ms] hover:gap-2.5"
            >
              Explore <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
              <span className="sr-only">{sub.title}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Central hub mark — desktop 2×2 only; pulses once on entry */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-pill border border-hairline bg-white p-3 shadow-sm sm:block"
        initial={{ scale: 1, opacity: 0 }}
        whileInView={{ scale: [1, 1.06, 1], opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <Image src="/logo-mark.png" alt="" width={48} height={48} />
      </motion.div>
    </div>
  );
}
