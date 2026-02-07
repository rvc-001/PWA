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

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function TrophyIcon() {
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

function ProfileIcon() {
  return (
    <span className="relative inline-flex items-center justify-center" aria-hidden>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute -right-1 -top-0.5">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </span>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const isOrg = pathname.startsWith("/org");
  const links = isOrg ? orgLinks : userLinks;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none px-4"
      role="navigation"
      aria-label="Main"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
    >
      {/* Fixed-size bar: same dimensions always */}
      <div
        className="pointer-events-auto flex items-center justify-center rounded-[28px] h-[72px] w-[320px] overflow-visible"
        style={{
          background: "var(--nav-bar-bg)",
          boxShadow: "var(--nav-bar-shadow)",
        }}
      >
        <div className="flex items-center justify-center h-full gap-0 px-1.5">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex flex-col items-center justify-center rounded-[20px] transition-all duration-200
                  ${active ? "relative z-10 text-white h-[56px] min-w-[100px] flex-1 px-4 -my-1" : "text-[var(--nav-item-inactive-color)] h-[48px] w-[72px] flex-shrink-0 px-2"}
                `}
                style={
                  active
                    ? {
                        background: "linear-gradient(135deg, var(--nav-item-active-gradient-start) 0%, var(--nav-item-active-gradient-end) 100%)",
                        boxShadow: "var(--nav-item-active-shadow)",
                      }
                    : {
                        background: "var(--nav-item-inactive-bg)",
                        border: "1px solid var(--nav-item-inactive-border)",
                      }
                }
                aria-current={active ? "page" : undefined}
              >
                <span className={`flex items-center justify-center shrink-0 ${active ? "w-6 h-6" : "w-5 h-5"}`}>
                  <Icon />
                </span>
                <span className={`truncate w-full text-center leading-tight font-medium ${active ? "text-xs mt-0.5" : "text-[10px] mt-0.5"}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
