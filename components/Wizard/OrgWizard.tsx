"use client";

import React, { useState } from "react";
import { validateOrgBasic, validateOrgContact } from "@/lib/validators";
import { setItem, getItem, removeItem } from "@/lib/storage";
import type { Org, Address } from "@/types/models";

const DRAFT_KEY = "org-wizard-draft";

type Step = "basic" | "contact" | "address";

const steps: Step[] = ["basic", "contact", "address"];

type Draft = {
  name: string;
  description: string;
  establishedYear: string;
  website: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
};

const emptyDraft: Draft = {
  name: "",
  description: "",
  establishedYear: "",
  website: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pinCode: "",
};

type OrgWizardProps = {
  onComplete: (org: Partial<Org>) => void;
  onClose: () => void;
};

export default function OrgWizard({ onComplete, onClose }: OrgWizardProps) {
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
    if (step === "basic") {
      const result = validateOrgBasic({
        name: draft.name,
        description: draft.description,
        establishedYear: draft.establishedYear || undefined,
      });
      if (!result.ok) {
        setError(result.message);
        return;
      }
    }
    if (step === "contact") {
      const result = validateOrgContact({
        email: draft.email || undefined,
        phone: draft.phone || undefined,
        website: draft.website || undefined,
      });
      if (!result.ok) {
        setError(result.message);
        return;
      }
    }
    if (isLast) {
      const address: Address = {
        street: draft.street || undefined,
        city: draft.city || undefined,
        state: draft.state || undefined,
        pinCode: draft.pinCode || undefined,
      };
      onComplete({
        name: draft.name,
        description: draft.description || undefined,
        establishedYear: draft.establishedYear || undefined,
        website: draft.website || undefined,
        email: draft.email || undefined,
        phone: draft.phone || undefined,
        address,
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
        <h2 className="text-xl font-semibold">Create Organization Profile</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)]"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="h-1 rounded-full bg-[var(--color-border)] mb-6">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {step === "basic" && (
        <section className="space-y-4">
          <h3 className="font-medium">Basic Information</h3>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Organization Name</span>
            <input
              type="text"
              value={draft.name}
              onChange={(e) => saveDraft({ name: e.target.value })}
              placeholder="Enter organization name"
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Description</span>
            <textarea
              value={draft.description}
              onChange={(e) => saveDraft({ description: e.target.value })}
              placeholder="Brief description"
              rows={3}
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Established Year (MM/YYYY)</span>
            <input
              type="text"
              value={draft.establishedYear}
              onChange={(e) => saveDraft({ establishedYear: e.target.value })}
              placeholder="MM/YYYY"
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
        </section>
      )}

      {step === "contact" && (
        <section className="space-y-4">
          <h3 className="font-medium">Contact Information</h3>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Website</span>
            <input
              type="url"
              value={draft.website}
              onChange={(e) => saveDraft({ website: e.target.value })}
              placeholder="https://example.com"
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Email</span>
            <input
              type="email"
              value={draft.email}
              onChange={(e) => saveDraft({ email: e.target.value })}
              placeholder="contact@example.com"
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Phone</span>
            <input
              type="tel"
              value={draft.phone}
              onChange={(e) => saveDraft({ phone: e.target.value })}
              placeholder="+91 9876543210"
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
        </section>
      )}

      {step === "address" && (
        <section className="space-y-4">
          <h3 className="font-medium">Address</h3>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Street Address</span>
            <input
              type="text"
              value={draft.street}
              onChange={(e) => saveDraft({ street: e.target.value })}
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">City</span>
            <input
              type="text"
              value={draft.city}
              onChange={(e) => saveDraft({ city: e.target.value })}
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">State</span>
            <input
              type="text"
              value={draft.state}
              onChange={(e) => saveDraft({ state: e.target.value })}
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Pin Code</span>
            <input
              type="text"
              value={draft.pinCode}
              onChange={(e) => saveDraft({ pinCode: e.target.value })}
              placeholder="123456"
              className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            />
          </label>
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
          {isLast ? "Create Organization" : "Next"} →
        </button>
      </div>
    </div>
  );
}
