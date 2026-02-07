"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/Layout";
import Scoreboard from "@/components/Match/Scoreboard";
import ScoringControls from "@/components/Match/ScoringControls";
import { getItem, setItem } from "@/lib/storage";
import type { LiveMatchState, MatchConfig } from "@/types/models";
import { applyFault, applyRally, createInitialLiveState, maybeAdvanceSet } from "@/lib/matchEngine";

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

export default function OrgLiveMatchPage() {
  const router = useRouter();
  const params = useParams();
  const tournamentId = String(params.id);
  const eventId = String(params.eventId);
  const matchId = String(params.matchId);

  const config = useMemo<MatchConfig>(() => {
    const stored = getItem<MatchConfig>(`match:${matchId}:config`);
    return (
      stored ?? {
        scoringSystem: "sideout",
        format: "doubles",
        bestOf: 3,
        pointsToWin: 11,
        winByTwo: true,
        initialServer: 1,
      }
    );
  }, [matchId]);

  const players = useMemo(() => ensurePlayers(getItem(`match:${matchId}:players`), config.format), [matchId, config.format]);

  const [state, setState] = useState<LiveMatchState>(() => {
    const stored = getItem<LiveMatchState>(`match:${matchId}:state`);
    if (stored) return stored;
    return createInitialLiveState(matchId, config);
  });
  const [matchWinner, setMatchWinner] = useState<0 | 1 | null>(null);

  const persist = useCallback((next: LiveMatchState) => {
    setItem(`match:${matchId}:state`, next);
  }, [matchId]);

  const onRally = useCallback(
    (winnerSide: 0 | 1) => {
      setState((s) => {
        const next = applyRally(s, config, winnerSide);
        const advanced = maybeAdvanceSet(next, config);
        persist(advanced.state);
        setMatchWinner(advanced.matchWinner);
        return advanced.state;
      });
    },
    [config, persist]
  );

  const onFault = useCallback(
    (faultSide: 0 | 1) => {
      setState((s) => {
        const next = applyFault(s, config, faultSide);
        const advanced = maybeAdvanceSet(next, config);
        persist(advanced.state);
        setMatchWinner(advanced.matchWinner);
        return advanced.state;
      });
    },
    [config, persist]
  );

  const goToResult = () => {
    router.push(`/org/tournaments/${tournamentId}/events/${eventId}/matches/${matchId}/result`);
  };

  return (
    <Layout title="Live Match" showBack showBottomNav={false} onBack={() => router.back()}>
      <div className="p-4 space-y-4">
        {matchWinner != null && (
          <div className="rounded-[var(--radius-card)] bg-primary/10 border border-primary/30 p-4 text-center space-y-1">
            <p className="font-semibold">Winner</p>
            <p className="text-sm text-[var(--color-muted)]">{matchWinner === 0 ? "Pair A" : "Pair B"}</p>
            <button
              type="button"
              onClick={goToResult}
              className="mt-2 w-full min-h-[44px] rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium"
            >
              Confirm Results
            </button>
          </div>
        )}

        <Scoreboard
          state={state}
          player1Name={config.format === "doubles" ? "Pair A" : players.side0[0].name}
          player2Name={config.format === "doubles" ? "Pair B" : players.side1[0].name}
          player1Initials={players.side0[0].initials}
          player2Initials={players.side1[0].initials}
          servingSide={state.serverSide}
          scoringMode={config.scoringSystem}
          format={config.format}
          side0Players={config.format === "doubles" ? (players.side0 as [SidePlayer, SidePlayer]) : undefined}
          side1Players={config.format === "doubles" ? (players.side1 as [SidePlayer, SidePlayer]) : undefined}
        />

        <ScoringControls
          sideOutMode={config.scoringSystem === "sideout"}
          onSide0Rally={() => onRally(0)}
          onSide1Rally={() => onRally(1)}
          onSide0Fault={() => onFault(0)}
          onSide1Fault={() => onFault(1)}
          onUndo={() => {
            // Placeholder: recomputation from log not implemented.
          }}
          side0Label={config.format === "doubles" ? "Pair A" : players.side0[0].initials}
          side1Label={config.format === "doubles" ? "Pair B" : players.side1[0].initials}
          canUndo={false}
        />

        <div className="grid grid-cols-2 gap-3">
          <LinkButton
            href={`/org/tournaments/${tournamentId}/events/${eventId}/matches/${matchId}/setup`}
            variant="secondary"
          >
            Match Setup
          </LinkButton>
          <button
            type="button"
            onClick={() => {
              setItem(`match:${matchId}:state`, createInitialLiveState(matchId, config));
              setState(createInitialLiveState(matchId, config));
              setMatchWinner(null);
            }}
            className="min-h-[44px] rounded-[var(--radius-button)] border border-[var(--color-border)] bg-[var(--color-surface)] font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </Layout>
  );
}

function LinkButton({
  href,
  children,
  variant,
}: {
  href: string;
  children: React.ReactNode;
  variant: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={`min-h-[44px] rounded-[var(--radius-button)] font-medium inline-flex items-center justify-center ${
        variant === "primary"
          ? "bg-primary text-[var(--color-primary-contrast)]"
          : "border border-[var(--color-border)] bg-[var(--color-surface)]"
      }`}
    >
      {children}
    </Link>
  );
}
