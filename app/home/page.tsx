"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import Tabs, { type TabItem } from "@/components/Tabs";
import TournamentCard from "@/components/Card/TournamentCard";
import Link from "next/link";
import type { TournamentSummary } from "@/types/models";

const homeTabs: TabItem[] = [
  { id: "explore", label: "Explore" },
  { id: "live", label: "Live Feed" },
  { id: "myspace", label: "My Space" },
];

const mockTournaments: TournamentSummary[] = [
  {
    id: "1",
    name: "Monsoon Pickleball Raipur Open",
    orgId: "o1",
    startDate: "15/01/2024",
    endDate: "20/01/2024",
    status: "upcoming",
    registeredCount: 64,
    location: "Raipur | Chhattisgarh",
  },
  {
    id: "2",
    name: "Champions League",
    orgId: "o1",
    startDate: "01/02/2024",
    status: "live",
    registeredCount: 32,
    location: "Mumbai",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <Layout title="Hey Alex!">
      <div className="p-4 space-y-6">
        <Tabs tabs={homeTabs} activeId={activeTab} onChange={setActiveTab} ariaLabel="Home sections" />
        {activeTab === "explore" && (
          <>
            <section>
              <h2 className="text-lg font-semibold mb-2">BROWSE & JOIN</h2>
              <p className="text-sm text-[var(--color-muted)] mb-3">Upcoming tournaments near you</p>
              <div className="flex gap-2 mb-4">
                <Link
                  href="/tournaments"
                  className="px-4 py-2 rounded-[var(--radius-button)] bg-primary text-white text-sm font-medium min-h-[44px] flex items-center"
                >
                  Register Now
                </Link>
                <Link
                  href="/tournaments"
                  className="px-4 py-2 rounded-[var(--radius-button)] border border-[var(--color-border)] text-sm min-h-[44px] flex items-center"
                >
                  Explore All
                </Link>
              </div>
            </section>
            <section>
              <h3 className="font-medium mb-2">Quick Match</h3>
              <Link
                href="/match/demo"
                className="block p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                Invite players and manage scoring quickly →
              </Link>
            </section>
            <section>
              <h3 className="font-medium mb-2">Upcoming Tournaments</h3>
              <ul className="space-y-3">
                {mockTournaments.map((t) => (
                  <li key={t.id}>
                    <TournamentCard tournament={t} cta="Register" />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
        {activeTab === "live" && (
          <p className="text-[var(--color-muted)]">Live matches will appear here.</p>
        )}
        {activeTab === "myspace" && (
          <p className="text-[var(--color-muted)]">Your stats and upcoming matches.</p>
        )}
      </div>
    </Layout>
  );
}
