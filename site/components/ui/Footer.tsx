import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import { CONTACT_EMAIL, SITE_MOTTO, SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 md:grid-cols-3 lg:px-16">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo-mark.png"
              alt={`${SITE_NAME} logo mark: four white petals around an emerald core`}
              width={32}
              height={32}
            />
            <span className="font-display text-lg font-bold tracking-wide">
              {SITE_NAME}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/70">{SITE_MOTTO}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-eyebrow text-white/60">Branches</h2>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-white/85 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-eyebrow text-white/60">Contact</h2>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 block text-sm text-white/85 hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1200px] px-6 py-6 text-sm text-white/50 lg:px-16">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
