"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { ArrowLeftIcon, CameraIcon } from "@/components/Icons";

export default function UserProfileEditPage() {
  const router = useRouter();
  const [name, setName] = useState("Alex Costa");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [playingHand, setPlayingHand] = useState("");
  const [primarySport, setPrimarySport] = useState("pickleball");

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px] flex items-center gap-2"
          aria-label="Back"
        >
          <ArrowLeftIcon size={20} />
          <span className="font-medium">Edit Profile</span>
        </button>
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary relative">
            A
            <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm" aria-hidden>
              <CameraIcon size={16} className="text-white" />
            </span>
          </div>
        </div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); router.back(); }}>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Full Name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]" />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Contact Number</span>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]" />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Gender</span>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Date of Birth</span>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]" />
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Playing Hand</span>
            <select value={playingHand} onChange={(e) => setPlayingHand(e.target.value)} className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]">
              <option value="">Select</option>
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-[var(--color-muted)]">Primary sport</span>
            <select value={primarySport} onChange={(e) => setPrimarySport(e.target.value)} className="mt-1 w-full p-3 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)]">
              <option value="pickleball">Pickleball</option>
              <option value="tennis" disabled>Tennis (Coming soon)</option>
              <option value="badminton" disabled>Badminton (Coming soon)</option>
            </select>
          </label>
          <button type="submit" className="w-full min-h-[44px] rounded-[var(--radius-button)] bg-primary text-[var(--color-primary-contrast)] font-medium">Continue</button>
        </form>
      </div>
    </Layout>
  );
}
