"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "motion/react";
import { SITE_MOTTO, SITE_NAME } from "@/lib/site";
import { DURATION, EASE_OUT } from "@/lib/tokens";

// Lazy-load the R3F background (ssr:false — WebGL is client-only).
const HeroBackground = dynamic(() => import("@/components/three/HeroBackground"), {
  ssr: false,
});

const words = SITE_MOTTO.split(" ");

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE_OUT },
  },
};

/**
 * Hero — the AZURID full lockup (mark + wordmark) centered over a
 * "reality being scanned into data" background: CSS radial glow +
 * R3F point-cloud field + low-poly wireframe fragment. The logo
 * sits in normal flex flow (centered); the background is absolute
 * behind it. Reduced-motion skips the R3F scene, CSS glow remains.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1200px] flex-col items-center justify-center overflow-hidden bg-white px-6 py-16 text-center lg:px-16"
    >
      {/* Background layer — absolute, out of flex flow */}
      <HeroBackground />

      {/* Grain overlay — pure SVG, zero JS, reads as premium texture */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ opacity: 0.04, mixBlendMode: "overlay" }}
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Logo + headline — one cohesive hero block, centered as a unit */}
      <div className="relative z-[2] flex flex-col items-center justify-center gap-8 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.reveal, ease: EASE_OUT }}
        >
          <Image
            src="/logo-full.png"
            alt={`${SITE_NAME} — Capturing Reality. Building Digital Intelligence.`}
            width={800}
            height={952}
            priority
            className="h-auto max-h-[42vh] w-auto max-w-[260px] object-contain md:max-w-[300px]"
            style={{
              filter:
                "drop-shadow(0 0 24px rgba(20, 184, 139, 0.35)) drop-shadow(0 0 48px rgba(0, 143, 195, 0.2))",
            }}
          />
        </motion.div>

        <motion.h1
          className="text-h1 max-w-4xl text-ink"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className={`inline-block${i < words.length - 1 ? " mr-[0.25em]" : ""}`}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <p className="text-body-lg max-w-2xl text-slate">
          One ecosystem: reality capture, visual production, software
          engineering, healthcare innovation.
        </p>
      </div>
    </section>
  );
}