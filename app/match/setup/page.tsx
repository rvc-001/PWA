"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function QuickMatchPage() {
    const [selectedPlayers, setSelectedPlayers] = useState({
        player1: false,
        player2: false,
        player3: false,
        player4: false,
    });

    return (
        <Layout title="Match Setup" showBack>
            <div className="p-4 space-y-6 pb-24">
                {/* Visual Court */}
                <div className="card p-6">
                    <h3 className="text-sm font-semibold mb-4">Select Player Roles</h3>
                    <div className="relative bg-green-600 rounded-lg p-4 aspect-[3/4]">
                        {/* Net line */}
                        <div className="absolute left-0 right-0 top-1/2 h-1 bg-white/50 transform -translate-y-1/2" />

                        {/* Top Court Positions */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-8">
                            <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg font-semibold">
                                1
                            </button>
                            <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg font-semibold">
                                2
                            </button>
                        </div>

                        {/* Bottom Court Positions */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-8">
                            <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg font-semibold">
                                3
                            </button>
                            <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg font-semibold">
                                4
                            </button>
                        </div>
                    </div>
                </div>

                {/* Initial Server */}
                <div className="card p-4">
                    <h3 className="text-sm font-semibold mb-3">Initial Server</h3>
                    <div className="flex gap-2">
                        <button className="flex-1 py-2 rounded-lg border-2 border-primary text-primary font-medium">
                            Team 1
                        </button>
                        <button className="flex-1 py-2 rounded-lg border border-[var(--color-border)] hover:border-primary transition-colors">
                            Team 2
                        </button>
                    </div>
                </div>

                {/* Scoring System */}
                <div className="card p-4">
                    <h3 className="text-sm font-semibold mb-3">Scoring System</h3>
                    <div className="flex gap-2">
                        <button className="flex-1 py-2 rounded-lg border-2 border-primary text-primary font-medium">
                            Side out Scoring
                        </button>
                        <button className="flex-1 py-2 rounded-lg border border-[var(--color-border)] hover:border-primary transition-colors">
                            Rally Scoring
                        </button>
                    </div>
                </div>

                {/* Match Format */}
                <div className="card p-4">
                    <h3 className="text-sm font-semibold mb-3">Match Format</h3>
                    <select className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none">
                        <option>Best of 3</option>
                        <option>Best of 5</option>
                        <option>Single Game</option>
                    </select>
                    <p className="text-sm text-[var(--color-muted)] mt-2">
                        15 points to win
                    </p>
                </div>

                {/* Time and Rules */}
                <div className="card p-4 space-y-3">
                    <h3 className="text-sm font-semibold">Time and Rules</h3>

                    <div className="flex items-center gap-3">
                        <input type="checkbox" id="matchTimer" className="w-4 h-4" />
                        <label htmlFor="matchTimer" className="text-sm flex-1">
                            Match time limit
                        </label>
                    </div>

                    <div className="flex items-center gap-3">
                        <input type="checkbox" id="warmup" className="w-4 h-4" />
                        <label htmlFor="warmup" className="text-sm flex-1">
                            Warm up timer
                        </label>
                    </div>

                    <div className="flex items-center gap-3">
                        <input type="checkbox" id="noTimeout" className="w-4 h-4" />
                        <label htmlFor="noTimeout" className="text-sm flex-1">
                            No time outs
                        </label>
                    </div>
                </div>

                {/* Serve Rotation */}
                <div className="card p-4">
                    <h3 className="text-sm font-semibold mb-3">Serve Rotation</h3>
                    <select className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none">
                        <option>Switch after every set</option>
                        <option>Switch after every point</option>
                        <option>No rotation</option>
                    </select>
                </div>

                {/* Start Match Button */}
                <Link href="/match/live" className="btn-primary w-full text-center">
                    Update and start match
                </Link>
            </div>
        </Layout>
    );
}
