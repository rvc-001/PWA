"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TimerReset, Trophy } from "lucide-react";
import Link from "next/link";

interface MatchReadyPopupProps {
  isOpen: boolean;
  variant: "confirm" | "switch" | "winner";
  onClose: () => void;
  onPrimaryAction?: () => void;
  courtName?: string;
}

export default function MatchReadyPopup({
  isOpen,
  variant,
  onClose,
  onPrimaryAction,
  courtName,
}: MatchReadyPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[260] bg-black/50 backdrop-blur-[2px]"
          onClick={variant === "confirm" ? onClose : undefined}
        >
          {variant === "confirm" && (
            <motion.div
              initial={{ y: 12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
              className="absolute left-1/2 top-1/2 w-[90%] max-w-[332px] -translate-x-1/2 -translate-y-1/2 rounded-[12px] border border-[#FFFFFF22] bg-[#FFFFFF] px-4 py-3 text-center dark:bg-[#6B5A8C]"
            >
              <h3 className="text-[24px] font-semibold text-[#1F1F1F] dark:text-white">Before you begin</h3>
              <p className="mx-auto mt-1 max-w-[270px] text-[11px] leading-[1.3] text-[#555555] dark:text-white/80">
                <span className="mr-1">i</span>
                Quick match results are for instant tracking only and will not be saved to your profile or history.
              </p>
              <button
                type="button"
                onClick={onPrimaryAction}
                className="mx-auto mt-2.5 h-8 w-[150px] rounded-full bg-[#FF7A1A] text-[12px] font-semibold text-white"
              >
                Start Match
              </button>
            </motion.div>
          )}

          {variant === "switch" && (
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              className="absolute left-1/2 top-1/2 w-[90%] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#DBDBDB] bg-white p-4 text-center shadow-lg dark:border-[#6E5E95] dark:bg-[#3F2D67]"
            >
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center text-[#FF7A1A]">
                <TimerReset size={21} />
              </div>
              <h3 className="text-[40px] font-semibold leading-none text-[#1F1F1F] dark:text-white">Switch Serve Now</h3>
              <p className="mx-auto mt-1 max-w-[260px] text-[12px] leading-[1.35] text-[#686868] dark:text-white/75">
                It&apos;s time for the players to switch serve on the court.
              </p>
              <button
                type="button"
                onClick={onPrimaryAction}
                className="mt-3 h-12 w-full rounded-xl bg-[#FF7A1A] text-[25px] font-semibold text-white"
              >
                Switch Sides
              </button>
            </motion.div>
          )}

          {variant === "winner" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-x-0 top-[34%] text-center">
                <div className="mb-1 flex justify-center text-[#F7B31B]">
                  <Trophy size={52} strokeWidth={2.2} />
                </div>
                <p className="text-[44px] font-semibold text-white">Winner</p>
                <p className="mt-1 text-[56px] font-bold leading-none text-white">Kunal Verma</p>
                <p className="mt-1 text-[43px] font-semibold text-white">Final Score: 12-08</p>
                {courtName && <p className="mt-1 text-[11px] text-white/75">{courtName}</p>}
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-white/8 px-4 pb-6 pt-3 backdrop-blur-md dark:bg-[#5C4B85]/45">
                <Link
                  href="/match/live"
                  onClick={onClose}
                  className="mx-auto flex h-12 w-full max-w-[360px] items-center justify-center rounded-xl bg-[#FF7A1A] text-[24px] font-semibold text-white"
                >
                  Confirm Results
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
