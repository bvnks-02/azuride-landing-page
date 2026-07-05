import type { Metadata } from "next";
import { BranchPageShell } from "@/components/ui/BranchPageShell";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Construction & Inspection — ${SITE_NAME}`,
  description:
    "Drone LiDAR, photogrammetry, and digital twins that let you inspect infrastructure from anywhere.",
};

export default function ConstructionInspectionPage() {
  return (
    <BranchPageShell
      branch="construction"
      eyebrow="Construction & Inspection"
      title="Infrastructure you can inspect from anywhere."
      intro="Every building contains data. We capture it — with drone LiDAR, photogrammetry, and digital twin modeling — so you can document progress, inspect remotely, and decide with confidence."
      services={[
        "Drone LiDAR capture",
        "Photogrammetry & point-cloud processing",
        "Digital twin modeling",
        "Remote infrastructure inspection",
        "Progress documentation",
      ]}
    />
  );
}
