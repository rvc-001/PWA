"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const userLinks = [
  { href: "/user/home", label: "Home", icon: HomeIcon },
  { href: "/user/tournaments", label: "Tournaments", icon: TrophyIcon },
  { href: "/user/profile", label: "Profile", icon: ProfileIcon },
] as const;

const orgLinks = [
  { href: "/org/home", label: "Home", icon: HomeIcon },
  { href: "/org/tournaments", label: "Tournaments", icon: TrophyIcon },
  { href: "/org/profile", label: "Profile", icon: ProfileIcon },
] as const;

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function TrophyIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const isOrg = pathname.startsWith("/org");
  const links = isOrg ? orgLinks : userLinks;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-safe flex justify-center pointer-events-none"
      role="navigation"
      aria-label="Main"
    >
      <div
        className="pointer-events-auto flex items-center justify-around h-16 min-w-[280px] max-w-md px-2 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-nav-float)]"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}
      >
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] rounded-xl px-4 py-2 transition-colors ${
                active ? "text-primary font-medium" : "text-[var(--color-muted)]"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <span className={active ? "text-primary" : ""}>
                <Icon active={active} />
              </span>
              <span className="text-xs mt-0.5">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
