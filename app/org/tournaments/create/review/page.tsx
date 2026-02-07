"use client";

import React, { useState } from "react";
import Link from "next/link";
import { XIcon, CheckIcon, ArrowLeftIcon } from "@/components/Icons";

export default function ReviewTournamentPage() {
    const [showSuccess, setShowSuccess] = useState(false);

    const tournamentDetails = {
        name: "Andheri Doubles 2025",
        startDate: "01/01/2026",
        registrationDueDate: "26/12/2025",
        expectedEndDate: "12/02/2026",
    };

    const venueDetails = {
        name: "Andheri West Court",
        location: "Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        courts: "3 Courts",
    };

    const events = [
        {
            name: "Men's Doubles 2025",
            startDate: "12/01/2026, 9:00 IST",
            gender: "Male",
            type: "Doubles",
            sets: "Best of 3",
            paymentAt: "Venue",
            fee: "₹ 500",
        },
        {
            name: "Women's Doubles 2025",
            startDate: "12/01/2026, 9:00 IST",
            gender: "Female",
            type: "Doubles",
            sets: "Best of 3",
            paymentAt: "Venue",
            fee: "₹ 500",
        },
    ];

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center p-6">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckIcon size={48} className="text-green-500" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Tournament Published!</h1>
                <p className="text-[var(--color-muted)] text-center mb-8">
                    Your tournament is now live and accepting registrations.
                </p>
                <Link
                    href="/org/tournaments"
                    className="btn-primary w-full max-w-sm text-center"
                >
                    View Tournaments
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] p-4 flex items-center justify-between">
                <h1 className="font-semibold">Publish Tournament</h1>
                <Link
                    href="/org/tournaments/create"
                    className="p-2 hover:bg-[var(--color-surface-elevated)] rounded-lg"
                >
                    <XIcon size={20} />
                </Link>
            </div>

            <div className="p-4 space-y-6 pb-24">
                <h2 className="font-semibold text-lg">Review and publish Tournament</h2>

                {/* Tournament Details */}
                <div className="card p-4">
                    <h3 className="font-semibold mb-4">Tournament Details</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-[var(--color-muted)]">Name:</span>
                            <span className="font-medium">{tournamentDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--color-muted)]">Start Date:</span>
                            <span className="font-medium">{tournamentDetails.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--color-muted)]">Registration Due Date:</span>
                            <span className="font-medium">
                                {tournamentDetails.registrationDueDate}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--color-muted)]">Expected End Date:</span>
                            <span className="font-medium">
                                {tournamentDetails.expectedEndDate}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Venue Details */}
                <div className="card p-4">
                    <h3 className="font-semibold mb-4">Venue</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-[var(--color-muted)]">Venue Name:</span>
                            <span className="font-medium">{venueDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--color-muted)]">Location:</span>
                            <span className="font-medium">{venueDetails.location}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--color-muted)]">City:</span>
                            <span className="font-medium">{venueDetails.city}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--color-muted)]">State:</span>
                            <span className="font-medium">{venueDetails.state}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--color-muted)]">Courts:</span>
                            <span className="font-medium">{venueDetails.courts}</span>
                        </div>
                    </div>
                </div>

                {/* Events */}
                <div className="card p-4">
                    <h3 className="font-semibold mb-4">Events</h3>
                    <div className="space-y-4">
                        {events.map((event, idx) => (
                            <details key={idx} className="group">
                                <summary className="flex items-center justify-between cursor-pointer list-none">
                                    <span className="font-medium">{event.name}</span>
                                    <svg
                                        className="w-5 h-5 text-[var(--color-muted)] group-open:rotate-180 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </summary>
                                <div className="mt-3 pt-3 border-t border-[var(--color-border)] space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-muted)]">Event Start Date:</span>
                                        <span>{event.startDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-muted)]">Gender:</span>
                                        <span>{event.gender}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-muted)]">Type:</span>
                                        <span>{event.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-muted)]">Sets:</span>
                                        <span>{event.sets}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-muted)]">Payment at:</span>
                                        <span>{event.paymentAt}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-muted)]">Fee:</span>
                                        <span>{event.fee}</span>
                                    </div>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex justify-between items-center">
                <Link
                    href="/org/tournaments/create/event"
                    className="text-[var(--color-muted)] flex items-center gap-1"
                >
                    <ArrowLeftIcon size={16} /> Previous
                </Link>
                <button
                    onClick={() => setShowSuccess(true)}
                    className="px-6 py-2 rounded-lg font-semibold text-white flex items-center gap-2"
                    style={{ background: "var(--gradient-orange)" }}
                >
                    Publish Tournament
                </button>
            </div>
        </div>
    );
}
