"use client";

import React from "react";
import { CalendarIcon, PlusIcon } from "@/components/Icons";
import type { Event } from "@/types/models";

interface RegistrationEventCardProps {
  event: Event;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  children?: React.ReactNode;
}

export default function RegistrationEventCard({
  event,
  isSelected,
  onSelect,
  onDeselect,
  children,
}: RegistrationEventCardProps) {
  const toggle = () => (isSelected ? onDeselect() : onSelect());

  return (
    <article className="rounded-2xl border border-[#d8d8d8] bg-[#efefef] p-3 text-[#252525] dark:border-[#313131] dark:bg-[#191919] dark:text-[#f1f1f1]">
      <h3 className="text-lg font-semibold leading-6">{event.name}</h3>

      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-[#505050] dark:text-[#c2c2c2]">
        <p className="flex items-center gap-1.5">
          <CalendarIcon size={12} className="text-[#ff7a1a]" />
          Start Date: {event.startDate}
        </p>
        <p className="flex items-center gap-1.5">
          <CalendarIcon size={12} className="text-[#ff7a1a]" />
          Reg. Closes: {event.regDueDate ?? "-"}
        </p>
      </div>

      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-3xl font-bold leading-8 text-[#ff7a1a]">
            {event.entryFee === 0 ? "Free Entry" : `? ${event.entryFee ?? 0}`}
          </p>
          <p className="text-sm text-[#747474] dark:text-[#b6b6b6]">Payment: {event.paymentOption ?? "Venue"}</p>
        </div>

        <button
          type="button"
          onClick={toggle}
          className={`inline-flex h-9 min-w-[102px] items-center justify-center gap-1 rounded-full border px-4 text-base font-semibold ${
            isSelected
              ? "border-[#ff7a1a] bg-[#ff7a1a] text-white"
              : "border-[#ff7a1a] text-[#ff7a1a]"
          }`}
        >
          {isSelected ? "Added" : <><PlusIcon size={12} /> Add</>}
        </button>
      </div>

      {children ? <div className="mt-3">{children}</div> : null}
    </article>
  );
}

