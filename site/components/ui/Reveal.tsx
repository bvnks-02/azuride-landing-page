"use client";

import { motion } from "motion/react";
import { revealTransition, revealViewport, revealVariants } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={revealVariants}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
