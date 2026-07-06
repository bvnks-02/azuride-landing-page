import type { Metadata } from "next";
import { BranchPageShell } from "@/components/ui/BranchPageShell";
import { SubGrid } from "@/components/tech/SubGrid";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Tech & Innovation | ${SITE_NAME}`,
  description:
    "Web platforms, AI engineering, ERP and CRM systems built to run your business.",
};

export default function TechInnovationPage() {
  return (
    <BranchPageShell
      branch="tech"
      eyebrow="Tech & Innovation"
      title="Software built to run your business."
      intro="Four practices, one engineering culture: web platforms, AI systems, and the ERP and CRM backbones that keep your operations moving."
    >
      <section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-16">
        <SubGrid />
      </section>
    </BranchPageShell>
  );
}
