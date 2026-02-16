"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import LiveMatchReplica from "@/components/QuickMatch/LiveMatchReplica";
import { appendScoreLog, pushOfflineQueue } from "@/lib/storage";
import type { LiveMatchState, MatchConfig, ScoreEvent } from "@/types/models";
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

  const [state, setState] = useState<LiveMatchState>(() => createInitialLiveState(matchId, config));
  const [seq, setSeq] = useState(0);
  const [showSwitchServe, setShowSwitchServe] = useState(false);
  const [matchWinner, setMatchWinner] = useState<0 | 1 | null>(null);

  const emit = useCallback(
    (type: ScoreEvent["type"], details: Record<string, unknown>) => {
      const event: ScoreEvent = {
        seq: seq + 1,
        timestamp: Date.now(),
        actorId: "user",
        type,
        details,
      };
      setSeq((current) => current + 1);
      appendScoreLog(matchId, event).catch(() => pushOfflineQueue(event));
    },
    [matchId, seq]
  );

  const applyRallyAction = useCallback(
    (winnerSide: 0 | 1) => {
      emit("rally", { side: winnerSide });
      setState((previous) => {
        const next = applyRally(previous, config, winnerSide);
        const advanced = maybeAdvanceSet(next, config);
        setMatchWinner(advanced.matchWinner);
        return advanced.state;
      });
    },
    [config, emit]
  );

  const applyFaultAction = useCallback(
    (faultSide: 0 | 1) => {
      emit("fault", { side: faultSide });
      setState((previous) => {
        const next = applyFault(previous, config, faultSide);
        const advanced = maybeAdvanceSet(next, config);
        setMatchWinner(advanced.matchWinner);
        return advanced.state;
      });
      setShowSwitchServe(true);
    },
    [config, emit]
  );

  const undo = useCallback(() => {
    emit("undo", {});
  }, [emit]);

  const currentSet: [number, number] = [
    state.setScores[state.currentSet]?.[0] ?? 0,
    state.setScores[state.currentSet]?.[1] ?? 0,
  ];
  const set1: [number | null, number | null] = [
    state.setScores[0]?.[0] ?? 0,
    state.setScores[0]?.[1] ?? 0,
  ];
  const set2: [number | null, number | null] = [
    state.setScores[1]?.[0] ?? null,
    state.setScores[1]?.[1] ?? null,
  ];
  const set3: [number | null, number | null] = [
    state.setScores[2]?.[0] ?? null,
    state.setScores[2]?.[1] ?? null,
  ];

  return (
    <LiveMatchReplica
      sideAScore={currentSet[0] ?? 0}
      sideBScore={currentSet[1] ?? 0}
      set1={set1}
      set2={set2}
      set3={set3}
      scoringLabel={config.scoringSystem === "sideout" ? "Side-Out Scoring" : "Rally Scoring"}
      sideAServing={state.serverSide === 0}
      sideBServing={state.serverSide === 1}
      showSwitchServe={showSwitchServe}
      showWinner={matchWinner != null}
      onBack={() => router.back()}
      onUndo={undo}
      onSideARally={() => applyRallyAction(0)}
      onSideBRally={() => applyRallyAction(1)}
      onSideAFault={() => applyFaultAction(0)}
      onSideBFault={() => applyFaultAction(1)}
      onCloseSwitch={() => setShowSwitchServe(false)}
      onCloseWinner={() => setMatchWinner(null)}
      winnerName={matchWinner === 1 ? "Anil Kumar" : "Kunal Verma"}
      confirmHref="/match/live"
    />
  );
}
