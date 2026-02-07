"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

export default function OrgHelpPage() {
  const router = useRouter();
  return (
    <Layout>
      <div className="p-4">
        <button type="button" onClick={() => router.back()} className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px]" aria-label="Back">← Help &amp; Support</button>
        <h1 className="text-xl font-semibold mt-4">Help &amp; Support</h1>
        <p className="text-sm text-[var(--color-muted)]">Get support from our support team.</p>
        <a href="mailto:support@forehand.app" className="inline-block mt-4 text-primary font-medium">Email Support →</a>
      </div>
    </Layout>
  );
}
