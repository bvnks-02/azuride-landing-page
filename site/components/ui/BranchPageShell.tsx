import { BranchBody } from "@/components/ui/BranchBody";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SharpAccent } from "@/components/ui/SharpAccent";
import { CONTACT_EMAIL } from "@/lib/site";
import type { Branch } from "@/lib/tokens";

type BranchPageShellProps = {
  branch: Branch;
  eyebrow: string;
  title: string;
  intro: string;
  services?: readonly string[];
  children?: React.ReactNode;
};

/**
 * Shared branch-page layout (design.md §7): neutral white/surface layout,
 * the branch accent as the single highlight color — eyebrow, bullets,
 * links, and button fills only.
 */
export function BranchPageShell({
  branch,
  eyebrow,
  title,
  intro,
  services,
  children,
}: BranchPageShellProps) {
  return (
    <article data-branch={branch}>
      <BranchBody branch={branch} />

      <header className="mx-auto max-w-[1200px] px-6 pt-24 pb-16 lg:px-16">
        <Reveal>
          <p className="flex items-center gap-3 text-eyebrow text-slate">
            <SharpAccent /> {eyebrow}
          </p>
          <h1 className="text-h2 mt-4 max-w-3xl text-ink">{title}</h1>
          <p className="text-body-lg mt-6 max-w-2xl text-slate">{intro}</p>
        </Reveal>
      </header>

      {services && (
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-16">
            <Reveal>
              <h2 className="text-eyebrow text-slate">What we do</h2>
              <ul className="mt-8 grid gap-x-12 gap-y-4 md:grid-cols-2">
                {services.map((service) => (
                  <li key={service} className="flex items-baseline gap-3 text-ink">
                    <SharpAccent className="shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {children}

      <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-16">
        <Reveal>
          <h2 className="text-h3 text-ink">Have a project in mind?</h2>
          <div className="mt-6">
            <Button href={`mailto:${CONTACT_EMAIL}`} variant="accent">
              Talk to us
            </Button>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
