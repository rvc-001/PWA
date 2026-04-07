"use client";

import { useEffect } from "react";
import { registerSW, captureInstallPrompt } from "@/lib/pwa";

export default function ClientInit() {
  useEffect(() => {
    const isNative = typeof window !== "undefined" && Boolean((window as { Capacitor?: unknown }).Capacitor);
    if (isNative) return;
    registerSW();
    captureInstallPrompt();
  }, []);
  return null;
}

