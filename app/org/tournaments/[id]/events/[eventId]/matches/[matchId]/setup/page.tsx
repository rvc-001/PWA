"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, TimerIcon, InfoIcon, ChevronRightIcon } from "@/components/Icons";

export default function MatchSetupPage() {
    const [initialServer, setInitialServer] = useState<1 | 2>(1);
    const [scoringSystem, setScoringSystem] = useState<"sideout" | "rally">("sideout");
    const [matchFormat, setMatchFormat] = useState("best-of-3");
    const [showServeDropdown, setShowServeDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/org/tournaments/1/events/1/matches" className="p-2 -ml-2">
                        <ArrowLeftIcon size={20} />
                    </Link>
                    <h1 className="font-semibold">Match Setup</h1>
                </div>
                <button className="text-primary"><TimerIcon size={20} /></button>
            </div>

            <div className="p-4 space-y-6 pb-24">
                {/* Court Visualization */}
                <div>
                    <h3 className="font-medium mb-3">Select Player Sides</h3>
                    <div className="relative bg-green-600 rounded-xl p-4 aspect-[4/3]">
                        {/* Court lines */}
                        <div className="absolute inset-4 border-2 border-white/80 rounded-lg" />
                        <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-white/80" />

                        {/* Player positions */}
                        <div className="absolute left-6 top-6">
                            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                                1
                            </div>
                        </div>
                        <div className="absolute right-6 top-6">
                            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                                +
                            </div>
                        </div>
                        <div className="absolute left-6 bottom-6">
                            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                                +
                            </div>
                        </div>
                        <div className="absolute right-6 bottom-6">
                            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                                +
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-[var(--color-muted)] mt-2 text-center flex items-center justify-center gap-1">
                        <InfoIcon size={14} /> Side may switch during the match per rules.
                    </p>
                </div>

                {/* Initial Server */}
                <div>
                    <h3 className="font-medium mb-3">Initial Server</h3>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setInitialServer(1)}
                            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors ${initialServer === 1
                                ? "bg-primary text-white"
                                : "bg-[var(--color-surface-elevated)] border border-[var(--color-border)]"
                                }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-current" />
                            Player 1
                        </button>
                        <button
                            onClick={() => setInitialServer(2)}
                            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors ${initialServer === 2
                                ? "bg-primary text-white"
                                : "bg-[var(--color-surface-elevated)] border border-[var(--color-border)]"
                                }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-current" />
                            Player 2
                        </button>
                    </div>
                </div>

                {/* Scoring System */}
                <div>
                    <h3 className="font-medium mb-3">Scoring System</h3>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setScoringSystem("sideout")}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${scoringSystem === "sideout"
                                ? "bg-primary text-white"
                                : "bg-[var(--color-surface-elevated)] border border-[var(--color-border)]"
                                }`}
                        >
                            Side-out Scoring
                        </button>
                        <button
                            onClick={() => setScoringSystem("rally")}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${scoringSystem === "rally"
                                ? "bg-primary text-white"
                                : "bg-[var(--color-surface-elevated)] border border-[var(--color-border)]"
                                }`}
                        >
                            Rally Scoring
                        </button>
                    </div>
                </div>

                {/* Match Format */}
                <div>
                    <h3 className="font-medium mb-3">Match Format</h3>
                    <select
                        value={matchFormat}
                        onChange={(e) => setMatchFormat(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
                    >
                        <option value="best-of-3">Best of 3</option>
                        <option value="best-of-5">Best of 5</option>
                        <option value="single">Single Game</option>
                    </select>
                    <p className="text-sm text-[var(--color-muted)] mt-2">
                        11 points to win
                    </p>
                </div>

                {/* Time Out Rules */}
                <div>
                    <h3 className="font-medium mb-3">Time out Rules</h3>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
                            <span>Match time limit</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
                            <span>Warm up timer</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 rounded" />
                            <span>No time outs</span>
                        </label>
                    </div>
                </div>

                {/* Serve Rotation */}
                <div>
                    <h3 className="font-medium mb-3">Serve Rotation</h3>
                    <select
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
                    >
                        <option>Switch side every set</option>
                        <option>Switch sides at 6 points (Set to 11)</option>
                        <option>Switch sides at 8 points (Set to 15)</option>
                        <option>No side switching</option>
                    </select>
                </div>
            </div>

            {/* Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
                <Link
                    href="/org/tournaments/1/events/1/matches/1/live"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-semibold text-white"
                    style={{ background: "var(--gradient-orange)" }}
                >
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <ChevronRightIcon size={18} />
                    </span>
                    Swipe to start match
                </Link>
            </div>
        </div>
    );
}
