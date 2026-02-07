"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Tabs, { type TabItem } from "@/components/Tabs";
import EventCard from "@/components/Card/EventCard";
import Link from "next/link";
import type { Event } from "@/types/models";
import { ArrowLeftIcon } from "@/components/Icons";

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
    startDate: "20 Oct 2025",
    regDueDate: "15 Oct 2025",
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
    startDate: "20 Oct 2025",
    entryFee: 1400,
    paymentOption: "venue",
    status: "open",
  },
];

export default function TournamentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("about");

  return (
    <Layout showBottomNav={true}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px] min-w-[44px]"
            aria-label="Back"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-xl font-semibold truncate">Mumbai Men&apos;s 2025</h1>
        </div>
        <div className="flex gap-2 mb-4">
          <span className="text-sm text-[var(--color-muted)]">64 Registered</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)]">
            Registration Open
          </span>
        </div>
        <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} ariaLabel="Tournament sections" />
        {activeTab === "about" && (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-[var(--color-muted)]">Start Date: 31 Dec 2025 · Venue: Athlete&apos;s Club, Mumbai</p>
            <p className="text-sm">Description and contact info go here.</p>
            <Link
              href={`/tournaments/${id}?tab=events`}
              onClick={(e) => { e.preventDefault(); setActiveTab("events"); }}
              className="block w-full min-h-[44px] rounded-[var(--radius-button)] bg-primary text-white font-medium flex items-center justify-center"
            >
              Select Event
            </Link>
          </div>
        )}
        {activeTab === "events" && (
          <ul className="mt-4 space-y-3">
            {mockEvents.map((ev) => (
              <li key={ev.id}>
                <EventCard event={ev} cta="Add" onCta={() => {}} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
