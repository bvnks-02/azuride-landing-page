import type { Metadata } from "next";
import { TechSubpageShell } from "@/components/tech/TechSubpageShell";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `AI Engineering — ${SITE_NAME}`,
  description: "Chatbots, virtual assistants, and AI-powered dashboards.",
};

export default function AiEngineeringPage() {
  return <TechSubpageShell slug="ai-engineering" />;
}
