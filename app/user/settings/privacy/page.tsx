"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { ArrowLeftIcon } from "@/components/Icons";

export default function PrivacySettingsPage() {
  const router = useRouter();

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <button type="button" onClick={() => router.back()} className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px] flex items-center gap-2" aria-label="Back">
          <ArrowLeftIcon size={20} />
          <span className="font-medium">Privacy</span>
        </button>
        <h1 className="text-xl font-semibold">Your Privacy</h1>
        <p className="text-sm text-[var(--color-muted)]">Choose your privacy settings.</p>
        <ul className="space-y-2">
          {[
            { label: "Public Profile", desc: "Allow others to see your profile" },
            { label: "Show Statistics", desc: "Display your wins/loss record" },
            { label: "Allow search", desc: "Let others find you by email/phone" },
            { label: "Receive invites", desc: "Receive match invites from others" },
          ].map(({ label, desc }) => (
            <li key={label} className="flex items-center justify-between p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-[var(--color-muted)]">{desc}</p>
              </div>
              <button type="button" role="switch" aria-checked="true" className="w-12 h-6 rounded-full bg-primary relative shrink-0 ml-2">
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
