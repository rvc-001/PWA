"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  BellIcon,
  CalendarIcon,
  ChevronRightIcon,
  FilterIcon,
  MapPinIcon,
  SearchIcon,
} from "@/components/Icons";
import BottomNav from "@/components/BottomNav";

type TopTab = "browse" | "joined" | "history";
type FormatTab = "all" | "singles" | "doubles";

type TournamentItem = {
  id: string;
  name: string;
  subtitle: string;
  start: string;
  end: string;
  entry?: string;
  location: string;
  players: string;
  cta: "Register" | "View" | "Chevron";
  joinedStatus?: string;
};

const browseItems: TournamentItem[] = [
  {
    id: "1",
    name: "Monsoon Pickleball Op..",
    subtitle: "Pickle ball • Men’s • Multiple Modes",
    start: "15/01/2024",
    end: "15/01/2024",
    entry: "500 Entry",
    location: "Raipur | Chattisgarh",
    players: "50+ More",
    cta: "Register",
  },
  {
    id: "2",
    name: "Monsoon Pickleball Op..",
    subtitle: "Pickle ball • Men’s • Multiple Modes",
    start: "15/01/2024",
    end: "15/01/2024",
    entry: "500 Entry",
    location: "Raipur | Chattisgarh",
    players: "50+ More",
    cta: "Register",
  },
  {
    id: "3",
    name: "Monsoon Pickleball Op..",
    subtitle: "Pickle ball • Men’s • Multiple Modes",
    start: "15/01/2024",
    end: "15/01/2024",
    entry: "500 Entry",
    location: "Raipur | Chattisgarh",
    players: "50+ More",
    cta: "Register",
  },
];

const joinedItems: TournamentItem[] = [
  {
    id: "4",
    name: "Monsoon Pickleball Op..",
    subtitle: "Pickle ball • Men’s • Multiple Modes",
    start: "15/01/2024",
    end: "15/01/2024",
    entry: "500 Entry",
    location: "Raipur | Chattisgarh",
    players: "50+ More",
    cta: "View",
  },
  {
    id: "5",
    name: "Monsoon Pickleball Op..",
    subtitle: "Pickle ball • Men’s • Multiple Modes",
    start: "15/01/2024",
    end: "15/01/2024",
    entry: "500 Entry",
    location: "Raipur | Chattisgarh",
    players: "50+ More",
    cta: "View",
  },
  {
    id: "6",
    name: "Monsoon Pickleball Op..",
    subtitle: "Pickle ball • Men’s • Multiple Modes",
    start: "15/01/2024",
    end: "15/01/2024",
    entry: "500 Entry",
    location: "Raipur | Chattisgarh",
    players: "50+ More",
    cta: "View",
  },
];

const historyItems: TournamentItem[] = [
  {
    id: "7",
    name: "Champions league",
    subtitle: "Pickle ball • Men’s • Multiple Modes",
    start: "15/01/2024",
    end: "15/01/2024",
    location: "Raipur | Chattisgarh",
    players: "",
    cta: "Chevron",
    joinedStatus: "Eliminated - Round 4",
  },
  {
    id: "8",
    name: "Champions league",
    subtitle: "Pickle ball • Men’s • Multiple Modes",
    start: "15/01/2024",
    end: "15/01/2024",
    location: "Raipur | Chattisgarh",
    players: "",
    cta: "Chevron",
    joinedStatus: "Eliminated - Round 4",
  },
  {
    id: "9",
    name: "Champions league",
    subtitle: "Pickle ball • Men’s • Multiple Modes",
    start: "15/01/2024",
    end: "15/01/2024",
    location: "Raipur | Chattisgarh",
    players: "",
    cta: "Chevron",
    joinedStatus: "Eliminated - Round 4",
  },
  {
    id: "10",
    name: "Champions league",
    subtitle: "Pickle ball • Men’s • Multiple Modes",
    start: "15/01/2024",
    end: "15/01/2024",
    location: "Raipur | Chattisgarh",
    players: "",
    cta: "Chevron",
    joinedStatus: "Eliminated - Round 4",
  },
];



