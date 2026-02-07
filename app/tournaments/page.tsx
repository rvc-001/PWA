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
  { id: "drafts", label: "Drafts" },
];

const mockList: TournamentSummary[] = [
  {
    id: "1",
    name: "Champions league - Table tennis tournament",
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
];

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Your Tournaments</h1>
          <div className="flex gap-2">
            <Link
              href="/tournaments/create"
              className="p-2 rounded-lg bg-primary text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Create tournament"
            >
              +
            </Link>
          </div>
        </div>
        <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} ariaLabel="Tournament filters" />
        <div className="mt-4">
          {activeTab === "past" && mockList.filter((t) => t.status === "past").length === 0 ? (
            <div className="text-center py-12 text-[var(--color-muted)]">
              <p className="text-lg mb-2">No past tournaments.</p>
              <p className="text-sm">Create a tournament to get started!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {mockList.map((t) => (
                <li key={t.id}>
                  <TournamentCard tournament={t} cta={t.status === "live" ? "Manage" : "View"} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}
