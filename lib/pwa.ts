/**
 * PWA: service worker registration and install prompt.
 * Use IndexedDB/localStorage for offline scoring queue; sync on reconnect.
 */

export function registerSW(): void {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => {
      console.log("[PWA] Service worker registered", reg.scope);
    })
    .catch((err) => console.error("[PWA] SW registration failed", err));
}

let installPrompt: BeforeInstallPromptEvent | null = null;

export function captureInstallPrompt(): void {
  if (typeof window === "undefined") return;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    installPrompt = e as BeforeInstallPromptEvent;
  });
}

export function showInstallPrompt(): Promise<{ outcome: string } | void> {
  if (!installPrompt) return Promise.resolve();
  return installPrompt.prompt().then(() => installPrompt?.userChoice ?? undefined);
}

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

// Reconnect: trigger sync of offline queue (call from app when online)
export function onReconnect(callback: () => void): void {
  if (typeof window === "undefined") return;
  window.addEventListener("online", callback);
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
