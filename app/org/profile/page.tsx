"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import {
  BellIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  HelpCircleIcon,
  LockIcon,
  MoonIcon,
  SettingsIcon,
  UsersIcon,
} from "@/components/Icons";
import { useTheme } from "@/components/ThemeProvider";

export default function OrgProfilePage() {
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowSwitchModal(true)}
            className="font-semibold text-[var(--color-text)] flex items-center gap-1"
            aria-expanded={showSwitchModal}
          >
            Organizer Profile
            <ChevronDownIcon size={16} className="text-[var(--color-muted)]" />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg border border-[var(--color-border)] min-h-[44px] min-w-[44px] flex items-center justify-center text-xl font-medium"
            aria-label="Add"
          >
            +
          </button>
        </div>
        <div className="p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)]">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary shrink-0">
              A
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold">Alex Costa</h2>
              <p className="text-sm text-[var(--color-muted)]">Forehand Organization</p>
              <p className="text-sm text-[var(--color-muted)]">alex@forehand.app</p>
              <p className="text-sm text-[var(--color-muted)]">+91 96764 …</p>
              <Link
                href="/org/profile/edit"
                className="mt-3 inline-flex min-h-[44px] px-4 py-2 rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="w-full flex items-center justify-between gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
        >
          <div className="flex items-center gap-3">
            <MoonIcon size={20} className="text-[var(--color-muted)]" />
            <div className="text-left">
              <span className="font-medium">Theme</span>
              <p className="text-sm text-[var(--color-muted)]">{theme === "dark" ? "Dark" : "Light"} mode</p>
            </div>
          </div>
          <span className="rounded-full bg-[var(--color-surface-elevated)] px-3 py-1 text-sm">Switch</span>
        </button>
        <nav className="space-y-1" aria-label="Settings">
          <Link
            href="/org/settings/notifications"
            className="flex items-center gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            <BellIcon size={20} className="text-[var(--color-muted)] shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="font-medium">Notifications</span>
              <p className="text-sm text-[var(--color-muted)]">Manage preferences.</p>
            </div>
            <ChevronRightIcon size={18} className="text-[var(--color-muted)] shrink-0" />
          </Link>
          <Link
            href="/org/settings/members"
            className="flex items-center gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            <UsersIcon size={20} className="text-[var(--color-muted)] shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="font-medium">Organization Members</span>
              <p className="text-sm text-[var(--color-muted)]">Manage members.</p>
            </div>
            <ChevronRightIcon size={18} className="text-[var(--color-muted)] shrink-0" />
          </Link>
          <Link
            href="/org/settings/privacy"
            className="flex items-center gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            <LockIcon size={20} className="text-[var(--color-muted)] shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="font-medium">Privacy &amp; Policy</span>
              <p className="text-sm text-[var(--color-muted)]">Control your settings.</p>
            </div>
            <ChevronRightIcon size={18} className="text-[var(--color-muted)] shrink-0" />
          </Link>
          <Link
            href="/org/settings"
            className="flex items-center gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            <SettingsIcon size={20} className="text-[var(--color-muted)] shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="font-medium">Settings</span>
              <p className="text-sm text-[var(--color-muted)]">App preferences.</p>
            </div>
            <ChevronRightIcon size={18} className="text-[var(--color-muted)] shrink-0" />
          </Link>
          <Link
            href="/org/settings/help"
            className="flex items-center gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            <HelpCircleIcon size={20} className="text-[var(--color-muted)] shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="font-medium">Help &amp; Support</span>
              <p className="text-sm text-[var(--color-muted)]">Get support from our support team.</p>
            </div>
            <ChevronRightIcon size={18} className="text-[var(--color-muted)] shrink-0" />
          </Link>
        </nav>
        <button
          type="button"
          className="w-full min-h-[44px] rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium"
        >
          Logout
        </button>
      </div>

      {showSwitchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg p-6">
            <h2 className="text-lg font-semibold">Switch Account</h2>
            <div className="mt-4 space-y-2">
              <Link
                href="/user/profile"
                className="flex items-center gap-3 p-3 rounded-[var(--radius-card)] border border-[var(--color-border)]"
                onClick={() => setShowSwitchModal(false)}
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-surface-elevated)] flex items-center justify-center font-bold">A</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Alex Costa</p>
                  <p className="text-sm text-[var(--color-muted)]">Individual</p>
                </div>
                <ChevronRightIcon size={18} className="text-[var(--color-muted)] shrink-0" />
              </Link>
              <div className="flex items-center gap-3 p-3 rounded-[var(--radius-card)] border border-primary/50 bg-primary/5">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">C</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">City Organization Raipur</p>
                  <p className="text-sm text-[var(--color-muted)]">Organization</p>
                </div>
                <CheckIcon size={18} className="text-primary shrink-0" />
              </div>
              <Link href="/splash" className="flex items-center gap-3 p-3 rounded-[var(--radius-card)] border border-[var(--color-border)] text-[var(--color-muted)]">
                <span className="text-xl">+</span>
                <span className="font-medium">Add Forehand account</span>
              </Link>
            </div>
            <button type="button" className="mt-4 w-full min-h-[44px] rounded-[var(--radius-button)] border border-[var(--color-border)]" onClick={() => setShowSwitchModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
