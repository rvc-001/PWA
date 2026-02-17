"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ChevronRightIcon,
  InfoIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  TrashIcon,
  UsersIcon,
} from "@/components/Icons";

type MainTab = "about" | "events";
type EventKind = "singles" | "doubles" | "mixed";
type PairStep = "idle" | "adding" | "invited" | "pairing" | "paired";

type EventData = {
  id: string;
  name: string;
  kind: EventKind;
  startDate: string;
  closeDate: string;
  fee: number;
  payment: "Online" | "Venue";
};

const events: EventData[] = [
  {
    id: "single",
    name: "Men’s Singles",
    kind: "singles",
    startDate: "25 Oct 2025",
    closeDate: "20 Oct 2025",
    fee: 1400,
    payment: "Online",
  },
  {
    id: "double",
    name: "Men’s Doubles",
    kind: "doubles",
    startDate: "25 Oct 2025",
    closeDate: "20 Oct 2025",
    fee: 1400,
    payment: "Venue",
  },
  {
    id: "mixed",
    name: "Mixed Doubles",
    kind: "mixed",
    startDate: "25 Oct 2025",
    closeDate: "20 Oct 2025",
    fee: 0,
    payment: "Online",
  },
];

const contacts = [
  { id: "c1", name: "Piyush Mantri", phone: "+918424959991", email: "piyushmantri0311@gmail.com" },
  { id: "c2", name: "Piyush Mantri", phone: "+918424959991", email: "piyushmantri0311@gmail.com" },
  { id: "c3", name: "Piyush Mantri", phone: "+918424959991", email: "piyushmantri0311@gmail.com" },
];

function PersonChip({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#e7e7e7] bg-[#f8f8f8] px-3 py-2 text-[16px] dark:border-[#3b3b3b] dark:bg-[#202020]">
      <div className="h-6 w-6 rounded-full bg-[radial-gradient(circle_at_30%_30%,#d1d1d1,#7b7b7b)]" />
      <span>{name}</span>
    </div>
  );
}

