"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import RegistrationEventCard from "@/components/Card/RegistrationEventCard";
import type { Event } from "@/types/models";
import { ArrowLeftIcon, InfoIcon, TrashIcon, UsersIcon, ShareIcon } from "@/components/Icons";

const mockEvents: Event[] = [
  {
    id: "e1",
    tournamentId: "1",
    name: "Men’s Singles",
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
    tournamentId: "1",
    name: "Men’s Doubles",
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
    tournamentId: "1",
    name: "Mixed Doubles",
    sport: "Pickleball",
    format: "mixed",
    startDate: "25 Oct 2025",
    regDueDate: "20 Oct 2025",
    entryFee: 0,
    paymentOption: "online",
    status: "open",
  },
];

type PairStep = "adding" | "invited" | "pairing" | "paired";

function PersonChip({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#e7e7e7] bg-[#f8f8f8] px-3 py-2 text-sm dark:border-[#3b3b3b] dark:bg-[#202020]">
      <div className="h-6 w-6 rounded-full bg-[radial-gradient(circle_at_30%_30%,#d1d1d1,#7b7b7b)]" />
      <span>{name}</span>
    </div>
  );
}

export default function TournamentEventPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pairStep, setPairStep] = useState<PairStep>("adding");

  const isSelected = (eventId: string) => selectedIds.includes(eventId);

  const toggleSelection = (event: Event) => {
    setSelectedIds((prev) => {
      if (prev.includes(event.id)) return prev.filter((entry) => entry !== event.id);
      return [...prev, event.id];
    });
  };

  const total = useMemo(
    () => mockEvents.filter((ev) => selectedIds.includes(ev.id)).reduce((sum, ev) => sum + (ev.entryFee ?? 0), 0),
    [selectedIds]
  );

  return (
    <div className="min-h-screen bg-[#ececec] pb-24 text-[#242424] dark:bg-[#121212] dark:text-[#f4f4f4]">
      <div className="bg-[#ff7a1a] pb-4 pt-[max(env(safe-area-inset-top),12px)] text-white">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <button onClick={() => router.back()} className="grid h-9 w-9 place-content-center rounded-full bg-white/35" aria-label="Back">
              <ArrowLeftIcon size={18} />
            </button>
            <button className="grid h-9 w-9 place-content-center rounded-full bg-white/35" aria-label="Share">
              <ShareIcon size={16} />
            </button>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <div className="mt-1 h-12 w-12 rounded-full border border-white/70 bg-[#f1f1f1] text-[10px] font-bold text-[#555] grid place-content-center">
              SOFT
            </div>
            <div>
              <h1 className="text-[29px] font-bold leading-9">Mumbai Men’s 2025</h1>
              <p className="text-[15px] text-white/90">Andheri West Organization</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white px-3 py-2 text-[#2d2d2d]">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-content-center rounded-full border border-[#e2e2e2] text-[#ff7a1a]">
                  <UsersIcon size={14} />
                </div>
                <span className="text-3xl font-bold leading-none">64</span>
              </div>
              <p className="mt-0.5 text-[13px] text-[#656565]">Registered</p>
            </div>
            <div className="rounded-2xl bg-white px-3 py-2 text-[#2d2d2d]">
              <p className="text-2xl font-semibold leading-7">Registration</p>
              <div className="mt-2 grid h-6 place-content-center rounded-full bg-[#efe6d8] text-[11px] font-semibold text-[#ff7a1a]">Open</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-y border-[#d1d1d1] bg-[#efefef] dark:border-[#2e2e2e] dark:bg-[#181818]">
        <Link href={`/tournaments/${id}`} className="grid h-10 place-content-center text-lg font-semibold text-[#979797]">
          About
        </Link>
        <button className="h-10 border-b-2 border-[#ff7a1a] text-lg font-semibold text-[#ff7a1a]">Events</button>
      </div>

      <div className="space-y-3 p-3 pb-28">
        {mockEvents.map((event) => {
          const selected = isSelected(event.id);
          const showPairBox = event.format === "doubles" && selected;

          return (
            <RegistrationEventCard
              key={event.id}
              event={event}
              isSelected={selected}
              onSelect={() => toggleSelection(event)}
              onDeselect={() => toggleSelection(event)}
            >
              {showPairBox ? (
                <div className="rounded-2xl border border-[#dddddd] bg-[#f2f2f2] p-3 dark:border-[#353535] dark:bg-[#212121]">
                  {pairStep === "adding" ? (
                    <>
                      <p className="text-xl font-semibold">Add your partner</p>
                      <input
                        placeholder="Enter partner’s Phone No."
                        className="mt-2 h-10 w-full rounded-lg border border-[#e0e0e0] bg-white px-3 text-sm outline-none dark:border-[#404040] dark:bg-[#181818]"
                      />
                      <p className="mt-1 flex items-start gap-1 text-xs text-[#8a8a8a]">
                        <InfoIcon size={11} className="mt-0.5" />
                        Your partner must be registered on the app to enroll.
                      </p>
                      <button
                        onClick={() => setPairStep("invited")}
                        className="mt-2 h-9 w-full rounded-full border border-[#ff7a1a] text-base font-semibold text-[#ff7a1a]"
                      >
                        Add Partner
                      </button>
                    </>
                  ) : null}

                  {pairStep === "invited" ? (
                    <>
                      <p className="text-xl font-semibold">Add your partner</p>
                      <div className="mt-2 flex items-center justify-between rounded-lg border border-[#e2e2e2] bg-[#f7f7f7] p-2 text-sm dark:border-[#3c3c3c] dark:bg-[#242424]">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-[radial-gradient(circle_at_30%_30%,#d1d1d1,#7b7b7b)]" />
                          <span>Anil Kumar</span>
                        </div>
                        <span className="rounded-md bg-[#fff2e7] px-2 py-0.5 text-[10px] text-[#ff7a1a]">Invite Pending</span>
                      </div>
                      <button
                        onClick={() => setPairStep("pairing")}
                        className="mt-2 h-9 w-full rounded-full border border-[#ff7a1a] text-base font-semibold text-[#ff7a1a]"
                      >
                        Continue
                      </button>
                    </>
                  ) : null}

                  {pairStep === "pairing" ? (
                    <>
                      <p className="text-xl font-semibold">Create Your Pair</p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <PersonChip name="You" />
                        <button
                          onClick={() => setPairStep("adding")}
                          className="flex items-center justify-center gap-1 rounded-lg bg-[#ffd9d9] px-3 py-2 text-sm text-[#ef4444]"
                        >
                          <TrashIcon size={12} /> Remove
                        </button>
                      </div>
                      <button
                        onClick={() => setPairStep("paired")}
                        className="mt-2 h-9 w-full rounded-full border border-[#ff7a1a] text-base font-semibold text-[#ff7a1a]"
                      >
                        Confirm Your Pair
                      </button>
                    </>
                  ) : null}

                  {pairStep === "paired" ? (
                    <div className="grid grid-cols-2 gap-2">
                      <PersonChip name="You" />
                      <PersonChip name="Anil Kumar" />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </RegistrationEventCard>
          );
        })}
      </div>

      {total > 0 ? (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#dbdbdb] bg-[#efefef] p-3 pb-[max(env(safe-area-inset-bottom),12px)] dark:border-[#2f2f2f] dark:bg-[#151515]">
          <div className="flex items-center gap-3">
            <div className="min-w-[110px]">
              <p className="text-sm text-[#666] dark:text-[#b9b9b9]">Total Amount:</p>
              <p className="text-4xl font-bold leading-9 text-[#ff7a1a]">? {total}</p>
            </div>
            <Link href={`/tournaments/${id}/checkout`} className="grid h-11 flex-1 place-content-center rounded-full bg-[#ff7a1a] text-xl font-semibold text-white">
              Claim Spot
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

