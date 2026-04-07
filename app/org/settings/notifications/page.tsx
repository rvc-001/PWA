"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { ArrowLeftIcon } from "@/components/Icons";

export default function OrgNotificationsPage() {
  const router = useRouter();
  return (
    <Layout>
      <div className="p-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px] flex items-center gap-2"
          aria-label="Back"
        >
          <ArrowLeftIcon size={20} />
          <span className="font-medium">Notifications</span>
        </button>
        <h1 className="text-xl font-semibold mt-4">Notifications</h1>
        <p className="text-sm text-[var(--color-muted)]">Manage preferences.</p>
      </div>
    </Layout>
  );
}

