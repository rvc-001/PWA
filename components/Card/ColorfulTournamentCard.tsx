"use client";

import React from "react";
import Link from "next/link";
import { CalendarIcon, UsersIcon, GamepadIcon } from "@/components/Icons";

export type ColorfulTournamentCardProps = {
    id: string;
    name: string;
    icon?: string; // emoji or icon
    location: string;
    dateRange: string;
    entryFee?: string;
    registeredCount?: number;
    colorVariant?: "orange" | "green" | "red";
    href?: string;
    ctaText?: string;
};

export default function ColorfulTournamentCard({
    id,
    name,
    icon = "🏸",
    location,
    dateRange,
    entryFee,
    registeredCount,
    colorVariant = "orange",
    href,
    ctaText = "Register",
}: ColorfulTournamentCardProps) {
    const url = href ?? `/tournaments/${id}`;

    const variants = {
        orange: {
            bg: "var(--card-orange-bg)",
            text: "white",
            iconBg: "rgba(255, 255, 255, 0.2)",
        },
        green: {
            bg: "var(--card-green-bg)",
            text: "#1a1a1a",
            iconBg: "rgba(0, 0, 0, 0.1)",
        },
        red: {
            bg: "var(--card-red-bg)",
            text: "white",
            iconBg: "rgba(255, 255, 255, 0.2)",
        },
    };

    const variant = variants[colorVariant];

    return (
        <div
            className="rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-card)] transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-card-hover)] hover:scale-[1.02]"
            style={{ background: variant.bg, color: variant.text }}
        >
            <div className="p-4">
                {/* Tournament Icon & Info */}
                <div className="flex items-start gap-3 mb-3">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
                        style={{ background: variant.iconBg }}
                    >
                        <GamepadIcon size={24} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base leading-tight mb-1">{name}</h3>
                        <p className="text-sm opacity-90">{location}</p>
                    </div>
                </div>

                {/* Date & Details */}
                <div className="space-y-1 mb-3">
                    <p className="text-sm font-medium flex items-center gap-1"><CalendarIcon size={14} /> {dateRange}</p>
                    {registeredCount != null && (
                        <p className="text-sm opacity-90 flex items-center gap-1">
                            <UsersIcon size={14} /> {registeredCount} Registered
                        </p>
                    )}
                </div>

                {/* Entry Fee & CTA */}
                <div className="flex items-center justify-between gap-3">
                    {entryFee && (
                        <div>
                            <p className="text-xs opacity-75">Entry Fee</p>
                            <p className="font-bold text-lg">{entryFee}</p>
                        </div>
                    )}
                    <Link
                        href={url}
                        className="px-4 py-2 rounded-[var(--radius-button)] font-semibold text-sm transition-opacity hover:opacity-90 whitespace-nowrap"
                        style={{
                            background:
                                colorVariant === "green"
                                    ? "rgba(0, 0, 0, 0.15)"
                                    : "rgba(255, 255, 255, 0.25)",
                        }}
                    >
                        {ctaText}
                    </Link>
                </div>
            </div>
        </div>
    );
}
