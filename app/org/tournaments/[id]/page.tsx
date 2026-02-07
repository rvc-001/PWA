"use client";

import React, { useState } from "react";
import Link from "next/link";
import Tabs, { type TabItem } from "@/components/Tabs";
import { TrophyIcon, DownloadIcon, CalendarIcon, UserIcon, UsersIcon, ChartIcon, ArrowLeftIcon, ChevronRightIcon, CheckIcon } from "@/components/Icons";

const tabs: TabItem[] = [
  { id: "overview", label: "Overview" },
  { id: "events", label: "Events" },
  { id: "live", label: "Live" },
];

const events = [
  {
    id: "1",
    name: "Pickle Ball Men's",
    category: "U-17 Open | Pickleball",
    registrations: "Open",
    registered: 32,
    total: 18,
    status: "open",
  },
  {
    id: "2",
    name: "Pickle Ball Men's",
    category: "U-17 Open | Pickleball",
    registrations: "Open",
    registered: 32,
    total: 16,
    status: "open",
  },
];

const athletes = [
  { name: "Adit Kumar", avatar: "AK" },
  { name: "Ajay Chand", avatar: "AC" },
  { name: "Ajay Gupta", avatar: "AG" },
  { name: "Akhil Shah", avatar: "AS" },
  { name: "Akshay Yadav", avatar: "AY" },
];

export default function TournamentEventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/org/tournaments" className="p-2 -ml-2">
            <ArrowLeftIcon size={20} />
          </Link>
          <h1 className="font-semibold">Mumbai Men&apos;s 2025</h1>
        </div>
        <button className="text-primary text-sm font-medium"><DownloadIcon size={18} /></button>
      </div>

      {/* Stats Banner */}
      <div className="p-4 bg-[var(--color-surface)]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <TrophyIcon size={20} className="text-primary" />
            </div>
            <span className="text-2xl font-bold">64</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xl font-bold">64</p>
              <p className="text-xs text-[var(--color-muted)]">Registered</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)] text-sm font-medium">
              Registration
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <Tabs
          tabs={tabs}
          activeId={activeTab}
          onChange={setActiveTab}
          ariaLabel="Event sections"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 pb-24">
        {activeTab === "overview" && (
          <>
            {/* Overview Section */}
            <section className="card p-4">
              <h3 className="font-semibold mb-2">Overview</h3>
              <div className="text-sm space-y-1 text-[var(--color-muted)]">
                <p className="flex items-center gap-1"><CalendarIcon size={14} /> 4 Dec 2025, 21:01</p>
                <p className="flex items-center gap-1"><CalendarIcon size={14} /> 21 Dec 2025, 21:01</p>
              </div>
              <p className="text-sm mt-2">
                Venue, 2 Doubles, Sunday, Wednesday
              </p>
            </section>

            <section className="card p-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-[var(--color-muted)]">
                Join the biggest Pickle ball tournament in the city. Open to all
                above men&apos;s and all city athle...
              </p>
            </section>

            <section className="card p-4">
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <UserIcon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Priyash Mandal</p>
                  <p className="text-sm text-[var(--color-muted)]">
                    +91 99212 48196
                  </p>
                  <p className="text-xs text-primary">
                    Email2019123@gmail.com
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === "events" && (
          <>
            <h3 className="font-semibold">{events.length} Events</h3>
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/org/tournaments/${params.id}/events/${event.id}`}
                className="card p-4 block"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{event.name}</h4>
                    <p className="text-xs text-[var(--color-muted)]">
                      {event.category}
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)] text-xs font-medium inline-flex items-center gap-1">
                    <CheckIcon size={14} className="text-[var(--color-success)]" />
                    Registrations: {event.registrations}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[var(--color-muted)]">
                  <span className="flex items-center gap-1"><UsersIcon size={14} /> {event.registered}</span>
                  <span className="flex items-center gap-1"><ChartIcon size={14} /> {event.total}</span>
                </div>
                <p className="text-xs text-primary mt-2 flex items-center gap-1">
                  View More Details <ChevronRightIcon size={12} />
                </p>
              </Link>
            ))}
          </>
        )}

        {activeTab === "live" && (
          <>
            <h3 className="font-semibold">Athletes</h3>
            <div className="space-y-2">
              {athletes.map((athlete, idx) => (
                <div
                  key={idx}
                  className="card p-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-medium text-sm">
                    {athlete.avatar}
                  </div>
                  <span className="font-medium">{athlete.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
