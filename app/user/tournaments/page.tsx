"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import Tabs, { type TabItem } from "@/components/Tabs";
import TournamentCard from "@/components/Card/TournamentCard";
import Link from "next/link";
import type { TournamentSummary } from "@/types/models";

const tabs: TabItem[] = [
  { id: "browse", label: "Browse" },
  { id: "joined", label: "Joined" },
  { id: "history", label: "History" },
];

const formatTabs: TabItem[] = [
  { id: "all", label: "All Formats" },
  { id: "singles", label: "Singles" },
  { id: "doubles", label: "Doubles" },
  { id: "mixed", label: "Mixed" },
];

const sports = [
  { id: "pickleball", label: "Pickleball", available: true },
  { id: "badminton", label: "Badminton", available: false },
  { id: "table-tennis", label: "Table Tennis", available: false },
  { id: "football", label: "Football", available: false },
  { id: "tennis", label: "Tennis", available: false },
] as const;

const mockBrowse: TournamentSummary[] = [
  {
    id: "1",
    name: "Monsoon Pickleball Raipur Open",
    orgId: "o1",
    startDate: "15/01/2024",
    endDate: "15/01/2024",
    status: "upcoming",
    registeredCount: 50,
    location: "Raipur | Chhattisgarh",
  },
];

const mockJoined: TournamentSummary[] = [
  {
    id: "2",
    name: "Monsoon Pickleball Open",
    orgId: "o1",
    startDate: "15/01/2024",
    endDate: "15/01/2024",
    status: "upcoming",
    location: "Raipur | Chhattisgarh",
  },
];

const mockHistory: TournamentSummary[] = [
  {
    id: "3",
    name: "Champions league",
    orgId: "o1",
    startDate: "15/01/2024",
    endDate: "15/01/2024",
    status: "past",
    location: "Raipur | Chhattisgarh",
  },
];

export default function UserTournamentsPage() {
  const [activeTab, setActiveTab] = useState("browse");
  const [format, setFormat] = useState("all");
  const [sport, setSport] = useState("pickleball");

  return (
    <Layout title="Tournaments">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" aria-hidden>⌕</span>
            <input
              type="search"
              placeholder="Search tournaments, cities..."
              className="w-full pl-9 pr-4 py-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
              aria-label="Search tournaments"
            />
          </div>
        </div>
        <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} ariaLabel="Tournament list" />
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--color-muted)]">Select Sport</p>
          <div className="flex flex-wrap gap-2">
            {sports.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => s.available && setSport(s.id)}
                disabled={!s.available}
                className={`min-h-[44px] px-3 py-2 rounded-[var(--radius-button)] border text-sm font-medium ${
                  sport === s.id
                    ? "bg-primary text-[var(--color-primary-contrast)] border-primary"
                    : s.available
                      ? "border-[var(--color-border)] bg-[var(--color-surface)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-muted)] cursor-not-allowed"
                }`}
              >
                {s.label}
                {!s.available && " (Coming soon)"}
              </button>
            ))}
          </div>
        </div>
        <Tabs tabs={formatTabs} activeId={format} onChange={setFormat} ariaLabel="Format" />
        {activeTab === "browse" && (
          <>
            <section>
              <h2 className="font-semibold mb-2">Trending Tournaments</h2>
              <ul className="space-y-3">
                {mockBrowse.map((t) => (
                  <li key={t.id}>
                    <TournamentCard tournament={t} cta="Register" href={`/user/tournaments/${t.id}`} />
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-semibold mb-2">Tournaments Near You</h2>
              <ul className="space-y-3">
                {mockBrowse.map((t) => (
                  <li key={t.id}>
                    <TournamentCard tournament={t} cta="Register" href={`/user/tournaments/${t.id}`} />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
        {activeTab === "joined" && (
          <ul className="space-y-3">
            {mockJoined.map((t) => (
              <li key={t.id}>
                <TournamentCard tournament={t} cta="View" href={`/user/tournaments/${t.id}`} />
              </li>
            ))}
          </ul>
        )}
        {activeTab === "history" && (
          <ul className="space-y-3">
            {mockHistory.map((t) => (
              <li key={t.id}>
                <TournamentCard tournament={t} cta="View" href={`/user/tournaments/${t.id}`} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
