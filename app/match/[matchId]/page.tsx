"use client";

import React, { useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Scoreboard from "@/components/Match/Scoreboard";
import ScoringControls from "@/components/Match/ScoringControls";
import { appendScoreLog, pushOfflineQueue } from "@/lib/storage";
import type { LiveMatchState, ScoreEvent } from "@/types/models";
import { ArrowLeftIcon } from "@/components/Icons";

const initialState: LiveMatchState = {
  matchId: "demo",
  currentSet: 0,
  setScores: [[0, 0]],
  serverSide: 0,
  startedAt: Date.now(),
  scoreLog: [],
};

export default function LiveMatchPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = (params.matchId as string) || "demo";
  const [state, setState] = useState<LiveMatchState>(initialState);
  const [seq, setSeq] = useState(0);

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

  const applyRally = useCallback(
    (scoringSide: 0 | 1) => {
      const setScores = state.setScores.map((s, i) =>
        i === state.currentSet ? [...s] : s
      );
      const current = setScores[state.currentSet];
      if (!current) return;
      current[scoringSide] += 1;
      emit("rally", { side: scoringSide });
      setState((s) => ({ ...s, setScores }));
    },
    [state.currentSet, state.setScores, emit]
  );

  const undo = useCallback(() => {
    emit("undo", {});
    // In a full impl we would pop last event and recompute state
  }, [emit]);

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
        <div aria-live="assertive">
          <Scoreboard
            state={state}
            player1Name="Kunal Verma"
            player2Name="Anil Kumar"
            player1Initials="KV"
            player2Initials="AK"
            servingSide={state.serverSide}
            scoringMode="sideout"
            format="singles"
          />
        </div>
        <ScoringControls
          sideOutMode={true}
          onSide0Rally={() => applyRally(0)}
          onSide1Rally={() => applyRally(1)}
          onSide0Fault={() => emit("fault", { side: 0 })}
          onSide1Fault={() => emit("fault", { side: 1 })}
          onUndo={undo}
          side0Label="Kunal V."
          side1Label="Anil K."
          canUndo={state.scoreLog.length > 0}
        />
      </div>
    </Layout>
  );
}
