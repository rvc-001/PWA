"use client";

import React, { useState } from "react";
import { setItem, getItem, removeItem } from "@/lib/storage";
import { validateTournamentBasic } from "@/lib/validators";
import type { Tournament, Event } from "@/types/models";
import { ChevronRightIcon, XIcon } from "@/components/Icons";

const DRAFT_KEY = "tournament-wizard-draft";

type Step = "info" | "events" | "venue" | "review";

const steps: Step[] = ["info", "events", "venue", "review"];

type Draft = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  venueName: string;
  city: string;
  events: Partial<Event>[];
};

const emptyDraft: Draft = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  venueName: "",
  city: "",
  events: [],
};

type TournamentWizardProps = {
  onComplete: (tournament: Partial<Tournament>) => void;
  onClose: () => void;
};

export default function TournamentWizard({ onComplete, onClose }: TournamentWizardProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<Draft>(() => getItem<Draft>(DRAFT_KEY) ?? emptyDraft);
  const [error, setError] = useState<string | null>(null);

  const step = steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;

  const saveDraft = (next: Partial<Draft>) => {
    const merged = { ...draft, ...next };
    setDraft(merged);
    setItem(DRAFT_KEY, merged);
  };

  const handleNext = () => {
    setError(null);
    if (step === "info") {
      const result = validateTournamentBasic({ name: draft.name, startDate: draft.startDate });
      if (!result.ok) {
        setError(result.message);
        return;
      }
    }
    if (isLast) {
      onComplete({
        name: draft.name,
        description: draft.description || undefined,
        startDate: draft.startDate,
        endDate: draft.endDate || undefined,
        venue: draft.venueName ? `${draft.venueName}, ${draft.city}` : undefined,
        events: draft.events as Event[],
      });
      removeItem(DRAFT_KEY);
      return;
    }
    setStepIndex(stepIndex + 1);
  };

  const handlePrev = () => {
    setError(null);
    if (isFirst) return;
    setStepIndex(stepIndex - 1);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Create Tournament</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)]"
          aria-label="Close"
        >
          <XIcon size={18} />
        </button>
      </div>
      <div className="h-1 rounded-full bg-[var(--color-border)] mb-6">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {step === "info" && (
        <section className="space-y-4">
          <h3 className="font-medium">Tournament Info</h3>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Tournament Name</span>
            <input
              type="text"
              value={draft.name}
              onChange={(e) => saveDraft({ name: e.target.value })}
              placeholder="e.g. Mumbai Men's 2025"
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Description</span>
            <textarea
              value={draft.description}
              onChange={(e) => saveDraft({ description: e.target.value })}
              rows={2}
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Start Date</span>
            <input
              type="date"
              value={draft.startDate}
              onChange={(e) => saveDraft({ startDate: e.target.value })}
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">End Date (optional)</span>
            <input
              type="date"
              value={draft.endDate}
              onChange={(e) => saveDraft({ endDate: e.target.value })}
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
        </section>
      )}

      {step === "events" && (
        <section className="space-y-4">
          <h3 className="font-medium">Events</h3>
          <p className="text-sm text-[var(--color-muted)]">
            Add events (e.g. Men's Singles, Women's Doubles). You can add more in tournament settings.
          </p>
          <button
            type="button"
            onClick={() => saveDraft({ events: [...draft.events, { name: `Event ${draft.events.length + 1}`, format: "singles", sport: "Pickleball" }] })}
            className="px-4 py-2 rounded-[var(--radius-button)] border border-primary text-primary min-h-[44px]"
          >
            + Add Event
          </button>
          <ul className="space-y-2">
            {draft.events.map((ev, i) => (
              <li key={i} className="p-2 rounded-lg bg-[var(--color-surface-elevated)] text-sm">
                {ev.name ?? `Event ${i + 1}`} · {ev.format ?? "—"}
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === "venue" && (
        <section className="space-y-4">
          <h3 className="font-medium">Venue</h3>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Venue Name</span>
            <input
              type="text"
              value={draft.venueName}
              onChange={(e) => saveDraft({ venueName: e.target.value })}
              placeholder="e.g. City Mall Court"
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">City</span>
            <input
              type="text"
              value={draft.city}
              onChange={(e) => saveDraft({ city: e.target.value })}
              placeholder="e.g. Mumbai"
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
        </section>
      )}

      {step === "review" && (
        <section className="space-y-4">
          <h3 className="font-medium">Review & Publish</h3>
          <dl className="space-y-2 text-sm">
            <div><dt className="text-[var(--color-muted)]">Name</dt><dd>{draft.name || "—"}</dd></div>
            <div><dt className="text-[var(--color-muted)]">Dates</dt><dd>{draft.startDate} – {draft.endDate || "—"}</dd></div>
            <div><dt className="text-[var(--color-muted)]">Venue</dt><dd>{draft.venueName ? `${draft.venueName}, ${draft.city}` : "—"}</dd></div>
            <div><dt className="text-[var(--color-muted)]">Events</dt><dd>{draft.events.length}</dd></div>
          </dl>
        </section>
      )}

      {error && <p className="mt-2 text-sm text-[var(--color-error)]" role="alert">{error}</p>}

      <div className="flex gap-3 mt-8">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isFirst}
          className="px-4 py-2 rounded-[var(--radius-button)] border border-[var(--color-border)] disabled:opacity-50 min-h-[44px]"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 py-2 rounded-[var(--radius-button)] bg-primary text-white font-medium min-h-[44px]"
        >
          <span className="inline-flex items-center justify-center gap-2">
            {isLast ? "Publish Tournament" : "Next"}
            <ChevronRightIcon size={18} className="text-white" />
          </span>
        </button>
      </div>
    </div>
  );
}
