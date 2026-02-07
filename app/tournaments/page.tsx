"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import Tabs, { type TabItem } from "@/components/Tabs";
import ColorfulTournamentCard from "@/components/Card/ColorfulTournamentCard";
import Link from "next/link";

const tabs: TabItem[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "joined", label: "Joined" },
  { id: "completed", label: "Completed" },
];

const upcomingTournaments = [
  {
    id: "1",
    name: "Monsoon Pickleball Open",
    icon: "🏸",
    location: "Raipur | Men's Doubles | Main-#52",
    dateRange: "Start: 13/12/2024 \nEnd: 15/12/2024",
    entryFee: "Free Entry",
    registeredCount: 64,
    colorVariant: "orange" as const,
  },
  {
    id: "2",
    name: "Monsoon Pickleball Open",
    icon: "🏸",
    location: "Raipur | Men's Doubles | Main-#52",
    dateRange: "Start: 13/12/2024 \nEnd: 15/12/2024",
    entryFee: "₹1400",
    registeredCount: 4,
    colorVariant: "green" as const,
  },
];

const joinedTournaments = [
  {
    id: "3",
    name: "Mumbai Men's 2025",
    icon: "🏐",
    location: "Ghatkopar | Squash",
    dateRange: "Start: 01/02/2025 \nEnd: 05/02/2025",
    entryFee: "₹1400",
    registeredCount: 8,
    colorVariant: "red" as const,
  },
];

export default function TournamentsListPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <Layout title="Tournaments">
      <div className="p-4 space-y-6 pb-24">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="search"
            placeholder="Search tournaments..."
            className="w-full px-4 py-3 pl-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:border-primary focus:outline-none"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          activeId={activeTab}
          onChange={setActiveTab}
          ariaLabel="Tournament filters"
        />

        {/* Upcoming Tournaments */}
        {activeTab === "upcoming" && (
          <div className="grid gap-4">
            {upcomingTournaments.map((t) => (
              <ColorfulTournamentCard key={t.id} {...t} />
            ))}
          </div>
        )}

        {/* Joined Tournaments */}
        {activeTab === "joined" && (
          <div className="grid gap-4">
            {joinedTournaments.map((t) => (
              <ColorfulTournamentCard
                key={t.id}
                {...t}
                ctaText="View Details"
              />
            ))}
          </div>
        )}

        {/* Completed Tournaments */}
        {activeTab === "completed" && (
          <div className="text-center py-12">
            <p className="text-[var(--color-muted)]">
              No completed tournaments yet
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
