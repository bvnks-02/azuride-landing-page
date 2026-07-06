import type { Metadata } from "next";
import { BranchPageShell } from "@/components/ui/BranchPageShell";
import { BranchContentSection } from "@/components/ui/BranchContentSection";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Construction & Site Inspection | ${SITE_NAME}`,
  description:
    "Reality capture, drone inspection, and digital twins for engineering and construction.",
};

const sections = [
  {
    title: "Progress Monitoring",
    intro:
      "We document every phase of construction through periodic inspections using drones, professional cameras, and 3D scanning technologies.",
    items: [
      "Progress reports",
      "Executive presentations",
      "Monthly documentation",
      "Stakeholder communication",
      "Time-lapse monitoring",
      "Visual project archives",
    ],
  },
  {
    title: "Drone Inspection",
    intro:
      "Our certified drone operations provide safe and efficient inspection of:",
    items: [
      "Buildings",
      "Industrial facilities",
      "Bridges",
      "Infrastructure",
      "Solar farms",
      "Energy installations",
      "Construction sites",
    ],
    note: "Drone inspections reduce risks, improve productivity, and provide high-resolution visual documentation.",
  },
  {
    title: "LiDAR & Reality Capture",
    intro:
      "Using professional LiDAR scanners, we capture highly accurate point clouds for engineering and asset management.",
    items: [
      "Existing conditions surveys",
      "As-built documentation",
      "Heritage preservation",
      "Industrial facilities",
      "Infrastructure mapping",
      "Facility management",
    ],
  },
  {
    title: "Digital Twins & BIM",
    intro:
      "Through Azurid Twin Up, we transform physical assets into interactive digital twins.",
    items: [
      "3D visualization",
      "BIM integration",
      "Progress comparison",
      "Cloud collaboration",
      "Remote inspections",
      "Maintenance planning",
      "Asset lifecycle management",
    ],
    note: "Digital Twins provide decision-makers with accurate, real-time information throughout the entire lifecycle of a project.",
  },
  {
    title: "Industries We Serve",
    items: [
      "Construction",
      "Oil & Gas",
      "Energy",
      "Public Infrastructure",
      "Manufacturing",
      "Real Estate",
      "Smart Cities",
      "Government",
    ],
  },
];

export default function ConstructionInspectionPage() {
  return (
    <BranchPageShell
      branch="construction"
      eyebrow="Construction & Site Inspection"
      title="Digital Construction Intelligence"
      intro="Azurid helps engineering firms, contractors, developers, and infrastructure owners monitor projects with precision through advanced reality capture technologies. From aerial inspections to digital twins, we transform construction sites into intelligent digital environments."
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
