"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Tabs, { type TabItem } from "@/components/Tabs";
import EventCard from "@/components/Card/EventCard";
import Link from "next/link";
import type { Event } from "@/types/models";
import { ArrowLeftIcon, ShareIcon, UserIcon } from "@/components/Icons";

const tabs: TabItem[] = [
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
];

const mockEvents: Event[] = [
  {
    id: "e1",
    tournamentId: "1",
    name: "Men's Singles",
    sport: "Pickleball",
    format: "singles",
    startDate: "25 Oct 2025",
    regDueDate: "20 Oct 2025",
    entryFee: 1400,
    paymentOption: "online",
    status: "open",
  },
  {
    id: "e2",
    tournamentId: "1",
    name: "Men's Doubles",
    sport: "Pickleball",
    format: "doubles",
    startDate: "25 Oct 2025",
    regDueDate: "20 Oct 2025",
    entryFee: 1400,
    paymentOption: "venue",
    status: "open",
  },
  {
    id: "e3",
    tournamentId: "1",
    name: "Mixed Doubles",
    sport: "Pickleball",
    format: "mixed",
    startDate: "25 Oct 2025",
    entryFee: 0,
    status: "open",
  },
];

export default function UserTournamentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("about");

  return (
    <Layout showBottomNav>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px] min-w-[44px]"
            aria-label="Back"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-xl font-semibold truncate flex-1 text-center">Mumbai Men&apos;s 2025</h1>
          <button type="button" className="p-2 rounded-lg min-w-[44px] hover:bg-[var(--color-surface-elevated)]" aria-label="Share">
            <ShareIcon size={20} />
          </button>
        </div>
        <div className="flex gap-2 mb-4 p-3 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
          <span className="text-sm text-[var(--color-muted)] flex items-center gap-1">
            <UserIcon size={16} className="text-[var(--color-muted)]" />
            64 Registered
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)]">Registration Open</span>
        </div>
        <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} ariaLabel="Tournament sections" />
        {activeTab === "about" && (
          <div className="mt-4 space-y-4">
            <section>
              <h3 className="font-medium mb-1">Overview</h3>
              <p className="text-sm text-[var(--color-muted)]">Start: 31 Dec 2025, 24:00 · End: 31 Dec 2025, 24:00</p>
              <p className="text-sm text-[var(--color-muted)] mt-1">Venue: Athlete&apos;s Club, 24 Sector, Mumbai, Maharashtra</p>
            </section>
            <section>
              <h3 className="font-medium mb-1">Description</h3>
              <p className="text-sm">Join the biggest Pickleball tournament in the city! Open to all skill levels with exciting prizes.</p>
            </section>
            <section>
              <h3 className="font-medium mb-1">Contact Information</h3>
              <p className="text-sm text-[var(--color-muted)]">Piyush Mantri · +91 92345 34578 · contact@example.com</p>
            </section>
            <Link
              href={`/user/tournaments/${id}/events`}
              onClick={(e) => { e.preventDefault(); setActiveTab("events"); }}
              className="block w-full min-h-[44px] rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium flex items-center justify-center"
            >
              Select Event
            </Link>
          </div>
        )}
        {activeTab === "events" && (
          <ul className="mt-4 space-y-3">
            {mockEvents.map((ev) => (
              <li key={ev.id}>
                <EventCard event={ev} cta="Add" href={`/user/tournaments/${id}/events?event=${ev.id}`} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
