"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import { setItem, getItem } from "@/lib/storage";
import type { Event } from "@/types/models";

type JoinDraft = {
  eventId: string;
  mode: "single" | "pair";
  partnerName?: string;
  partnerPhone?: string;
  partnerLater?: boolean;
};

export default function UserTournamentEventsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const tournamentId = String(params.id);
  const selectedId = searchParams.get("event");

  const events: Event[] = useMemo(
    () => [
      {
        id: "e1",
        tournamentId,
        name: "Men's Singles",
        sport: "Pickleball",
        format: "singles",
        startDate: "25 Oct 2025",
        regDueDate: "20 Oct 2025",
        entryFee: 1400,
        paymentOption: "online",
        status: "open",
      },
      {
        id: "e2",
        tournamentId,
        name: "Men's Doubles",
        sport: "Pickleball",
        format: "doubles",
        startDate: "25 Oct 2025",
        regDueDate: "20 Oct 2025",
        entryFee: 1400,
        paymentOption: "venue",
        status: "open",
      },
      {
        id: "e3",
        tournamentId,
        name: "Mixed Doubles",
        sport: "Pickleball",
        format: "mixed",
        startDate: "25 Oct 2025",
        entryFee: 0,
        status: "open",
      },
    ],
    [tournamentId]
  );

  const selected = selectedId ? events.find((e) => e.id === selectedId) : null;
  const joinKey = selected ? `join:${tournamentId}:${selected.id}` : null;
  const existingJoin = joinKey ? getItem<JoinDraft>(joinKey) : null;

  const [partnerName, setPartnerName] = useState(existingJoin?.partnerName ?? "");
  const [partnerPhone, setPartnerPhone] = useState(existingJoin?.partnerPhone ?? "");
  const [partnerLater, setPartnerLater] = useState(Boolean(existingJoin?.partnerLater));
  const [joined, setJoined] = useState(Boolean(existingJoin));

  const join = () => {
    if (!selected || !joinKey) return;
    const mode: JoinDraft["mode"] = selected.format === "singles" ? "single" : "pair";
    const payload: JoinDraft = {
      eventId: selected.id,
      mode,
      partnerLater: selected.format === "singles" ? undefined : partnerLater,
      partnerName: selected.format === "singles" || partnerLater ? undefined : partnerName.trim() || undefined,
      partnerPhone: selected.format === "singles" || partnerLater ? undefined : partnerPhone.trim() || undefined,
    };
    setItem(joinKey, payload);
    setJoined(true);
  };

  return (
    <Layout title="Tournament Events" showBack showBottomNav={false} onBack={() => router.back()}>
      <div className="p-4 space-y-4">
        <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)] p-4">
          <p className="text-sm text-[var(--color-muted)]">Tournament</p>
          <p className="font-semibold">Mumbai Men&apos;s 2025</p>
          <p className="text-sm text-[var(--color-muted)] mt-1">Select an event to participate.</p>
        </div>

        <div className="space-y-3">
          {events.map((ev) => {
            const active = selected?.id === ev.id;
            return (
              <Link
                key={ev.id}
                href={`/user/tournaments/${tournamentId}/events?event=${ev.id}`}
                className={`block p-4 rounded-[var(--radius-card)] border shadow-[var(--shadow-card)] transition-colors ${
                  active
                    ? "bg-primary/5 border-primary/40"
                    : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-primary/30"
                }`}
                onClick={() => {
                  setJoined(Boolean(getItem<JoinDraft>(`join:${tournamentId}:${ev.id}`)));
                  setPartnerLater(false);
                  setPartnerName("");
                  setPartnerPhone("");
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{ev.name}</p>
                    <p className="text-sm text-[var(--color-muted)]">
                      {ev.sport} · {ev.format} · {ev.startDate}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      ev.status === "open"
                        ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
                        : "bg-[var(--color-muted)]/20 text-[var(--color-muted)]"
                    }`}
                  >
                    {ev.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  {ev.entryFee != null && (
                    <span className="text-[var(--color-muted)]">
                      Fee: {ev.entryFee === 0 ? "Free" : `₹${ev.entryFee}`}
                    </span>
                  )}
                  {active && (
                    <span className="ml-auto text-primary text-sm font-medium">
                      View details
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {selected && (
          <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)] p-4 space-y-3">
            <div>
              <p className="font-semibold">Participation</p>
              <p className="text-sm text-[var(--color-muted)]">
                {selected.format === "singles"
                  ? "Join as an individual."
                  : "Join as a pair. Add partner details now or later."}
              </p>
            </div>

            {selected.format !== "singles" && (
              <>
                <label className="flex items-center justify-between gap-3 p-3 rounded-[var(--radius-card)] bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
                  <div>
                    <p className="text-sm font-medium">Select partner later</p>
                    <p className="text-xs text-[var(--color-muted)]">You can add a partner before the draw.</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={partnerLater}
                    onClick={() => setPartnerLater((v) => !v)}
                    className={`w-12 h-6 rounded-full relative shrink-0 ${
                      partnerLater ? "bg-primary" : "bg-[var(--color-border)]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                        partnerLater ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </label>

                {!partnerLater && (
                  <div className="grid grid-cols-1 gap-3">
                    <label className="block">
                      <span className="text-sm text-[var(--color-muted)]">Partner name</span>
                      <input
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
                        placeholder="Enter partner name"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-[var(--color-muted)]">Partner phone</span>
                      <input
                        value={partnerPhone}
                        onChange={(e) => setPartnerPhone(e.target.value)}
                        className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
                        placeholder="Enter partner phone"
                        inputMode="tel"
                      />
                    </label>
                  </div>
                )}
              </>
            )}

            <button
              type="button"
              onClick={join}
              className="w-full min-h-[44px] rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium"
            >
              {joined ? "Update participation" : "Participate"}
            </button>

            {joined && (
              <p className="text-sm text-[var(--color-success)]">
                Participation saved.
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

