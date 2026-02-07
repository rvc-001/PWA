"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { PhoneIcon, WalletIcon, ClipboardIcon, ChevronRightIcon, CheckIcon } from "@/components/Icons";

export default function CheckoutPage() {
    const [isCompleted, setIsCompleted] = useState(false);

    const registrations = [
        {
            category: "Men's Singles",
            status: "Registered",
            partner: null,
            fee: "Free Entry",
        },
        {
            category: "Men's Doubles",
            status: "Pending",
            partner: "By Roy Mera",
            fee: "₹1400",
        },
        {
            category: "Mixed Doubles",
            status: "Registered",
            partner: "By Play Mera",
            fee: "₹1400",
        },
    ];

    const handleConfirm = () => {
        setIsCompleted(true);
    };

    if (isCompleted) {
        return (
            <Layout title="Registration Complete" showBack>
                <div className="min-h-screen flex flex-col items-center justify-center p-6">
                    <div className="w-24 h-24 rounded-full bg-[var(--badge-success-bg)] flex items-center justify-center mb-6">
                        <svg
                            className="w-12 h-12 text-[var(--badge-success-text)]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">
                        Registration Completed!
                    </h1>
                    <p className="text-[var(--color-muted)] text-center mb-8 max-w-xs">
                        Your spot has been confirmed for the tournament. Good luck!
                    </p>

                    <Link
                        href="/tournaments"
                        className="w-full max-w-sm min-h-[52px] flex items-center justify-center rounded-xl font-semibold text-white shadow-lg"
                        style={{ background: "var(--gradient-orange)" }}
                    >
                        View Tournament Details
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Confirm Your Spot" showBack>
            <div className="p-4 space-y-6 pb-24">
                {/* Your Registrations */}
                <section>
                    <h3 className="font-semibold mb-4">Your Registrations</h3>

                    <div className="space-y-3">
                        {registrations.map((reg, idx) => (
                            <div
                                key={idx}
                                className="bg-[var(--color-surface)] rounded-[var(--radius-card)] border border-[var(--color-border)] p-4"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h4 className="font-semibold text-sm">{reg.category}</h4>
                                        {reg.partner && (
                                            <p className="text-xs text-[var(--color-muted)] mt-1">
                                                Partner: {reg.partner}
                                            </p>
                                        )}
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${reg.status === "Registered"
                                            ? "bg-[var(--badge-success-bg)] text-[var(--badge-success-text)]"
                                            : "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)]"
                                            }`}
                                    >
                                        {reg.status}
                                    </span>
                                </div>
                                <p className="text-sm font-semibold text-primary">{reg.fee}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Payment Summary */}
                <section className="bg-[var(--color-surface)] rounded-[var(--radius-card)] border border-[var(--color-border)] p-4">
                    <h3 className="font-semibold mb-4">Payment Details</h3>

                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-[var(--color-muted)]">Subtotal</span>
                            <span className="font-semibold">₹2800</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[var(--color-muted)]">Discount</span>
                            <span className="font-semibold text-[var(--badge-success-text)]">
                                -₹1400
                            </span>
                        </div>
                        <div className="h-px bg-[var(--color-border)] my-2" />
                        <div className="flex justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-lg">₹1400</span>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="bg-[var(--color-surface-elevated)] rounded-lg p-4 text-center">
                        <div className="w-32 h-32 mx-auto mb-3 bg-white rounded-lg flex items-center justify-center">
                            <PhoneIcon size={32} className="text-[var(--color-muted)]" />
                        </div>
                        <p className="text-xs text-[var(--color-muted)]">
                            Scan to pay via UPI
                        </p>
                    </div>

                    <div className="mt-4 text-xs text-[var(--color-muted)] text-center">
                        <span className="flex items-center gap-1"><WalletIcon size={12} /> UPI: tournament@upi</span><br />
                        <span className="flex items-center gap-1"><ClipboardIcon size={12} /> Reference: MUMBT2025</span>
                    </div>
                </section>

                {/* Confirm Button */}
                <button
                    onClick={handleConfirm}
                    className="w-full min-h-[52px] flex items-center justify-center rounded-xl font-semibold text-white shadow-lg transition-transform active:scale-95"
                    style={{ background: "var(--gradient-orange)" }}
                >
                    Confirm Registration <ChevronRightIcon size={16} />
                </button>

                <p className="text-xs text-[var(--color-muted)] text-center">
                    By confirming, you agree to the tournament rules and regulations.
                </p>
            </div>
        </Layout>
    );
}
