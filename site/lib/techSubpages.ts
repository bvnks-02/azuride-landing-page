/**
 * Tech & Innovation sub-pages (design.md §7 grouping). Copy drafted from
 * design.md — reconcile with azurid-company-profile.md before deploy.
 */
export type TechSubpage = {
  slug: string;
  title: string;
  teaser: string;
  intro: string;
  services: readonly string[];
};

export const TECH_SUBPAGES: readonly TechSubpage[] = [
  {
    slug: "web-development",
    title: "Web Development",
    teaser: "Landing pages, corporate websites, and e-commerce platforms.",
    intro:
      "Fast, accessible sites that carry your brand — from a single landing page to a full e-commerce platform.",
    services: ["Landing pages", "Corporate websites", "E-commerce platforms"],
  },
  {
    slug: "ai-engineering",
    title: "AI Engineering",
    teaser: "Chatbots, virtual assistants, and AI-powered dashboards.",
    intro:
      "Practical AI, built into your workflows: assistants that answer, dashboards that explain, systems that learn.",
    services: ["Chatbots", "Virtual assistants", "AI-powered dashboards"],
  },
  {
    slug: "erp-systems",
    title: "ERP Systems",
    teaser: "Enterprise resource planning platforms.",
    intro:
      "One platform for your operations — mapped to how your business actually runs, then built and integrated to last.",
    services: ["Process mapping", "Custom ERP builds", "Integration & migration"],
  },
  {
    slug: "crm-systems",
    title: "CRM Systems",
    teaser: "Customer relationship management platforms.",
    intro:
      "Know your customers, keep your pipeline moving, and automate the follow-through.",
    services: ["Sales pipelines", "Customer data platforms", "Automation & reporting"],
  },
];
