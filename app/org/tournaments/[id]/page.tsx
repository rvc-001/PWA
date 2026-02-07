"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Tabs, { type TabItem } from "@/components/Tabs";
import Link from "next/link";
import { ArrowLeftIcon, EllipsisIcon, XIcon } from "@/components/Icons";

const tabs: TabItem[] = [
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
  { id: "admins", label: "Admins" },
  { id: "scorers", label: "Scorers" },
];

const mockEvents = [
  { id: "e1", name: "Pickle Ball Men's 2025", date: "08 Dec 2025, 9:00 AM", regOpen: true, count: 32 },
];

export default function OrgTournamentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("about");

  return (
    <Layout showBottomNav>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <button type="button" onClick={() => router.back()} className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px] min-w-[44px]" aria-label="Back">
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-xl font-semibold truncate flex-1 text-center">Mumbai Men&apos;s 2025</h1>
          <button type="button" className="p-2 rounded-lg min-w-[44px] hover:bg-[var(--color-surface-elevated)]" aria-label="More">
            <EllipsisIcon size={20} />
          </button>
        </div>
        <div className="flex gap-2 p-3 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
          <span className="text-sm">64 Registered</span>
          <span className="text-sm text-[var(--color-muted)]">24 spots</span>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)]">Open</span>
        </div>
        <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} ariaLabel="Tournament sections" />
        {activeTab === "about" && (
          <div className="mt-4 space-y-4">
            <section>
              <h3 className="font-medium mb-1">Overview</h3>
              <p className="text-sm text-[var(--color-muted)]">Date: 12 Jan, 2026 – 24 Jan, 2026</p>
              <p className="text-sm text-[var(--color-muted)]">Location: Anmol Club, 2B, Mumbai, Maharashtra</p>
            </section>
            <section>
              <h3 className="font-medium mb-1">Description</h3>
              <p className="text-sm">Join the biggest Pickleball tournament in the city!</p>
            </section>
            <section>
              <h3 className="font-medium mb-1">Contact</h3>
              <p className="text-sm text-[var(--color-muted)]">Riyash Hantri · +91 … · contact@example.com</p>
            </section>
          </div>
        )}
        {activeTab === "events" && (
          <ul className="mt-4 space-y-3">
            {mockEvents.map((ev) => (
              <li key={ev.id} className="p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{ev.name}</h3>
                    <p className="text-sm text-[var(--color-muted)]">{ev.date}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)]">Registration Open</span>
                    <span className="text-xs text-[var(--color-muted)] ml-2">{ev.count}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Link href={`/org/tournaments/${id}/events/${ev.id}/participants`} className="min-h-[44px] px-3 py-2 rounded-[var(--radius-button)] bg-[var(--color-success)]/20 text-[var(--color-success)] text-sm font-medium">Participants</Link>
                    <Link href={`/org/tournaments/${id}/events/${ev.id}/fixtures`} className="min-h-[44px] px-3 py-2 rounded-[var(--radius-button)] bg-primary/20 text-primary text-sm font-medium">Fixtures</Link>
                    <Link href={`/org/tournaments/${id}/events/${ev.id}/matches`} className="min-h-[44px] px-3 py-2 rounded-[var(--radius-button)] border border-[var(--color-border)] text-sm font-medium">Matches</Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {activeTab === "admins" && (
          <div className="mt-4">
            <div className="flex gap-2 mb-4">
              <input type="tel" placeholder="Enter Admin's Phone No." className="flex-1 p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]" />
              <button type="button" className="min-h-[44px] px-4 rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium">Add</button>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
                <span className="font-medium">Alex Costa</span>
                <button type="button" className="p-2 -m-2 rounded-lg text-[var(--color-error)] hover:bg-[var(--color-surface-elevated)]" aria-label="Remove">
                  <XIcon size={18} />
                </button>
              </li>
            </ul>
          </div>
        )}
        {activeTab === "scorers" && (
          <div className="mt-4">
            <div className="flex gap-2 mb-4">
              <input type="tel" placeholder="Enter Scorer's Phone No." className="flex-1 p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]" />
              <button type="button" className="min-h-[44px] px-4 rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium">Add</button>
            </div>
            <p className="text-sm text-[var(--color-muted)]">Scorers for this tournament will appear here.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
