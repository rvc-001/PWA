"use client";

import React, { useState } from "react";
import LiveMatchReplica from "@/components/QuickMatch/LiveMatchReplica";

export default function LiveMatchPage() {
  const [sideA, setSideA] = useState(0);
  const [sideB, setSideB] = useState(1);
  const [serverSide, setServerSide] = useState<0 | 1>(1);
  const [showSwitch, setShowSwitch] = useState(false);

  const reachedMatchPoint = sideA >= 11 || sideB >= 11;
  const hasTwoPointLead = Math.abs(sideA - sideB) >= 2;
  const showWinner = reachedMatchPoint && hasTwoPointLead;

  return (
    <LiveMatchReplica
      sideAScore={sideA}
      sideBScore={sideB}
      set1={[sideA, sideB]}
      set2={[null, null]}
      set3={[null, null]}
      scoringLabel="Side-Out Scoring"
      sideAServing={serverSide === 0}
      sideBServing={serverSide === 1}
      showSwitchServe={showSwitch}
      showWinner={showWinner}
      onBack={() => window.history.back()}
      onUndo={() => {
        setSideA((prev) => (prev > 0 ? prev - 1 : 0));
      }}
      onSideARally={() => setSideA((prev) => prev + 1)}
      onSideBRally={() => setSideB((prev) => prev + 1)}
      onSideAFault={() => {
        setServerSide(1);
        setShowSwitch(true);
      }}
      onSideBFault={() => {
        setServerSide(0);
      }}
      onCloseSwitch={() => setShowSwitch(false)}
      onCloseWinner={() => {}}
      confirmHref="/home"
    />
  );
}
