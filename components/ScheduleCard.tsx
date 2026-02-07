"use client";

import React from "react";

type ScheduleCardProps = {
    sport: string;
    sportIcon?: string;
    matchName: string;
    venue: string;
    time: string;
    opponent?: string;
    colorVariant?: "volleyball" | "basketball" | "badminton";
};

export default function ScheduleCard({
    sport,
    sportIcon = "🏸",
    matchName,
    venue,
    time,
    opponent,
    colorVariant = "badminton",
}: ScheduleCardProps) {
    const variantStyles = {
        volleyball: "bg-[#bbff00] text-black",
        basketball: "bg-[#ff6b35] text-white",
        badminton: "bg-[#ff4444] text-white",
    };

    return (
        <div
            className={`rounded-[var(--radius-card)] p-3 ${variantStyles[colorVariant]} transition-transform duration-[var(--transition-base)] hover:scale-[1.02]`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{sportIcon}</span>
                        <p className="text-xs font-medium opacity-90">{sport}</p>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{matchName}</h4>
                    <p className="text-xs opacity-75">{venue}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-semibold">{time}</p>
                    {opponent && (
                        <p className="text-xs opacity-75 mt-1">vs {opponent}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
