"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, UserIcon } from "@/components/Icons";

const participants = [
  { id: "1", name: "Anil Kumar", phone: "+91 XXXX", avatar: "AK", confirmed: true },
  { id: "2", name: "Anil Kumar", phone: "+91 XXXX", avatar: "AK", confirmed: true },
  { id: "3", name: "Anil Kumar", phone: "+91 XXXX", avatar: "AK", confirmed: false },
  { id: "4", name: "Anil Kumar", phone: "+91 XXXX", avatar: "AK", confirmed: false },
];

export default function EventParticipantsPage({ params }: { params: { id: string, eventId: string } }) {
  const [filter, setFilter] = useState<"all" | "confirmed" | "pending">("all");

  // Fallback to "1" just in case params are not passed during testing
  const tournamentId = params?.id || "1"; 

  const filtered = participants.filter((p) => {
    if (filter === "confirmed") return p.confirmed;
    if (filter === "pending") return !p.confirmed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] p-4 flex items-center gap-3">
        <Link href={`/org/tournaments/${tournamentId}`} className="p-2 -ml-2">
          <ArrowLeftIcon size={20} />
        </Link>
        <h1 className="font-semibold">Participant Confirmation</h1>
      </div>

      {/* Event Info */}
      <div className="p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <h2 className="font-semibold text-lg">Pickle Ball Men&apos;s 2025</h2>
        <p className="text-sm text-[var(--color-muted)]">
          U-17 Open • 01 Dec 2026, 8:00 AM
        </p>
        <p className="text-xs text-[var(--color-muted)]">
          Registration Closed
        </p>
      </div>

      {/* Tabs */}
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <UserIcon size={20} className="text-[var(--color-text)]" />
          <span className="font-medium">Confirm players presence</span>
        </div>

        <div className="flex gap-2">
          {(["all", "confirmed", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f
                ? "bg-primary text-white"
                : "bg-[var(--color-surface-elevated)] text-[var(--color-text)]"
                }`}
            >
              {f === "all" ? "All Players" : f === "confirmed" ? "Confirmed" : "Pending"}
            </button>
          ))}
        </div>

        {/* Participants List */}
        <div className="space-y-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="card p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-medium text-sm">
                  {p.avatar}
                </div>
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {p.phone}
                  </p>
                </div>
              </div>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${p.confirmed
                  ? "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400"
                  : "bg-[var(--color-surface-elevated)] border border-[var(--color-border)]"
                  }`}
              >
                {p.confirmed ? "✓ Confirmed" : "Confirm"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <Link
          href={`/org/tournaments/${tournamentId}`}
          className="btn-primary w-full text-center block"
        >
          Save and Proceed
        </Link>
      </div>
    </div>
  );
}