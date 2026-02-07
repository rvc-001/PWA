"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ArrowLeftIcon, ChevronRightIcon } from "@/components/Icons";

export default function HelpSupportPage() {
  const router = useRouter();
  const faqs = [
    "How do I create a tournament?",
    "How do I register for a tournament?",
    "How do I join a tournament?",
    "How do I invite others to a tournament?",
  ];

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <button type="button" onClick={() => router.back()} className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px] flex items-center gap-2" aria-label="Back">
          <ArrowLeftIcon size={20} />
          <span className="font-medium">Help &amp; Support</span>
        </button>
        <section>
          <h2 className="font-semibold mb-1">Contact Support</h2>
          <p className="text-sm text-[var(--color-muted)]">Need help? Our support team is available 24/7.</p>
          <Link href="mailto:support@forehand.app" className="inline-block mt-2 text-primary font-medium">
            <span className="inline-flex items-center gap-1">
              Email Support
              <ChevronRightIcon size={16} className="text-primary" />
            </span>
          </Link>
        </section>
        <section>
          <h2 className="font-semibold mb-2">FAQ</h2>
          <ul className="space-y-1">
            {faqs.map((q) => (
              <li key={q}>
                <button type="button" className="w-full flex items-center justify-between p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] text-left">
                  <span>{q}</span>
                  <ChevronRightIcon size={18} className="text-[var(--color-muted)] shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
