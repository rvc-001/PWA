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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* --- PROGRESS SIDEBAR / TOPBAR --- */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav aria-label="Progress">
            <ol role="list" className="space-y-4 md:space-y-6 flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 gap-4 md:gap-0 hide-scrollbar">
              {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isComplete = index < currentStep;

                return (
                  <li key={step.id} className="flex-shrink-0">
                    <button
                      onClick={() => setCurrentStep(index)}
                      disabled={!isComplete && !isActive}
                      className={`group flex items-start flex-col text-left transition-colors ${
                        !isComplete && !isActive ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    >
                      <span className="flex items-center space-x-3">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                            isActive
                              ? 'border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500 shadow-md shadow-blue-500/20'
                              : isComplete
                              ? 'border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400 dark:bg-emerald-400'
                              : 'border-gray-300 bg-transparent text-gray-500 dark:border-gray-700 dark:text-gray-400'
                          }`}
                        >
                          {isComplete ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-sm font-semibold">{index + 1}</span>
                          )}
                        </span>
                        <span className="hidden md:block">
                          <span
                            className={`text-sm font-bold ${
                              isActive
                                ? 'text-blue-600 dark:text-blue-400'
                                : isComplete
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {step.name}
                          </span>
                          <span className="block text-xs font-medium text-gray-500 dark:text-gray-400/80">{step.description}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* --- MAIN FORM AREA --- */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800/60 overflow-hidden transition-all duration-300 flex flex-col">
          <div className="p-6 sm:p-8 flex-1">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              {steps[currentStep].name}
            </h2>

            {/* STEP 1: BASIC DETAILS */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200">
                    Tournament Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Summer Smash 2026"
                    className="mt-2 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/10 transition-all sm:text-sm outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personalized Date Picker Component */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                      Start Date
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="block w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10 transition-all sm:text-sm outline-none [color-scheme:light] dark:[color-scheme:dark] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                      End Date
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="block w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10 transition-all sm:text-sm outline-none [color-scheme:light] dark:[color-scheme:dark] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200">
                    Venue / Location
                  </label>
                  <div className="relative mt-2">
                     <div className="absolute top-3.5 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    <textarea
                      rows={2}
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Enter the full address..."
                      className="block w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/10 transition-all sm:text-sm resize-none outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: EVENTS */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {formData.events.map((event, index) => (
                  <div key={event.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        placeholder="Event Name (e.g. Men's Singles)"
                        value={event.name}
                        onChange={(e) => {
                          const newEvents = [...formData.events];
                          newEvents[index].name = e.target.value;
                          setFormData({ ...formData, events: newEvents });
                        }}
                        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white outline-none"
                      />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <select
                        value={event.format}
                        onChange={(e) => {
                          const newEvents = [...formData.events];
                          newEvents[index].format = e.target.value;
                          setFormData({ ...formData, events: newEvents });
                        }}
                        className="flex-1 sm:flex-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white outline-none"
                      >
                        <option>Knockout</option>
                        <option>Round Robin</option>
                        <option>League</option>
                      </select>
                      <button
                        onClick={() => removeEvent(event.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={addEvent}
                  className="mt-4 flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Another Event
                </button>
              </div>
            )}

            {/* STEP 3: REGISTRATION (RADIO CARDS) */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Entry Fee Structure
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Free Card */}
                    <label className={`relative flex cursor-pointer rounded-xl border p-5 transition-all duration-200 ${
                        formData.isFree 
                          ? 'border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500 shadow-sm' 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-gray-600 dark:hover:bg-gray-800'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="pricing" 
                        className="sr-only" 
                        checked={formData.isFree} 
                        onChange={() => setFormData({ ...formData, isFree: true })} 
                      />
                      <div className="flex w-full items-start justify-between">
                        <div className="flex flex-col">
                          <span className={`text-base font-bold ${formData.isFree ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}>
                            Free Entry
                          </span>
                          <span className={`text-sm mt-1 font-medium ${formData.isFree ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                            No cost for participants to join.
                          </span>
                        </div>
                        <div className={`shrink-0 ${formData.isFree ? 'text-blue-600 dark:text-blue-400' : 'text-transparent'}`}>
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                      </div>
                    </label>

                    {/* Paid Card */}
                    <label className={`relative flex cursor-pointer rounded-xl border p-5 transition-all duration-200 ${
                        !formData.isFree 
                          ? 'border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-500/10 ring-1 ring-blue-600 dark:ring-blue-500 shadow-sm' 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-gray-600 dark:hover:bg-gray-800'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="pricing" 
                        className="sr-only" 
                        checked={!formData.isFree} 
                        onChange={() => setFormData({ ...formData, isFree: false })} 
                      />
                      <div className="flex w-full items-start justify-between">
                        <div className="flex flex-col">
                          <span className={`text-base font-bold ${!formData.isFree ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}>
                            Paid Entry
                          </span>
                          <span className={`text-sm mt-1 font-medium ${!formData.isFree ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                            Require a fee to participate.
                          </span>
                        </div>
                        <div className={`shrink-0 ${!formData.isFree ? 'text-blue-600 dark:text-blue-400' : 'text-transparent'}`}>
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Conditional Price Input */}
                <div className={`grid transition-all duration-400 ease-in-out ${!formData.isFree ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                  <div className="overflow-hidden">
                    <div className="pt-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                        Registration Amount <span className="text-red-500">*</span>
                      </label>
                      <div className="relative max-w-xs">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400 sm:text-sm font-bold">₹</span>
                        </div>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-8 pr-4 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/10 sm:text-sm transition-all outline-none"
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
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/40 p-6 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Summary</h3>
                  <dl className="space-y-4 text-sm">
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <dt className="text-gray-500 dark:text-gray-400">Tournament Name</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{formData.name || 'Not specified'}</dd>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <dt className="text-gray-500 dark:text-gray-400">Dates</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">
                        {formData.startDate} - {formData.endDate}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <dt className="text-gray-500 dark:text-gray-400">Events Included</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{formData.events.length} Event(s)</dd>
                    </div>
                    <div className="flex justify-between pb-2">
                      <dt className="text-gray-500 dark:text-gray-400">Entry Fee</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">
                        {formData.isFree ? 'Free Entry' : `₹${formData.price || '0.00'}`}
                      </dd>
                    </div>
                  </dl>
                </div>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  By publishing, your tournament will be live and open for registration.
                </p>
              </div>
            )}
          </div>

          {/* --- FOOTER CONTROLS --- */}
          <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-5 border-t border-gray-200 dark:border-gray-800/80 flex items-center justify-between sm:px-8 mt-auto backdrop-blur-sm">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                currentStep === 0
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              Back
            </button>
            <button
              onClick={
  currentStep === steps.length - 1
    ? () => onComplete(formData)
    : nextStep
}
              className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 rounded-xl shadow-sm shadow-blue-500/30 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-200"
            >
              {currentStep === steps.length - 1 ? 'Publish Tournament' : 'Continue'}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}