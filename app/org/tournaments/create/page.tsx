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
    <div className="min-h-screen bg-[var(--color-background)] md:py-10 md:px-6 flex justify-center items-start">
      {/* Responsive Centered Card Container */}
      <div className="w-full max-w-3xl bg-[var(--color-surface)] md:rounded-2xl md:shadow-lg md:border border-[var(--color-border)] flex flex-col relative min-h-screen md:min-h-0 overflow-hidden">
        
        {/* Header */}
        <div className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] p-5 flex items-center justify-between md:rounded-t-2xl">
          <h1 className="text-xl font-bold">Create Tournament</h1>
          <Link
            href="/org/tournaments"
            className="p-2 hover:bg-[var(--color-surface-elevated)] rounded-full transition-colors"
          >
            <XIcon size={20} />
          </Link>
        </div>

        {/* Step Indicator */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-primary" : "bg-[var(--color-border)]"}`} />
            <div className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-primary" : "bg-[var(--color-border)]"}`} />
            <div className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step >= 3 ? "bg-primary" : "bg-[var(--color-border)]"}`} />
          </div>
          <div className="mt-2 text-sm font-medium text-[var(--color-muted)] text-right">
            Step {step} of 3
          </div>
        </div>

        {/* Form Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 animate-in fade-in duration-500">
          
          {/* Step 1: Tournament Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">Tournament Info</h2>
                <p className="text-sm text-[var(--color-muted)]">Let's start with the basic details of your tournament.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">Tournament Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g., Mumbai Open 2025"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    placeholder="Describe your tournament's rules, format, or general info..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none transition-all"
                  />
                </div>

                <div className="pt-2">
                  <h3 className="text-lg font-bold mb-4 border-b border-[var(--color-border)] pb-2">Timeline</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Start Date <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">End Date (Optional)</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Venue Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">Venue Details</h2>
                <p className="text-sm text-[var(--color-muted)]">Where is the tournament taking place?</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">Venue Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g., Andheri Sports Complex"
                    value={formData.venueName}
                    onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">City <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g., Mumbai"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Area / Locality <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g., Andheri West"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Address Line (Optional)</label>
                    <input
                      type="text"
                      placeholder="Full Address"
                      value={formData.addressLine}
                      onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Zip Code <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="000000"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Number of Courts <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-4 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] p-2 rounded-xl w-max">
                    <button
                      onClick={() => setFormData({ ...formData, numCourts: Math.max(1, formData.numCourts - 1) })}
                      className="w-10 h-10 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] flex items-center justify-center font-bold hover:bg-[var(--color-border)] transition-colors"
                    >
                      −
                    </button>
                    <span className="text-xl font-bold w-12 text-center">{formData.numCourts}</span>
                    <button
                      onClick={() => setFormData({ ...formData, numCourts: formData.numCourts + 1 })}
                      className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold hover:bg-primary/90 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-bold mb-4 border-b border-[var(--color-border)] pb-2">Organizer Contact Info</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Organizer's Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        placeholder="Enter your Name"
                        value={formData.organizerName}
                        onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone Number <span className="text-red-500">*</span></label>
                        <input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.organizerPhone}
                          onChange={(e) => setFormData({ ...formData, organizerPhone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email ID <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          placeholder="e.g., mail@example.com"
                          value={formData.organizerEmail}
                          onChange={(e) => setFormData({ ...formData, organizerEmail: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-semibold mb-2">Tournament Logo</label>
                  <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer bg-[var(--color-surface-elevated)] group">
                    <div className="w-14 h-14 mx-auto bg-[var(--color-surface)] rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <ImageIcon size={24} className="text-[var(--color-muted)] group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">Upload Tournament Logo</p>
                    <p className="text-xs text-[var(--color-muted)] mt-1">PNG, JPG up to 15 MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Events */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">Create Event</h2>
                <p className="text-sm text-[var(--color-muted)]">Create multiple events within your tournament</p>
              </div>

              <div className="text-center py-16 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl">
                <div className="w-16 h-16 mx-auto bg-[var(--color-surface)] shadow-sm rounded-full flex items-center justify-center mb-4">
                  <ClipboardIcon size={28} className="text-[var(--color-muted)]" />
                </div>
                <p className="text-[var(--color-text)] font-medium">No events created yet</p>
                <p className="text-[var(--color-muted)] text-sm mt-1">Add your first event to get started.</p>
              </div>

              <Link
                href="/org/tournaments/create/event"
                className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-dashed border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
              >
                + Add Event
              </Link>
            </div>
          )}
        </div>

        {/* Navigation / Footer Container */}
        <div className="sticky bottom-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] p-4 md:px-6 flex justify-between items-center md:rounded-b-2xl z-40">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-[var(--color-text)] hover:bg-[var(--color-surface-elevated)]'}`}
          >
            <ArrowLeftIcon size={16} /> Back
          </button>
          
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl font-bold text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{ background: "var(--gradient-orange)" }}
            >
              Next Step <ChevronRightIcon size={16} />
            </button>
          ) : (
            <Link
              href="/org/tournaments/create/review"
              className="px-6 py-2.5 rounded-xl font-bold text-white flex items-center gap-2 shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 transition-all"
              style={{ background: "var(--gradient-orange)" }}
            >
              Review Tournament <ChevronRightIcon size={16} />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}