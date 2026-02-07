"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { ArrowLeftIcon } from "@/components/Icons";

export default function OrgEventParticipantsPage() {
  const router = useRouter();
  const params = useParams();

  return (
    <Layout showBottomNav={false} title="Participants">
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

        <div className="p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)] space-y-1">
          <p className="font-medium">Event participants</p>
          <p className="text-sm text-[var(--color-muted)]">
            Tournament: {String(params.id)} · Event: {String(params.eventId)}
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Placeholder page for participants management.
          </p>
        </div>
      </div>
    </Layout>
  );
}
