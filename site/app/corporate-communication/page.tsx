import type { Metadata } from "next";
import { BranchPageShell } from "@/components/ui/BranchPageShell";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Corporate Communication & Visual Production — ${SITE_NAME}`,
  description:
    "Film, broadcast, and event coverage that tells your story with precision.",
};

export default function CorporateCommunicationPage() {
  return (
    <BranchPageShell
      branch="communication"
      eyebrow="Corporate Communication & Visual Production"
      title="Every project tells a story. We film it."
      intro="From corporate film to live broadcast, we produce the visual record of your work — planned, shot, and delivered with precision."
      services={[
        "Corporate film & brand video",
        "Event coverage",
        "Live broadcast",
        "Photography",
        "Content strategy",
      ]}
    />
  );
}
