"use client";

import React from "react";

type FeynmanStepProps = {
  stepIndex: number;
  explanation: string;
  analogy: string;
  onExplanationChange: (value: string) => void;
  onAnalogyChange: (value: string) => void;
  onSaveAndNext: () => void;
  promptExplanation?: string;
  promptAnalogy?: string;
};

export default function FeynmanStep({
  stepIndex,
  explanation,
  analogy,
  onExplanationChange,
  onAnalogyChange,
  onSaveAndNext,
  promptExplanation = "Explain in one short sentence to a beginner. Use no technical jargon.",
  promptAnalogy = "Give an analogy using everyday objects or a familiar scenario (1–2 sentences).",
}: FeynmanStepProps) {
  return (
    <section className="space-y-6" aria-labelledby="feynman-step-heading">
      <h2 id="feynman-step-heading" className="text-xl font-semibold">
        Step {stepIndex + 1}
      </h2>
      <div>
        <label htmlFor="explanation" className="block text-sm font-medium mb-1">
          Simple explanation
        </label>
        <p className="text-xs text-[var(--color-muted)] mb-2">{promptExplanation}</p>
        <textarea
          id="explanation"
          value={explanation}
          onChange={(e) => onExplanationChange(e.target.value)}
          rows={3}
          className="w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
          aria-describedby="explanation-hint"
        />
      </div>
      <div>
        <label htmlFor="analogy" className="block text-sm font-medium mb-1">
          Analogy
        </label>
        <p className="text-xs text-[var(--color-muted)] mb-2">{promptAnalogy}</p>
        <input
          id="analogy"
          type="text"
          value={analogy}
          onChange={(e) => onAnalogyChange(e.target.value)}
          className="w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
        />
      </div>
      <button
        type="button"
        onClick={onSaveAndNext}
        className="min-h-[44px] px-4 py-2 rounded-[var(--radius-button)] bg-primary text-white font-medium"
      >
        Save & Next
      </button>
    </section>
  );
}
