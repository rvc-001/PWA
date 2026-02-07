"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import Tabs, { type TabItem } from "@/components/Tabs";
import TournamentCard from "@/components/Card/TournamentCard";
import Link from "next/link";
import type { TournamentSummary } from "@/types/models";
import { ChevronRightIcon } from "@/components/Icons";

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
    name: "Raipur League",
    orgId: "o1",
    startDate: "01/02/2024",
    status: "live",
    registeredCount: 32,
    location: "Raipur",
  },
];

export default function UserHomePage() {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <Layout title="Home">
      <div className="p-4 space-y-6">
        <Tabs tabs={homeTabs} activeId={activeTab} onChange={setActiveTab} ariaLabel="Home sections" />
        {activeTab === "explore" && (
          <>
            <section className="rounded-[var(--radius-card)] bg-primary/10 border border-primary/20 p-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Browse & Join</h2>
              <p className="text-base font-medium mt-1">Upcoming tournaments near you</p>
              <p className="text-sm text-[var(--color-muted)] mt-0.5">Compete. Track. Rise.</p>
              <div className="flex gap-2 mt-4">
                <Link
                  href="/user/tournaments"
                  className="flex-1 min-h-[44px] px-4 py-2.5 rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] text-sm font-medium flex items-center justify-center"
                >
                  Register Now
                </Link>
                <Link
                  href="/user/tournaments"
                  className="flex-1 min-h-[44px] px-4 py-2.5 rounded-[var(--radius-button)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-medium flex items-center justify-center"
                >
                  Explore All
                </Link>
              </div>
            </section>
            <section>
              <Link
                href="/match/demo"
                className="block p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)]"
              >
                <h3 className="font-medium">Quick Match</h3>
                <p className="text-sm text-[var(--color-muted)] mt-1">Invite players and manage scoring quickly</p>
                <span className="text-primary text-sm font-medium mt-2 inline-flex items-center gap-1">
                  Start
                  <ChevronRightIcon size={16} className="text-primary" />
                </span>
              </Link>
            </section>
            <section>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Upcoming Tournaments</h3>
                <Link href="/user/tournaments" className="text-sm text-primary font-medium">VIEW ALL</Link>
              </div>
              <ul className="space-y-3">
                {mockTournaments.filter((t) => t.status === "upcoming").map((t) => (
                  <li key={t.id}>
                    <TournamentCard tournament={t} cta="Register" href={`/user/tournaments/${t.id}`} />
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="font-semibold mb-2">Ongoing Tournaments</h3>
              <ul className="space-y-3">
                {mockTournaments.filter((t) => t.status === "live").map((t) => (
                  <li key={t.id}>
                    <TournamentCard tournament={t} cta="View" href={`/user/tournaments/${t.id}`} />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
        {activeTab === "live" && (
          <section className="space-y-4">
            <p className="text-[var(--color-muted)]">Live matches will appear here.</p>
            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)]">LIVE</span>
              <p className="font-medium mt-2">Raipur Racket Sports League</p>
              <p className="text-sm text-[var(--color-muted)]">Bhopal Summer Open – Men&apos;s Doubles · Match #42</p>
              <p className="text-primary font-semibold mt-1">11-9 · Set 2</p>
            </div>
          </section>
        )}
        {activeTab === "myspace" && (
          <section className="space-y-6">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-center">
                <p className="text-2xl font-bold text-primary">28</p>
                <p className="text-xs text-[var(--color-muted)]">WON</p>
              </div>
              <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-center">
                <p className="text-2xl font-bold">38</p>
                <p className="text-xs text-[var(--color-muted)]">Played</p>
              </div>
              <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-[var(--color-muted)]">Lost</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Your Tournaments</h3>
              <Link
                href="/user/tournaments"
                className="block p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                Raipur League 2025 · View tournament events
              </Link>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Next On Court</h3>
              <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
                <p className="font-medium">Pickleball Quarter Final</p>
                <p className="text-sm text-[var(--color-muted)]">Dec 18 · Regional semi-final</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Past Matches</h3>
              <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)]">WIN</span>
                <p className="font-medium mt-2">Raipur Pro League · Doubles</p>
                <p className="text-sm text-[var(--color-muted)]">You &amp; Arun 21-18 vs Yug &amp; Harsh</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
