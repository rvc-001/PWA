"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MatchSplashProps {
  onComplete: () => void;
}

function BlurredLiveMock() {
  return (
    <div className="pointer-events-none absolute inset-4 overflow-hidden rounded-[2px] border border-[#D9D9D9] bg-[#F2F2F2] dark:border-[#6A5B90] dark:bg-[#3B2A63]">
      <div className="h-11 border-b border-[#E0E0E0] bg-[#F6F6F6] dark:border-[#5E4C86] dark:bg-[#4A3972]" />
      <div className="space-y-2.5 p-3">
        <div className="h-[60px] rounded-xl border border-[#DFDFDF] bg-[#F8F8F8] dark:border-[#66578D] dark:bg-[#4F3D79]" />
        <div className="h-32 rounded-xl border border-[#DFDFDF] bg-[#F8F8F8] dark:border-[#66578D] dark:bg-[#4F3D79]" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-11 rounded-xl bg-[#FF7A1A]" />
          <div className="h-11 rounded-xl bg-[#FF7A1A]" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-11 rounded-xl border border-[#DCDCDC] bg-[#F8F8F8] dark:border-[#66578D] dark:bg-[#4F3D79]" />
          <div className="h-11 rounded-xl border border-[#DCDCDC] bg-[#F8F8F8] dark:border-[#66578D] dark:bg-[#4F3D79]" />
        </div>
      </div>
    </div>
  );
}

export default function MatchSplash({ onComplete }: MatchSplashProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 700);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] bg-black/50"
    >
      <div className="relative mx-auto h-full w-full max-w-[430px]">
        <BlurredLiveMock />

        <div className="absolute inset-4 rounded-[2px] bg-white/62 backdrop-blur-[5px] dark:bg-[#3B2A63]/64" />

        <div className="absolute inset-0 flex items-center justify-center pb-10">
          <motion.span
            key={count}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="text-[106px] font-bold leading-none text-[#FF7A1A]"
          >
            {count}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
