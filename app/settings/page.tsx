"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <Layout>
      <div className="p-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] mb-4 min-h-[44px]"
          aria-label="Back"
        >
          ← Settings
        </button>
        <h1 className="text-xl font-semibold mb-4">Notifications</h1>
        <ul className="space-y-2">
          {["Tournament Alerts", "Match Alerts", "Org Notifications"].map((label) => (
            <li
              key={label}
              className="flex items-center justify-between p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
            >
              <span>{label}</span>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                className="w-12 h-6 rounded-full bg-primary relative"
              >
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
