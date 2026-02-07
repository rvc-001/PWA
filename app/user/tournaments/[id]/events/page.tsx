"use client";

import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import { ArrowLeftIcon } from "@/components/Icons";

export default function UserTournamentEventsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const selectedEvent = searchParams.get("event");

  return (
    <Layout showBottomNav={false} title="Tournament Events">
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
          <p className="font-medium">Events</p>
          <p className="text-sm text-[var(--color-muted)]">
            Tournament: {String(params.id)}
            {selectedEvent ? ` · Selected event: ${selectedEvent}` : ""}
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Placeholder page for browsing and joining events.
          </p>
        </div>
      </div>
    </Layout>
  );
}
