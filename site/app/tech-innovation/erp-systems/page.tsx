import type { Metadata } from "next";
import { TechSubpageShell } from "@/components/tech/TechSubpageShell";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `ERP Systems | ${SITE_NAME}`,
  description: "Enterprise resource planning platforms.",
};

export default function ErpSystemsPage() {
  return <TechSubpageShell slug="erp-systems" />;
}
