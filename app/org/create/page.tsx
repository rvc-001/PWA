"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import OrgWizard from "@/components/Wizard/OrgWizard";
import type { Org } from "@/types/models";

export default function CreateOrgPage() {
  const router = useRouter();

  const handleComplete = (org: Partial<Org>) => {
    // In production: persist org and redirect to org dashboard
    router.push("/org/demo");
  };

  const handleClose = () => router.push("/home");

  return (
    <Layout showBottomNav={false}>
      <OrgWizard onComplete={handleComplete} onClose={handleClose} />
    </Layout>
  );
}