function TournamentCard({ item }: { item: TournamentItem }) {
  return (
    <Link
      href={item.cta === "Register" ? `/tournaments/${item.id}` : `/tournaments/${item.id}`}
      className="block rounded-2xl border border-[#ff8e40] bg-white p-3.5 dark:bg-[#1b1b1b]"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-12 w-12 shrink-0 rounded-full border border-[#c8c8c8] bg-[#f3f3f3] text-[10px] font-bold text-[#6a6a6a] grid place-content-center">
          SOFT
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-[18px] font-bold leading-6 text-[#2d2d2d] dark:text-[#f2f2f2]">{item.name}</h3>
              <p className="truncate text-[12px] text-[#5e5e5e] dark:text-[#bfbfbf]">{item.subtitle}</p>
            </div>
            {item.cta === "Chevron" ? (
              <ChevronRightIcon size={20} className="mt-1 text-[#2d2d2d] dark:text-[#f2f2f2]" />
            ) : null}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-y-2 text-[12px] text-[#4a4a4a] dark:text-[#cccccc]">
            <div className="flex items-center gap-1.5">
              <CalendarIcon size={12} />
              <span>Start: {item.start}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarIcon size={12} />
              <span>End: {item.end}</span>
            </div>
            {item.entry ? (
              <div className="flex items-center gap-1.5">
                <span className="text-primary font-bold">₹</span> {item.entry}
              </div>
            ) : (
              <div className="h-4" />
            )}
            <div className="flex items-center gap-1.5">
              <MapPinIcon size={12} />
              <span>{item.location}</span>
            </div>
            {item.joinedStatus ? (
              <div className="col-span-2 text-[12px] flex items-center gap-1">
                <BellIcon size={12} className="text-primary" /> {item.joinedStatus}
              </div>
            ) : null}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1 text-[11px] text-[#444] dark:text-[#ccc]">
              <div className="flex -space-x-1">
                <div className="h-5 w-5 rounded-full bg-[#dbb27a] ring-1 ring-white dark:ring-[#1b1b1b]" />
                <div className="h-5 w-5 rounded-full bg-[#3ea3bf] ring-1 ring-white dark:ring-[#1b1b1b]" />
                <div className="h-5 w-5 rounded-full bg-[#2d6d94] ring-1 ring-white dark:ring-[#1b1b1b]" />
              </div>
              {item.players ? <span>{item.players}</span> : null}
            </div>

            {item.cta === "Register" || item.cta === "View" ? (
              <span className="inline-flex h-8 min-w-[92px] items-center justify-center rounded-full border border-[#ff8e40] px-4 text-[16px] font-medium text-[#ff7a1a]">
                {item.cta}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState<TopTab>("browse");
  const [format, setFormat] = useState<FormatTab>("all");

  const list = useMemo(() => {
    if (activeTab === "joined") return joinedItems;
    if (activeTab === "history") return historyItems;
    return browseItems;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#ececec] pb-24 text-[#2d2d2d] dark:bg-[#121212] dark:text-[#f5f5f5]">
      <div className="bg-[#ff7a1a] px-4 pb-3 pt-[max(env(safe-area-inset-top),14px)] text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-11 w-11 rounded-full border-2 border-white/80 bg-[radial-gradient(circle_at_30%_30%,#fce5c6,#7b523d)]" />
            <div>
              <h1 className="text-[24px] font-bold leading-8 font-heading">Tournaments</h1>
              <p className="text-[14px] text-white/90">Browse and join tournaments</p>
            </div>
          </div>
          <button className="relative grid h-9 w-9 place-content-center rounded-full bg-white/85 text-[#5f5f5f]">
            <BellIcon size={16} />
            <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-content-center rounded-full bg-[#ff7a1a] text-[10px] font-bold text-white">
              2
            </span>
          </button>
        </div>

        <label className="mt-4 flex h-10 items-center gap-2 rounded-xl bg-white px-3 text-[#8a8a8a]">
          <SearchIcon size={16} />
          <input
            type="text"
            placeholder="Search tournaments, cities..."
            className="w-full bg-transparent text-[13px] text-[#484848] outline-none placeholder:text-[#9f9f9f]"
          />
        </label>

        <div className="mt-3 grid grid-cols-3 text-center text-[25px]">
          {(["browse", "joined", "history"] as TopTab[]).map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-9 capitalize ${active ? "font-semibold text-white" : "text-white/75"}`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#e3e3e3] px-2.5 pt-2 dark:border-[#2a2a2a]">
        <div className="hide-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
          <button className="grid h-9 w-9 shrink-0 place-content-center rounded-full border border-[#dadada] bg-white text-[#ff7a1a] dark:border-[#333] dark:bg-[#1a1a1a]">
            <FilterIcon size={14} />
          </button>
          {([
            { id: "all", label: "All Formats" },
            { id: "singles", label: "Singles" },
            { id: "doubles", label: "Doubles" },
          ] as { id: FormatTab; label: string }[]).map((tab) => {
            const active = format === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFormat(tab.id)}
                className={`h-9 shrink-0 rounded-xl border px-6 text-[20px] font-medium ${active
                    ? "border-[#ff7a1a] bg-[#ff7a1a] text-white"
                    : "border-[#d6d6d6] bg-[#ededed] text-[#666] dark:border-[#383838] dark:bg-[#1b1b1b] dark:text-[#b8b8b8]"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 px-2.5 pb-12 pt-1">
        {activeTab === "browse" ? (
          <>
            <h2 className="px-1 text-[28px] font-semibold">Trending Tournaments</h2>
            {list.map((item) => (
              <TournamentCard key={item.id} item={item} />
            ))}
            <h2 className="px-1 pt-1 text-[28px] font-semibold">Tournaments Near You</h2>
            {browseItems.map((item) => (
              <TournamentCard key={`near-${item.id}`} item={item} />
            ))}
          </>
        ) : (
          list.map((item) => <TournamentCard key={item.id} item={item} />)
        )}
      </div>

      <BottomNav />
    </div>
  );
}

