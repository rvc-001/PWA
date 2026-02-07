"use client";

import React from "react";
import Layout from "@/components/Layout";
import TournamentCard from "@/components/Card/TournamentCard";
import Link from "next/link";
import type { TournamentSummary } from "@/types/models";

const mockTournaments: TournamentSummary[] = [
  {
    id: "1",
    name: "Champions League",
    orgId: "o1",
    startDate: "10/01/2024",
    status: "live",
    registeredCount: 200,
    location: "Raipur | Chhattisgarh",
  },
];

export default function OrgHomePage() {
  return (
    <Layout title="Hey Alex!">
      <div className="p-4 space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-1">Demo Organization</h2>
          <p className="text-sm text-[var(--color-muted)]">Organization dashboard</p>
        </section>
        <section className="grid grid-cols-3 gap-2">
          <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-xs text-[var(--color-muted)]">Tournaments</p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-center">
            <p className="text-2xl font-bold">04</p>
            <p className="text-xs text-[var(--color-muted)]">Upcoming</p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-center">
            <p className="text-2xl font-bold">02</p>
            <p className="text-xs text-[var(--color-muted)]">Participated</p>
          </div>
        </section>
        <section>
          <h3 className="font-semibold mb-2">Live Tournaments</h3>
          <ul className="space-y-3">
            {mockTournaments.map((t) => (
              <li key={t.id}>
                <TournamentCard tournament={t} cta="View" href={`/org/tournaments/${t.id}`} />
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-semibold mb-2">Live Matches</h3>
          <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
            <p className="font-medium">Chelsea vs Man Utd</p>
            <p className="text-2xl font-bold text-primary mt-1">04 - 01</p>
            <p className="text-sm text-[var(--color-muted)]">Day 1 · Sunday</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
