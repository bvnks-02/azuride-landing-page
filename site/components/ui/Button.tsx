"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { DURATION, EASE_OUT } from "@/lib/tokens";

const MotionLink = motion.create(Link);

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  /**
   * primary = Harbor fill + white text (nav/global CTA); accent = branch
   * accent fill; inverse = white fill + navy text, for dark gradient panels.
   */
  variant?: "primary" | "accent" | "inverse";
  className?: string;
};

const base =
  "inline-flex items-center gap-2 rounded-pill px-6 py-3 text-sm font-medium " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

const variants = {
  primary: "bg-harbor text-white",
  accent: "bg-accent text-accent-contrast",
  inverse: "bg-white text-navy",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <MotionLink
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02, transition: { duration: DURATION.hover, ease: EASE_OUT } }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </MotionLink>
  );
}
