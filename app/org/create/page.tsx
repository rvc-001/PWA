"use client";

import React, { useState } from "react";
import Link from "next/link";
import { XIcon, BuildingIcon, PhoneIcon, MapPinIcon, ArrowLeftIcon, ChevronRightIcon } from "@/components/Icons";

export default function CreateOrgPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    orgName: "",
    description: "",
    establishedYear: "",
    logo: null as File | null,
    website: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const handleGoBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] p-4 flex items-center justify-between">
        <h1 className="font-semibold">Create Organization Profile</h1>
        <Link
          href="/org/onboarding"
          className="p-2 hover:bg-[var(--color-surface-elevated)] rounded-lg"
        >
          <XIcon size={20} />
        </Link>
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <div className="p-4 space-y-5 pb-24">
          <h2 className="font-semibold flex items-center gap-2">
            <BuildingIcon size={18} /> Basic Information
          </h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Organization Name *
            </label>
            <input
              type="text"
              placeholder="Enter organization name"
              value={formData.orgName}
              onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              placeholder="Brief description of your organization"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Established Year
            </label>
            <input
              type="text"
              placeholder="MM/YYYY"
              value={formData.establishedYear}
              onChange={(e) =>
                setFormData({ ...formData, establishedYear: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Organization Logo
            </label>
            <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-[var(--color-surface-elevated)] rounded-lg flex items-center justify-center mb-3">
                <svg
                  className="w-8 h-8 text-[var(--color-muted)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="font-medium">Upload Organization Logo</p>
              <p className="text-sm text-[var(--color-muted)]">
                PNG, JPG up to 15 MB
              </p>
              <button className="mt-3 text-primary text-sm font-medium">
                Choose File
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex justify-between">
            <button className="text-[var(--color-muted)] flex items-center gap-1"><ArrowLeftIcon size={16} /> Previous</button>
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 rounded-lg font-semibold text-white"
              style={{ background: "var(--gradient-orange)" }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Contact Information */}
      {step === 2 && (
        <div className="p-4 space-y-5 pb-24">
          <h2 className="font-semibold flex items-center gap-2">
            <PhoneIcon size={18} /> Contact Information
          </h2>

          <div>
            <label className="block text-sm font-medium mb-2">Website</label>
            <input
              type="url"
              placeholder="https://example.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                placeholder="contact@..."
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                placeholder="+91 98764..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <h2 className="font-semibold flex items-center gap-2 pt-4">
            <MapPinIcon size={18} /> Address
          </h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Street Address *
            </label>
            <input
              type="text"
              placeholder="Complete address"
              value={formData.streetAddress}
              onChange={(e) =>
                setFormData({ ...formData, streetAddress: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input
                type="text"
                placeholder="City Name"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State *</label>
              <input
                type="text"
                placeholder="State Name"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pin Code *</label>
            <input
              type="text"
              placeholder="123456"
              value={formData.pinCode}
              onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
            />
          </div>

          {/* Navigation */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex justify-between items-center">
            <button onClick={handleGoBack} className="text-[var(--color-muted)] flex items-center gap-1">
              <ArrowLeftIcon size={16} /> Previous
            </button>
            <Link
              href="/org/home"
              className="px-6 py-2 rounded-lg font-semibold text-white flex items-center gap-2"
              style={{ background: "var(--gradient-orange)" }}
            >
              Create Organization <ChevronRightIcon size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
