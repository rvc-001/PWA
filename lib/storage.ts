/**
 * Client-first persistence: IndexedDB with localStorage fallback.
 * Used for sessions, score logs, learning sessions, and offline queue.
 */

const DB_NAME = "forehand-pwa";
const DB_VERSION = 1;
const STORES = ["sessions", "scoreLogs", "learningSessions", "offlineQueue", "drafts"] as const;

let db: IDBDatabase | null = null;

function openDB(): Promise<IDBDatabase> {
  if (db) return Promise.resolve(db);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => {
      db = req.result;
      resolve(db);
    };
    req.onupgradeneeded = (e) => {
      const database = (e.target as IDBOpenDBRequest).result;
      STORES.forEach((name) => {
        if (!database.objectStoreNames.contains(name)) {
          database.createObjectStore(name, { keyPath: "id" });
        }
      });
    };
  });
}

function getStore(storeName: (typeof STORES)[number], mode: IDBTransactionMode = "readwrite") {
  return openDB().then((database) => database.transaction(storeName, mode).objectStore(storeName));
}

// --- Learning session ---

export function getSession(topic: string): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`learning:${topic}`);
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export function saveSession(topic: string, session: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`learning:${topic}`, JSON.stringify(session));
  } catch (e) {
    console.warn("saveSession failed", e);
  }
}

// --- Generic key-value (for drafts, app state) ---

const LEGACY_PREFIX = "forehand:";

export function getItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LEGACY_PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LEGACY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn("setItem failed", e);
  }
}

export function removeItem(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LEGACY_PREFIX + key);
}

// --- Score log & offline queue (IndexedDB for larger data) ---

export function appendScoreLog(matchId: string, event: Record<string, unknown>): Promise<void> {
  return getScoreLog(matchId)
    .then((events) => {
      events.push(event);
      return getStore("scoreLogs").then((store) => {
        return new Promise<void>((resolve, reject) => {
          const req = store.put({ id: matchId, events, updatedAt: Date.now() });
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
      });
    })
    .catch(() => {
      const key = `scoreLog:${matchId}`;
      const existing = getItem<{ events: unknown[] }>(key);
      const events = existing?.events ?? [];
      events.push(event);
      setItem(key, { events, updatedAt: Date.now() });
    });
}

export function getScoreLog(matchId: string): Promise<unknown[]> {
  return getStore("scoreLogs", "readonly")
    .then((store) => {
      return new Promise<unknown[]>((resolve) => {
        const req = store.get(matchId);
        req.onsuccess = () => {
          const row = req.result as { events?: unknown[] } | undefined;
          resolve(row?.events ?? []);
        };
        req.onerror = () => resolve([]);
      });
    })
    .catch(() => {
      const row = getItem<{ events: unknown[] }>(`scoreLog:${matchId}`);
      return Promise.resolve(row?.events ?? []);
    });
}

export function getOfflineQueue(): Promise<unknown[]> {
  return getStore("offlineQueue", "readonly")
    .then((store) => {
      return new Promise<unknown[]>((resolve) => {
        const req = store.getAll();
        req.onsuccess = () => resolve((req.result ?? []) as unknown[]);
        req.onerror = () => resolve([]);
      });
    })
    .catch(() => Promise.resolve(getItem<unknown[]>("offlineQueue") ?? []));
}

export function pushOfflineQueue(event: unknown): Promise<void> {
  const id = `q-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return getStore("offlineQueue")
    .then((store) => {
      return new Promise<void>((resolve, reject) => {
        const req = store.put({ id, ...(event as object) });
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    })
    .catch(() => {
      const queue = getItem<unknown[]>("offlineQueue") ?? [];
      queue.push(event);
      setItem("offlineQueue", queue);
      return Promise.resolve();
    });
}

export function clearOfflineQueue(ids: string[]): Promise<void> {
  return getStore("offlineQueue")
    .then((store) => {
      ids.forEach((id) => store.delete(id));
      return new Promise<void>((resolve) => {
        const trans = store.transaction;
        trans.oncomplete = () => resolve();
      });
    })
    .catch(() => {
      setItem("offlineQueue", []);
      return Promise.resolve();
    });
}
