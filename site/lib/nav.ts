import type { Branch } from "@/lib/tokens";

export const NAV_LINKS: readonly {
  label: string;
  href: string;
  branch: Branch;
}[] = [
  { label: "Construction & Inspection", href: "/construction-inspection", branch: "construction" },
  { label: "Communication", href: "/corporate-communication", branch: "communication" },
  { label: "Tech & Innovation", href: "/tech-innovation", branch: "tech" },
  { label: "Healthcare", href: "/healthcare", branch: "healthcare" },
];
