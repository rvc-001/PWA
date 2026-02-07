"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { useTheme } from "@/components/ThemeProvider";
import { ArrowLeftIcon } from "@/components/Icons";

export default function OrgSettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <button type="button" onClick={() => router.back()} className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px] flex items-center gap-2" aria-label="Back">
          <ArrowLeftIcon size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <h1 className="text-xl font-semibold mb-4">App Preferences</h1>
        <p className="text-sm text-[var(--color-muted)] mb-4">Change app preferences.</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-[var(--color-muted)]">Change app theme to dark or light.</p>
            </div>
            <select value={theme} onChange={(e) => setTheme(e.target.value as "light" | "dark")} className="p-2 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]" aria-label="Theme">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
        <p className="text-sm text-[var(--color-muted)]">App Version v1.0.4</p>
        <button type="button" className="w-full min-h-[44px] rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium">
          Delete Account
        </button>
      </div>
    </Layout>
  );
}
