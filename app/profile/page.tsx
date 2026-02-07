"use client";

import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <Layout>
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-4 p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
            A
          </div>
          <div>
            <h2 className="text-lg font-semibold">Alex Costa</h2>
            <p className="text-sm text-[var(--color-muted)]">Individual Profile</p>
          </div>
          <Link
            href="/profile/edit"
            className="ml-auto min-h-[44px] px-4 py-2 rounded-[var(--radius-button)] bg-primary text-white font-medium flex items-center"
          >
            Edit Profile
          </Link>
        </div>
        <nav className="space-y-1">
          <Link
            href="/settings"
            className="block p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            Notifications
          </Link>
          <Link
            href="/settings/privacy"
            className="block p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            Privacy & Policy
          </Link>
          <Link
            href="/settings"
            className="block p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            Settings
          </Link>
          <Link
            href="/settings/help"
            className="block p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            Help & Support
          </Link>
        </nav>
        <button
          type="button"
          className="w-full min-h-[44px] rounded-[var(--radius-button)] border border-[var(--color-error)] text-[var(--color-error)]"
        >
          Logout
        </button>
      </div>
    </Layout>
  );
}
