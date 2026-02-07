"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { useTheme } from "@/components/ThemeProvider";

export default function UserSettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] mb-4 min-h-[44px] flex items-center gap-2"
          aria-label="Back"
        >
          <span aria-hidden>←</span> Settings
        </button>
        <h1 className="text-xl font-semibold mb-4">App Preferences</h1>
        <p className="text-sm text-[var(--color-muted)] mb-4">Change app preferences.</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-[var(--color-muted)]">Change app theme to dark or light.</p>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as "light" | "dark")}
              className="p-2 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
              aria-label="Theme"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <p className="font-medium">Show Statistics</p>
              <p className="text-sm text-[var(--color-muted)]">Display your wins/loss record.</p>
            </div>
            <button type="button" role="switch" aria-checked="true" className="w-12 h-6 rounded-full bg-primary relative">
              <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <p className="font-medium">Language</p>
              <p className="text-sm text-[var(--color-muted)]">Change app language.</p>
            </div>
            <select className="p-2 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]" aria-label="Language">
              <option>English</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <p className="font-medium">Allow search</p>
              <p className="text-sm text-[var(--color-muted)]">Let others find you by email/phone.</p>
            </div>
            <button type="button" role="switch" aria-checked="true" className="w-12 h-6 rounded-full bg-primary relative">
              <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <p className="font-medium">Receive invites</p>
              <p className="text-sm text-[var(--color-muted)]">Receive match invites from others.</p>
            </div>
            <button type="button" role="switch" aria-checked="false" className="w-12 h-6 rounded-full bg-[var(--color-border)] relative">
              <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white" />
            </button>
          </div>
        </div>
        <p className="text-sm text-[var(--color-muted)]">App Version v1.3.4</p>
        <button type="button" className="w-full min-h-[44px] rounded-[var(--radius-button)] border border-[var(--color-error)] text-[var(--color-error)] font-medium">
          Delete Account
        </button>
      </div>
    </Layout>
  );
}
