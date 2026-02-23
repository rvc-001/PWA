"use client";

import Image from "next/image";

type Team = {
  players: string[];     // ["S. Williams", "A. Lee"]
  image?: string;        // optional team image
};

type LiveMatchCardProps = {
  tournamentName: string;
  matchTitle: string;    // "Men's Doubles · Match #42"
  teamA: Team;
  teamB: Team;
  score: {
    teamA: number;
    teamB: number;
    currentSet: number;
  };
  court: string;         // "Court 3"
  isLive?: boolean;
  onFollow?: () => void;
};

export default function LiveMatchCard({
  tournamentName,
  matchTitle,
  teamA,
  teamB,
  score,
  court,
  isLive = true,
  onFollow,
}: LiveMatchCardProps) {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] p-4 space-y-4">
      
      {/* ================= Top Section ================= */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[var(--color-muted)] font-medium">
            {tournamentName}
          </p>
          <p className="text-sm font-semibold text-[var(--color-text)] mt-0.5">
            {matchTitle}
          </p>
        </div>

        {isLive && (
          <div className="flex items-center gap-1.5 bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300 text-[11px] font-semibold px-2 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            LIVE
          </div>
        )}
      </div>

      {/* ================= Score Row ================= */}
      <div className="flex items-center justify-between">
        
        {/* Team A */}
        <div className="flex flex-col items-center text-center w-24">
          <div className="relative h-14 w-14 rounded-full overflow-hidden bg-[var(--color-surface-elevated)]">
            {teamA.image ? (
              <Image
                src={teamA.image}
                alt="Team A"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full text-sm font-bold text-[var(--color-muted)]">
                {teamA.players[0]?.charAt(0)}
              </div>
            )}
          </div>

          <p className="text-xs font-medium text-[var(--color-text)] mt-2 truncate w-full">
            {teamA.players.join(" & ")}
          </p>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[var(--color-text)] tracking-tight">
            {score.teamA}{" "}
            <span className="text-[var(--color-muted)]">–</span>{" "}
            {score.teamB}
          </div>

          <div className="mt-1 text-[11px] font-semibold bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300 px-2 py-0.5 rounded-full">
            Set {score.currentSet}
          </div>
        </div>

        {/* Team B */}
        <div className="flex flex-col items-center text-center w-24">
          <div className="relative h-14 w-14 rounded-full overflow-hidden bg-[var(--color-surface-elevated)]">
            {teamB.image ? (
              <Image
                src={teamB.image}
                alt="Team B"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full text-sm font-bold text-[var(--color-muted)]">
                {teamB.players[0]?.charAt(0)}
              </div>
            )}
          </div>

          <p className="text-xs font-medium text-[var(--color-text)] mt-2 truncate w-full">
            {teamB.players.join(" & ")}
          </p>
        </div>
      </div>

      {/* ================= Bottom Section ================= */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
        <div className="text-xs text-[var(--color-muted)] font-medium">
          {court}
        </div>

        <button
          onClick={onFollow}
          className="text-xs font-semibold text-[var(--color-text-secondary)] hover:text-orange-600 transition-colors"
        >
          Follow
        </button>
      </div>
    </div>
  );
}
