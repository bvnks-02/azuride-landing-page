import { notFound } from "next/navigation";
import { BranchPageShell } from "@/components/ui/BranchPageShell";
import { TECH_SUBPAGES } from "@/lib/techSubpages";

/** Shared body for the four Tech & Innovation sub-pages. */
export function TechSubpageShell({ slug }: { slug: string }) {
  const sub = TECH_SUBPAGES.find((s) => s.slug === slug);
  if (!sub) notFound();
  return (
    <BranchPageShell
      branch="tech"
      eyebrow="Tech & Innovation"
      title={sub.title}
      intro={sub.intro}
      services={sub.services}
    />
  );
}
