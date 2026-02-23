'use client';

import React, { useState } from 'react';

const steps = [
  { id: '1', name: 'Basic Details', description: 'Name, dates, and location' },
  { id: '2', name: 'Events', description: 'Categories & formats' },
  { id: '3', name: 'Registration', description: 'Pricing & deadlines' },
  { id: '4', name: 'Review', description: 'Confirm and publish' },
];

interface Tournament {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  events: any[];
  isFree: boolean;
  price: string;
  registrationDeadline: string;
}

interface TournamentWizardProps {
  onComplete: (tournament: Partial<Tournament>) => void;
  onClose: () => void;
}

export default function TournamentWizard({ onComplete, onClose }: TournamentWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    location: '',
    events: [{ id: 1, name: "Men's Singles", format: 'Knockout' }],
    isFree: true,
    price: '',
    registrationDeadline: '',
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const addEvent = () => {
    setFormData((prev) => ({
      ...prev,
      events: [...prev.events, { id: Date.now(), name: '', format: 'Knockout' }],
    }));
  };

  const removeEvent = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-4 sm:py-12 px-4 sm:px-6 flex justify-center items-start font-sans">
      
      {/* Main Container - Split Card Design */}
      <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-800 flex flex-col md:flex-row overflow-hidden min-h-[600px]">
        
        {/* --- SIDEBAR / MOBILE HEADER --- */}
        <div className="w-full md:w-1/3 bg-zinc-50 dark:bg-zinc-900/50 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Create Tournament</h1>
              <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-full transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav aria-label="Progress">
              <ol className="space-y-4 md:space-y-6 flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 gap-4 md:gap-0 hide-scrollbar snap-x">
                {steps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isComplete = index < currentStep;

                  return (
                    <li key={step.id} className="snap-start flex-shrink-0">
                      <div className={`group flex items-center md:items-start flex-row text-left transition-colors ${!isComplete && !isActive ? 'opacity-50' : ''}`}>
                        <div className="flex items-center justify-center relative">
                          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                            isActive
                              ? 'bg-blue-600 text-white ring-4 ring-blue-600/20'
                              : isComplete
                              ? 'bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900'
                              : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                          }`}>
                            {isComplete ? (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              index + 1
                            )}
                          </span>
                          {/* Desktop vertical connecting line */}
                          {index !== steps.length - 1 && (
                            <div className={`hidden md:block absolute top-10 w-0.5 h-6 -ml-0.5 transition-colors ${isComplete ? 'bg-zinc-800 dark:bg-zinc-100' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
                          )}
                        </div>
                        <div className="ml-4 flex flex-col justify-center">
                          <span className={`text-sm font-bold ${isActive ? 'text-blue-600 dark:text-blue-400' : isComplete ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>
                            {step.name}
                          </span>
                          <span className="hidden md:block text-xs font-medium text-zinc-500 mt-0.5">{step.description}</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>

        {/* --- MAIN FORM CONTENT --- */}
        <div className="w-full md:w-2/3 flex flex-col bg-white dark:bg-zinc-900 relative">
          
          {/* Scrollable Form Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar">
            
            {/* STEP 1: BASIC DETAILS */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Basic Details</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Let's start with the core information.</p>
                </div>

                <div className="space-y-5 pt-2">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Tournament Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Summer Smash 2026"
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-zinc-400 sm:text-sm shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Start Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all sm:text-sm shadow-sm [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all sm:text-sm shadow-sm [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Venue Address</label>
                    <textarea
                      rows={2}
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Full street address..."
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all sm:text-sm shadow-sm resize-none placeholder:text-zinc-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: EVENTS */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Tournament Events</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Add the categories players can register for.</p>
                </div>

                <div className="space-y-3 pt-2">
                  {formData.events.map((event, index) => (
                    <div key={event.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 group">
                      <div className="flex-1 w-full relative">
                        <input
                          type="text"
                          placeholder="Event Name (e.g. Men's Singles)"
                          value={event.name}
                          onChange={(e) => {
                            const newEvents = [...formData.events];
                            newEvents[index].name = e.target.value;
                            setFormData({ ...formData, events: newEvents });
                          }}
                          className="w-full bg-transparent border-0 border-b-2 border-transparent focus:border-blue-500 px-2 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-0 outline-none transition-colors placeholder:text-zinc-400 font-medium"
                        />
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto px-2 sm:px-0">
                        <select
                          value={event.format}
                          onChange={(e) => {
                            const newEvents = [...formData.events];
                            newEvents[index].format = e.target.value;
                            setFormData({ ...formData, events: newEvents });
                          }}
                          className="flex-1 sm:flex-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500/20 outline-none shadow-sm cursor-pointer"
                        >
                          <option>Knockout</option>
                          <option>Round Robin</option>
                          <option>League</option>
                        </select>
                        <button
                          onClick={() => removeEvent(event.id)}
                          className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Remove Event"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={addEvent}
                    className="w-full flex items-center justify-center py-3.5 mt-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all shadow-sm"
                  >
                    <svg className="w-5 h-5 mr-2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Another Event
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REGISTRATION */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Registration Settings</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Manage entry fees and pricing.</p>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                    <div className="pr-4">
                      <label className="text-base font-bold text-zinc-900 dark:text-white cursor-pointer select-none" onClick={() => setFormData({ ...formData, isFree: !formData.isFree })}>
                        Paid Tournament
                      </label>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Toggle on to require an entry fee for participants.
                      </p>
                    </div>
                    
                    {/* iOS Style Toggle */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={!formData.isFree}
                      onClick={() => setFormData({ ...formData, isFree: !formData.isFree })}
                      className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                        !formData.isFree ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          !formData.isFree ? 'translate-x-7' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Price Input (Animated Height) */}
                  <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                    !formData.isFree ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                  }`}>
                    <div className="overflow-hidden">
                      <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Entry Fee Amount <span className="text-red-500">*</span>
                      </label>
                      <div className="relative w-full sm:max-w-xs">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <span className="text-zinc-500 dark:text-zinc-400 font-semibold">₹</span>
                        </div>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 py-3 pl-9 pr-4 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all sm:text-sm shadow-sm placeholder:text-zinc-400"
                          placeholder="0.00"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Review & Publish</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Ensure everything looks correct before going live.</p>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 overflow-hidden">
                  <dl className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    <div className="py-3 flex justify-between items-center">
                      <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tournament Name</dt>
                      <dd className="text-sm font-bold text-zinc-900 dark:text-white text-right">{formData.name || '—'}</dd>
                    </div>
                    <div className="py-3 flex justify-between items-center">
                      <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Dates</dt>
                      <dd className="text-sm font-semibold text-zinc-900 dark:text-white text-right">
                        {formData.startDate || 'TBD'} {formData.endDate && `to ${formData.endDate}`}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between items-center">
                      <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Events Included</dt>
                      <dd className="text-sm font-semibold text-zinc-900 dark:text-white text-right">{formData.events.length} Event(s)</dd>
                    </div>
                    <div className="py-3 flex justify-between items-center">
                      <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Entry Fee</dt>
                      <dd className="text-sm font-bold text-zinc-900 dark:text-white text-right">
                        {formData.isFree ? (
                          <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">Free</span>
                        ) : (
                          `₹${formData.price || '0.00'}`
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>

          {/* --- FOOTER ACTIONS --- */}
          <div className="px-6 py-4 md:px-10 md:py-6 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between z-10">
            <button
              onClick={prevStep}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                currentStep === 0
                  ? 'text-zinc-400 dark:text-zinc-600 opacity-50 cursor-not-allowed'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button
              onClick={currentStep === steps.length - 1 ? () => onComplete(formData) : nextStep}
              className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-500/20 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/20"
            >
              {currentStep === steps.length - 1 ? 'Publish Tournament' : 'Continue'}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}