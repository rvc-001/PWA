"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/home", label: "Home", icon: "⌂" },
  { href: "/tournaments", label: "Tournaments", icon: "🏆" },
  { href: "/profile", label: "Profile", icon: "👤" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-[var(--shadow-nav)] pb-safe"
      role="navigation"
      aria-label="Main"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {links.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] rounded-lg px-4 py-2 ${
                active ? "text-primary font-medium" : "text-[var(--color-muted)]"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <span className="text-xl" aria-hidden>{icon}</span>
              <span className="text-xs">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
