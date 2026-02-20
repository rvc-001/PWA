"use client";

type QuickStatsProps = {
  won: number;
  played: number;
  lost: number;
};

type IconProps = {
  className?: string;
};

function TrophyIcon({ className }: IconProps) {
  return (
    <svg
      className={`w-5 h-5 mb-1 ${className || ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4z" />
    </svg>
  );
}

function PlayedIcon({ className }: IconProps) {
  return (
    <svg
      className={`w-5 h-5 mb-1 ${className || ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function LossIcon({ className }: IconProps) {
  return (
    <svg
      className={`w-5 h-5 mb-1 ${className || ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M3 3l18 18" />
      <path d="M21 3L3 21" />
    </svg>
  );
}

export default function QuickStats({
  won,
  played,
  lost,
}: QuickStatsProps) {
  return (
    <section className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-neutral-900">
          Quick Stats
        </h3>
        <span className="text-xs font-semibold text-neutral-500">
          LIFETIME STATS
        </span>
      </div>

      {/* Stats Row */}
      <div className="flex gap-3">
        
        {/* WON */}
        <div className="flex-1 bg-orange-500 text-white rounded-3xl py-6 text-center shadow-sm flex flex-col items-center justify-center">
          <TrophyIcon />
          <div className="text-2xl font-bold">{won}</div>
          <div className="text-xs font-semibold mt-1 tracking-wide">
            WON
          </div>
        </div>

        {/* PLAYED */}
        <div className="flex-1 bg-white rounded-3xl py-6 text-center border border-neutral-200 shadow-sm flex flex-col items-center justify-center">
          <PlayedIcon className="text-neutral-600" />
          <div className="text-2xl font-bold text-neutral-900">
            {played}
          </div>
          <div className="text-xs font-semibold text-neutral-500 mt-1">
            Played
          </div>
        </div>

        {/* LOST */}
        <div className="flex-1 bg-white rounded-3xl py-6 text-center border border-neutral-200 shadow-sm flex flex-col items-center justify-center">
          <LossIcon />
          <div className="text-2xl font-bold text-neutral-900">
            {lost}
          </div>
          <div className="text-xs font-semibold text-neutral-500 mt-1">
            Lost
          </div>
        </div>

      </div>
    </section>
  );
}