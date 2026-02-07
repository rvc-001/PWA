"use client";

import React from "react";

type QuickStatsProps = {
    weekDays?: {
        label: string;
        isActive: boolean;
    }[];
    played?: number;
    lost?: number;
};

export default function QuickStats({
    weekDays = [
        { label: "MON", isActive: false },
        { label: "TUE", isActive: true },
        { label: "WED", isActive: false },
    ],
    played = 38,
    lost = 12,
}: QuickStatsProps) {
    return (
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold mb-3">Quick Stats</h3>

            {/* Week Days */}
            <div className="flex gap-2 mb-4">
                {weekDays.map((day, idx) => (
                    <div
                        key={idx}
                        className={`flex-1 px-2 py-2 rounded-lg text-center text-xs font-medium transition-colors duration-[var(--transition-base)] ${day.isActive
                                ? "bg-primary text-white"
                                : "bg-[var(--color-surface-elevated)] text-[var(--color-muted)]"
                            }`}
                    >
                        {day.label}
                    </div>
                ))}
            </div>

            {/* Stats Counters */}
            <div className="flex gap-3">
                <div className="flex-1 bg-[var(--color-surface-elevated)] rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-[var(--color-text)]">
                        {played}
                    </div>
                    <div className="text-xs text-[var(--color-muted)] mt-1">Played</div>
                </div>
                <div className="flex-1 bg-[var(--color-surface-elevated)] rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-[var(--color-text)]">
                        {lost}
                    </div>
                    <div className="text-xs text-[var(--color-muted)] mt-1">Lost</div>
                </div>
            </div>
        </div>
    );
}
