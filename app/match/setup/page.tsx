"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CourtSlider from "@/components/QuickMatch/CourtSlider";
import MatchSplash from "@/components/QuickMatch/MatchSplash";

type PageState = "setup" | "loading";

export default function QuickMatchSetupPage() {
    const router = useRouter();
    const [pageState, setPageState] = useState<PageState>("setup");
    const [pendingParams, setPendingParams] = useState<string | null>(null);

    const handleStart = (payload: {
        courtId: string;
        format: "singles" | "doubles";
        scoring: "sideout" | "rally";
        bestOf: 3 | 5;
        points: 11 | 15 | 21;
        winByTwo: boolean;
        initialServer: 1 | 2;
        players: Record<string, string | null>;
    }) => {
        const matchId = `quick-${Date.now()}`;
        const params = new URLSearchParams({
            format: payload.format,
            scoring: payload.scoring,
            bestOf: String(payload.bestOf),
            points: String(payload.points),
            winByTwo: String(payload.winByTwo),
            server: String(payload.initialServer),
            p1: payload.players.leftTop ?? "Player 1",
            p2: payload.players.rightBottom ?? "Player 2",
            p3: payload.players.leftBottom ?? "",
            p4: payload.players.rightTop ?? "",
            court: payload.courtId,
            quick: "1",
        });

        setPendingParams(`/match/${matchId}?${params.toString()}`);
        setPageState("loading");
    };

    if (pageState === "loading" && pendingParams) {
        return (
            <MatchSplash
                onComplete={() => {
                    router.push(pendingParams);
                }}
            />
        );
    }

    return (
        <div className="min-h-screen bg-[#ECECEC] dark:bg-[#3B2A63]">
            <CourtSlider
                onBack={() => router.back()}
                onStart={handleStart}
            />
        </div>
    );
}
