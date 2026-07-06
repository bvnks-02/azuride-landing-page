import type { Metadata } from "next";
import { BranchPageShell } from "@/components/ui/BranchPageShell";
import { BranchContentSection } from "@/components/ui/BranchContentSection";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Healthcare Innovation | ${SITE_NAME}`,
  description:
    "Medical event management, surgical broadcast, and digital healthcare solutions.",
};

const sections = [
  {
    title: "Medical Event Management",
    intro:
      "We organize and technically manage scientific congresses, symposiums, workshops, and awareness campaigns. Our services include:",
    items: [
      "Complete event production",
      "Live streaming",
      "Multi-camera broadcasting",
      "Hybrid conferences",
      "Registration platforms",
      "Technical coordination",
      "Photography & videography",
      "Post-event media production",
    ],
  },
  {
    title: "Medical Education",
    intro:
      "We help healthcare professionals share knowledge beyond the walls of the operating room.",
    items: [
      "Surgical video production",
      "Live transmission from operating theatres",
      "Medical training content",
      "Educational documentaries",
      "Interactive webinars",
      "Continuous learning platforms",
    ],
  },
  {
    title: "Connected Operating Rooms",
    intro:
      "Azurid designs integrated audiovisual environments for hospitals. Our solutions enable:",
    items: [
      "Real-time surgery broadcasting",
      "High-definition recording",
      "Remote participation",
      "Medical teaching",
      "Secure archiving",
      "Video conferencing between operating rooms and conference halls",
    ],
    note: "We are also exploring the next generation of AI-assisted connected operating rooms to enhance education, documentation, and clinical collaboration.",
  },
  {
    title: "Digital Healthcare Solutions",
    intro:
      "Beyond audiovisual services, Azurid develops innovative software tailored to healthcare professionals. Current developments include:",
    items: [
      "e-RCP multidisciplinary meeting platform",
      "Digital collaboration tools",
      "Medical workflow applications",
      "Hospital digitalization projects",
      "Future AI-assisted healthcare solutions",
    ],
    note: "Our mission is to simplify collaboration, improve knowledge sharing, and accelerate digital transformation across healthcare institutions.",
  },
];

export default function HealthcarePage() {
  return (
    <BranchPageShell
      branch="healthcare"
      eyebrow="Healthcare Innovation"
      title="Empowering Healthcare Through Digital Innovation"
      intro="Azurid partners with hospitals, healthcare institutions, medical societies, and research organizations to deliver innovative digital solutions that improve collaboration, education, and patient care. Our multidisciplinary team combines audiovisual production, digital technologies, and software development to support the modernization of healthcare ecosystems."
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
