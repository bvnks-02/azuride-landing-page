import { DURATION, EASE_OUT } from "@/lib/tokens";

export const revealTransition = { duration: DURATION.reveal, ease: EASE_OUT };

export const revealViewport = { once: true, margin: "-100px" } as const;

export const revealVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};