export default function TournamentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);

  const [tab, setTab] = useState<MainTab>("about");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [pairState, setPairState] = useState<PairStep>("idle");
  const [partnerPhone, setPartnerPhone] = useState("");

  const total = useMemo(
    () => events.filter((ev) => selected[ev.id]).reduce((sum, ev) => sum + ev.fee, 0),
    [selected]
  );

  const setEventSelected = (eventId: string, value: boolean) => {
    setSelected((prev) => ({ ...prev, [eventId]: value }));
  };

  const toggleEvent = (ev: EventData) => {
    const current = Boolean(selected[ev.id]);
    if (current) {
      setEventSelected(ev.id, false);
      if (ev.kind === "doubles") {
        setPairState("idle");
        setPartnerPhone("");
      }
      return;
    }

    setEventSelected(ev.id, true);
    if (ev.kind === "doubles" && pairState === "idle") {
      setPairState("adding");
    }
  };

  return (
    <div className="min-h-screen bg-[#ececec] pb-24 text-[#242424] dark:bg-[#121212] dark:text-[#f4f4f4]">
      <div className="bg-[#ff7a1a] pb-4 pt-[max(env(safe-area-inset-top),12px)] text-white">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="grid h-9 w-9 place-content-center rounded-full bg-white/35"
              aria-label="Back"
            >
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
              <h1 className="text-[38px] font-bold leading-9">Mumbai Men’s 2025</h1>
              <p className="text-[15px] text-white/90">Andheri West Organization</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white px-3 py-2 text-[#2d2d2d]">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-content-center rounded-full border border-[#e2e2e2] text-[#ff7a1a]">
                  <UsersIcon size={14} />
                </div>
                <span className="text-[35px] font-bold leading-none">64</span>
              </div>
              <p className="mt-0.5 text-[13px] text-[#656565]">Registered</p>
            </div>
            <div className="rounded-2xl bg-white px-3 py-2 text-[#2d2d2d]">
              <p className="text-[26px] font-semibold leading-7">Registration</p>
              <div className="mt-2 grid h-6 place-content-center rounded-full bg-[#efe6d8] text-[11px] font-semibold text-[#ff7a1a]">Open</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-y border-[#d1d1d1] bg-[#efefef] dark:border-[#2e2e2e] dark:bg-[#181818]">
        <button
          onClick={() => setTab("about")}
          className={`h-10 text-[29px] font-semibold ${tab === "about" ? "text-[#ff7a1a] border-b-2 border-[#ff7a1a]" : "text-[#979797]"}`}
        >
          About
        </button>
        <button
          onClick={() => setTab("events")}
          className={`h-10 text-[29px] font-semibold ${tab === "events" ? "text-[#ff7a1a] border-b-2 border-[#ff7a1a]" : "text-[#979797]"}`}
        >
          Events
        </button>
      </div>

      <div className="space-y-3 p-3 pb-28">
        {tab === "about" ? (
          <>
            <section className="rounded-2xl border border-[#d8d8d8] bg-[#efefef] p-3 dark:border-[#313131] dark:bg-[#191919]">
              <h2 className="text-[32px] font-semibold">Overview</h2>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-[#dedede] bg-[#f5f5f5] p-2 dark:border-[#373737] dark:bg-[#222]">
                  <p className="text-[12px] text-[#6f6f6f]">Start Date</p>
                  <p className="text-[14px]">31 Dec 2025, 24:00</p>
                </div>
                <div className="rounded-xl border border-[#dedede] bg-[#f5f5f5] p-2 dark:border-[#373737] dark:bg-[#222]">
                  <p className="text-[12px] text-[#6f6f6f]">End Date</p>
                  <p className="text-[14px]">31 Dec 2025, 24:00</p>
                </div>
              </div>
              <div className="mt-2 rounded-xl border border-[#dedede] bg-[#f5f5f5] p-2 dark:border-[#373737] dark:bg-[#222]">
                <p className="text-[12px] text-[#6f6f6f]">Venue Details</p>
                <p className="text-[14px]">Athlete’s Club, 24 Sector, Mumbai, Maharashtra</p>
              </div>
            </section>

            <section className="rounded-2xl border border-[#d8d8d8] bg-[#efefef] p-3 dark:border-[#313131] dark:bg-[#191919]">
              <h2 className="text-[32px] font-semibold">Description</h2>
              <p className="mt-1 text-[17px] text-[#595959] dark:text-[#bebebe]">
                Join the biggest badminton tournament in the city! Open to all skill levels with exciting prizes.
              </p>
            </section>

            <section className="rounded-2xl border border-[#d8d8d8] bg-[#efefef] p-3 dark:border-[#313131] dark:bg-[#191919]">
              <h2 className="text-[32px] font-semibold">Contact Information</h2>
              <div className="mt-2 space-y-2">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border-b border-[#dddddd] pb-2 last:border-b-0 dark:border-[#2f2f2f]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-[radial-gradient(circle_at_30%_30%,#d1d1d1,#7b7b7b)]" />
                        <p className="text-[20px] font-medium">{contact.name}</p>
                      </div>
                      <span className="rounded-full bg-[#26b34a] px-2 py-0.5 text-[11px] font-semibold text-white">Organizer</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[15px] text-[#6b6b6b] dark:text-[#c2c2c2]">
                      <PhoneIcon size={12} className="text-[#ff7a1a]" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[15px] text-[#6b6b6b] dark:text-[#c2c2c2]">
                      <MailIcon size={12} className="text-[#ff7a1a]" />
                      <span>{contact.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          events.map((ev) => {
            const isSelected = Boolean(selected[ev.id]);
            const isDoubles = ev.kind === "doubles";

            return (
              <section key={ev.id} className="rounded-2xl border border-[#d8d8d8] bg-[#efefef] p-3 dark:border-[#313131] dark:bg-[#191919]">
                <h3 className="text-[31px] font-semibold">{ev.name}</h3>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[12px] text-[#4f4f4f] dark:text-[#c3c3c3]">
                  <p className="flex items-center gap-1.5"><CalendarIcon size={12} className="text-[#ff7a1a]" />Start Date: {ev.startDate}</p>
                  <p className="flex items-center gap-1.5"><SearchIcon size={12} className="text-[#ff7a1a]" />Reg. Closes: {ev.closeDate}</p>
                </div>

                <div className="mt-2 flex items-end justify-between">
                  <div>
                    <p className="text-[40px] font-bold leading-10 text-[#ff7a1a]">{ev.fee === 0 ? "Free Entry" : `? ${ev.fee}`}</p>
                    <p className="text-[14px] text-[#747474] dark:text-[#b6b6b6]">Payment: {ev.payment}</p>
                  </div>

                  <button
                    onClick={() => toggleEvent(ev)}
                    className={`inline-flex h-9 min-w-[102px] items-center justify-center gap-1 rounded-full border px-4 text-[29px] font-semibold ${
                      isSelected
                        ? "border-[#ff7a1a] bg-[#ff7a1a] text-white"
                        : "border-[#ff7a1a] text-[#ff7a1a]"
                    }`}
                  >
                    {isSelected ? "Added" : <><PlusIcon size={12} /> Add</>}
                  </button>
                </div>

                {isDoubles && isSelected ? (
                  <div className="mt-3 rounded-2xl border border-[#dddddd] bg-[#f2f2f2] p-3 dark:border-[#353535] dark:bg-[#212121]">
                    {pairState === "adding" ? (
                      <>
                        <p className="text-[32px] font-semibold">Add your partner</p>
                        <input
                          value={partnerPhone}
                          onChange={(e) => setPartnerPhone(e.target.value)}
                          placeholder="Enter partner’s Phone No."
                          className="mt-2 h-10 w-full rounded-lg border border-[#e0e0e0] bg-white px-3 text-[14px] outline-none dark:border-[#404040] dark:bg-[#181818]"
                        />
                        <p className="mt-1 flex items-start gap-1 text-[11px] text-[#8a8a8a]">
                          <InfoIcon size={11} className="mt-0.5" />
                          Your partner must be registered on the app to enroll.
                        </p>
                        <button
                          onClick={() => setPairState("invited")}
                          className="mt-2 h-9 w-full rounded-full border border-[#ff7a1a] text-[30px] font-semibold text-[#ff7a1a]"
                        >
                          Add Partner
                        </button>
                      </>
                    ) : null}

                    {pairState === "invited" ? (
                      <>
                        <p className="text-[32px] font-semibold">Add your partner</p>
                        <div className="mt-2 flex items-center justify-between rounded-lg border border-[#e2e2e2] bg-[#f7f7f7] p-2 text-[14px] dark:border-[#3c3c3c] dark:bg-[#242424]">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-[radial-gradient(circle_at_30%_30%,#d1d1d1,#7b7b7b)]" />
                            <span>Anil Kumar</span>
                          </div>
                          <span className="rounded-md bg-[#fff2e7] px-2 py-0.5 text-[10px] text-[#ff7a1a]">Invite Pending</span>
                        </div>
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-[#8a8a8a]"><InfoIcon size={11} /> Waiting for Anil Kumar to accept the invite.</p>
                        <button
                          onClick={() => setPairState("pairing")}
                          className="mt-2 h-9 w-full rounded-full border border-[#ff7a1a] text-[30px] font-semibold text-[#ff7a1a]"
                        >
                          Continue
                        </button>
                      </>
                    ) : null}

                    {pairState === "pairing" ? (
                      <>
                        <div className="flex items-center gap-2">
                          <ArrowLeftIcon size={14} />
                          <p className="text-[32px] font-semibold">Create Your Pair</p>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <PersonChip name="You" />
                          <button
                            onClick={() => setPairState("adding")}
                            className="flex items-center justify-center gap-1 rounded-lg bg-[#ffd9d9] px-3 py-2 text-[15px] text-[#ef4444]"
                          >
                            <TrashIcon size={12} /> Remove
                          </button>
                        </div>
                        <button
                          onClick={() => setPairState("paired")}
                          className="mt-2 h-9 w-full rounded-full border border-[#ff7a1a] text-[30px] font-semibold text-[#ff7a1a]"
                        >
                          Confirm Your Pair
                        </button>
                      </>
                    ) : null}

                    {pairState === "paired" ? (
                      <div className="grid grid-cols-2 gap-2">
                        <PersonChip name="You" />
                        <PersonChip name="Anil Kumar" />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </section>
            );
          })
        )}
      </div>

      {tab === "about" ? (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#dbdbdb] bg-[#efefef] p-3 pb-[max(env(safe-area-inset-bottom),12px)] dark:border-[#2f2f2f] dark:bg-[#151515]">
          <button
            onClick={() => setTab("events")}
            className="h-11 w-full rounded-full bg-[#ff7a1a] text-[31px] font-semibold text-white"
          >
            Select Event
          </button>
        </div>
      ) : total > 0 ? (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#dbdbdb] bg-[#efefef] p-3 pb-[max(env(safe-area-inset-bottom),12px)] dark:border-[#2f2f2f] dark:bg-[#151515]">
          <div className="flex items-center gap-3">
            <div className="min-w-[110px]">
              <p className="text-[14px] text-[#666] dark:text-[#b9b9b9]">Total Amount:</p>
              <p className="text-[42px] font-bold leading-9 text-[#ff7a1a]">? {total}</p>
            </div>
            <Link
              href={`/tournaments/${id}/checkout`}
              className="grid h-11 flex-1 place-content-center rounded-full bg-[#ff7a1a] text-[31px] font-semibold text-white"
            >
              Claim Spot
            </Link>
          </div>
        </div>
      ) : null}

      {tab === "events" && total > 0 ? <div className="h-24" /> : null}
    </div>
  );
}

