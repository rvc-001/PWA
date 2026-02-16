"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import CourtSlider from "./CourtSlider";
import MatchSplash from "./MatchSplash";
import MatchReadyPopup from "./MatchReadyPopup";

type FlowStep = "select" | "confirm" | "loading";

export default function QuickMatchFlow() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<FlowStep>("select");

  const closeAll = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep("select");
    }, 180);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-transform active:scale-[0.99] dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Quick Match</h3>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Invite players and score</p>
          </div>
        </div>
        <ChevronRight className="text-gray-400" size={20} />
      </button>

      <AnimatePresence>
        {isOpen && step === "select" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/55"
              onClick={closeAll}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="fixed inset-x-0 bottom-0 z-[210] max-h-[96vh] overflow-y-auto bg-[#ECECEC] pb-4 dark:bg-[#3B2A63]"
            >
              <CourtSlider
                onBack={closeAll}
                onStart={() => {
                  setStep("confirm");
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MatchReadyPopup
        isOpen={isOpen && step === "confirm"}
        variant="confirm"
        onClose={closeAll}
        onPrimaryAction={() => setStep("loading")}
      />

      <AnimatePresence>
        {isOpen && step === "loading" && (
          <MatchSplash
            onComplete={() => {
              closeAll();
              router.push("/match/live");
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
