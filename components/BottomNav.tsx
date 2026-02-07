"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type IconProps = {
  size?: number;
  className?: string;
};

type NavLink = {
  href: string;
  label: string;
  icon: React.ComponentType<IconProps>;
};

const userLinks = [
  { href: "/user/home", label: "Home", icon: HomeIcon },
  { href: "/user/tournaments", label: "Tournaments", icon: TrophyIcon },
  { href: "/user/profile", label: "Profile", icon: ProfileIcon },
] satisfies readonly NavLink[];

const orgLinks = [
  { href: "/org/home", label: "Home", icon: HomeIcon },
  { href: "/org/tournaments", label: "Tournaments", icon: TrophyIcon },
  { href: "/org/profile", label: "Profile", icon: ProfileIcon },
] satisfies readonly NavLink[];

function HomeIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function TrophyIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function ProfileIcon({ size = 24, className }: IconProps) {
  const badgeSize = Math.max(10, Math.round(size * 0.5));
  return (
    <span className="relative inline-flex items-center justify-center" aria-hidden>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`shrink-0 ${className ?? ""}`.trim()}
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <svg
        width={badgeSize}
        height={badgeSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute -right-1 -top-0.5"
      >
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
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none px-3"
      role="navigation"
      aria-label="Main"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
    >
      <div
        className="pointer-events-auto flex items-center justify-center rounded-[22px] h-[62px] w-[min(288px,calc(100vw-24px))] overflow-visible border border-[color:var(--nav-bar-border)]"
        style={{
          background: "var(--nav-bar-bg)",
          boxShadow: "var(--nav-bar-shadow)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div className="flex items-center justify-between h-full w-full gap-1.5 px-1.5">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex flex-col items-center justify-center rounded-[18px] select-none
                  transition-[transform,background-color,box-shadow,color] duration-200 ease-out
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]
                  ${active ? "relative z-10 text-white h-[56px] flex-[1.2] px-4 -my-1.5 scale-[1.01]" : "text-[var(--nav-item-inactive-color)] h-[46px] flex-1 px-2 hover:bg-[color:var(--nav-item-hover-bg)]"}
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
                aria-label={label}
                data-touch-target
              >
                <span className="flex items-center justify-center shrink-0">
                  <Icon size={active ? 26 : 22} />
                </span>
                <span className={`truncate w-full text-center leading-tight ${active ? "text-[13px] mt-0.5 font-semibold" : "text-[10px] mt-0.5 font-medium"}`}>
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
