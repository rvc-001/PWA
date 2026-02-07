"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

export default function OrgMembersPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const members = [
    { id: "1", name: "Anil Kumar", role: "Admin", status: "Accepted" },
    { id: "2", name: "Alex Costa", role: "Admin", status: "Invited" },
  ];

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <button type="button" onClick={() => router.back()} className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px]" aria-label="Back">← Organization Members</button>
        <h1 className="text-xl font-semibold">Organization Members</h1>
        <p className="text-sm text-[var(--color-muted)]">Add or remove organization members.</p>
        <div className="flex gap-2">
          <input
            type="tel"
            placeholder="Enter Admin's Phone No."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
          />
          <button type="button" className="min-h-[44px] px-4 rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium">Add</button>
        </div>
        <ul className="space-y-2">
          {members.map((m) => (
            <li key={m.id} className="flex items-center justify-between p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-[var(--color-muted)]">{m.role} · {m.status}</p>
              </div>
              <button type="button" className="p-2 text-[var(--color-error)]" aria-label={`Remove ${m.name}`}>✕</button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
