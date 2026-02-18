"use client";

import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { CalendarIcon, CircleIcon, TimerIcon, TrophyIcon } from "@/components/Icons";
import { motion, type Variants } from "framer-motion";

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

// Animation Variants - Explicitly typed to fix TS error
const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

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
      <div className="font-body mx-auto w-full max-w-md space-y-6 px-4 pb-24 pt-4">
        {/* Header Section */}
        <section className="card p-4">
          <header className="mb-4 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
              <Image
                src="/pwa-icons/icon-192.png"
                alt="Demo logo"
                width={20}
                height={20}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="font-heading text-xl font-bold leading-tight">Hey Alex!</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Demo Organization</p>
            </div>
          </header>

          <h2 className="mb-3 font-heading text-lg font-semibold">Tournament Overview</h2>
          <div className="grid grid-cols-3 gap-3">
            <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3 text-center">
              <CalendarIcon size={18} className="mx-auto mb-1.5 text-primary" />
              <p className="font-heading text-2xl font-bold leading-none">12</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-[var(--color-muted)]">Upcoming</p>
            </article>
            <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3 text-center">
              <TrophyIcon size={18} className="mx-auto mb-1.5 text-primary" />
              <p className="font-heading text-2xl font-bold leading-none">04</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-[var(--color-muted)]">Completed</p>
            </article>
            <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3 text-center">
              <TimerIcon size={18} className="mx-auto mb-1.5 text-primary" />
              <p className="font-heading text-2xl font-bold leading-none">02</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-[var(--color-muted)]">Live</p>
            </article>
          </div>
        </section>

        {/* Live Tournaments Section */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-heading text-xl font-semibold">Live Tournaments</h3>
            <Link href="/org/tournaments" className="text-xs font-medium uppercase text-primary">
              See All
            </Link>
          </div>

          <motion.div 
            className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {liveTournaments.map((item) => (
              <motion.article 
                key={item.id} 
                className="card min-w-[85%] snap-start p-4"
                variants={cardVariants}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-success)]">
                    <CircleIcon size={6} className="text-[var(--color-success)] fill-current" />
                    Live
                  </span>
                  <span className="text-xs text-[var(--color-muted)]">{item.stage}</span>
                </div>
                <h4 className="font-heading text-lg font-bold leading-tight">{item.name}</h4>
                <p className="mt-0.5 text-xs text-[var(--color-muted)]">Pickleball • Men&apos;s • Doubles</p>
                <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-2">
                  <span className="text-xs text-[var(--color-text-secondary)]">Participants</span>
                  <span className="text-sm font-semibold">{item.participants}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <div className="mt-3">
            <PaginationDots />
          </div>
        </section>

        {/* Live Matches Section */}
        <section>
          <h3 className="mb-3 font-heading text-xl font-semibold">Live Matches</h3>

          <motion.div 
            className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {liveMatches.map((match) => (
              <motion.article 
                key={match.id} 
                className="card min-w-[85%] snap-start p-4"
                variants={cardVariants}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-success)]">
                    <CircleIcon size={6} className="text-[var(--color-success)] fill-current" />
                    Live
                  </span>
                  <p className="truncate text-xs text-[var(--color-text-secondary)] max-w-[150px]">{match.label}</p>
                </div>

                <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-white shadow-sm">
                      <Image src="/pwa-icons/icon-192.png" alt="Team logo" width={24} height={24} className="rounded-full" />
                    </div>
                    <p className="text-xs font-medium">Chelsea</p>
                  </div>
                  
                  <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 font-heading text-2xl font-bold tracking-tight">
                    {match.score}
                  </div>
                  
                  <div className="flex flex-col items-center gap-1">
                    <div className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-white shadow-sm">
                      <Image src="/pwa-icons/icon-192.png" alt="Team logo" width={24} height={24} className="rounded-full" />
                    </div>
                    <p className="text-xs font-medium">Man City</p>
                  </div>
                </div>

                <button type="button" className="mx-auto mt-1 block w-full rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90">
                  Update Score
                </button>
              </motion.article>
            ))}
          </motion.div>

          <div className="mt-3">
            <PaginationDots />
          </div>
        </section>
      </div>
    </Layout>
  );
}