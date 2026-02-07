"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { ArrowLeftIcon } from "@/components/Icons";

export default function OrgProfileEditPage() {
  const router = useRouter();

  return (
    <Layout showBottomNav={false} title="Edit Profile">
      <div className="p-4 space-y-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px] flex items-center gap-2"
          aria-label="Back"
        >
          <ArrowLeftIcon size={20} />
          <span className="font-medium">Back</span>
        </button>

        <div className="p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)]">
          <p className="text-sm text-[var(--color-muted)]">
            This is a placeholder page. Add organization profile fields here.
          </p>
        </div>
      </div>
    </Layout>
  );
}
