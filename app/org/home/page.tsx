"use client";

import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { CalendarIcon, CircleIcon, TimerIcon, TrophyIcon } from "@/components/Icons";
import { motion, useScroll, useTransform, type Variants, type MotionValue } from "framer-motion";
import { useRef } from "react";

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

// Animation Variants
const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// --- Components ---

const AnimatedCard = ({ 
  children, 
  containerRef, 
  className 
}: { 
  children: React.ReactNode; 
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) => {
  const cardRef = useRef(null);

  const { scrollXProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    axis: "x",
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollXProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.article>
  );
};

// Fixed Dot Component
const Dot = ({ 
  index, 
  itemCount, 
  scrollXProgress 
}: { 
  index: number; 
  itemCount: number; 
  scrollXProgress: MotionValue<number>;
}) => {
  // Calculate the specific "target" scroll position for this dot (0 to 1)
  const step = 1 / (itemCount - 1);
  const target = index * step;
  
  // Raw ranges
  let inputRange = [target - step, target, target + step];
  let widthOutput = [6, 24, 6];
  let opacityOutput = [0.2, 1, 0.2];

  // Fix: Truncate values outside [0, 1] to prevent WAAPI errors
  if (inputRange[0] < 0) {
    inputRange.shift();
    widthOutput.shift();
    opacityOutput.shift();
  }

  if (inputRange[inputRange.length - 1] > 1) {
    inputRange.pop();
    widthOutput.pop();
    opacityOutput.pop();
  }
  
  const width = useTransform(scrollXProgress, inputRange, widthOutput);
  const opacity = useTransform(scrollXProgress, inputRange, opacityOutput);

  return (
    <motion.div
      style={{ width, opacity }}
      className="h-1.5 rounded-full bg-primary"
    />
  );
};

const ScrollIndicator = ({ 
  itemCount, 
  containerRef 
}: { 
  itemCount: number; 
  containerRef: React.RefObject<HTMLDivElement | null>; 
}) => {
  const { scrollXProgress } = useScroll({ container: containerRef });

  if (itemCount <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 h-3">
      {Array.from({ length: itemCount }).map((_, i) => (
        <Dot 
          key={i} 
          index={i} 
          itemCount={itemCount} 
          scrollXProgress={scrollXProgress} 
        />
      ))}
    </div>
  );
};

// --- Main Page ---

export default function OrgHomePage() {
  const tournamentContainerRef = useRef<HTMLDivElement>(null);
  const matchContainerRef = useRef<HTMLDivElement>(null);

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
            ref={tournamentContainerRef}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {liveTournaments.map((item) => (
              <AnimatedCard 
                key={item.id} 
                containerRef={tournamentContainerRef}
                className="card min-w-[85%] snap-center p-4"
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
              </AnimatedCard>
            ))}
          </motion.div>

          <div className="mt-1">
            <ScrollIndicator 
              itemCount={liveTournaments.length} 
              containerRef={tournamentContainerRef} 
            />
          </div>
        </section>

        {/* Live Matches Section */}
        <section>
          <h3 className="mb-3 font-heading text-xl font-semibold">Live Matches</h3>

          <motion.div 
            ref={matchContainerRef}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {liveMatches.map((match) => (
              <AnimatedCard 
                key={match.id} 
                containerRef={matchContainerRef}
                className="card min-w-[85%] snap-center p-4"
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
              </AnimatedCard>
            ))}
          </motion.div>

          <div className="mt-1">
            <ScrollIndicator 
              itemCount={liveMatches.length} 
              containerRef={matchContainerRef} 
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}