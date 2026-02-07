"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";

export default function LiveMatchPage() {
    const [currentSet, setCurrentSet] = useState(1);
    const [score, setScore] = useState({
        team1: { sets: 0, points: 0 },
        team2: { sets: 0, points: 0 },
    });

    const incrementScore = (team: "team1" | "team2") => {
        setScore((prev) => ({
            ...prev,
            [team]: { ...prev[team], points: prev[team].points + 1 },
        }));
    };

    return (
        <Layout title="Live Match" showBack showBottomNav={false}>
            <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
                {/* Match Header */}
                <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] p-4">
                    <p className="text-sm text-[var(--color-muted)] text-center">
                        Match Ongoing
                    </p>
                    <h2 className="text-center font-semibold">Quick Match</h2>
                    <p className="text-xs text-[var(--color-muted)] text-center mt-1">
                        Best of 3 • 15 pts
                    </p>
                </div>

                {/* Current Set Indicator */}
                <div className="bg-[var(--color-surface-elevated)] px-4 py-2">
                    <p className="text-center text-sm font-medium">
                        Current Set: 0{currentSet}
                    </p>
                </div>

                {/* Score Display */}
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-md">
                        {/* Team KV */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                                    K
                                </div>
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                                    V
                                </div>
                            </div>
                            <p className="font-semibold mb-1">KV</p>
                            <p className="text-sm text-[var(--color-muted)]">Kumiling</p>
                        </div>

                        {/* VS Separator */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="h-px bg-[var(--color-border)] flex-1" />
                            <span className="text-lg font-semibold text-[var(--color-muted)]">
                                Vs
                            </span>
                            <div className="h-px bg-[var(--color-border)] flex-1" />
                        </div>

                        {/* Team AK */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-full bg-[var(--avatar-bg)] border-2 border-[var(--avatar-border)] flex items-center justify-center font-bold">
                                    A
                                </div>
                                <div className="w-12 h-12 rounded-full bg-[var(--avatar-bg)] border-2 border-[var(--avatar-border)] flex items-center justify-center font-bold">
                                    K
                                </div>
                            </div>
                            <p className="font-semibold mb-1">AK</p>
                            <p className="text-sm text-[var(--color-muted)]">Kumiling</p>
                        </div>
                    </div>
                </div>

                {/* Score Buttons */}
                <div className="bg-[var(--color-surface)] border-t border-[var(--color-border)] p-4 space-y-3">
                    {/* Set Score Display */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center">
                            <p className="text-xs text-[var(--color-muted)]">Set 1</p>
                            <p className="font-bold">00 - 00</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-[var(--color-muted)]">Set 2</p>
                            <p className="font-bold">- - - -</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-[var(--color-muted)]">Set 3</p>
                            <p className="font-bold">- - - -</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold">
                            Mark A Won Point
                        </button>
                        <button className="flex-1 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] font-semibold">
                            Call Sides
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
