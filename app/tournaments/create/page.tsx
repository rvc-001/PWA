"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import TournamentWizard from "@/components/Wizard/TournamentWizard";
import type { Tournament } from "@/types/models";

export default function CreateTournamentPage() {
  const router = useRouter();

  const handleComplete = (tournament: Partial<Tournament>) => {
    // In production: persist and redirect to tournament page
    router.push("/tournaments");
  };

  const handleClose = () => router.push("/tournaments");

  return (
    <Layout showBottomNav={false}>
      <TournamentWizard onComplete={handleComplete} onClose={handleClose} />
    </Layout>
  );
}
