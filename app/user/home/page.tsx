"use client";

import React, { useState } from "react";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import Tabs, { type TabItem } from "@/components/Tabs";
import ScheduleCard from "@/components/ScheduleCard";
import ColorfulTournamentCard from "@/components/Card/ColorfulTournamentCard";
import Link from "next/link";
import { ChevronRightIcon, TrophyIcon } from "@/components/Icons";

// --- Mock Data ---

const homeTabs: TabItem[] = [
  { id: "explore", label: "Explore" },
  { id: "live", label: "Live Feed" },
  { id: "myspace", label: "My Space" },
];

const exploreTournaments = [
  {
    id: "101",
    name: "Monsoon Pickleball Open",
    location: "Raipur | Chhattisgarh",
    dateRange: "Jan 15 - 20",
    registeredCount: 64,
    colorVariant: "orange" as const,
    entryFee: "₹500",
  },
  {
    id: "102",
    name: "National Tennis Championship",
    location: "Delhi Sports Complex",
    dateRange: "Feb 10 - 15",
    registeredCount: 120,
    colorVariant: "green" as const,
    entryFee: "₹1200",
  },
];

const liveMatches = [
  {
    id: "l1",
    sport: "Badminton",
    matchName: "Finals · Men's Singles",
    venue: "Court 1",
    time: "LIVE NOW",
    score: "21-19, 15-10",
    colorVariant: "badminton" as const,
  },
  {
    id: "l2",
    sport: "Tennis",
    matchName: "Semi-Final · Women's Doubles",
    venue: "Center Court",
    time: "LIVE NOW",
    score: "6-4, 2-1",
    colorVariant: "volleyball" as const,
  },
];

export default function UserHomePage() {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
      
      {/* 1. Fixed Header with Centered Tabs */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-[#020617]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <TopNav />
        {/* Centering Wrapper for Tabs */}
        <div className="px-4 pb-0 flex justify-center w-full">
          <div className="w-full max-w-md">
            <Tabs 
              tabs={homeTabs} 
              activeId={activeTab} 
              onChange={setActiveTab} 
              ariaLabel="Home sections" 
            />
          </div>
        </div>
      </div>

      {/* 2. Main Scrollable Content */}
      <main className="flex-1 flex flex-col gap-6 p-4 pb-28 overflow-y-auto">
        
        {/* === TAB: EXPLORE === */}
        {activeTab === "explore" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Hero Banner */}
            <section className="rounded-2xl bg-primary/10 border border-primary/20 p-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Browse & Join</h2>
              <p className="text-lg font-bold text-gray-900 dark:text-white">Upcoming tournaments</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Compete with the best players near you.</p>
              <div className="flex gap-3 mt-5">
                <Link
                  href="/user/tournaments"
                  className="flex-1 h-10 px-4 rounded-xl bg-primary text-white text-sm font-medium flex items-center justify-center shadow-lg shadow-primary/25 active:scale-95 transition-transform"
                >
                  Register Now
                </Link>
                <Link
                  href="/user/tournaments"
                  className="flex-1 h-10 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  View All
                </Link>
              </div>
            </section>

            {/* Quick Match CTA */}
            <Link
              href="/match/demo"
              className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm active:scale-[0.99] transition-transform"
            >
              <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Quick Match</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Invite players & score quickly</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ChevronRightIcon size={20} />
              </div>
            </Link>

            {/* Featured List */}
            <section className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">Featured Events</h3>
                <Link href="/user/tournaments" className="text-xs font-medium text-primary uppercase">View All</Link>
              </div>
              <div className="flex flex-col gap-4">
                {exploreTournaments.map((t) => (
                  <ColorfulTournamentCard 
                    key={t.id}
                    id={t.id}
                    name={t.name}
                    location={t.location}
                    dateRange={t.dateRange}
                    registeredCount={t.registeredCount}
                    colorVariant={t.colorVariant}
                    entryFee={t.entryFee}
                    ctaText="Details"
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* === TAB: LIVE FEED === */}
        {activeTab === "live" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="flex items-center justify-center py-2">
                <span className="flex h-3 w-3 relative mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Live Action</h3>
             </div>

             {liveMatches.map((match) => (
                <div key={match.id} className="relative group">
                    <ScheduleCard 
                        sport={match.sport}
                        matchName={match.matchName}
                        venue={match.venue}
                        time={match.time}
                        colorVariant={match.colorVariant}
                        opponent={`Score: ${match.score}`}
                    />
                </div>
             ))}
          </div>
        )}

        {/* === TAB: MY SPACE (Restored Exact UI) === */}
        {activeTab === "myspace" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* 1. Stats Grid (Exact 3-Column Layout) */}
            <section className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <span className="text-2xl font-bold text-primary">28</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Won</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">38</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Played</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">12</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Lost</span>
              </div>
            </section>

            {/* 2. Your Tournaments (Block Style) */}
            <section>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 px-1">Your Tournaments</h3>
              <Link
                href="/user/tournaments"
                className="block p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center">
                    <TrophyIcon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Raipur League 2025</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">View tournament events & brackets</p>
                  </div>
                </div>
              </Link>
            </section>

            {/* 3. Next On Court */}
            <section>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 px-1">Next On Court</h3>
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm p-4 border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Quarter Final</span>
                   <span className="text-xs text-gray-400">Dec 18</span>
                </div>
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">Pickleball Singles</h4>
                <p className="text-sm text-gray-500 mt-1">Regional Semi-Final · Court 3</p>
              </div>
            </section>

            {/* 4. Past Matches */}
            <section>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 px-1">Past Matches</h3>
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">WIN</span>
                  <span className="text-xs text-gray-400">Yesterday</span>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">Raipur Pro League · Doubles</h4>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">You & Arun</span> def. Yug & Harsh
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">21-18</p>
              </div>
            </section>
          </div>
        )}

      </main>

      {/* 3. Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>

    </div>
  );
}