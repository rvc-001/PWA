"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCapIcon, TrophyIcon, UsersIcon, BuildingIcon, ChevronRightIcon, CheckIcon } from "@/components/Icons";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const orgTypes: { id: string; Icon: IconComponent; label: string }[] = [
    { id: "educational", Icon: GraduationCapIcon, label: "Educational Institutions" },
    { id: "academy", Icon: TrophyIcon, label: "Sports Academy" },
    { id: "club", Icon: UsersIcon, label: "Sports Club" },
    { id: "corporate", Icon: BuildingIcon, label: "Corporate" },
    { id: "others", Icon: BuildingIcon, label: "Others" },
];

export default function OrgOnboardingPage() {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((s) => s !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)] flex flex-col p-6">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="text-primary font-bold text-xl">FOREHAND</span>
            </div>

            {/* Title */}
            <h1 className="text-lg font-semibold mb-2">Let&apos;s get you started.</h1>
            <p className="text-[var(--color-muted)] mb-8">
                What type of organization are you?
            </p>

            {/* Organization Types */}
            <div className="flex-1 space-y-3">
                {orgTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => toggleSelect(type.id)}
                        className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${selected.includes(type.id)
                            ? "border-primary bg-primary/10"
                            : "border-[var(--color-border)] hover:border-primary/50"
                            }`}
                    >
                        {selected.includes(type.id) ? (
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                <CheckIcon size={14} className="text-white" />
                            </div>
                        ) : (
                            <type.Icon size={20} className="text-[var(--color-text)]" />
                        )}
                        <span className="font-medium">{type.label}</span>
                    </button>
                ))}
            </div>

            {/* Get Started Button */}
            <Link
                href="/org/create"
                className={`mt-8 w-full min-h-[52px] flex items-center justify-center gap-2 rounded-xl font-semibold text-white transition-all ${selected.length > 0
                    ? "bg-primary"
                    : "bg-[var(--color-muted)] cursor-not-allowed"
                    }`}
                style={selected.length > 0 ? { background: "var(--gradient-orange)" } : {}}
            >
                Get Started
                <ChevronRightIcon size={18} />
            </Link>
        </div>
    );
}
