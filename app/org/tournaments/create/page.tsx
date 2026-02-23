"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TournamentWizard from "@/components/Wizard/TournamentWizard";
import type { Tournament } from "@/types/models";

export default function CreateOrgTournamentPage() {
  const router = useRouter();

  const handleComplete = (tournament: Partial<Tournament>) => {
    // TODO: Add your logic here to save the tournament to your backend
    console.log("Creating org tournament:", tournament);
    
    // Redirect back to the organization tournaments list
    router.push("/org/tournaments");
  };

  const handleClose = () => {
    // Redirect back if the user clicks the "X" button
    router.push("/org/tournaments");
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <TournamentWizard 
        onComplete={handleComplete} 
        onClose={handleClose} 
      />
    </div>
  );
}