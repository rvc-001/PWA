"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";

type MatchRow = {
  id: string;
  status: "upcoming" | "live" | "completed";
  format: "singles" | "doubles";
  label: string;
  scheduledAt: string;
  side0: { name: string; initials: string }[];
  side1: { name: string; initials: string }[];
  score?: { side0: number; side1: number };
};

const filters = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "live", label: "Live" },
  { id: "completed", label: "Completed" },
] as const;

export default function OrgManageMatchesPage() {
  const router = useRouter();
  const params = useParams();
  const tournamentId = String(params.id);
  const eventId = String(params.eventId);

  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["id"]>("all");

  const matches: MatchRow[] = useMemo(
    () => [
      {
        id: "m-1",
        status: "upcoming",
        format: "doubles",
        label: "Match 1",
        scheduledAt: "01 May 2026 · 05:00 AM",
        side0: [
          { initials: "KV", name: "Kunal Verma" },
          { initials: "AC", name: "Alex Costa" },
        ],
        side1: [
          { initials: "AK", name: "Anil Kumar" },
          { initials: "TR", name: "The Rock" },
        ],
      },
      {
        id: "m-2",
        status: "completed",
        format: "singles",
        label: "Match 2",
        scheduledAt: "01 May 2026 · 06:30 AM",
        side0: [{ initials: "KP", name: "Kunal Patel" }],
        side1: [{ initials: "AV", name: "Ankit Verma" }],
        score: { side0: 12, side1: 8 },
      },
    ],
    []
  );

  const filtered = matches.filter((m) => activeFilter === "all" || m.status === activeFilter);

  return (
    <Layout
      showBottomNav={false}
      title="Manage Matches"
      showBack
      onBack={() => router.push(`/org/tournaments/${tournamentId}`)}
    >
      {/* Rest of the component code remains the exact same */}
      <div className="p-4 space-y-4">
        <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)] p-4">
          <p className="text-sm text-[var(--color-muted)]">Tournament</p>
          <p className="font-semibold">Mumbai Men&apos;s 2026</p>
          <p className="text-sm text-[var(--color-muted)] mt-1">Event: Pickleball Men&apos;s</p>
        </div>

        <div className="flex items-center gap-2 overflow-auto pb-1">
          {filters.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-full border ${
                  active
                    ? "bg-primary text-white border-primary"
                    : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-muted)]"
                }`}
                aria-pressed={active}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          {filtered.map((m) => {
            const href = `/org/tournaments/${tournamentId}/events/${eventId}/matches/${m.id}/setup`;
            return (
              <div
                key={m.id}
                className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{m.label}</p>
                    <p className="text-xs text-[var(--color-muted)] mt-0.5">{m.scheduledAt}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full ${
                        m.status === "live"
                          ? "bg-primary/20 text-primary"
                          : m.status === "upcoming"
                            ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
                            : "bg-[var(--color-muted)]/20 text-[var(--color-muted)]"
                      }`}
                    >
                      {m.status}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-muted)]">
                      {m.format}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 items-center gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[var(--color-muted)]">Side A</p>
                    <p className="text-sm font-semibold truncate">
                      {m.side0.map((p) => p.initials).join(" / ")}
                    </p>
                    <p className="text-xs text-[var(--color-muted)] truncate">
                      {m.side0.map((p) => p.name).join(", ")}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-[var(--color-muted)] text-sm font-medium">Vs</p>
                    {m.score && (
                      <p className="text-sm font-semibold">
                        {m.score.side0}–{m.score.side1}
                      </p>
                    )}
                  </div>

                  <div className="min-w-0 text-right">
                    <p className="text-xs font-medium text-[var(--color-muted)]">Side B</p>
                    <p className="text-sm font-semibold truncate">
                      {m.side1.map((p) => p.initials).join(" / ")}
                    </p>
                    <p className="text-xs text-[var(--color-muted)] truncate">
                      {m.side1.map((p) => p.name).join(", ")}
                    </p>
                  </div>
                </div>

                <Link
                  href={href}
                  className="mt-4 inline-flex w-full min-h-[44px] items-center justify-center rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium"
                >
                  Manage Match
                </Link>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-sm text-[var(--color-muted)] p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
              No matches in this filter.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
