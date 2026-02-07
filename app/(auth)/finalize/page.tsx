"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserIcon, PhoneIcon, UserIcon as GenderIcon, CalendarIcon, HandIcon, GamepadIcon } from "@/components/Icons";

export default function FinalizePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    gender: "",
    dob: "",
    playingHand: "",
    privacySport: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-6 pb-safe">
      <div className="max-w-md mx-auto">
        {/* Header with orange gradient */}
        <div
          className="rounded-2xl p-6 mb-6 text-white"
          style={{ background: "var(--gradient-orange)" }}
        >
          <h1 className="text-2xl font-bold mb-1">Finalize Registration</h1>
          <p className="text-sm opacity-90">
            Let's set up your player profile
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2 flex items-center gap-2">
              <UserIcon size={14} /> Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-4 py-3 rounded-[var(--radius-input)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:border-primary focus:outline-none transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2 flex items-center gap-2">
              <PhoneIcon size={14} /> Contact Number
            </label>
            <input
              type="tel"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
              className="w-full px-4 py-3 rounded-[var(--radius-input)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:border-primary focus:outline-none transition-colors"
              placeholder="Enter your contact number"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2 flex items-center gap-2">
              <GenderIcon size={14} /> Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full px-4 py-3 rounded-[var(--radius-input)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-colors"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2 flex items-center gap-2">
              <CalendarIcon size={14} /> Date of Birth
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              className="w-full px-4 py-3 rounded-[var(--radius-input)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          {/* Playing Hand */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2 flex items-center gap-2">
              <HandIcon size={14} /> Playing Hand
            </label>
            <select
              value={formData.playingHand}
              onChange={(e) =>
                setFormData({ ...formData, playingHand: e.target.value })
              }
              className="w-full px-4 py-3 rounded-[var(--radius-input)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-colors"
            >
              <option value="">Select playing hand</option>
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
          </div>

          {/* Privacy Sport */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2 flex items-center gap-2">
              <GamepadIcon size={14} /> Privacy Sport
            </label>
            <select
              value={formData.privacySport}
              onChange={(e) =>
                setFormData({ ...formData, privacySport: e.target.value })
              }
              className="w-full px-4 py-3 rounded-[var(--radius-input)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-colors"
            >
              <option value="">Select privacy preference</option>
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full min-h-[52px] flex items-center justify-center rounded-xl font-semibold text-white shadow-lg transition-transform active:scale-95 mt-6"
            style={{ background: "var(--gradient-orange)" }}
          >
            Create Profile
          </button>
        </form>

        {/* Bottom text */}
        <p className="text-xs text-[var(--color-muted)] text-center mt-6">
          Already have an account?{" "}
          <Link href="/user/home" className="text-primary font-medium">
            Login with Google
          </Link>
        </p>
      </div>
    </div>
  );
}
