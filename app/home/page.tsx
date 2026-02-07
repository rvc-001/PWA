"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import Tabs, { type TabItem } from "@/components/Tabs";
import TournamentCard from "@/components/Card/TournamentCard";
import ColorfulTournamentCard from "@/components/Card/ColorfulTournamentCard";
import MatchCard from "@/components/Card/MatchCard";
import QuickStats from "@/components/QuickStats";
import ScheduleCard from "@/components/ScheduleCard";
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
    name: "Champions League",
    orgId: "o1",
    startDate: "01/02/2024",
    status: "live",
    registeredCount: 32,
    location: "Mumbai",
  },
];

const colorfulTournaments = [
  {
    id: "1",
    name: "Monsoon Pickleball Open",
    location: "Raipur | Men's Doubles | Main-#52",
    dateRange: "Start: 15/01/2024End: 20/01/2024",
    entryFee: "₹USD",
    registeredCount: 64,
    colorVariant: "orange" as const,
  },
  {
    id: "2",
    name: "Mumbai Men's 2025",
    location: "Ghatkopar | Squash",
    dateRange: "Start: 01/02/2025End: 05/02/2025",
    entryFee: "₹1400",
    registeredCount: 4,
    colorVariant: "green" as const,
  },
];

const liveMatches = [
  {
    id: "m1",
    tournament: "Raipur Racket Sports League",
    location: "Men's Doubles • Match #42",
    stage: "Stage 2",
    team1: {
      players: [
        { name: "S. Williams", initials: "SW" },
        { name: "V. Gupta", initials: "VG" },
      ],
      score: 11,
    },
    team2: {
      players: [
        { name: "J. Bhasin", initials: "JB" },
        { name: "K. Patil", initials: "KP" },
      ],
      score: 9,
    },
    status: "live" as const,
  },
  {
    id: "m2",
    tournament: "Bhopal Summer Open",
    location: "Men's Doubles • Match #12",
    stage: "Stage 2",
    team1: {
      players: [
        { name: "S. Williams", initials: "SW" },
        { name: "V. Gupta", initials: "VG" },
      ],
      score: 11,
    },
    team2: {
      players: [
        { name: "J. Bhasin", initials: "JB" },
        { name: "K. Patil", initials: "KP" },
      ],
      score: 9,
    },
    status: "live" as const,
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("explore");
  const [followingMatches, setFollowingMatches] = useState<string[]>([]);

  const toggleFollow = (matchId: string) => {
    setFollowingMatches((prev) =>
      prev.includes(matchId)
        ? prev.filter((id) => id !== matchId)
        : [...prev, matchId]
    );
  };

  return (
    <Layout title="Home">
      <div className="p-4 space-y-6 pb-24">
        <Tabs
          tabs={homeTabs}
          activeId={activeTab}
          onChange={setActiveTab}
          ariaLabel="Home sections"
        />

        {/* EXPLORE TAB */}
        {activeTab === "explore" && (
          <>
            {/* Browse & Join Section */}
            <section>
              <h2 className="text-xl font-bold mb-1">BROWSE & JOIN</h2>
              <p className="text-sm text-[var(--color-muted)] mb-4">
                Upcoming tournaments near you
              </p>
              <div className="flex gap-2 mb-4">
                <Link
                  href="/tournaments"
                  className="px-5 py-2.5 rounded-[var(--radius-button)] text-white text-sm font-semibold min-h-[44px] flex items-center transition-transform active:scale-95"
                  style={{ background: "var(--gradient-orange)" }}
                >
                  Register Now
                </Link>
                <Link
                  href="/tournaments"
                  className="px-5 py-2.5 rounded-[var(--radius-button)] border-2 border-primary text-primary text-sm font-semibold min-h-[44px] flex items-center transition-colors hover:bg-primary/5"
                >
                  Explore All
                </Link>
              </div>
            </section>

            {/* Quick Match Section */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Quick Match</h3>
                <Link href="/match/demo" className="text-sm text-primary inline-flex items-center gap-1">
                  Start a match
                  <ChevronRightIcon size={16} className="text-primary" />
                </Link>
              </div>
              <Link
                href="/match/demo"
                className="block p-5 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-primary/30 transition-colors shadow-[var(--shadow-card)]"
              >
                <p className="text-sm text-[var(--color-text)]">
                  <span className="font-medium">Invite players</span> and manage
                  scoring quickly
                </p>
              </Link>
            </section>

            {/* Upcoming Tournaments */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Upcoming Tournaments</h3>
                <Link href="/tournaments" className="text-sm text-primary">
                  VIEW ALL
                </Link>
              </div>
              <div className="grid gap-4">
                {colorfulTournaments.map((t) => (
                  <ColorfulTournamentCard key={t.id} {...t} />
                ))}
              </div>
            </section>

            {/* Ongoing Tournaments */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Ongoing Tournaments</h3>
                <Link href="/tournaments" className="text-sm text-primary">
                  VIEW ALL
                </Link>
              </div>
              <ul className="space-y-3">
                {mockTournaments.map((t) => (
                  <li key={t.id}>
                    <TournamentCard tournament={t} cta="View" />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {/* LIVE FEED TAB */}
        {activeTab === "live" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Live Matches</h2>
            {liveMatches.map((match) => (
              <MatchCard
                key={match.id}
                {...match}
                isFollowing={followingMatches.includes(match.id)}
                onFollow={() => toggleFollow(match.id)}
              />
            ))}
          </div>
        )}

        {/* MY SPACE TAB */}
        {activeTab === "myspace" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <QuickStats />

            {/* Your Live Match */}
            <section>
              <h3 className="font-semibold mb-3">Your Live Match</h3>
              <MatchCard
                {...liveMatches[0]}
                isFollowing={true}
                onFollow={() => { }}
              />
            </section>

            {/* Your Tournaments */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Your Tournaments</h3>
                <Link href="/tournaments" className="text-sm text-primary">
                  VIEW ALL
                </Link>
              </div>
              <ul className="space-y-3">
                {mockTournaments.slice(0, 2).map((t) => (
                  <li key={t.id}>
                    <TournamentCard tournament={t} cta="View" />
                  </li>
                ))}
              </ul>
            </section>

            {/* Next On Court */}
            <section>
              <h3 className="font-semibold mb-3">Next On Court</h3>
              <div className="space-y-3">
                <ScheduleCard
                  sport="Volleyball Semi - Final"
                  matchName="Men's Doubles • Super League"
                  venue="Raipur Sports Academy"
                  time="2 hours ago"
                  colorVariant="volleyball"
                />
                <ScheduleCard
                  sport="Regional Qualifier Final"
                  matchName="Mixed Doubles • Court #1"
                  venue="Baji Prabhu Deshpande"
                  time="3 Mins"
                  opponent="Lia & Co."
                  colorVariant="basketball"
                />
                <ScheduleCard
                  sport="Badminton Quarter Final"
                  matchName="Court 3 (Raipur Sports Academy)"
                  venue="Sunny Center"
                  time="5 Mins"
                  colorVariant="badminton"
                />
              </div>
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
}
