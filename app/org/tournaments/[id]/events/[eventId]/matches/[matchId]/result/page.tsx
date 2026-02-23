"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { getItem, removeItem } from "@/lib/storage";
import type { LiveMatchState, MatchConfig } from "@/types/models";
import { Trophy } from "lucide-react";

type SidePlayer = { name: string; initials: string };

function ensurePlayers(players: unknown, format: MatchConfig["format"]) {
  const fallbackSingles = {
    side0: [{ initials: "A", name: "Side A" }],
    side1: [{ initials: "B", name: "Side B" }],
  };
  const fallbackDoubles = {
    side0: [
      { initials: "KV", name: "Kunal Verma" },
      { initials: "AC", name: "Alex Costa" },
    ],
    side1: [
      { initials: "AK", name: "Anil Kumar" },
      { initials: "TR", name: "The Rock" },
    ],
  };

  const p = players as { side0?: SidePlayer[]; side1?: SidePlayer[] } | null;
  if (!p?.side0?.length || !p?.side1?.length) return format === "doubles" ? fallbackDoubles : fallbackSingles;

  if (format === "doubles") {
    return {
      side0: [p.side0[0] ?? fallbackDoubles.side0[0], p.side0[1] ?? fallbackDoubles.side0[1]],
      side1: [p.side1[0] ?? fallbackDoubles.side1[0], p.side1[1] ?? fallbackDoubles.side1[1]],
    };
  }

  return {
    side0: [p.side0[0] ?? fallbackSingles.side0[0]],
    side1: [p.side1[0] ?? fallbackSingles.side1[0]],
  };
}

function computeWinner(setScores: [number, number][]) {
  let winsA = 0;
  let winsB = 0;
  setScores.forEach(([a, b]) => {
    if (a === b) return;
    if (a > b) winsA += 1;
    else winsB += 1;
  });
  if (winsA === winsB) return null;
  return winsA > winsB ? 0 : 1;
}

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
  const format: MatchConfig["format"] =
    config.format === "singles" || config.format === "doubles" ? config.format : "doubles";
  const players = useMemo(() => ensurePlayers(getItem(`match:${matchId}:players`), format), [matchId, format]);

  const setScores: [number, number][] = (state?.setScores ?? []).map((score) => [
    score?.[0] ?? 0,
    score?.[1] ?? 0,
  ]);
  const lastCompletedSet = setScores[Math.max(0, (state?.currentSet ?? 1) - 1)] ?? [0, 0];
  const winner = computeWinner(setScores);
  const winnerName = winner === null
    ? "Match Complete"
    : winner === 0
      ? (format === "doubles"
        ? `${players.side0[0].name} & ${players.side0[1].name}`
        : players.side0[0].name)
      : (format === "doubles"
        ? `${players.side1[0].name} & ${players.side1[1].name}`
        : players.side1[0].name);

  const scoreLine = setScores.length
    ? setScores.map(([a, b]) => `${a}-${b}`).join(", ")
    : `${lastCompletedSet[0]}-${lastCompletedSet[1]}`;

  return (
    <Layout title="Confirm Results" showBack showBottomNav={false} onBack={() => router.back()}>
      <div className="p-4">
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
          <div className="w-full max-w-[360px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-8 shadow-[var(--shadow-card)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface-elevated)] text-[#F7B31B]">
              <Trophy size={34} strokeWidth={2.2} />
            </div>
            <p className="text-sm font-semibold text-[var(--color-muted)]">Winner</p>
            <p className="mt-1 text-[22px] font-semibold text-[var(--color-text)]">{winnerName}</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">Final Score: {scoreLine}</p>
            <p className="mt-3 text-xs text-[var(--color-muted)]">
              {config.scoringSystem === "sideout" ? "Side-out scoring" : "Rally scoring"} - {format}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            removeItem(`match:${matchId}:state`);
            router.replace(`/org/tournaments/${tournamentId}`);
          }}
          className="w-full min-h-[44px] rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium"
        >
          Confirm Results
        </button>
      </div>
    </Layout>
  );
}


