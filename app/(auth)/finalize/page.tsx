"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FinalizePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [playingHand, setPlayingHand] = useState("");
  const [primarySport, setPrimarySport] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: persist profile then redirect
    router.push("/home");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <Link href="/auth/splash" className="inline-flex items-center gap-1 text-sm text-[var(--color-muted)] mb-6">
        ← Back
      </Link>
      <h1 className="text-xl font-semibold mb-1">Finalize Registration</h1>
      <p className="text-sm text-[var(--color-muted)] mb-6">Let&apos;s set up your player profile.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-[var(--color-muted)]">Full Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
          />
        </label>
        <label className="block">
          <span className="text-sm text-[var(--color-muted)]">Contact Number</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
          />
        </label>
        <label className="block">
          <span className="text-sm text-[var(--color-muted)]">Gender</span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm text-[var(--color-muted)]">Date of birth</span>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
          />
        </label>
        <label className="block">
          <span className="text-sm text-[var(--color-muted)]">Playing Hand</span>
          <select
            value={playingHand}
            onChange={(e) => setPlayingHand(e.target.value)}
            className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <option value="">Select</option>
            <option value="right">Right</option>
            <option value="left">Left</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm text-[var(--color-muted)]">Primary sport</span>
          <select
            value={primarySport}
            onChange={(e) => setPrimarySport(e.target.value)}
            className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <option value="">Select</option>
            <option value="pickleball">Pickleball</option>
            <option value="tennis">Tennis</option>
            <option value="badminton">Badminton</option>
            <option value="table-tennis">Table Tennis</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-full min-h-[44px] rounded-[var(--radius-button)] bg-primary text-white font-medium"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}
