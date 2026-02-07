"use client";

import React from "react";

type AnalogyProps = {
  topic: string;
  analogy: string;
  onAnalogyChange: (value: string) => void;
  prompt?: string;
};

export default function Analogy({
  topic,
  analogy,
  onAnalogyChange,
  prompt = "Give an analogy for this topic using everyday objects or a familiar scenario (1–2 sentences). Keep it vivid.",
}: AnalogyProps) {
  return (
    <section className="space-y-4" aria-labelledby="analogy-heading">
      <h2 id="analogy-heading" className="text-lg font-semibold">
        Analogy for: {topic}
      </h2>
      <p className="text-sm text-[var(--color-muted)]">{prompt}</p>
      <textarea
        value={analogy}
        onChange={(e) => onAnalogyChange(e.target.value)}
        rows={4}
        placeholder="e.g. Bracket seeding is like..."
        className="w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
        aria-label="Your analogy"
      />
    </section>
  );
}
