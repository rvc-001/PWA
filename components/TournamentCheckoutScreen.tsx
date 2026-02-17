"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, CheckCircleIcon, ChevronRightIcon, TrashIcon } from "@/components/Icons";

const rows = [
  { id: "r1", tag: "PAY ONLINE", title: "Men’s Singles", fee: 1400 },
  { id: "r2", tag: "PAY AT VENUE", title: "Men’s Singles", fee: 1400 },
  { id: "r3", tag: "PAY ONLINE", title: "Men’s Singles", fee: 1400 },
];

export default function TournamentCheckoutScreen() {
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  if (completed) {
    return (
      <div className="min-h-screen bg-[#efefef] text-[#1f1f1f] dark:bg-[#111] dark:text-[#f2f2f2]">
        <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 text-center">
          <div className="mx-auto grid h-24 w-24 place-content-center rounded-full border-4 border-[#22c55e] text-[#22c55e]">
            <CheckCircleIcon size={48} />
          </div>
          <h1 className="mt-6 text-3xl font-semibold">Registration Completed</h1>
          <p className="mt-4 text-lg text-[#4e4e4e] dark:text-[#bdbdbd]">
            You are on the waiting list now.
            <br />
            For further info Contact your tournament Organizer.
            <br />
            +91 92345 44673
          </p>

          <Link
            href="/tournaments"
            className="mt-12 inline-flex h-12 items-center justify-center rounded-full bg-[#ff7a1a] px-6 text-xl font-semibold text-white"
          >
            View Registered Tournaments
            <ChevronRightIcon size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#efefef] pb-24 text-[#202020] dark:bg-[#111] dark:text-[#f3f3f3]">
      <div className="mx-auto max-w-md px-4 pt-[max(env(safe-area-inset-top),14px)]">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="grid h-9 w-9 place-content-center rounded-full border border-[#d8d8d8] bg-[#f5f5f5] dark:border-[#333] dark:bg-[#1a1a1a]">
            <ArrowLeftIcon size={16} />
          </button>
          <h1 className="text-2xl font-semibold">Confirm Your Spot</h1>
        </div>

        <div className="mt-5 flex items-start gap-3">
          <div className="mt-1 h-12 w-12 rounded-full border border-[#c8c8c8] bg-[#f1f1f1] text-[10px] font-bold text-[#555] grid place-content-center">
            SOFT
          </div>
          <div>
            <h2 className="text-3xl font-semibold">Mumbai Men’s 2025</h2>
            <p className="text-sm text-[#5f5f5f] dark:text-[#bcbcbc]">Andheri West Organization</p>
          </div>
        </div>

        <section className="mt-5">
          <h3 className="text-3xl font-semibold">Your Registrations</h3>
          <div className="mt-3 space-y-2.5">
            {rows.map((row) => (
              <div key={row.id} className="rounded-2xl border border-[#dddddd] bg-[#f7f7f7] p-2.5 dark:border-[#333] dark:bg-[#181818]">
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${row.tag === "PAY ONLINE" ? "bg-[#22c55e]" : "bg-[#f97316]"}`}>
                    {row.tag}
                  </span>
                  <button className="text-[#ef4444]">
                    <TrashIcon size={12} />
                  </button>
                </div>
                <div className="mt-1 flex items-end justify-between">
                  <p className="text-[29px] font-semibold">{row.title}</p>
                  <p className="text-[31px] font-bold text-[#ff7a1a]">₹ {row.fee}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 border-t border-[#d8d8d8] pt-4 text-[16px] dark:border-[#2f2f2f]">
          <div className="flex items-center justify-between py-0.5">
            <span className="text-[#666] dark:text-[#bcbcbc]">Total Fees</span>
            <span className="font-semibold">₹2800</span>
          </div>
          <div className="flex items-center justify-between py-0.5">
            <span className="text-[#666] dark:text-[#bcbcbc]">Pay at Venue</span>
            <span className="font-semibold text-[#ef4444]">-₹1400</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[33px] font-semibold">To Pay Now</span>
            <span className="text-[39px] font-bold">₹1400</span>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-[#dddddd] bg-[#f7f7f7] p-4 dark:border-[#333] dark:bg-[#181818]">
          <div className="mx-auto h-32 w-32 rounded-xl bg-white p-2 shadow">
            <div className="grid h-full w-full grid-cols-6 gap-[2px] rounded bg-white p-1">
              {Array.from({ length: 36 }).map((_, idx) => (
                <span key={idx} className={idx % 3 === 0 ? "bg-black" : idx % 5 === 0 ? "bg-black" : "bg-white"} />
              ))}
            </div>
          </div>
          <p className="mt-2 text-center text-sm">Scan to pay <span className="font-semibold text-[#ff7a1a]">₹1400</span></p>
          <p className="text-center text-xs text-[#737373] dark:text-[#b5b5b5]">UPI ID: forehandexample@oksbi</p>
        </section>

        <section className="mt-4 rounded-xl bg-[#f8e3d2] p-3 text-[#8d4e24] dark:bg-[#3b2a20] dark:text-[#f3be94]">
          <p className="text-base font-semibold">Venue Payment Required</p>
          <p className="mt-1 text-xs">₹1400 needs to be paid at the registration desk upon arrival. Contact organizer for details.</p>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#dbdbdb] bg-[#efefef] p-3 pb-[max(env(safe-area-inset-bottom),12px)] dark:border-[#2f2f2f] dark:bg-[#151515]">
        <button
          onClick={() => setCompleted(true)}
          className="mx-auto flex h-11 w-full max-w-md items-center justify-center rounded-full bg-[#ff7a1a] text-xl font-semibold text-white"
        >
          Confirm Registration
          <ChevronRightIcon size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
