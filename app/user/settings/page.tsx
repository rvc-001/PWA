"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import BottomNav from "@/components/BottomNav";
import { 
  BellIcon, 
  LockIcon, 
  SettingsIcon, 
  HelpCircleIcon, 
  PhoneIcon, 
  MailIcon, 
  LogOutIcon, 
  MoonIcon, 
  ChevronRightIcon,
  ChevronDownIcon,
  CheckIcon
} from "@/components/Icons";

export default function UserSettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const settingsItems = [
    { href: "/user/settings/notifications", icon: BellIcon, label: "Notifications", sub: "Manage preferences" },
    { href: "/user/settings/privacy", icon: LockIcon, label: "Privacy & Policy", sub: "Control your settings" },
    { href: "/user/settings", icon: SettingsIcon, label: "Settings", sub: "App preferences" },
    { href: "/user/settings/help", icon: HelpCircleIcon, label: "Help & Support", sub: "Connect with support team" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex flex-col">
      
      <header className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-sm">
        <div className="flex items-center h-14 px-5">
          <button
            type="button"
            onClick={() => setShowSwitchModal(true)}
            className="flex items-center gap-1.5 font-bold text-[17px] tracking-tight hover:opacity-80 transition-opacity"
            aria-expanded={showSwitchModal}
          >
            Individual Settings
            <ChevronDownIcon size={18} className="text-[var(--color-text-muted)] mt-0.5 shrink-0" />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-24 pb-safe px-4 pt-6 space-y-8 overflow-y-auto">
        
        <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex flex-shrink-0 items-center justify-center text-white text-2xl font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold truncate">Alex Costa</h2>
              <div className="mt-1 space-y-1 text-sm text-[var(--color-text-muted)]">
                <p className="flex items-center gap-2 truncate">
                  <PhoneIcon size={14} className="shrink-0 text-[var(--color-text)]" /> +91 98765 43210
                </p>
                <p className="flex items-center gap-2 truncate">
                  <MailIcon size={14} className="shrink-0 text-[var(--color-text)]" /> alex@forehand.app
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/user/settings/profile"
            className="mt-5 block w-full py-2.5 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] text-center font-semibold text-[15px] hover:bg-[var(--color-border)] transition-colors"
          >
            Edit Profile
          </Link>
        </div>

        <div>
          <h3 className="text-xs font-bold text-[var(--color-text-muted)] mb-3 px-1 uppercase tracking-wider">
            Preferences
          </h3>
          <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden flex flex-col">
            
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-4 hover:bg-[var(--color-surface-elevated)] transition-colors text-left border-b border-[var(--color-border)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text)] border border-[var(--color-border)] shrink-0">
                  <MoonIcon size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[15px]">Appearance</p>
                  <p className="text-[13px] text-[var(--color-text-muted)] mt-0.5">
                    {theme === "dark" ? "Dark Theme" : "Light Theme"}
                  </p>
                </div>
              </div>
              <div className="px-3 py-1 text-xs font-bold rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                Toggle
              </div>
            </button>

            {settingsItems.map((item, idx) => {
              const Icon = item.icon; // Correctly unwrap component before rendering
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`flex items-center justify-between p-4 hover:bg-[var(--color-surface-elevated)] transition-colors ${
                    idx !== settingsItems.length - 1 ? "border-b border-[var(--color-border)]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2 rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text)] border border-[var(--color-border)] shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-[15px]">{item.label}</p>
                      <p className="text-[13px] text-[var(--color-text-muted)] mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon size={20} className="text-[var(--color-text-muted)] shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="pt-2">
          <button className="w-full py-3.5 rounded-2xl border-2 border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors">
            <LogOutIcon size={18} className="shrink-0" /> Log Out
          </button>
        </div>
        
      </main>

      <BottomNav />

      {/* Switch Account Modal */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl p-6 max-h-[85vh] flex flex-col">
            <h2 className="text-xl font-bold mb-5 text-[var(--color-text)]">Switch Account</h2>
            
            <div className="space-y-3 overflow-y-auto hide-scrollbar flex-1 pb-2">
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl border-2 border-primary bg-primary/5 text-[var(--color-text)]">
                <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center font-bold text-white shadow-sm shrink-0">A</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[15px] truncate">Alex Costa</p>
                  <p className="text-[13px] text-[var(--color-text-muted)]">Individual</p>
                </div>
                <CheckIcon size={20} className="text-primary shrink-0" />
              </div>

              <Link
                href="/org/settings"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                onClick={() => setShowSwitchModal(false)}
              >
                <div className="w-11 h-11 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center text-sm font-bold shrink-0">C</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[15px] truncate">City Org Raipur</p>
                  <p className="text-[13px] text-[var(--color-text-muted)]">Organization</p>
                </div>
              </Link>

              <Link
                href="/user/settings"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                onClick={() => setShowSwitchModal(false)}
              >
                <div className="w-11 h-11 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center text-sm font-bold shrink-0">A</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[15px] truncate">Anil Kumar</p>
                  <p className="text-[13px] text-[var(--color-text-muted)]">Individual</p>
                </div>
              </Link>

              <Link
                href="/splash"
                className="flex items-center justify-center gap-2 p-4 rounded-2xl border border-dashed border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)] transition-colors mt-2"
                onClick={() => setShowSwitchModal(false)}
              >
                <span className="text-xl font-light leading-none">+</span>
                <span className="font-semibold text-[14px]">Add Forehand Account</span>
              </Link>
            </div>

            <button
              type="button"
              className="mt-6 w-full py-3 rounded-xl font-semibold text-[var(--color-text)] bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors shrink-0"
              onClick={() => setShowSwitchModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}