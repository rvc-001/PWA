"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, EllipsisIcon, UserIcon, TrophyIcon, RefreshIcon, InfoIcon } from "@/components/Icons";

export default function LiveMatchPage() {
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(1);
    const [currentSet, setCurrentSet] = useState(1);
    const [showSwitchSides, setShowSwitchSides] = useState(false);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [showWinner, setShowWinner] = useState(false);

    const handleScore = (player: 1 | 2, action: "won" | "fault") => {
        if (action === "won") {
            if (player === 1) {
                setScore1(score1 + 1);
            } else {
                setScore2(score2 + 1);
            }
        }
        // Check for win condition
        if (score1 >= 10 || score2 >= 10) {
            setShowWinner(true);
        }
    };

    if (showWinner) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center p-6">
                <div className="mb-8 relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <TrophyIcon size={40} className="text-white" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-2 text-center">Winner</h1>
                <h2 className="text-4xl font-bold text-primary mb-4">Kunal Verma</h2>
                <p className="text-xl text-[var(--color-muted)] mb-8">Final Score: 12-08</p>

                <div className="w-full max-w-sm space-y-3">
                    <div className="card p-4">
                        <div className="flex justify-between text-sm">
                            <span>Set 1</span>
                            <span className="font-semibold">00 - 01</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Set 2</span>
                            <span className="font-semibold">--:--</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Set 3</span>
                            <span className="font-semibold">--:--</span>
                        </div>
                    </div>

                    <Link
                        href="/org/tournaments/1/events/1/matches"
                        className="btn-primary w-full text-center"
                    >
                        Confirm Results
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] p-4 flex items-center justify-between">
                <button
                    onClick={() => setShowExitConfirm(true)}
                    className="p-2 -ml-2"
                >
                    <ArrowLeftIcon size={20} />
                </button>
                <h1 className="font-semibold">Live Match</h1>
                <button className="p-2"><EllipsisIcon size={20} /></button>
            </div>

            <div className="p-4 space-y-6">
                {/* Match Overview */}
                <div className="card p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">Match Overview</h3>
                        <button className="text-primary text-sm">↶ Undo</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[var(--color-muted)]">Change Scorer</span>
                            <select className="px-2 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-sm">
                                <option>Alex Costa</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[var(--color-muted)]">Match Timer</span>
                            <span className="font-mono font-semibold">00:23:45</span>
                        </div>
                    </div>
                </div>

                {/* Current Set Display */}
                <div className="text-center">
                    <p className="text-sm text-[var(--color-muted)] mb-4">Current Set: 0{currentSet}</p>

                    <div className="flex items-center justify-center gap-8">
                        {/* Player 1 */}
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">KV</div>
                            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-medium mb-1">
                                <UserIcon size={20} className="text-white" />
                            </div>
                            <p className="text-sm font-medium">Kunal Verma</p>
                            <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                                Receiving
                            </span>
                        </div>

                        {/* VS */}
                        <div className="text-center">
                            <span className="text-2xl text-[var(--color-muted)]">Vs</span>
                        </div>

                        {/* Player 2 */}
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">AK</div>
                            <div className="w-12 h-12 mx-auto rounded-full bg-[var(--color-surface-elevated)] border-2 border-[var(--color-border)] flex items-center justify-center font-medium mb-1">
                                <UserIcon size={20} className="text-[var(--color-muted)]" />
                            </div>
                            <p className="text-sm font-medium">Anil Kumar</p>
                            <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                                Serving
                            </span>
                        </div>
                    </div>
                </div>

                {/* Scoring System Label */}
                <p className="text-center text-sm text-[var(--color-muted)]">
                    Side-Out Scoring
                </p>

                {/* Set Tabs */}
                <div className="flex justify-center gap-2">
                    {[1, 2, 3].map((set) => (
                        <button
                            key={set}
                            onClick={() => setCurrentSet(set)}
                            className={`px-6 py-2 rounded-lg text-sm font-medium ${currentSet === set
                                ? "bg-primary text-white"
                                : "bg-[var(--color-surface-elevated)] border border-[var(--color-border)]"
                                }`}
                        >
                            Set {set}
                        </button>
                    ))}
                </div>

                {/* Score Display */}
                <div className="text-center">
                    <p className="text-5xl font-bold font-mono">
                        {String(score1).padStart(2, "0")} - {String(score2).padStart(2, "0")}
                    </p>
                </div>

                {/* Scoring Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => handleScore(1, "won")}
                        className="py-4 rounded-xl font-semibold text-white"
                        style={{ background: "var(--gradient-orange)" }}
                    >
                        Kunal V. Won Rally
                    </button>
                    <button
                        onClick={() => handleScore(2, "won")}
                        className="py-4 rounded-xl font-semibold text-white"
                        style={{ background: "var(--gradient-orange)" }}
                    >
                        Anil K. Scored
                    </button>
                    <button
                        onClick={() => handleScore(1, "fault")}
                        className="py-4 rounded-xl font-medium border border-[var(--color-border)]"
                    >
                        Kunal V. Fault
                    </button>
                    <button
                        onClick={() => handleScore(2, "fault")}
                        className="py-4 rounded-xl font-medium border border-[var(--color-border)]"
                    >
                        Anil K. Fault
                    </button>
                </div>
            </div>

            {/* Switch Sides Modal */}
            {showSwitchSides && (
                <>
                    <div
                        className="fixed inset-0 z-50 bg-black/60"
                        onClick={() => setShowSwitchSides(false)}
                    />
                    <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 bg-[var(--color-surface)] rounded-2xl p-6 max-w-sm mx-auto text-center">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <RefreshIcon size={28} className="text-primary" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Switch Serve Now</h3>
                        <p className="text-sm text-[var(--color-muted)] mb-6">
                            It&apos;s time for the players to switch serve on the court.
                        </p>
                        <button
                            onClick={() => setShowSwitchSides(false)}
                            className="w-full py-3 rounded-xl font-semibold text-white"
                            style={{ background: "var(--gradient-orange)" }}
                        >
                            Switch Sides
                        </button>
                    </div>
                </>
            )}

            {/* Exit Confirmation Modal */}
            {showExitConfirm && (
                <>
                    <div
                        className="fixed inset-0 z-50 bg-black/60"
                        onClick={() => setShowExitConfirm(false)}
                    />
                    <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 bg-[var(--color-surface)] rounded-2xl p-6 max-w-sm mx-auto text-center">
                        <h3 className="font-bold text-xl mb-2">Exit Live Match?</h3>
                        <p className="text-sm text-[var(--color-muted)] mb-6 flex items-center justify-center gap-1">
                            <InfoIcon size={14} /> You&apos;re currently scoring a live match. Changes you made won&apos;t be saved.
                        </p>
                        <div className="flex gap-3">
                            <Link
                                href="/org/tournaments/1/events/1/matches"
                                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium text-center"
                            >
                                Leave Anyway
                            </Link>
                            <button
                                onClick={() => setShowExitConfirm(false)}
                                className="flex-1 py-3 rounded-xl font-medium text-white"
                                style={{ background: "var(--gradient-orange)" }}
                            >
                                Continue Scoring
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
