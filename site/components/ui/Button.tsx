"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
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
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const maxOffset = 6;
    x.set(Math.max(-maxOffset, Math.min(maxOffset, distX * 0.15)));
    y.set(Math.max(-maxOffset, Math.min(maxOffset, distY * 0.15)));
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionLink
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={{ scale: 1.02, transition: { duration: DURATION.hover, ease: EASE_OUT } }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </MotionLink>
  );
}
