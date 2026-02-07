"use client";

import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { BellIcon, LockIcon, SettingsIcon, HelpCircleIcon, PhoneIcon, MailIcon, LogOutIcon, MoonIcon, ChevronRightIcon } from "@/components/Icons";

const iconComponents = {
  bell: BellIcon,
  lock: LockIcon,
  settings: SettingsIcon,
  help: HelpCircleIcon,
};

type IconKey = keyof typeof iconComponents;

export default function UserSettingsPage() {
  const { theme, toggleTheme } = useTheme();

  const settingsItems: { iconKey: IconKey; label: string; sublabel: string; href: string }[] = [
    {
      iconKey: "bell",
      label: "Notifications",
      sublabel: "Manage Preferences",
      href: "/user/settings/notifications",
    },
    {
      iconKey: "lock",
      label: "Privacy & Policy",
      sublabel: "Control your settings",
      href: "/user/settings/privacy",
    },
    {
      iconKey: "settings",
      label: "Settings",
      sublabel: "App preferences",
      href: "/user/settings/preferences",
    },
    {
      iconKey: "help",
      label: "Help & Support",
      sublabel: "Get help with support team",
      href: "/user/settings/help",
    },
  ];

  return (
    <Layout title="Settings">
      <div className="p-4 space-y-6 pb-24">
        {/* Profile Card */}
        <div className="card p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
              A
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">Alex Costa</h2>
              <p className="text-sm text-[var(--color-muted)] flex items-center gap-1">
                <PhoneIcon size={14} /> +91-98765-43210
              </p>
              <p className="text-sm text-[var(--color-muted)] flex items-center gap-1">
                <MailIcon size={14} /> alex@forehand.app
              </p>
            </div>
          </div>
          <Link
            href="/user/settings/profile"
            className="btn-primary w-full text-center"
          >
            Edit Profile
          </Link>
        </div>

        {/* Theme Toggle */}
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MoonIcon size={20} className="text-[var(--color-text)]" />
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-[var(--color-muted)]">
                  {theme === "dark" ? "Dark mode" : "Light mode"}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg bg-[var(--color-surface-elevated)] hover:bg-[var(--color-border)] transition-colors"
            >
              Toggle
            </button>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="space-y-3">
          {settingsItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="card p-4 flex items-center gap-3 hover:border-primary/30 transition-colors"
            >
              {React.createElement(iconComponents[item.iconKey], { size: 20, className: "text-[var(--color-text)]" })}
              <div className="flex-1">
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-[var(--color-muted)]">
                  {item.sublabel}
                </p>
              </div>
              <ChevronRightIcon size={18} className="text-[var(--color-muted)]" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full py-3 rounded-xl border-2 border-red-500 text-red-500 font-semibold flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
          <LogOutIcon size={18} /> Logout
        </button>
      </div>
    </Layout>
  );
}
