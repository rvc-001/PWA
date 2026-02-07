"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import Tabs, { type TabItem } from "@/components/Tabs";
import TournamentCard from "@/components/Card/TournamentCard";
import Link from "next/link";
import type { TournamentSummary } from "@/types/models";

const tabs: TabItem[] = [
  { id: "live", label: "Live" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "draft", label: "Draft" },
];

const mockList: TournamentSummary[] = [
  {
    id: "1",
    name: "Champions League",
    orgId: "o1",
    startDate: "15/01/2024",
    status: "live",
    registeredCount: 64,
    location: "Raipur | Chhattisgarh",
  },
  {
    id: "2",
    name: "Monsoon Pickleball Raipur Open",
    orgId: "o1",
    startDate: "20/02/2024",
    status: "upcoming",
    registeredCount: 32,
    location: "Raipur",
  },
  {
    id: "3",
    name: "Mumbai Men's 2025",
    orgId: "o1",
    startDate: "01/05/2025",
    status: "draft",
    location: "Mumbai",
  },
];

export default function OrgTournamentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <Layout title="Your Tournaments">
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Your Tournaments</h1>
          <Link
            href="/org/tournaments/create"
            className="p-2 rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] min-h-[44px] min-w-[44px] flex items-center justify-center font-medium text-xl"
            aria-label="Create tournament"
          >
            +
          </Link>
        </div>
        <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} ariaLabel="Tournament filters" />
        <div className="mt-4">
          {activeTab === "past" && mockList.filter((t) => t.status === "past").length === 0 ? (
            <div className="text-center py-12 text-[var(--color-muted)]">
              <p className="text-lg mb-2">No past tournaments found.</p>
            </div>
          ) : activeTab === "draft" ? (
            <ul className="space-y-3">
              {mockList.filter((t) => t.status === "draft").map((t) => (
                <li key={t.id}>
                  <div className="p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold truncate">{t.name}</h3>
                      <p className="text-sm text-[var(--color-muted)]">{t.location ?? t.venue ?? "—"}</p>
                    </div>
                    <Link
                      href={`/org/tournaments/${t.id}/edit`}
                      className="shrink-0 min-h-[44px] px-4 py-2 rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium flex items-center"
                    >
                      Complete Draft
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-3">
              {mockList
                .filter((t) => (activeTab === "live" ? t.status === "live" : activeTab === "upcoming" ? t.status === "upcoming" : t.status === "past"))
                .map((t) => (
                  <li key={t.id}>
                    <TournamentCard
                      tournament={t}
                      cta={t.status === "live" ? "Manage" : "View"}
                      href={`/org/tournaments/${t.id}`}
                    />
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}
