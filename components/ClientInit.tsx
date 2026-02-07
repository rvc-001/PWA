"use client";

import { useEffect } from "react";
import { registerSW, captureInstallPrompt } from "@/lib/pwa";

export default function ClientInit() {
  useEffect(() => {
    registerSW();
    captureInstallPrompt();
  }, []);
  return null;
}
