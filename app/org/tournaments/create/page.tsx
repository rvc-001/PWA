"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import TournamentWizard from "@/components/Wizard/TournamentWizard";
import type { Tournament } from "@/types/models";

export default function OrgCreateTournamentPage() {
  const router = useRouter();

  const handleComplete = (tournament: Partial<Tournament>) => {
    router.push("/org/tournaments");
  };

  const handleClose = () => router.push("/org/tournaments");

  return (
    <Layout showBottomNav={false}>
      <TournamentWizard onComplete={handleComplete} onClose={handleClose} />
    </Layout>
  );
}
