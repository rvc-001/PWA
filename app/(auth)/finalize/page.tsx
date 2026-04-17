"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import {
  CalendarIcon,
  GamepadIcon,
  HandIcon,
  PhoneIcon,
  UserIcon,
  UserIcon as GenderIcon,
} from "@/components/Icons";

export default function FinalizePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    gender: "",
    dob: "",
    playingHand: "",
    privacySport: "",
  });

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/splash");
      return;
    }

    setFormData((current) => ({
      ...current,
      name:
        current.name ||
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        "",
    }));
  }, [isAuthenticated, isLoading, router, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration placeholder:", formData);
    router.push("/user/home");
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] text-[var(--color-text)]">
        <p className="text-sm text-[var(--color-muted)]">
          Loading your account...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-6 pb-safe">
      <div className="max-w-md mx-auto">
        <div
          className="rounded-2xl p-6 mb-6 text-white"
          style={{ background: "var(--gradient-orange)" }}
        >
          <h1 className="text-2xl font-bold mb-1">Finalize Registration</h1>
          <p className="text-sm opacity-90">
            Let&apos;s set up your player profile
          </p>
          {user?.email ? (
            <p className="text-xs opacity-75 mt-2">{user.email}</p>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2 flex items-center gap-2">
              <UserIcon size={14} /> Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-[var(--radius-input)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:border-primary focus:outline-none transition-colors"
              placeholder="Enter your full name"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2 flex items-center gap-2">
              <GamepadIcon size={14} /> Privacy Sport
            </label>
            <input
              type="text"
              value={formData.privacySport}
              onChange={(e) =>
                setFormData({ ...formData, privacySport: e.target.value })
              }
              className="w-full px-4 py-3 rounded-[var(--radius-input)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-colors"
              placeholder="e.g. Badminton"
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-[52px] flex items-center justify-center rounded-xl font-semibold text-white shadow-lg transition-transform active:scale-95 mt-6"
            style={{ background: "var(--gradient-orange)" }}
          >
            Continue
          </button>
        </form>

        <p className="text-xs text-[var(--color-muted)] text-center mt-6">
          Want to continue later?{" "}
          <Link href="/splash" className="text-primary font-medium">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

