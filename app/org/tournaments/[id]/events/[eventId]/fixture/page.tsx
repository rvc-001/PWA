"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, DownloadIcon, InfoIcon, CheckIcon } from "@/components/Icons";

const remainingPlayers = [
    { id: "1", name: "Anil Kumar", avatar: "AK", selected: false },
    { id: "2", name: "Lokesh Verma", avatar: "LV", selected: false },
    { id: "3", name: "Amit Singh", avatar: "AS", selected: false },
    { id: "4", name: "HN Pradhan Pai", avatar: "HP", selected: false },
    { id: "5", name: "Rishabh Tiwari", avatar: "RT", selected: false },
    { id: "6", name: "Sumeet Yadav", avatar: "SY", selected: false },
];

const matches = [
    { match: 1, player1: null, player2: null },
    { match: 2, player1: null, player2: null },
    { match: 3, player1: null, player2: null },
    { match: 4, player1: null, player2: null },
];

export default function FixtureSetupPage() {
    const [players, setPlayers] = useState(remainingPlayers);
    const [showByeModal, setShowByeModal] = useState(false);
    const [step, setStep] = useState<"players" | "matches">("players");

    const selectedCount = players.filter((p) => p.selected).length;

    const togglePlayer = (id: string) => {
        setPlayers(
            players.map((p) =>
                p.id === id ? { ...p, selected: !p.selected } : p
            )
        );
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] p-4 flex items-center gap-3">
                <Link href="/org/tournaments/1/events/1/participants" className="p-2 -ml-2">
                    <ArrowLeftIcon size={20} />
                </Link>
                <h1 className="font-semibold">Fixture & Bracket Setup</h1>
            </div>

            {/* Event Info */}
            <div className="p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
                <h2 className="font-semibold">Pickle Ball Men&apos;s 2025</h2>
                <p className="text-sm text-[var(--color-muted)]">
                    32 Participants • 7 Rounds
                </p>
            </div>

            {step === "players" && (
                <div className="p-4 space-y-4 pb-24">
                    {/* Remaining Players Section */}
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                            Remaining Players ({players.length}/{players.length})
                        </h3>
                        <button className="text-sm text-primary">↑↓</button>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="flex items-center gap-1"><DownloadIcon size={14} /> Auto fill Participants in events</span>
                    </div>

                    <div className="space-y-2">
                        {players.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => togglePlayer(p.id)}
                                className={`w-full card p-3 flex items-center gap-3 text-left transition-colors ${p.selected ? "border-primary bg-primary/5" : ""
                                    }`}
                            >
                                <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${p.selected
                                        ? "border-primary bg-primary"
                                        : "border-[var(--color-border)]"
                                        }`}
                                >
                                    {p.selected && (
                                        <CheckIcon size={12} className="text-white" />
                                    )}
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-medium">
                                    {p.avatar}
                                </div>
                                <span className="font-medium">{p.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Matches Section */}
                    <h3 className="font-semibold pt-4">Matches</h3>
                    <div className="space-y-3">
                        {matches.map((m) => (
                            <div key={m.match} className="card p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-[var(--color-muted)]">
                                        Match {m.match}
                                    </span>
                                    <span className="text-xs px-2 py-1 rounded bg-[var(--color-surface-elevated)]">
                                        +
                                    </span>
                                </div>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex-1 text-center">
                                        <div className="w-10 h-10 mx-auto rounded-full bg-[var(--color-surface-elevated)] flex items-center justify-center mb-1">
                                            +
                                        </div>
                                        <p className="text-xs text-[var(--color-muted)]">Vs</p>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <div className="w-10 h-10 mx-auto rounded-full bg-[var(--color-surface-elevated)] flex items-center justify-center mb-1">
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex gap-3">
                <button className="flex-1 py-3 rounded-xl border border-[var(--color-border)] font-medium">
                    Publish Fixture
                </button>
                <button
                    onClick={() => setShowByeModal(true)}
                    className="flex-1 py-3 rounded-xl font-semibold text-white"
                    style={{ background: "var(--gradient-orange)" }}
                >
                    Publish Fixture
                </button>
            </div>

            {/* Bye Match Modal */}
            {showByeModal && (
                <>
                    <div
                        className="fixed inset-0 z-50 bg-black/60"
                        onClick={() => setShowByeModal(false)}
                    />
                    <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 bg-[var(--color-surface)] rounded-2xl p-6 max-w-sm mx-auto">
                        <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 mb-4">
                            <h3 className="font-bold text-center text-lg mb-1">
                                BRACKET ADJUSTMENT NEEDED
                            </h3>
                            <p className="text-sm text-center text-[var(--color-muted)] flex items-center justify-center gap-1">
                                <InfoIcon size={14} /> 3 participants are left
                            </p>
                            <p className="text-sm text-center text-blue-500">
                                Are you willing to give them a bye?
                            </p>
                        </div>

                        <div className="flex items-start gap-2 mb-6">
                            <CheckIcon size={14} className="text-green-500" />
                            <p className="text-sm text-[var(--color-muted)]">
                                Once published, fixtures will be visible to players. You can
                                edit them later.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowByeModal(false)}
                                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium"
                            >
                                Remove participants
                            </button>
                            <Link
                                href="/org/tournaments/1/events/1/matches"
                                className="flex-1 py-3 rounded-xl bg-green-500 text-white font-medium text-center"
                            >
                                Give Bye
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
