"use client";

import React from "react";

export type BracketMatch = {
  id: string;
  round: number;
  slotIndex: number;
  player1?: string;
  player2?: string;
  score?: string;
  isBye?: boolean;
};

type BracketViewProps = {
  matches: BracketMatch[];
  remainingPlayers: string[];
  onPublishFixtures?: () => void;
  onResetBracket?: () => void;
  onByeModal?: () => void;
};

export default function BracketView({
  matches,
  remainingPlayers,
  onPublishFixtures,
  onResetBracket,
}: BracketViewProps) {
  const byRound = matches.reduce<Record<number, BracketMatch[]>>((acc, m) => {
    if (!acc[m.round]) acc[m.round] = [];
    acc[m.round].push(m);
    return acc;
  }, {});
  const rounds = Object.keys(byRound)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {remainingPlayers.length > 0 && (
        <section>
          <h3 className="font-medium mb-2">Remaining Players ({remainingPlayers.length})</h3>
          <ul className="flex flex-wrap gap-2">
            {remainingPlayers.slice(0, 12).map((p, i) => (
              <li
                key={i}
                className="px-3 py-1.5 rounded-lg bg-[var(--color-surface-elevated)] text-sm"
              >
                {p}
              </li>
            ))}
            {remainingPlayers.length > 12 && (
              <li className="text-sm text-[var(--color-muted)]">+{remainingPlayers.length - 12} more</li>
            )}
          </ul>
        </section>
      )}

      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Matches</h3>
          {onResetBracket && (
            <button
              type="button"
              onClick={onResetBracket}
              className="text-sm text-primary"
            >
              Reset Brackets
            </button>
          )}
        </div>
        <div className="space-y-4">
          {rounds.map((round) => (
            <div key={round}>
              <h4 className="text-sm font-medium text-[var(--color-muted)] mb-2">Round {round}</h4>
              <ul className="space-y-2">
                {byRound[round].map((m) => (
                  <li
                    key={m.id}
                    className="p-3 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{m.player1 ?? "+"}</span>
                    <span className="text-[var(--color-muted)]">VS</span>
                    <span className="truncate">{m.player2 ?? "+"}</span>
                    {m.score != null && (
                      <span className="text-sm font-medium shrink-0">{m.score}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {onPublishFixtures && (
        <button
          type="button"
          onClick={onPublishFixtures}
          className="w-full min-h-[44px] rounded-[var(--radius-button)] bg-primary text-white font-medium"
        >
          Publish Fixtures
        </button>
      )}
    </div>
  );
}
