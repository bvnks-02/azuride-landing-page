import { Reveal } from "@/components/ui/Reveal";
import { SharpAccent } from "@/components/ui/SharpAccent";

type BranchContentSectionProps = {
  title: string;
  intro?: string;
  items?: readonly string[];
  /** Optional closing paragraph after the list */
  note?: string;
};

/**
 * Consistent content section for branch pages.
 * Renders a heading + optional intro + optional bullet list + optional note.
 */
export function BranchContentSection({
  title,
  intro,
  items,
  note,
}: BranchContentSectionProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-16">
      <Reveal>
        <h2 className="text-h3 text-ink">{title}</h2>

        {intro && (
          <p className="text-body-lg text-slate mt-4 max-w-2xl">{intro}</p>
        )}

        {items && items.length > 0 && (
          <ul className="mt-6 grid gap-x-12 gap-y-3 md:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="flex items-baseline gap-3 text-ink">
                <SharpAccent className="shrink-0 mt-1" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {note && (
          <p className="text-body-lg text-slate mt-6 max-w-2xl">{note}</p>
        )}
      </Reveal>
    </section>
  );
}
