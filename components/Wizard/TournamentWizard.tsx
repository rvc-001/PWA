"use client";

import React, { useState } from "react";
import { XIcon, ImageIcon, ArrowLeftIcon, ChevronRightIcon, TrashIcon } from "@/components/Icons";

// --- REBUILT UI COMPONENTS ---

// 1. Native Styled Select
const NativeSelect = ({ label, value, options, onChange }: any) => (
  <div className="relative">
    <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer font-medium"
      >
        <option value="" disabled>Select {label}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[var(--color-muted)]">
        <ChevronRightIcon size={16} className="rotate-90" />
      </div>
    </div>
  </div>
);

// 2. Clean, Premium Toggle Switch (Updated Proportions & Glow)
const ToggleSwitch = ({ checked, onChange, label }: any) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm font-semibold text-[var(--color-text)]">
      {label}
    </span>

    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
        checked ? "bg-primary shadow-[0_0_10px_rgba(255,107,0,0.4)]" : "bg-[var(--color-border)]"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </div>
);

// --- MAIN COMPONENT ---

interface TournamentWizardProps {
  onComplete: (tournament: any) => void;
  onClose: () => void;
}

export default function TournamentWizard({ onComplete, onClose }: TournamentWizardProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Step 1
    name: "", description: "", startDate: "", endDate: "",
    // Step 2
    venueName: "", city: "", area: "", addressLine: "", zipCode: "", numCourts: 1, organizerName: "", organizerPhone: "", organizerEmail: "",
    // Step 3
    events: [] as any[],
  });

  const sportsOpts = ["Pickleball", "Tennis", "Badminton", "Padel"];
  const formatOpts = ["Knockout", "Round Robin", "League", "Groups + Knockout"];
  const genderOpts = ["Men's", "Women's", "Mixed", "Open"];
  const partTypeOpts = ["Singles", "Doubles", "Team"];
  const setsOpts = ["Best of 1", "Best of 3", "Best of 5"];
  const pointsOpts = ["11", "15", "21"];
  const paymentOpts = ["Pay at venue", "Pay online (UPI)"];

  const handleNext = () => {
    // Non-blocking progression
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const addEvent = () => {
    setFormData((prev) => ({
      ...prev,
      events: [...prev.events, {
        id: Date.now(), name: "", sport: "", format: "", regDueDate: "", startDate: "", 
        gender: "", partType: "", sets: "", points: "", ageRestricted: "",
        isFree: true, paymentOption: "", upiId: "", fee: ""
      }],
    }));
  };

  const updateEvent = (index: number, field: string, value: any) => {
    const newEvents = [...formData.events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setFormData({ ...formData, events: newEvents });
  };

  const removeEvent = (id: number) => {
    setFormData((prev) => ({ ...prev, events: prev.events.filter((e) => e.id !== id) }));
  };

  return (
    <div className="h-[100dvh] md:h-screen bg-[var(--color-background)] md:py-10 md:px-6 flex justify-center items-start font-sans overflow-hidden">
      
      {/* Container Column */}
      <div className="w-full max-w-3xl h-full md:h-auto md:max-h-[85vh] bg-[var(--color-surface)] md:rounded-2xl md:shadow-2xl md:border border-[var(--color-border)] flex flex-col relative overflow-hidden">
        
        {/* HEADER */}
        <div className="flex-none bg-[var(--color-surface)] border-b border-[var(--color-border)] p-5 flex items-center justify-between z-10">
          <h1 className="text-xl font-bold text-[var(--color-text)]">Create Tournament</h1>
          <button onClick={onClose} className="p-2 bg-[var(--color-surface-elevated)] text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-full transition-colors">
            <XIcon size={18} />
          </button>
        </div>

        {/* STEPPER */}
        <div className="flex-none px-6 pt-4 pb-2 z-10 bg-[var(--color-surface)]">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= i ? "bg-primary" : "bg-[var(--color-border)] opacity-50"}`} />
            ))}
          </div>
          <div className="mt-2 text-xs font-bold text-primary text-right tracking-wide">
            STEP {step} OF {totalSteps}
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 animate-in fade-in duration-300">
          
          {/* STEP 1: Tournament Info */}
          {step === 1 && (
            <div className="space-y-8 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">Tournament Info</h2>
                <p className="text-sm text-[var(--color-muted)]">Let's start with the basic details of your tournament.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Tournament Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g., Summer Smash 2025"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Description</label>
                  <textarea
                    placeholder="Describe your tournament's rules, format, or general info..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none resize-none transition-all"
                  />
                </div>

                <div className="pt-4 border-t border-[var(--color-border)]">
                  <h3 className="text-lg font-bold mb-4 text-[var(--color-text)]">Timeline</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Start Date <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary focus:outline-none transition-all cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Venue Details */}
          {step === 2 && (
            <div className="space-y-8 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">Venue Details</h2>
                <p className="text-sm text-[var(--color-muted)]">Where is the tournament taking place?</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Venue Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="e.g., Andheri Sports Complex" value={formData.venueName} onChange={(e) => setFormData({ ...formData, venueName: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">City <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="e.g., Mumbai" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Area / Locality <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="e.g., Andheri West" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Zip Code <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="000000" value={formData.zipCode} onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary outline-none" />
                  </div>
                  
                  {/* UPDATE: Compact Number of Courts Stepper */}
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                      Number of Courts
                    </label>
                    <div className="inline-flex items-center gap-4">
                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            numCourts: Math.max(1, formData.numCourts - 1),
                          })
                        }
                        className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] hover:bg-[var(--color-border)] transition"
                      >
                        −
                      </button>
                      <span className="text-3xl font-extrabold text-[var(--color-text)] min-w-[40px] text-center">
                        {formData.numCourts}
                      </span>
                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            numCourts: formData.numCourts + 1,
                          })
                        }
                        className="w-9 h-9 rounded-lg bg-primary text-white hover:opacity-90 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--color-border)]">
                  <h3 className="text-lg font-bold mb-4 text-[var(--color-text)]">Organizer Info</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Organizer's Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Enter Name" value={formData.organizerName} onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary outline-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Phone Number <span className="text-red-500">*</span></label>
                        <input type="tel" placeholder="Phone" value={formData.organizerPhone} onChange={(e) => setFormData({ ...formData, organizerPhone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Create Events */}
          {step === 3 && (
            <div className="space-y-6 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">Create Events</h2>
                <p className="text-sm text-[var(--color-muted)]">Set up formats, rules, and entry fees for each category.</p>
              </div>

              {/* UPDATE: Polished Empty State */}
              {formData.events.length === 0 ? (
                <div className="text-center py-16 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-5">
                    <ImageIcon size={20} className="text-[var(--color-muted)]" />
                  </div>
                  <p className="text-lg font-semibold text-[var(--color-text)]">
                    No events created yet
                  </p>
                  <p className="text-sm text-[var(--color-muted)] mt-1 mb-6">
                    Create your first event category to continue.
                  </p>
                  <button
                    onClick={addEvent}
                    className="px-6 py-3 rounded-xl font-semibold text-white shadow-md hover:scale-[1.02] transition-transform"
                    style={{ background: "var(--gradient-orange)" }}
                  >
                    + Add Event
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {formData.events.map((event, index) => (
                    <div key={event.id} className="p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--color-border)]">
                        <h3 className="text-lg font-bold text-[var(--color-text)]">Event {index + 1}</h3>
                        <button onClick={() => removeEvent(event.id)} className="p-2 text-[var(--color-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                           <TrashIcon size={18} />
                        </button>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Event Name <span className="text-red-500">*</span></label>
                          <input type="text" placeholder="e.g. Men's Singles Pro" value={event.name} onChange={(e) => updateEvent(index, "name", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary outline-none" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <NativeSelect label="Sport" value={event.sport} options={sportsOpts} onChange={(v: string) => updateEvent(index, "sport", v)} />
                          <NativeSelect label="Format" value={event.format} options={formatOpts} onChange={(v: string) => updateEvent(index, "format", v)} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                           <div>
                            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Reg. Due Date <span className="text-red-500">*</span></label>
                            <input type="date" value={event.regDueDate} onChange={(e) => updateEvent(index, "regDueDate", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary outline-none [color-scheme:light] dark:[color-scheme:dark]" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Event Start Date <span className="text-red-500">*</span></label>
                            <input type="date" value={event.startDate} onChange={(e) => updateEvent(index, "startDate", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary outline-none [color-scheme:light] dark:[color-scheme:dark]" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <NativeSelect label="Gender" value={event.gender} options={genderOpts} onChange={(v: string) => updateEvent(index, "gender", v)} />
                          <NativeSelect label="Participation Type" value={event.partType} options={partTypeOpts} onChange={(v: string) => updateEvent(index, "partType", v)} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <NativeSelect label="Sets Per Match" value={event.sets} options={setsOpts} onChange={(v: string) => updateEvent(index, "sets", v)} />
                          <NativeSelect label="Points Per Set" value={event.points} options={pointsOpts} onChange={(v: string) => updateEvent(index, "points", v)} />
                        </div>

                        <div className="pt-4 border-t border-[var(--color-border)]">
                          <ToggleSwitch 
                            label="Free Entry" 
                            checked={event.isFree} 
                            onChange={(val: boolean) => updateEvent(index, "isFree", val)} 
                          />
                        </div>

                        {!event.isFree && (
                          <div className="p-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] space-y-5 animate-in fade-in duration-300">
                             <NativeSelect label="Payment Option" value={event.paymentOption} options={paymentOpts} onChange={(v: string) => updateEvent(index, "paymentOption", v)} />
                             
                             {event.paymentOption === "Pay online (UPI)" && (
                               <div>
                                 <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Add UPI ID <span className="text-red-500">*</span></label>
                                 <input type="text" placeholder="e.g. name@okhdfc" value={event.upiId} onChange={(e) => updateEvent(index, "upiId", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary outline-none" />
                               </div>
                             )}

                             <div>
                               <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Entry Fee <span className="text-red-500">*</span></label>
                               <div className="relative">
                                 <span className="absolute left-4 top-3.5 text-[var(--color-muted)] font-bold">₹</span>
                                 <input type="number" placeholder="0.00" value={event.fee} onChange={(e) => updateEvent(index, "fee", e.target.value)} className="w-full pl-9 pr-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] focus:border-primary outline-none" />
                               </div>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <button onClick={addEvent} className="w-full flex items-center justify-center py-4 rounded-xl border-2 border-dashed border-[var(--color-border)] text-[var(--color-text)] font-semibold hover:border-primary hover:text-primary transition-colors bg-[var(--color-surface-elevated)]">
                    + Add Another Event
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Review & Publish */}
          {step === 4 && (
             <div className="space-y-6 pb-4">
               <div>
                 <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">Review & Publish</h2>
                 <p className="text-sm text-[var(--color-muted)]">Ensure everything looks correct before going live.</p>
               </div>

               <div className="space-y-4">
                 <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
                    <h3 className="text-sm font-bold text-[var(--color-muted)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] pb-2">Tournament Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-[var(--color-muted)]">Name</span><span className="font-semibold text-[var(--color-text)]">{formData.name || '—'}</span></div>
                      <div className="flex justify-between"><span className="text-[var(--color-muted)]">Start Date</span><span className="font-semibold text-[var(--color-text)]">{formData.startDate || '—'}</span></div>
                    </div>
                 </div>

                 <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
                    <h3 className="text-sm font-bold text-[var(--color-muted)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] pb-2">Venue & Organizer</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-[var(--color-muted)]">Venue</span><span className="font-semibold text-[var(--color-text)]">{formData.venueName || '—'}</span></div>
                      <div className="flex justify-between"><span className="text-[var(--color-muted)]">Courts</span><span className="font-semibold text-[var(--color-text)]">{formData.numCourts}</span></div>
                      <div className="flex justify-between"><span className="text-[var(--color-muted)]">Organizer</span><span className="font-semibold text-[var(--color-text)]">{formData.organizerName || '—'}</span></div>
                    </div>
                 </div>

                 <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
                    <h3 className="text-sm font-bold text-[var(--color-muted)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] pb-2">Events ({formData.events.length})</h3>
                    {formData.events.length === 0 ? (
                      <p className="text-sm text-[var(--color-muted)] italic">No events created.</p>
                    ) : (
                      <div className="space-y-3">
                        {formData.events.map((ev, i) => (
                          <details key={ev.id} className="group border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] open:ring-1 open:ring-primary">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-sm text-[var(--color-text)]">
                              <span>{ev.name || `Event ${i+1}`} <span className="text-[var(--color-muted)] font-normal ml-2">({ev.sport || 'Sport'})</span></span>
                              <ChevronRightIcon size={16} className="text-[var(--color-muted)] group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="text-[var(--color-muted)] text-xs px-4 pb-4 space-y-2 border-t border-[var(--color-border)] pt-3">
                              <div className="flex justify-between"><span>Format:</span> <span className="text-[var(--color-text)] font-semibold">{ev.format}</span></div>
                              <div className="flex justify-between"><span>Gender:</span> <span className="text-[var(--color-text)] font-semibold">{ev.gender}</span></div>
                              <div className="flex justify-between"><span>Sets:</span> <span className="text-[var(--color-text)] font-semibold">{ev.sets}</span></div>
                              <div className="flex justify-between"><span>Fee:</span> <span className="text-[var(--color-text)] font-semibold">{ev.isFree ? "Free Entry" : `₹${ev.fee}`}</span></div>
                            </div>
                          </details>
                        ))}
                      </div>
                    )}
                 </div>
               </div>
             </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex-none bg-[var(--color-surface)] border-t border-[var(--color-border)] p-4 md:px-6 flex justify-between items-center z-10">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${step === 1 ? "opacity-0 pointer-events-none" : "text-[var(--color-text)] hover:bg-[var(--color-surface-elevated)]"}`}
          >
            <ArrowLeftIcon size={16} /> Back
          </button>
          
          {step < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl font-bold text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{ background: "var(--gradient-orange)" }}
            >
              Continue <ChevronRightIcon size={16} />
            </button>
          ) : (
            <button
              onClick={() => onComplete(formData)}
              className="px-6 py-2.5 rounded-xl font-bold text-white flex items-center gap-2 shadow-[0_0_15px_rgba(255,107,0,0.3)] hover:scale-[1.02] transition-transform"
              style={{ background: "var(--gradient-orange)" }}
            >
              Publish <ChevronRightIcon size={16} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}