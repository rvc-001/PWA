"use client";

import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { GamepadIcon, CalendarIcon, UsersIcon, PlusIcon, ChevronRightIcon } from "@/components/Icons";

export default function TournamentEventPage() {
    return (
        <Layout title="Tournament Event" showBack>
            <div className="pb-24">
                {/* Tournament Header */}
                <div
                    className="p-6 text-white"
                    style={{ background: "var(--gradient-orange)" }}
                >
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                            <GamepadIcon size={28} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-xl font-bold mb-1">Mumbai Men&apos;s 2025</h1>
                            <p className="text-sm opacity-90">Badminton • Squash</p>
                        </div>
                        <Link
                            href="/tournaments/1/checkout"
                            className="px-4 py-2 rounded-lg bg-white/20 text-sm font-semibold hover:bg-white/30 transition-colors"
                        >
                            Registration
                        </Link>
                    </div>
                </div>

                <div className="p-4 space-y-6">
                    {/* Event Categories */}
                    <section>
                        <h3 className="font-semibold mb-4">Men&apos;s Singles</h3>

                        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] border border-[var(--color-border)] p-4 mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h4 className="font-semibold text-sm mb-1">Registration Date</h4>
                                    <p className="text-xs text-[var(--color-muted)] flex items-center gap-1">
                                        <CalendarIcon size={12} /> Last Date: 05/12/2024 • Reg Close: 07 Dec 20:00
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[var(--color-surface-elevated)] rounded-lg p-3">
                                    <p className="text-xs text-[var(--color-muted)] mb-1">Capacity</p>
                                    <p className="font-semibold">4/64</p>
                                </div>
                                <div className="bg-[var(--color-surface-elevated)] rounded-lg p-3">
                                    <p className="text-xs text-[var(--color-muted)] mb-1">Entry Fee</p>
                                    <p className="font-semibold">
                                        <span className="line-through text-[var(--color-muted)] text-xs mr-1">
                                            ₹1400
                                        </span>
                                        Free Entry
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Men's Doubles */}
                    <section>
                        <h3 className="font-semibold mb-4">Men&apos;s Doubles</h3>

                        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] border border-[var(--color-border)] p-4">
                            <div className="mb-4">
                                <h4 className="font-semibold text-sm mb-2">Registration</h4>
                                <p className="text-xs text-[var(--color-muted)] flex items-center gap-1">
                                    <CalendarIcon size={12} /> Last Date: 05/12/2024 • Reg Close: 07 Dec 20:00
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-[var(--color-surface-elevated)] rounded-lg p-3">
                                    <p className="text-xs text-[var(--color-muted)] mb-1">Capacity</p>
                                    <p className="font-semibold">8/64</p>
                                </div>
                                <div className="bg-[var(--color-surface-elevated)] rounded-lg p-3">
                                    <p className="text-xs text-[var(--color-muted)] mb-1">Entry Fee</p>
                                    <p className="font-semibold">₹1400</p>
                                </div>
                            </div>

                            {/* Add Your Partner Section */}
                            <div className="border-t border-[var(--color-border)] pt-4">
                                <h4 className="font-semibold text-sm mb-3">Add your partner</h4>

                                <div className="flex gap-2 mb-3">
                                    <button className="flex-1 px-4 py-2.5 rounded-[var(--radius-button)] border border-[var(--color-border)] text-sm font-medium hover:border-primary transition-colors flex items-center justify-center gap-1">
                                        <UsersIcon size={14} /> Create Your Pair
                                    </button>
                                    <button className="flex-1 px-4 py-2.5 rounded-[var(--radius-button)] border border-[var(--color-border)] text-sm font-medium hover:border-primary transition-colors flex items-center justify-center gap-1">
                                        <PlusIcon size={14} /> Add Me
                                    </button>
                                </div>
                            </div>

                            {/* Mixed Doubles Section */}
                            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                                <h4 className="font-semibold text-sm mb-3">Mixed Doubles</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-[var(--color-surface-elevated)] rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium">Men&apos;s Doubles</p>
                                            <p className="text-xs text-[var(--color-muted)]">₹1400 • 8/64</p>
                                        </div>
                                        <Link
                                            href="/tournaments/1/checkout"
                                            className="px-4 py-1.5 rounded-[var(--radius-button)] text-sm font-semibold text-white"
                                            style={{ background: "var(--gradient-orange)" }}
                                        >
                                            Register <ChevronRightIcon size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Bottom CTA */}
                    <Link
                        href="/tournaments/1/checkout"
                        className="block w-full min-h-[52px] flex items-center justify-center rounded-xl font-semibold text-white shadow-lg transition-transform active:scale-95"
                        style={{ background: "var(--gradient-orange)" }}
                    >
                        Proceed to Registration
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
