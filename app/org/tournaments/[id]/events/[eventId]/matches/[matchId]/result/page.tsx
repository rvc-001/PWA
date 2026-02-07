"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { getItem, removeItem } from "@/lib/storage";
import type { LiveMatchState, MatchConfig } from "@/types/models";

export default function OrgMatchResultPage() {
  const router = useRouter();
  const params = useParams();
  const tournamentId = String(params.id);
  const eventId = String(params.eventId);
  const matchId = String(params.matchId);

  const config = useMemo(
    () =>
      getItem<MatchConfig>(`match:${matchId}:config`) ?? {
        scoringSystem: "sideout",
        format: "doubles",
        bestOf: 3,
        pointsToWin: 11,
        winByTwo: true,
        initialServer: 1,
      },
    [matchId]
  );

  const state = useMemo(() => getItem<LiveMatchState>(`match:${matchId}:state`), [matchId]);

  const lastCompletedSet = state?.setScores?.[Math.max(0, (state.currentSet ?? 1) - 1)] ?? [0, 0];
  const [a, b] = lastCompletedSet;
  const winner = a === b ? null : a > b ? 0 : 1;

  return (
    <Layout title="Confirm Results" showBack showBottomNav={false} onBack={() => router.back()}>
      <div className="p-4 space-y-4">
        <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)] p-4 text-center space-y-1">
          <p className="text-sm text-[var(--color-muted)]">Result</p>
          <p className="text-xl font-semibold">
            {winner == null ? "Match Complete" : winner === 0 ? "Pair A" : "Pair B"}
          </p>
          <p className="text-sm text-[var(--color-muted)]">Final Score: {a}–{b}</p>
          <p className="text-xs text-[var(--color-muted)] mt-2">
            {config.scoringSystem === "sideout" ? "Side-out scoring" : "Rally scoring"} · {config.format}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            removeItem(`match:${matchId}:state`);
            router.push(`/org/tournaments/${tournamentId}/events/${eventId}/matches`);
          }}
          className="w-full min-h-[44px] rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium"
        >
          Confirm Results
        </button>
      </div>
    </Layout>
  );
}

