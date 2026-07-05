import type { Metadata } from "next";
import { BranchPageShell } from "@/components/ui/BranchPageShell";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Healthcare — ${SITE_NAME}`,
  description:
    "Surgical broadcast and digital transformation for modern medicine.",
};

export default function HealthcarePage() {
  return (
    <BranchPageShell
      branch="healthcare"
      eyebrow="Healthcare"
      title="Digital transformation for modern medicine."
      intro="We bring capture and intelligence into the operating room and the clinic — surgical broadcast, training content, and the data platforms behind them."
      services={[
        "Surgical broadcast & OR integration",
        "Medical training content",
        "Digital transformation for clinics",
        "Health-data dashboards",
      ]}
    />
  );
}
