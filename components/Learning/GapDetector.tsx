"use client";

import React from "react";
import { XIcon } from "@/components/Icons";

type GapDetectorProps = {
  topic: string;
  confusions: string[];
  onConfusionsChange: (confusions: string[]) => void;
  prompt?: string;
};

export default function GapDetector({
  topic,
  confusions,
  onConfusionsChange,
  prompt = "List the 3 most common confusions beginners have about this topic. For each, add one clarifying sentence.",
}: GapDetectorProps) {
  const addConfusion = () => {
    onConfusionsChange([...confusions, ""]);
  };
  const updateConfusion = (index: number, value: string) => {
    const next = [...confusions];
    next[index] = value;
    onConfusionsChange(next);
  };
  const removeConfusion = (index: number) => {
    onConfusionsChange(confusions.filter((_, i) => i !== index));
  };

  return (
    <section className="space-y-4" aria-labelledby="gap-detector-heading">
      <h2 id="gap-detector-heading" className="text-lg font-semibold">
        Common confusions: {topic}
      </h2>
      <p className="text-sm text-[var(--color-muted)]">{prompt}</p>
      <ul className="space-y-2">
        {confusions.map((c, i) => (
          <li key={i} className="flex gap-2">
            <input
              type="text"
              value={c}
              onChange={(e) => updateConfusion(i, e.target.value)}
              placeholder={`Confusion ${i + 1}`}
              className="flex-1 p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
            <button
              type="button"
              onClick={() => removeConfusion(i)}
              className="p-2 rounded-lg text-[var(--color-error)] hover:bg-[var(--color-error)]/10 min-h-[44px] min-w-[44px]"
              aria-label={`Remove confusion ${i + 1}`}
            >
              <XIcon size={18} className="text-[var(--color-error)]" />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={addConfusion}
        className="text-sm text-primary"
      >
        + Add confusion point
      </button>
    </section>
  );
}
