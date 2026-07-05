import { Reveal } from "@/components/ui/Reveal";

const INDUSTRIES = [
  "Construction & Engineering",
  "Energy",
  "Healthcare",
  "Government & Public Sector",
  "Media & Events",
  "Education",
];

export function IndustriesSection() {
  return (
    <section className="bg-surface-alt">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-16">
        <Reveal>
          <p className="text-eyebrow text-slate">Industries served</p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {INDUSTRIES.map((name) => (
              <li
                key={name}
                className="rounded-pill border border-hairline bg-white px-5 py-2.5 text-sm text-ink"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
