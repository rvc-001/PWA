"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import Scoreboard from "@/components/Match/Scoreboard";
import ScoringControls from "@/components/Match/ScoringControls";
import { appendScoreLog, pushOfflineQueue } from "@/lib/storage";
import type { LiveMatchState, MatchConfig, ScoreEvent } from "@/types/models";
import { ArrowLeftIcon } from "@/components/Icons";
import { applyFault, applyRally, createInitialLiveState, maybeAdvanceSet } from "@/lib/matchEngine";

function parseConfig(params: URLSearchParams): MatchConfig {
  const scoringSystem = params.get("scoring") === "rally" ? "rally" : "sideout";
  const format = params.get("format") === "doubles" ? "doubles" : "singles";
  const bestOf = Number(params.get("bestOf") ?? "3") || 3;
  const pointsToWin = Number(params.get("points") ?? "11") || 11;
  const winByTwo = params.get("winByTwo") !== "false";
  const initialServer = params.get("server") === "2" ? 2 : 1;
  return { scoringSystem, format, bestOf, pointsToWin, winByTwo, initialServer };
}

export default function LiveMatchPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const matchId = (params.matchId as string) || "demo";

  const config = useMemo(() => parseConfig(searchParams), [searchParams]);

  const [state, setState] = useState<LiveMatchState>(() =>
    createInitialLiveState(matchId, config)
  );
  const [seq, setSeq] = useState(0);
  const [matchWinner, setMatchWinner] = useState<0 | 1 | null>(null);

  const emit = useCallback(
    (type: ScoreEvent["type"], details: Record<string, unknown>, side?: 0 | 1) => {
      const event: ScoreEvent = {
        seq: seq + 1,
        timestamp: Date.now(),
        actorId: "user",
        type,
        details,
      };
      setSeq((s) => s + 1);
      appendScoreLog(matchId, event).catch(() => pushOfflineQueue(event));
      return event;
    },
    [matchId, seq]
  );

  const applyRallyAction = useCallback(
    (winnerSide: 0 | 1) => {
      emit("rally", { side: winnerSide });
      setState((s) => {
        const next = applyRally(s, config, winnerSide);
        const advanced = maybeAdvanceSet(next, config);
        setMatchWinner(advanced.matchWinner);
        return advanced.state;
      });
    },
    [emit, config]
  );

  const applyFaultAction = useCallback(
    (faultSide: 0 | 1) => {
      emit("fault", { side: faultSide });
      setState((s) => {
        const next = applyFault(s, config, faultSide);
        const advanced = maybeAdvanceSet(next, config);
        setMatchWinner(advanced.matchWinner);
        return advanced.state;
      });
    },
    [emit, config]
  );

  const undo = useCallback(() => {
    emit("undo", {});
    // In a full impl we would pop last event and recompute state
  }, [emit]);

  const doublesSides =
    config.format === "doubles"
      ? {
          side0: [
            { initials: "KV", name: "Kunal Verma" },
            { initials: "AC", name: "Alex Costa" },
          ] as const,
          side1: [
            { initials: "AK", name: "Anil Kumar" },
            { initials: "TR", name: "The Rock" },
          ] as const,
        }
      : null;

  return (
    <Layout showBottomNav={false}>
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px] min-w-[44px]"
            aria-label="Back"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-lg font-semibold">Live Match</h1>
          <button
            type="button"
            onClick={undo}
            className="text-primary text-sm font-medium min-h-[44px]"
          >
            Undo
          </button>
        </div>

        {matchWinner != null && (
          <div className="p-4 rounded-[var(--radius-card)] bg-primary/10 border border-primary/30 text-center">
            <p className="font-semibold">Match Complete</p>
            <p className="text-sm text-[var(--color-muted)]">
              Winner: {matchWinner === 0 ? "Side A" : "Side B"}
            </p>
          </div>
        )}
        <div aria-live="assertive">
          <Scoreboard
            state={state}
            player1Name="Side A"
            player2Name="Side B"
            player1Initials="A"
            player2Initials="B"
            servingSide={state.serverSide}
            scoringMode={config.scoringSystem}
            format={config.format}
            side0Players={doublesSides?.side0}
            side1Players={doublesSides?.side1}
          />
        </div>
        <ScoringControls
          sideOutMode={config.scoringSystem === "sideout"}
          onSide0Rally={() => applyRallyAction(0)}
          onSide1Rally={() => applyRallyAction(1)}
          onSide0Fault={() => applyFaultAction(0)}
          onSide1Fault={() => applyFaultAction(1)}
          onUndo={undo}
          side0Label={config.format === "doubles" ? "Pair A" : "Side A"}
          side1Label={config.format === "doubles" ? "Pair B" : "Side B"}
          canUndo={state.scoreLog.length > 0}
        />
      </div>
    </Layout>
  );
}
