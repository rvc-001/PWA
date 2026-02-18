"use client";

import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { CalendarIcon, CircleIcon, TimerIcon, TrophyIcon } from "@/components/Icons";

const liveTournaments = [
  { id: "lt-1", name: "Champions League", stage: "Day 2 of 3", participants: "64 students" },
  { id: "lt-2", name: "City Open Cup", stage: "Day 1 of 2", participants: "42 students" },
  { id: "lt-3", name: "Inter School Clash", stage: "Day 3 of 3", participants: "96 students" },
];

const liveMatches = [
  { id: "lm-1", score: "04 - 01", label: "Premier League - Men's Doubles Raipur.." },
  { id: "lm-2", score: "03 - 03", label: "Premier League - Men's Doubles Raipur.." },
  { id: "lm-3", score: "02 - 01", label: "Premier League - Men's Doubles Raipur.." },
];

function PaginationDots() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="h-1.5 w-6 rounded-full bg-primary" />
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-dot)]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-dot)]" />
    </div>
  );
}

export default function OrgHomePage() {
  return (
    <Layout title="Home Dashboard">
      <div className="font-body mx-auto w-full max-w-md space-y-5 px-4 pb-24 pt-4">
        <section className="card p-3.5">
          <header className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
              <Image
                src="/pwa-icons/icon-192.png"
                alt="Demo logo"
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="font-heading text-3xl font-semibold leading-8">Hey Alex!</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Demo Organization</p>
            </div>
          </header>

          <h2 className="font-heading text-2xl font-semibold leading-7">Tournament Overview</h2>
          <div className="mt-3.5 grid grid-cols-3 gap-3">
            <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3.5 text-center">
              <CalendarIcon size={21} className="mx-auto mb-2 text-primary" />
              <p className="font-heading text-3xl font-bold leading-none">12</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Upcoming</p>
            </article>
            <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3.5 text-center">
              <TrophyIcon size={21} className="mx-auto mb-2 text-primary" />
              <p className="font-heading text-3xl font-bold leading-none">04</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Completed</p>
            </article>
            <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3.5 text-center">
              <TimerIcon size={21} className="mx-auto mb-2 text-primary" />
              <p className="font-heading text-3xl font-bold leading-none">02</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Live</p>
            </article>
          </div>
        </section>

        <section>
          <div className="mb-2.5 flex items-center justify-between">
            <h3 className="font-heading text-2xl font-semibold leading-7">Live Tournaments</h3>
            <Link href="/org/tournaments" className="text-sm text-[var(--color-text-secondary)]">
              See All
            </Link>
          </div>

          <div className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
            {liveTournaments.map((item) => (
              <article key={item.id} className="card min-w-full snap-start p-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-success)]">
                    <CircleIcon size={8} className="text-[var(--color-success)]" />
                    Live
                  </span>
                  <span className="text-sm text-[var(--color-muted)]">{item.stage}</span>
                </div>
                <h4 className="font-heading text-3xl font-semibold leading-8">{item.name}</h4>
                <p className="mt-1 text-sm text-[var(--color-muted)]">Pickle ball - Men&apos;s - Doubles</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg text-[var(--color-text-secondary)]">Participants</span>
                  <span className="text-lg font-medium">{item.participants}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-3">
            <PaginationDots />
          </div>
        </section>

        <section>
          <h3 className="mb-2.5 font-heading text-2xl font-semibold leading-7">Live Matches</h3>

          <div className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
            {liveMatches.map((match) => (
              <article key={match.id} className="card min-w-full snap-start p-3.5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-success)]">
                    <CircleIcon size={8} className="text-[var(--color-success)]" />
                    Live
                  </span>
                  <p className="truncate text-sm text-[var(--color-text-secondary)]">{match.label}</p>
                </div>

                <div className="mb-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <div className="text-center">
                    <div className="mx-auto mb-1 grid h-12 w-12 place-items-center rounded-full border border-[var(--color-border)] bg-white">
                      <Image src="/pwa-icons/icon-192.png" alt="Chelsea demo logo" width={30} height={30} className="rounded-full" />
                    </div>
                    <p className="text-xs">Chelsea</p>
                  </div>
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2 font-heading text-4xl font-semibold leading-none">
                    {match.score}
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-1 grid h-12 w-12 place-items-center rounded-full border border-[var(--color-border)] bg-white">
                      <Image src="/pwa-icons/icon-192.png" alt="Man City demo logo" width={30} height={30} className="rounded-full" />
                    </div>
                    <p className="text-xs">Man City</p>
                  </div>
                </div>

                <button type="button" className="mx-auto mt-2 block min-w-[120px] rounded-lg bg-primary px-5 py-1.5 text-base font-medium text-white">
                  Set 1
                </button>
              </article>
            ))}
          </div>

          <div className="mt-3">
            <PaginationDots />
          </div>
        </section>
      </div>
    </Layout>
  );
}
