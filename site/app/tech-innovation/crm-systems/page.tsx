import type { Metadata } from "next";
import { TechSubpageShell } from "@/components/tech/TechSubpageShell";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `CRM Systems — ${SITE_NAME}`,
  description: "Customer relationship management platforms.",
};

export default function CrmSystemsPage() {
  return <TechSubpageShell slug="crm-systems" />;
}
