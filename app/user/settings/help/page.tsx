"use client";

import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/Icons";

export default function HelpSupportPage() {
  const faqs = [
    "How do I create a tournament?",
    "How do I create a tournament?",
    "How do I create a tournament?",
  ];

  return (
    <Layout title="Help & Support" showBack>
      <div className="p-4 space-y-4 pb-24">
        <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h2 className="text-sm font-medium">App Preferences</h2>
          <p className="text-xs text-[var(--color-muted)]">Change app preferences.</p>
        </section>

        <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h2 className="text-sm font-medium">Contact Support</h2>
          <p className="mt-1 text-xs text-[var(--color-muted)]">Need help? Our support team is available 24/7.</p>
          <Link href="mailto:support@forehand.app" className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Email Support
            <ChevronRightIcon size={14} className="text-primary" />
          </Link>

          <div className="mt-4">
            <h3 className="text-sm font-medium">FAQ</h3>
            <ul className="mt-2 space-y-1">
              {faqs.map((q, idx) => (
                <li key={`${q}-${idx}`} className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                  <ChevronRightIcon size={12} />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
}
