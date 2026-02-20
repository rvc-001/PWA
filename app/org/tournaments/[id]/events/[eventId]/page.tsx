"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { UsersIcon, CalendarIcon, ChartIcon, CheckIcon, ChevronRightIcon } from "@/components/Icons";

const eventDetails = {
    name: "Pickleball Men's",
    category: "U-17 Open | Pickleball",
    registrations: "Open",
    registered: 32,
    total: 64,
    startDate: "01 Dec 2026, 8:00 AM",
    status: "open",
};

type Tab = "overview" | "participants" | "matches" | "fixtures";

export default function OrgEventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const tournamentId = String(params.id);
    const eventId = String(params.eventId);
    const [activeTab, setActiveTab] = useState<Tab>("overview");

    const tabs: { id: Tab; label: string }[] = [
        { id: "overview", label: "Overview" },
        { id: "participants", label: "Participants" },
        { id: "matches", label: "Matches" },
        { id: "fixtures", label: "Fixtures" },
    ];

    return (
        <Layout showBack onBack={() => router.back()} title={eventDetails.name}>
            <div className="pb-24">
                {/* Event Stats Banner */}
                <div className="p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <UsersIcon size={18} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold leading-none">{eventDetails.registered}</p>
                                <p className="text-xs text-[var(--color-muted)]">Registered</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
                                <ChartIcon size={18} className="text-[var(--color-success)]" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold leading-none">{eventDetails.total}</p>
                                <p className="text-xs text-[var(--color-muted)]">Total Slots</p>
                            </div>
                        </div>
                        <span className="ml-auto px-3 py-1 rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)] text-sm font-medium inline-flex items-center gap-1">
                            <CheckIcon size={14} className="text-[var(--color-success)]" />
                            {eventDetails.registrations}
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[var(--color-border)] bg-[var(--color-surface)] sticky top-14 z-30">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 h-10 text-sm font-medium transition-colors ${activeTab === tab.id
                                    ? "border-b-2 border-primary text-primary"
                                    : "text-[var(--color-muted)]"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Contents */}
                <div className="p-4 space-y-4">
                    {activeTab === "overview" && (
                        <>
                            <div className="card p-4 space-y-2">
                                <h2 className="font-semibold">Event Details</h2>
                                <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                                    <CalendarIcon size={14} />
                                    <span>{eventDetails.startDate}</span>
                                </div>
                                <p className="text-sm text-[var(--color-muted)]">{eventDetails.category}</p>
                            </div>

                            <div className="space-y-2">
                                <Link
                                    href={`/org/tournaments/${tournamentId}/events/${eventId}/participants`}
                                    className="card p-4 flex items-center justify-between hover:border-primary/40 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                            <UsersIcon size={16} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Participants</p>
                                            <p className="text-xs text-[var(--color-muted)]">Confirm & manage players</p>
                                        </div>
                                    </div>
                                    <ChevronRightIcon size={18} className="text-[var(--color-muted)]" />
                                </Link>

                                <Link
                                    href={`/org/tournaments/${tournamentId}/events/${eventId}/matches`}
                                    className="card p-4 flex items-center justify-between hover:border-primary/40 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                            <ChartIcon size={16} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Manage Matches</p>
                                            <p className="text-xs text-[var(--color-muted)]">Schedule and score matches</p>
                                        </div>
                                    </div>
                                    <ChevronRightIcon size={18} className="text-[var(--color-muted)]" />
                                </Link>

                                <Link
                                    href={`/org/tournaments/${tournamentId}/events/${eventId}/fixtures`}
                                    className="card p-4 flex items-center justify-between hover:border-primary/40 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                            <CalendarIcon size={16} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Fixtures / Bracket</p>
                                            <p className="text-xs text-[var(--color-muted)]">View bracket and draw</p>
                                        </div>
                                    </div>
                                    <ChevronRightIcon size={18} className="text-[var(--color-muted)]" />
                                </Link>
                            </div>
                        </>
                    )}

                    {activeTab === "participants" && (
                        <div className="text-center py-8">
                            <p className="text-[var(--color-muted)] mb-4">Manage participant confirmations</p>
                            <Link
                                href={`/org/tournaments/${tournamentId}/events/${eventId}/participants`}
                                className="btn-primary px-6 py-2 inline-block rounded-[var(--radius-button)]"
                            >
                                Open Participants
                            </Link>
                        </div>
                    )}

                    {activeTab === "matches" && (
                        <div className="text-center py-8">
                            <p className="text-[var(--color-muted)] mb-4">Schedule and score matches</p>
                            <Link
                                href={`/org/tournaments/${tournamentId}/events/${eventId}/matches`}
                                className="btn-primary px-6 py-2 inline-block rounded-[var(--radius-button)]"
                            >
                                Open Matches
                            </Link>
                        </div>
                    )}

                    {activeTab === "fixtures" && (
                        <div className="text-center py-8">
                            <p className="text-[var(--color-muted)] mb-4">View bracket and draw</p>
                            <Link
                                href={`/org/tournaments/${tournamentId}/events/${eventId}/fixtures`}
                                className="btn-primary px-6 py-2 inline-block rounded-[var(--radius-button)]"
                            >
                                Open Fixtures
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
