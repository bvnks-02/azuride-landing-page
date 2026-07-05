import type { Metadata } from "next";
import { TechSubpageShell } from "@/components/tech/TechSubpageShell";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Web Development — ${SITE_NAME}`,
  description: "Landing pages, corporate websites, and e-commerce platforms.",
};

export default function WebDevelopmentPage() {
  return <TechSubpageShell slug="web-development" />;
}
