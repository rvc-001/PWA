"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/Icons";

const matches = [
  {
    id: "1",
    label: "Match 1",
    date: "5 May 25",
    time: "@ 8:00 AM",
    player1: { name: "Kunal Patel", score: "2 - 1" },
    player2: { name: "Kunal Verma", score: "" },
    sets: ["Set 1", "Set 2", "Set 3"],
    setScores: ["02 -01(-04 - 01)", "", ""],
    status: "completed",
  },
  {
    id: "2",
    label: "Match 1",
    date: "5 May 25",
    time: "@ 8:00 AM",
    player1: { name: "Ankit Verma", score: "" },
    player2: { name: "Akshay Pai", score: "" },
    sets: ["Set 1", "Set 2", "Set 3"],
    setScores: ["", "", ""],
    status: "pending",
  },
];

export default function ManageMatchesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/org/tournaments/1" className="p-2 -ml-2">
            <ArrowLeftIcon size={20} />
          </Link>
          <h1 className="font-semibold">Manage Matches</h1>
        </div>
        <button className="p-2">⋮</button>
      </div>

      {/* Tournament Info */}
      <div className="p-4 bg-primary text-white">
        <h2 className="font-semibold text-lg">Mumbai Men&apos;s 2025</h2>
        <p className="text-sm opacity-90">
          Pickleball Men&apos;s 2025
        </p>
        <p className="text-xs opacity-80">
          Event: 03 Feb 2025, 06:00 AM IST
        </p>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {matches.map((match) => (
          <Link
            key={match.id}
            href={`/org/tournaments/1/events/1/matches/${match.id}`}
            className="card p-4 block"
          >
            {/* Match Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {match.label}
              </span>
              <div className="text-xs text-[var(--color-muted)]">
                <span>{match.date}</span>
                <span className="ml-2">{match.time}</span>
              </div>
            </div>

            {/* Players */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-medium">
                  KP
                </div>
                <div>
                  <p className="text-sm font-medium">{match.player1.name}</p>
                  {match.player1.score && (
                    <span className="text-xs text-primary font-medium">
                      {match.player1.score}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[var(--color-muted)]">Vs</span>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm font-medium text-right">{match.player2.name}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[var(--color-surface-elevated)] border-2 border-[var(--color-border)] flex items-center justify-center text-xs font-medium">
                  KV
                </div>
              </div>
            </div>

            {/* Sets */}
            <div className="flex justify-center gap-2">
              {match.sets.map((set, idx) => (
                <div
                  key={set}
                  className={`px-4 py-2 rounded-lg text-xs text-center ${idx === 0
                    ? "bg-primary text-white"
                    : "bg-[var(--color-surface-elevated)]"
                    }`}
                >
                  {set}
                </div>
              ))}
            </div>

            {match.status === "pending" && (
              <button
                className="w-full mt-4 py-2 rounded-lg font-medium text-white"
                style={{ background: "var(--gradient-orange)" }}
              >
                Manage Match
              </button>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
