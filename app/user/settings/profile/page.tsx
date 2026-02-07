"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import { EditIcon, UserIcon, PhoneIcon, MailIcon, CalendarIcon, HandIcon, GamepadIcon } from "@/components/Icons";

export default function EditProfilePage() {
    const [formData, setFormData] = useState({
        fullName: "Alex Costa",
        contactNumber: "+91-98765-43210",
        email: "alex@forehand.app",
        gender: "male",
        dateOfBirth: "1995-06-15",
        playingHand: "right",
        privacySport: "badminton",
    });

    return (
        <Layout title="Edit Profile" showBack>
            <div className="p-4 space-y-4 pb-24">
                {/* Profile Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold">
                            A
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                            <EditIcon size={14} />
                        </button>
                    </div>
                </div>

                {/* Form Fields */}
                <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-1"><UserIcon size={14} /> Full Name</label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                        <PhoneIcon size={14} /> Contact Number
                    </label>
                    <input
                        type="tel"
                        value={formData.contactNumber}
                        onChange={(e) =>
                            setFormData({ ...formData, contactNumber: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-1"><MailIcon size={14} /> Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-1"><UserIcon size={14} /> Gender</label>
                    <select
                        value={formData.gender}
                        onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                        <CalendarIcon size={14} /> Date of Birth
                    </label>
                    <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                            setFormData({ ...formData, dateOfBirth: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                        <HandIcon size={14} /> Playing Hand
                    </label>
                    <select
                        value={formData.playingHand}
                        onChange={(e) =>
                            setFormData({ ...formData, playingHand: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
                    >
                        <option value="right">Right</option>
                        <option value="left">Left</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                        <GamepadIcon size={14} /> Privacy Sport
                    </label>
                    <select
                        value={formData.privacySport}
                        onChange={(e) =>
                            setFormData({ ...formData, privacySport: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none"
                    >
                        <option value="badminton">Badminton</option>
                        <option value="tennis">Tennis</option>
                        <option value="squash">Squash</option>
                    </select>
                </div>

                {/* Save Button */}
                <button className="btn-primary w-full mt-6">Continue</button>
            </div>
        </Layout>
    );
}
