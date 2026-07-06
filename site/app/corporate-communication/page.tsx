import type { Metadata } from "next";
import { BranchPageShell } from "@/components/ui/BranchPageShell";
import { BranchContentSection } from "@/components/ui/BranchContentSection";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Corporate Communication & Visual Production | ${SITE_NAME}`,
  description:
    "Corporate films, event coverage, brand content, and executive communication.",
};

const sections = [
  {
    title: "Corporate Films",
    intro:
      "Showcase your company, your people, and your vision through professionally crafted corporate films.",
    items: [
      "Company presentations",
      "Investor communication",
      "Recruitment",
      "Employer branding",
      "International partnerships",
      "Institutional communication",
    ],
  },
  {
    title: "Event Coverage",
    intro:
      "Capture every important moment with professional audiovisual production.",
    items: [
      "Conferences",
      "Product launches",
      "Scientific events",
      "Corporate meetings",
      "Exhibitions",
      "Awards ceremonies",
      "Public events",
    ],
    note: "Deliverables include highlight videos, aftermovies, interviews, photography, and social media content.",
  },
  {
    title: "Brand Content",
    intro:
      "Modern brands require continuous, high-quality content. Our creative team produces:",
    items: [
      "Commercial videos",
      "Promotional campaigns",
      "Product showcases",
      "Social media videos",
      "Motion graphics",
      "Photography",
      "Drone cinematography",
    ],
  },
  {
    title: "Executive Communication",
    intro:
      "We help organizations communicate effectively with investors, partners, employees, and the public.",
    items: [
      "CEO interviews",
      "Corporate presentations",
      "Documentary storytelling",
      "Internal communication videos",
      "Annual report videos",
      "Strategic communication campaigns",
    ],
  },
  {
    title: "Why Azurid?",
    intro:
      "We are more than a production company. We combine creativity, engineering, and digital innovation to help organizations communicate more effectively, document their assets, and embrace the future of digital transformation. Whether producing a cinematic corporate film, scanning an industrial facility with LiDAR, or developing digital healthcare solutions, our objective remains the same:",
    note: "Turning complex projects into meaningful digital experiences.",
  },
];

export default function CorporateCommunicationPage() {
  return (
    <BranchPageShell
      branch="communication"
      eyebrow="Corporate Communication"
      title="Telling Stories That Create Impact"
      intro="Every company has a story worth telling. Azurid creates premium visual content that strengthens brands, communicates ideas, and builds lasting relationships with clients, partners, and stakeholders. We combine cinematic storytelling with strategic communication to produce content that delivers measurable value."
    >
      {sections.map((section) => (
        <BranchContentSection
          key={section.title}
          title={section.title}
          intro={"intro" in section ? section.intro : undefined}
          items={section.items}
          note={"note" in section ? section.note : undefined}
        />
      ))}
    </BranchPageShell>
  );
}
