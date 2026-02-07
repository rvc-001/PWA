"use client";

import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { CalendarIcon, CheckIcon, CircleIcon } from "@/components/Icons";

export default function OrgHomePage() {
  return (
    <Layout title="Hey Alex!">
      <div className="p-4 space-y-6 pb-24">
        {/* Organization Badge */}
        <p className="text-sm text-[var(--color-muted)]">Demo Organization</p>

        {/* Tournament Overview Header */}
        <h2 className="font-semibold text-lg">Tournament Overview</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card p-4 text-center">
            <div className="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <CalendarIcon size={18} className="text-primary" />
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-[var(--color-muted)]">Upcoming</p>
          </div>
          <div className="card p-4 text-center">
            <div className="w-10 h-10 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-2">
              <CheckIcon size={18} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold">04</p>
            <p className="text-xs text-[var(--color-muted)]">Completed</p>
          </div>
          <div className="card p-4 text-center">
            <div className="w-10 h-10 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-2">
              <CircleIcon size={14} className="text-red-500" />
            </div>
            <p className="text-2xl font-bold">02</p>
            <p className="text-xs text-[var(--color-muted)]">Live</p>
          </div>
        </div>

        {/* Live Tournaments Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Live Tournaments</h3>
            <Link href="/org/tournaments" className="text-primary text-sm font-medium">
              See All
            </Link>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="badge badge-live flex items-center gap-1"><CircleIcon size={8} className="text-red-500" /> LIVE</span>
              <span className="text-xs text-[var(--color-muted)]">Day 2 of 3</span>
            </div>
            <h4 className="font-semibold mb-1">Champions League</h4>
            <p className="text-xs text-[var(--color-muted)] mb-3">
              Pickle ball • Men's • Doubles
            </p>
            <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
              <span>Participants</span>
              <span className="font-semibold text-[var(--color-text)]">84 students</span>
            </div>
          </div>
        </section>

        {/* Live Matches Section */}
        <section>
          <h3 className="font-semibold mb-3">Live Matches</h3>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="badge badge-live flex items-center gap-1"><CircleIcon size={8} className="text-red-500" /> LIVE</span>
              <span className="text-xs text-[var(--color-muted)]">
                Premier League • Men's Doubles Replay...
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold mb-1">
                  C
                </div>
                <p className="text-xs">Chelsea</p>
              </div>
              <div className="text-2xl font-bold">
                04 - 01
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--avatar-bg)] border-2 border-[var(--avatar-border)] flex items-center justify-center font-bold mb-1">
                  M
                </div>
                <p className="text-xs">Man City</p>
              </div>
            </div>

            {/* Set Info */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <button className="px-4 py-1 rounded-full bg-primary text-white text-sm font-medium">
                Set 1
              </button>
              <span className="text-sm text-[var(--color-muted)]">Man City</span>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
