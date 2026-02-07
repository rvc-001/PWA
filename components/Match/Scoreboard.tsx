"use client";

import React from "react";
import type { LiveMatchState } from "@/types/models";

type ScoreboardProps = {
  state: LiveMatchState;
  player1Name: string;
  player2Name: string;
  player1Initials?: string;
  player2Initials?: string;
  servingSide: 0 | 1;
  scoringMode: "sideout" | "rally";
  format: "singles" | "doubles";
};

export default function Scoreboard({
  state,
  player1Name,
  player2Name,
  player1Initials = "P1",
  player2Initials = "P2",
  servingSide,
  scoringMode,
  format,
}: ScoreboardProps) {
  const currentSet = state.setScores[state.currentSet] ?? [0, 0];
  const [score0, score1] = currentSet;

  return (
    <div
      className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] p-4"
      role="region"
      aria-live="polite"
      aria-label="Match scoreboard"
    >
      <div className="text-center text-sm text-[var(--color-muted)] mb-2">
        Current Set: {state.currentSet + 1} · {scoringMode === "sideout" ? "Side-out" : "Rally"} · {format}
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className={`flex-1 text-center p-3 rounded-lg ${servingSide === 0 ? "ring-2 ring-primary" : ""}`}>
          <div className="text-2xl font-bold" aria-label={`${player1Name} score`}>{score0}</div>
          <div className="text-sm font-medium">{player1Initials}</div>
          <div className="text-xs text-[var(--color-muted)] truncate">{player1Name}</div>
          {servingSide === 0 && (
            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">Serving</span>
          )}
        </div>
        <div className="text-[var(--color-muted)] font-medium">–</div>
        <div className={`flex-1 text-center p-3 rounded-lg ${servingSide === 1 ? "ring-2 ring-primary" : ""}`}>
          <div className="text-2xl font-bold" aria-label={`${player2Name} score`}>{score1}</div>
          <div className="text-sm font-medium">{player2Initials}</div>
          <div className="text-xs text-[var(--color-muted)] truncate">{player2Name}</div>
          {servingSide === 1 && (
            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">Serving</span>
          )}
        </div>
      </div>
      {state.setScores.length > 0 && (
        <div className="mt-3 flex justify-center gap-4 text-sm text-[var(--color-muted)]">
          {state.setScores.map((s, i) => (
            <span key={i}>Set {i + 1}: {s[0]}-{s[1]}</span>
          ))}
        </div>
      )}
    </div>
  );
}
