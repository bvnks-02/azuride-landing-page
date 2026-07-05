import type { Branch } from "@/lib/tokens";

/**
 * Single copy source for the four branches — hero petals, branch cards,
 * fallback grids, and hover teasers all read from here.
 *
 * NOTE: copy drafted from design.md (azurid-company-profile.md was absent
 * at build time). Reconcile before deploy — see docs/OPEN-ITEMS.md.
 */
export type BranchInfo = {
  branch: Branch;
  title: string;
  teaser: string;
  href: string;
};

export const BRANCHES: readonly BranchInfo[] = [
  {
    branch: "construction",
    title: "Construction & Inspection",
    teaser:
      "Drone LiDAR, photogrammetry, and digital twins that let you inspect infrastructure from anywhere.",
    href: "/construction-inspection",
  },
  {
    branch: "communication",
    title: "Corporate Communication & Visual Production",
    teaser:
      "Film, broadcast, and event coverage that tells your story with precision.",
    href: "/corporate-communication",
  },
  {
    branch: "tech",
    title: "Tech & Innovation",
    teaser:
      "Web platforms, AI engineering, ERP and CRM systems built to run your business.",
    href: "/tech-innovation",
  },
  {
    branch: "healthcare",
    title: "Healthcare",
    teaser:
      "Surgical broadcast and digital transformation for modern medicine.",
    href: "/healthcare",
  },
];
