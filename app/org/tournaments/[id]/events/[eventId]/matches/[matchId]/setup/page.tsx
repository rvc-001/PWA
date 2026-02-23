"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { animate, motion, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { setItem } from "@/lib/storage";
import type { MatchConfig } from "@/types/models";
import MatchReadyPopup from "@/components/QuickMatch/MatchReadyPopup";

type SidePlayer = { name: string; initials: string };

type MatchSetupDraft = {
  config: MatchConfig;
  side0: SidePlayer[];
  side1: SidePlayer[];
};

const POINTS_OPTIONS = [7, 11, 15, 21] as const;
const BEST_OF_OPTIONS = [1, 3, 5] as const;

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "P";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export default function OrgMatchSetupPage() {
  const router = useRouter();
  const params = useParams();
  const tournamentId = String(params.id);
  const eventId = String(params.eventId);
  const matchId = String(params.matchId);

  const [isReadyPopupOpen, setIsReadyPopupOpen] = useState(false);

  const defaultDraft: MatchSetupDraft = useMemo(
    () => ({
      config: {
        scoringSystem: "sideout",
        format: "doubles",
        bestOf: 3,
        pointsToWin: 11,
        winByTwo: true,
        initialServer: 1,
        warmupMinutes: 5,
        timeoutPerSet: 1,
        switchSidesEvery: 0,
      },
      side0: [
        { name: "Kunal Verma", initials: "KV" },
        { name: "Alex Costa", initials: "AC" },
      ],
      side1: [
        { name: "Anil Kumar", initials: "AK" },
        { name: "The Rock", initials: "TR" },
      ],
    }),
    []
  );

  const [draft, setDraft] = useState<MatchSetupDraft>(defaultDraft);

  // Swipe Slider State
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(180);

  useEffect(() => {
    const update = () => {
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!track || !thumb) return;
      const styles = window.getComputedStyle(track);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingRight = parseFloat(styles.paddingRight) || 0;
      const width = track.clientWidth;
      const thumbWidth = thumb.clientWidth;
      setMaxDrag(Math.max(0, width - thumbWidth - paddingLeft - paddingRight));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleSwipeEnd = () => {
    const current = x.get();
    const threshold = Math.max(0, maxDrag - 8);
    if (current >= threshold) {
      animate(x, maxDrag, { type: "spring", stiffness: 420, damping: 28 });
      window.setTimeout(() => {
        setIsReadyPopupOpen(true);
        x.set(0); // reset slider behind the modal
      }, 170);
      return;
    }
    animate(x, 0, { type: "spring", stiffness: 360, damping: 24 });
  };

  const save = () => {
    setItem(`match:${matchId}:config`, draft.config);
    setItem(`match:${matchId}:players`, { side0: draft.side0, side1: draft.side1 });
  };

  const startMatch = () => {
    save();
    router.replace(`/org/tournaments/${tournamentId}/events/${eventId}/matches/${matchId}/live`);
  };

  const setConfig = (next: Partial<MatchConfig>) =>
    setDraft((d) => ({ ...d, config: { ...d.config, ...next } }));

  const updatePlayer = (side: 0 | 1, index: number, name: string) => {
    setDraft((d) => {
      const nextSide = (side === 0 ? d.side0 : d.side1).map((p, i) =>
        i === index ? { ...p, name, initials: initialsFromName(name) } : p
      );
      return side === 0 ? { ...d, side0: nextSide } : { ...d, side1: nextSide };
    });
  };

  const isDoubles = draft.config.format === "doubles";

  return (
    <Layout title="Match Setup" showBack showBottomNav={false} onBack={() => router.back()}>
      <div className="p-4 space-y-4 pb-28">
        <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)] p-4 space-y-3">
          <p className="font-semibold">Scoring Configuration</p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setConfig({ scoringSystem: "sideout" })}
              className={`min-h-[44px] rounded-[var(--radius-button)] border text-sm font-medium ${
                draft.config.scoringSystem === "sideout"
                  ? "bg-primary text-white border-primary"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-muted)]"
              }`}
            >
              Side-out
            </button>
            <button
              type="button"
              onClick={() => setConfig({ scoringSystem: "rally" })}
              className={`min-h-[44px] rounded-[var(--radius-button)] border text-sm font-medium ${
                draft.config.scoringSystem === "rally"
                  ? "bg-primary text-white border-primary"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-muted)]"
              }`}
            >
              Rally
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setConfig({ format: "singles" })}
              className={`min-h-[44px] rounded-[var(--radius-button)] border text-sm font-medium ${
                draft.config.format === "singles"
                  ? "bg-primary text-white border-primary"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-muted)]"
              }`}
            >
              Singles
            </button>
            <button
              type="button"
              onClick={() => setConfig({ format: "doubles" })}
              className={`min-h-[44px] rounded-[var(--radius-button)] border text-sm font-medium ${
                draft.config.format === "doubles"
                  ? "bg-primary text-white border-primary"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-muted)]"
              }`}
            >
              Doubles
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm text-[var(--color-muted)]">Best of</span>
              <select
                value={draft.config.bestOf}
                onChange={(e) => setConfig({ bestOf: Number(e.target.value) })}
                className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                {BEST_OF_OPTIONS.map((n) => (
                  <option key={n} value={n}>Best of {n}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-[var(--color-muted)]">Points to win</span>
              <select
                value={draft.config.pointsToWin}
                onChange={(e) => setConfig({ pointsToWin: Number(e.target.value) })}
                className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                {POINTS_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex items-center justify-between gap-3 p-3 rounded-[var(--radius-card)] bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
            <div>
              <p className="text-sm font-medium">Win by two</p>
              <p className="text-xs text-[var(--color-muted)]">Require a 2-point lead to win.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={draft.config.winByTwo}
              onClick={() => setConfig({ winByTwo: !draft.config.winByTwo })}
              className={`w-12 h-6 rounded-full relative shrink-0 transition-colors ${
                draft.config.winByTwo ? "bg-primary" : "bg-[var(--color-border)]"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                  draft.config.winByTwo ? "right-1" : "left-1"
                }`}
              />
            </button>
          </label>
          
          <label className="block mt-4">
            <span className="text-sm text-[var(--color-muted)]">Serve Rotation</span>
            <select
              value={draft.config.switchSidesEvery}
              onChange={(e) => setConfig({ switchSidesEvery: Number(e.target.value) })}
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <option value={0}>No side switching</option>
              <option value={-1}>Switch sides every set</option>
              <option value={6}>Switch sides at 6 points</option>
              <option value={8}>Switch sides at 8 points</option>
            </select>
          </label>
        </div>

        <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)] p-4 space-y-3">
          <p className="font-semibold">Players & Court</p>

          <label className="block mb-4">
            <span className="text-sm text-[var(--color-muted)]">Initial server</span>
            <select
              value={draft.config.initialServer}
              onChange={(e) => setConfig({ initialServer: Number(e.target.value) as 1 | 2 })}
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <option value={1}>{isDoubles ? "Pair A" : "Side A"}</option>
              <option value={2}>{isDoubles ? "Pair B" : "Side B"}</option>
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <p className="text-sm font-medium text-[var(--color-muted)] text-center">
                {isDoubles ? "Pair A (Left)" : "Side A (Left)"}
              </p>
              <input
                value={draft.side0[0]?.name ?? ""}
                onChange={(e) => updatePlayer(0, 0, e.target.value)}
                placeholder="Player name"
                className="w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] text-center"
              />
              {isDoubles && (
                <input
                  value={draft.side0[1]?.name ?? ""}
                  onChange={(e) => updatePlayer(0, 1, e.target.value)}
                  placeholder="Partner name"
                  className="w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] text-center"
                />
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-[var(--color-muted)] text-center">
                {isDoubles ? "Pair B (Right)" : "Side B (Right)"}
              </p>
              <input
                value={draft.side1[0]?.name ?? ""}
                onChange={(e) => updatePlayer(1, 0, e.target.value)}
                placeholder="Player name"
                className="w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] text-center"
              />
              {isDoubles && (
                <input
                  value={draft.side1[1]?.name ?? ""}
                  onChange={(e) => updatePlayer(1, 1, e.target.value)}
                  placeholder="Partner name"
                  className="w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] text-center"
                />
              )}
            </div>
          </div>
          <p className="text-center text-xs text-[var(--color-muted)] mt-2">
            Side may switch during the match per rules.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none pb-6">
        <div
          ref={trackRef}
          className="pointer-events-auto relative flex h-14 w-full select-none items-center overflow-hidden rounded-full bg-primary px-1.5 shadow-xl"
        >
          <motion.button
            ref={thumbRef}
            drag="x"
            dragConstraints={{ left: 0, right: maxDrag }}
            dragElastic={0}
            dragMomentum={false}
            style={{ x }}
            onDragEnd={handleSwipeEnd}
            type="button"
            aria-label="Swipe to start match"
            className="z-10 flex h-12 w-12 touch-none cursor-grab items-center justify-center rounded-full bg-white text-primary shadow-sm active:cursor-grabbing"
          >
            <ArrowRight size={22} strokeWidth={2.6} />
          </motion.button>
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[16px] font-bold text-white">
            Swipe to Start Match
          </span>
        </div>
      </div>

      <MatchReadyPopup
        isOpen={isReadyPopupOpen}
        variant="confirm"
        onClose={() => setIsReadyPopupOpen(false)}
        onPrimaryAction={startMatch}
        confirmTitle="Begin Official Match?"
        confirmDescription="This match is part of an official organization tournament. Results will be recorded to the event standings."
      />
    </Layout>
  );
}

