"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import Tabs, { type TabItem } from "@/components/Tabs";
import ScheduleCard from "@/components/ScheduleCard";
import ColorfulTournamentCard from "@/components/Card/ColorfulTournamentCard";
import { TrophyIcon } from "@/components/Icons";
import QuickMatchFlow from "@/components/QuickMatch/QuickMatchFlow";

const homeTabs: TabItem[] = [
  { id: "explore", label: "Explore" },
  { id: "live", label: "Live Feed" },
  { id: "myspace", label: "My Space" },
];

const exploreTournaments = [
  {
    id: "101",
    name: "Monsoon Pickleball Open",
    venue: "Raipur Sports Arena",
    address: "Raipur, Chhattisgarh",
    sport: "Pickleball",
    category: "Men's",
    modes: "Singles",
    colorVariant: "orange" as const,
    logoText: "MP",
    entryFee: "INR 500",
  },
  {
    id: "102",
    name: "National Tennis Championship",
    venue: "Delhi Sports Complex",
    address: "New Delhi",
    sport: "Tennis",
    category: "Men's & Women's",
    modes: "Singles & Doubles",
    colorVariant: "green" as const,
    logoText: "NT",
    entryFee: "INR 1200",
  },
];

const liveMatches = [
  {
    id: "l1",
    sport: "Badminton",
    matchName: "Finals - Men's Singles",
    venue: "Court 1",
    time: "LIVE NOW",
    score: "21-19, 15-10",
    colorVariant: "badminton" as const,
  },
  {
    id: "l2",
    sport: "Tennis",
    matchName: "Semi-Final - Women's Doubles",
    venue: "Center Court",
    time: "LIVE NOW",
    score: "6-4, 2-1",
    colorVariant: "volleyball" as const,
  },
];

export default function UserHomePage() {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div className="font-body flex min-h-screen flex-col bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <TopNav />
        <div className="mx-auto w-full max-w-md px-4">
          <Tabs tabs={homeTabs} activeId={activeTab} onChange={setActiveTab} ariaLabel="Home sections" />
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 overflow-y-auto px-4 pb-28 pt-4">
        {activeTab === "explore" && (
          <div className="space-y-5">
            <section className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">Browse and Join</h2>
              <p className="mt-1 font-heading text-2xl font-semibold">Upcoming tournaments</p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Compete with the best players near you.</p>
              <div className="mt-4 flex gap-3">
                <Link
                  href="/user/tournaments"
                  className="grid h-10 flex-1 place-content-center rounded-xl bg-primary text-sm font-medium text-white"
                >
                  Register Now
                </Link>
                <Link
                  href="/user/tournaments"
                  className="grid h-10 flex-1 place-content-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </section>

            <QuickMatchFlow />

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-semibold">Featured Events</h3>
                <Link href="/user/tournaments" className="text-xs font-medium uppercase text-primary">View All</Link>
              </div>
              <div className="space-y-4">
                {exploreTournaments.map((t) => (
                  <ColorfulTournamentCard
                    key={t.id}
                    id={t.id}
                    name={t.name}
                    venue={t.venue}
                    address={t.address}
                    sport={t.sport}
                    category={t.category}
                    modes={t.modes}
                    colorVariant={t.colorVariant}
                    logoText={t.logoText}
                    entryFee={t.entryFee}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "live" && (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-1">
              <span className="mr-2 h-2.5 w-2.5 rounded-full bg-[var(--color-error)]" />
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">Live Action</h3>
            </div>
            {liveMatches.map((match) => (
              <ScheduleCard
                key={match.id}
                sport={match.sport}
                matchName={match.matchName}
                venue={match.venue}
                time={match.time}
                colorVariant={match.colorVariant}
                opponent={`Score: ${match.score}`}
              />
            ))}
          </div>
        )}

        {activeTab === "myspace" && (
          <div className="space-y-5">
            <section className="grid grid-cols-3 gap-3">
              <div className="card p-4 text-center">
                <p className="font-heading text-3xl font-bold text-primary">28</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-[var(--color-muted)]">Won</p>
              </div>
              <div className="card p-4 text-center">
                <p className="font-heading text-3xl font-bold">38</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-[var(--color-muted)]">Played</p>
              </div>
              <div className="card p-4 text-center">
                <p className="font-heading text-3xl font-bold">12</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-[var(--color-muted)]">Lost</p>
              </div>
            </section>

            <section>
              <h3 className="mb-3 font-heading text-xl font-semibold">Your Tournaments</h3>
              <Link href="/user/tournaments" className="card block p-4 hover:border-primary/40">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-content-center rounded-full bg-primary/15 text-primary">
                    <TrophyIcon size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">Raipur League 2025</h4>
                    <p className="text-xs text-[var(--color-muted)]">View tournament events and brackets</p>
                  </div>
                </div>
              </Link>
            </section>

            <section>
              <h3 className="mb-3 font-heading text-xl font-semibold">Next On Court</h3>
              <div className="card border-l-4 border-l-primary p-4">
                <div className="mb-2 flex items-start justify-between">
                  <span className="text-xs font-semibold uppercase text-primary">Quarter Final</span>
                  <span className="text-xs text-[var(--color-muted)]">Dec 18</span>
                </div>
                <h4 className="font-heading text-xl font-semibold">Pickleball Singles</h4>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Regional Semi-Final - Court 3</p>
              </div>
            </section>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>
    </div>
  );
}