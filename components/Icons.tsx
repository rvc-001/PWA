"use client";

import React from "react";

export type IconProps = {
  size?: number;
  className?: string;
};

function SvgIcon({
  size = 20,
  className,
  children,
  viewBox = "0 0 24 24",
}: IconProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </SvgIcon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6 9l6 6 6-6" />
    </SvgIcon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9 18l6-6-6-6" />
    </SvgIcon>
  );
}

export function EllipsisIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </SvgIcon>
  );
}

export function XIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </SvgIcon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </SvgIcon>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
      <path d="M16 6l-4-4-4 4" />
      <path d="M12 2v13" />
    </SvgIcon>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M14.5 6.5h-5L8 8H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-3l-1.5-1.5Z" />
      <circle cx="12" cy="14" r="3" />
    </SvgIcon>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 5a2 2 0 1 1 4 0" />
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </SvgIcon>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </SvgIcon>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M7 21v-2a4 4 0 0 1 8 0v2" />
      <circle cx="11" cy="7" r="3" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a3 3 0 0 1 0 5.74" />
    </SvgIcon>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </SvgIcon>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.06.07a2.2 2.2 0 0 1-1.56 3.75 2.2 2.2 0 0 1-1.56-.65l-.07-.06a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.66V22a2.2 2.2 0 0 1-4.4 0v-.1a1.8 1.8 0 0 0-1.1-1.66 1.8 1.8 0 0 0-1.98.36l-.07.06a2.2 2.2 0 0 1-3.12 0 2.2 2.2 0 0 1 0-3.12l.06-.07A1.8 1.8 0 0 0 4.6 15a1.8 1.8 0 0 0-1.66-1.1H2.8a2.2 2.2 0 0 1 0-4.4h.1A1.8 1.8 0 0 0 4.6 8a1.8 1.8 0 0 0-.36-1.98l-.06-.07a2.2 2.2 0 0 1 0-3.12 2.2 2.2 0 0 1 3.12 0l.07.06A1.8 1.8 0 0 0 9.35 2.5 1.8 1.8 0 0 0 10.45.84V.8a2.2 2.2 0 0 1 4.4 0v.1a1.8 1.8 0 0 0 1.1 1.66 1.8 1.8 0 0 0 1.98-.36l.07-.06a2.2 2.2 0 0 1 3.12 0 2.2 2.2 0 0 1 0 3.12l-.06.07A1.8 1.8 0 0 0 19.4 9a1.8 1.8 0 0 0 1.66 1.1h.1a2.2 2.2 0 0 1 0 4.4h-.1A1.8 1.8 0 0 0 19.4 15Z" />
    </SvgIcon>
  );
}

export function HelpCircleIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4" />
      <path d="M12 17h.01" />
    </SvgIcon>
  );
}
