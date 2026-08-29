import { useEffect, useState } from "react";

/**
 * Nūr-Datenbank (Client-Seite)
 * -----------------------------
 * Kleine Storage-Engine über localStorage:
 *  - In-Memory-Cache (Lesen ohne I/O)
 *  - Debounced-Flush (Schreiben gebündelt, kein Ruckeln bei schnellen Klicks)
 *  - Schema-Versionierung für spätere Migrationen
 *  - Pub/Sub für React-Updates
 */

const PREFIX = "nur.db.";
const SCHEMA_KEY = PREFIX + "__schema";
export const SCHEMA_VERSION = 1;

type Listener = () => void;

class Database {
  private cache = new Map<string, unknown>();
  private dirty = new Set<string>();
  private flushTimer: number | null = null;
  private listeners = new Set<Listener>();

  constructor() {
    this.migrate();
  }

  private migrate() {
    try {
      const v = Number(localStorage.getItem(SCHEMA_KEY) ?? 0);
      if (v < SCHEMA_VERSION) {
        /* Platz für zukünftige Migrationen */
        localStorage.setItem(SCHEMA_KEY, String(SCHEMA_VERSION));
      }
    } catch {
      /* Speicher nicht verfügbar — rein im Cache weiterarbeiten */
    }
  }

  read<T>(table: string, fallback: T): T {
    const key = PREFIX + table;
    if (this.cache.has(key)) return this.cache.get(key) as T;
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        const val = JSON.parse(raw) as T;
        this.cache.set(key, val);
        return val;
      }
    } catch {
      /* defekter Eintrag — Fallback verwenden */
    }
    this.cache.set(key, fallback);
    return fallback;
  }

  write<T>(table: string, value: T): void {
    const key = PREFIX + table;
    this.cache.set(key, value);
    this.dirty.add(key);
    this.scheduleFlush();
    this.emit();
  }

  /** Tabelle zurücksetzen (für die Statistik-Seite). */
  reset(table: string): void {
    const key = PREFIX + table;
    this.cache.delete(key);
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignorieren */
    }
    this.emit();
  }

  flushNow(): void {
    if (this.flushTimer !== null) {
      window.clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    for (const key of this.dirty) {
      try {
        localStorage.setItem(key, JSON.stringify(this.cache.get(key)));
      } catch {
        /* Quota o. ä. — Daten bleiben im Cache */
      }
    }
    this.dirty.clear();
  }

  private scheduleFlush(): void {
    if (this.flushTimer !== null) return;
    this.flushTimer = window.setTimeout(() => {
      this.flushTimer = null;
      this.flushNow();
    }, 250);
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit(): void {
    for (const fn of this.listeners) fn();
  }
}

export const db = new Database();

/** Sichert ausstehende Schreibvorgänge vor dem Verlassen der Seite. */
if (typeof window !== "undefined") {
  window.addEventListener("pagehide", () => db.flushNow());
}

/** React-Hook: Komponente rendert bei jeder Datenbank-Änderung neu. */
export function useDb(): number {
  const [tick, setTick] = useState(0);
  useEffect(() => db.subscribe(() => setTick((t) => t + 1)), []);
  return tick;
}
