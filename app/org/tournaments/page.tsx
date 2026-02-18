"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import Tabs, { type TabItem } from "@/components/Tabs";
import Link from "next/link";
import { TrophyIcon, MapPinIcon, CalendarIcon, WalletIcon, FilterIcon, EditIcon, UsersIcon } from "@/components/Icons";


const tabs: TabItem[] = [
  { id: "live", label: "Live" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "drafts", label: "Drafts" },
];

const tournaments = [
  {
    id: "1",
    name: "Champions league",
    description: "Table tennis tournament",
    location: "Raipur | Chattisgarh",
    date: "15/01/2024",
    players: 32,
    entryFee: "500 Entry",
    status: "Mixed",
    statusColor: "orange",
  },
  {
    id: "2",
    name: "Champions league",
    description: "Table tennis tournament",
    location: "Raipur | Chattisgarh",
    date: "15/01/2024",
    players: 32,
    entryFee: "500 Entry",
    status: "Men's",
    statusColor: "green",
  },
  {
    id: "3",
    name: "Champions league",
    description: "Table tennis tournament",
    location: "Raipur | Chattisgarh",
    date: "15/01/2024",
    players: 32,
    entryFee: "500 Entry",
    status: "Women's",
    statusColor: "red",
  },
];

const drafts = [
  {
    id: "d1",
    name: "Champions league",
    description: "Table tennis tournament",
    createdDate: "22/04/2024",
  },
  {
    id: "d2",
    name: "Champions league",
    description: "Table tennis tournament",
    createdDate: "22/04/2024",
  },
];

export default function OrgTournamentsPage() {
  const [activeTab, setActiveTab] = useState("live");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Layout title="Tournaments">
      <div className="p-4 space-y-4 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-lg">Your Tournaments</h1>
            <p className="text-sm text-[var(--color-muted)]">
              Create and manage your tournaments
            </p>
          </div>
          <Link
            href="/org/tournaments/create"
            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: "var(--gradient-orange)" }}
          >
            +
          </Link>
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm"
        >
          <FilterIcon size={16} className="text-[var(--color-muted)]" />
          <span className="text-[var(--color-muted)]">Filters</span>
        </button>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          activeId={activeTab}
          onChange={setActiveTab}
          ariaLabel="Tournament status"
        />

        {/* Tournament List */}
        {activeTab !== "drafts" && activeTab !== "past" && (
          <div className="space-y-3">
            {tournaments.map((t) => (
              <Link
                key={t.id}
                href={`/org/tournaments/${t.id}`}
                className="card p-4 block hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrophyIcon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{t.name}</h4>
                      <p className="text-xs text-[var(--color-muted)]">
                        {t.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${t.statusColor === "orange"
                      ? "bg-primary/15 text-primary"
                      : t.statusColor === "green"
                        ? "bg-[var(--color-success)]/15 text-[var(--color-success)]"
                        : "bg-[var(--color-error)]/15 text-[var(--color-error)]"
                      }`}
                  >
                    {t.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[var(--color-muted)]">
                  <span className="flex items-center gap-1"><MapPinIcon size={12} /> {t.location}</span>
                  <span className="flex items-center gap-1"><UsersIcon size={12} /> {t.players}/64</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[var(--color-muted)] mt-1">
                  <span className="flex items-center gap-1"><CalendarIcon size={12} /> {t.date}</span>
                  <span className="flex items-center gap-1"><WalletIcon size={12} /> {t.entryFee}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Past Tab - Empty State */}
        {activeTab === "past" && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto bg-[var(--color-surface-elevated)] rounded-full flex items-center justify-center mb-4">
              <TrophyIcon size={32} className="text-[var(--color-muted)]" />
            </div>
            <p className="text-[var(--color-muted)]">No past tournaments</p>
            <p className="text-sm text-[var(--color-muted)]">
              Create a tournament to get started
            </p>
          </div>
        )}

        {/* Drafts Tab */}
        {activeTab === "drafts" && (
          <div className="space-y-3">
            {drafts.map((d) => (
              <div
                key={d.id}
                className="card p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                      <TrophyIcon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{d.name}</h4>
                      <p className="text-xs text-[var(--color-muted)]">
                        {d.description}
                      </p>
                    </div>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-orange-500" />
                </div>
                <p className="text-xs text-[var(--color-muted)] mb-3">
                  Created: {d.createdDate}
                </p>
                <button className="w-full py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium hover:border-primary transition-colors flex items-center justify-center gap-2">
                  <EditIcon size={14} /> Complete Draft
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Filters Modal */}
        {showFilters && (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setShowFilters(false)}
            />
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface)] rounded-t-2xl p-4 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Refine Results</h3>
                <button className="text-primary text-sm">Reset All</button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Sport
                </label>
                <div className="flex flex-wrap gap-2">
                  {["All", "Table Tennis", "Badminton", "Padel", "Pickleball", "Squash"].map(
                    (sport) => (
                      <button
                        key={sport}
                        className={`px-3 py-1.5 rounded-full text-sm ${sport === "All"
                          ? "bg-primary text-white"
                          : "bg-[var(--color-surface-elevated)] hover:border-primary"
                          }`}
                      >
                        {sport}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Search location
                </label>
                <input
                  type="text"
                  placeholder="Type city or venue..."
                  className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Raipur", "Indore", "Goa", "Delhi", "Mumbai"].map((city) => (
                    <span
                      key={city}
                      className="px-3 py-1 rounded-full text-xs bg-[var(--color-surface-elevated)]"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Schedule Window
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="DD-MM-YYYY"
                    className="px-4 py-3 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] text-sm"
                  />
                  <input
                    type="text"
                    placeholder="DD-MM-YYYY"
                    className="px-4 py-3 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] text-sm"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="w-full py-3 rounded-xl font-semibold text-white"
                style={{ background: "var(--gradient-orange)" }}
              >
                Apply Changes
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
