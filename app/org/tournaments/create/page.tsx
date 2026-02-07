"use client";

import React, { useState } from "react";
import Link from "next/link";
import { XIcon, ImageIcon, ClipboardIcon, ArrowLeftIcon, ChevronRightIcon } from "@/components/Icons";

export default function CreateTournamentPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    venueName: "",
    city: "",
    area: "",
    addressLine: "",
    zipCode: "",
    numCourts: 2,
    organizerName: "",
    organizerPhone: "",
    organizerEmail: "",
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] p-4 flex items-center justify-between">
        <h1 className="font-semibold">Create Tournament</h1>
        <Link
          href="/org/tournaments"
          className="p-2 hover:bg-[var(--color-surface-elevated)] rounded-lg"
        >
          <XIcon size={20} />
        </Link>
      </div>

      {/* Step Indicator */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <div className={`flex-1 h-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-[var(--color-border)]"}`} />
          <div className={`flex-1 h-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-[var(--color-border)]"}`} />
          <div className={`flex-1 h-1 rounded-full ${step >= 3 ? "bg-primary" : "bg-[var(--color-border)]"}`} />
        </div>
      </div>

      {/* Step 1: Tournament Info */}
      {step === 1 && (
        <div className="p-4 space-y-5 pb-24">
          <h2 className="font-semibold">Tournament Info</h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tournament Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Mumbai Open 2025"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              placeholder="Describe your tournament"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none resize-none"
            />
          </div>

          <h3 className="font-semibold pt-4">Timeline</h3>

          <div>
            <label className="block text-sm font-medium mb-2">Start Date *</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              End Date (optional)
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Step 2: Venue Details */}
      {step === 2 && (
        <div className="p-4 space-y-5 pb-24">
          <h2 className="font-semibold">Venue Details</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Venue Name *</label>
            <input
              type="text"
              placeholder="e.g., Andheri Sports Complex"
              value={formData.venueName}
              onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">City *</label>
            <input
              type="text"
              placeholder="e.g., Mumbai"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Area / Locality *</label>
            <input
              type="text"
              placeholder="e.g., Andheri West"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Address Line (Optional)
            </label>
            <input
              type="text"
              placeholder="Full Address"
              value={formData.addressLine}
              onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Zip Code *</label>
            <input
              type="text"
              placeholder="000000"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Number of courts *
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    numCourts: Math.max(1, formData.numCourts - 1),
                  })
                }
                className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center font-bold hover:bg-primary/10 transition-colors"
              >
                −
              </button>
              <span className="text-2xl font-bold w-12 text-center">
                {formData.numCourts}
              </span>
              <button
                onClick={() =>
                  setFormData({ ...formData, numCourts: formData.numCourts + 1 })
                }
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold hover:bg-primary/90 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <h3 className="font-semibold pt-4">Organizer Contact Info</h3>

          <div>
            <label className="block text-sm font-medium mb-2">
              Organizer&apos;s Name *
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              value={formData.organizerName}
              onChange={(e) =>
                setFormData({ ...formData, organizerName: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.organizerPhone}
              onChange={(e) =>
                setFormData({ ...formData, organizerPhone: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Organizer&apos;s Mail ID *
            </label>
            <input
              type="email"
              placeholder="e.g., abcdef@email.com"
              value={formData.organizerEmail}
              onChange={(e) =>
                setFormData({ ...formData, organizerEmail: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Add Logo</label>
            <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <div className="w-12 h-12 mx-auto bg-[var(--color-surface-elevated)] rounded-lg flex items-center justify-center mb-2">
                <ImageIcon size={24} className="text-[var(--color-muted)]" />
              </div>
              <p className="text-sm font-medium">Upload Tournament Logo</p>
              <p className="text-xs text-[var(--color-muted)]">
                PNG, JPG up to 15 MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Events */}
      {step === 3 && (
        <div className="p-4 space-y-5 pb-24">
          <h2 className="font-semibold">Create Event</h2>
          <p className="text-sm text-[var(--color-muted)]">
            Create multiple events within your tournament
          </p>

          <div className="text-center py-12 card">
            <div className="w-16 h-16 mx-auto bg-[var(--color-surface-elevated)] rounded-full flex items-center justify-center mb-3">
              <ClipboardIcon size={28} className="text-[var(--color-muted)]" />
            </div>
            <p className="text-[var(--color-muted)]">No events created yet</p>
          </div>

          <Link
            href="/org/tournaments/create/event"
            className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-primary text-primary font-medium hover:bg-primary/5 transition-colors"
          >
            + Add Event
          </Link>
        </div>
      )}

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex justify-between items-center">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          className="text-[var(--color-muted)] flex items-center gap-1"
        >
          <ArrowLeftIcon size={16} /> Previous
        </button>
        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2 rounded-lg font-semibold text-white flex items-center gap-2"
            style={{ background: "var(--gradient-orange)" }}
          >
            Next <ChevronRightIcon size={16} />
          </button>
        ) : (
          <Link
            href="/org/tournaments/create/review"
            className="px-6 py-2 rounded-lg font-semibold text-white flex items-center gap-2"
            style={{ background: "var(--gradient-orange)" }}
          >
            Next <ChevronRightIcon size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
