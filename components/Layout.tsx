"use client";

import React from "react";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

export default function Layout({
  children,
  showBottomNav = true,
  title,
}: {
  children: React.ReactNode;
  showBottomNav?: boolean;
  title?: string;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex flex-col">
      <TopNav title={title} />
      <main className="flex-1 overflow-auto pb-safe">{children}</main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
