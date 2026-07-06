"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import { NAV_LINKS } from "@/lib/nav";

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white/95 backdrop-blur-sm">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 lg:px-16"
      >
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/logo-mark.png"
            alt={`${SITE_NAME} logo mark: four white petals around an emerald core`}
            width={40}
            height={40}
            priority
          />
          <span className="font-display text-lg font-bold tracking-wide text-ink">
            {SITE_NAME}
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  className={`text-sm ${active ? "font-medium text-ink" : "text-slate hover:text-ink"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    aria-hidden
                    className="absolute -bottom-2 left-1/2 -ml-1 block size-2 rotate-45 bg-accent"
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Button href={`mailto:${CONTACT_EMAIL}`}>Talk to us</Button>
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-hairline bg-white px-6 py-4 lg:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="block py-3 text-sm text-ink"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Button href={`mailto:${CONTACT_EMAIL}`}>Talk to us</Button>
          </li>
        </ul>
      )}
    </header>
  );
}
