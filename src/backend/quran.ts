import { useEffect, useState } from "react";
import { BUNDLED } from "../data/quranTexts";
import { SURAHS, surahMeta } from "../data/quranMeta";
import { db } from "./db";

/**
 * Quran-Datendienst: Offline-Datenpaket zuerst, dann alquran.cloud-API.
 * Remote-Sūren werden im localStorage zwischengespeichert.
 */

export interface AyahData {
  ar: string;
  de: string | null;
  /** In-Sūra-Nummer (1-basiert) */
  inSurah: number;
  /** globale Ǧuzʾ-übergreifende Nummer (für Audio) */
  global: number;
}

export interface SurahFull {
  n: number;
  ayahs: AyahData[];
  tafsir: string | null;
  source: "bundled" | "remote" | "cache";
}

/* ---------- Präfixsummen für globale Āya-Nummern ---------- */
const PREFIX: number[] = (() => {
  const p: number[] = [0];
  SURAHS.forEach((s) => p.push(p[p.length - 1] + s.ayahs));
  return p;
})();

export const TOTAL_AYAHS = PREFIX[PREFIX.length - 1]; // 6236

export const globalAyah = (surah: number, inSurah: number): number =>
  PREFIX[surah - 1] + inSurah;

/* ---------- Audio (alquran.cloud CDN, Rezitation al-ʿAfāsī) ---------- */
export const ayahAudioUrl = (global: number): string =>
  `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${global}.mp3`;

/* ---------- Remote-Fetch mit Fallback-Kette ---------- */
const API_BASE = "https://api.alquran.cloud/v1";
const DE_EDITIONS = ["de.aburida", "de.abduladel"];
const CACHE_KEY = "nur-remote-surahs-v1";

const readCache = (): Record<number, { ar: string[]; de: (string | null)[] }> =>
  db.read(CACHE_KEY, {} as Record<number, { ar: string[]; de: (string | null)[] }>);

const withTimeout = (url: string, ms = 8000): Promise<Response> => {
  const ctrl = new AbortController();
  const t = window.setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { signal: ctrl.signal }).finally(() => window.clearTimeout(t));
};

async function fetchRemote(n: number): Promise<SurahFull> {
  // 1) Arabisch + erste verfügbare deutsche Edition
  for (const de of DE_EDITIONS) {
    try {
      const res = await withTimeout(`${API_BASE}/surah/${n}/editions/quran-uthmani,${de}`);
      if (!res.ok) continue;
      const json = await res.json();
      const ar = json?.data?.[0];
      const dt = json?.data?.[1];
      if (ar?.ayahs?.length) {
        const ayahs: AyahData[] = ar.ayahs.map((a: { text: string; numberInSurah: number; number: number }, i: number) => ({
          ar: a.text,
          de: dt?.ayahs?.[i]?.text ?? null,
          inSurah: a.numberInSurah,
          global: a.number ?? globalAyah(n, a.numberInSurah),
        }));
        return { n, ayahs, tafsir: null, source: "remote" };
      }
    } catch {
      /* nächste Edition bzw. Fallback */
    }
  }
  // 2) Nur Arabisch
  const res = await withTimeout(`${API_BASE}/surah/${n}`);
  if (!res.ok) throw new Error("API nicht erreichbar");
  const json = await res.json();
  const ar = json?.data;
  if (!ar?.ayahs?.length) throw new Error("Unerwartete Antwort");
  const ayahs: AyahData[] = ar.ayahs.map((a: { text: string; numberInSurah: number; number: number }) => ({
    ar: a.text,
    de: null,
    inSurah: a.numberInSurah,
    global: a.number ?? globalAyah(n, a.numberInSurah),
  }));
  return { n, ayahs, tafsir: null, source: "remote" };
}

export async function getSurah(n: number): Promise<SurahFull> {
  const meta = surahMeta(n);
  if (!meta) throw new Error("Unbekannte Sūra");

  const bundled = BUNDLED[n];
  if (bundled) {
    return {
      n,
      ayahs: bundled.ayahs.map((a, i) => ({ ar: a.ar, de: a.de, inSurah: i + 1, global: globalAyah(n, i + 1) })),
      tafsir: bundled.tafsir,
      source: "bundled",
    };
  }

  const cache = readCache();
  if (cache[n]?.ar?.length) {
    return {
      n,
      ayahs: cache[n].ar.map((ar, i) => ({ ar, de: cache[n].de?.[i] ?? null, inSurah: i + 1, global: globalAyah(n, i + 1) })),
      tafsir: null,
      source: "cache",
    };
  }

  const full = await fetchRemote(n);
  // in den Cache schreiben (klein halten: max. 30 Sūren)
  try {
    const c = readCache();
    c[n] = { ar: full.ayahs.map((a) => a.ar), de: full.ayahs.map((a) => a.de) };
    const keys = Object.keys(c);
    if (keys.length > 30) delete c[Number(keys[0])];
    db.write(CACHE_KEY, c);
  } catch {
    /* Cache-Fehler sind unkritisch */
  }
  return full;
}

/* ---------- Lesezeichen ---------- */
export interface Bookmark {
  id: string;
  surah: number;
  ayah: number;
  ar: string;
  de: string | null;
  at: string;
}

export const readBookmarks = (): Bookmark[] => db.read<Bookmark[]>("bookmarks", []);

export function toggleBookmark(b: Omit<Bookmark, "id" | "at">): Bookmark[] {
  const list = readBookmarks();
  const key = `${b.surah}:${b.ayah}`;
  const exists = list.some((x) => `${x.surah}:${x.ayah}` === key);
  const next = exists
    ? list.filter((x) => `${x.surah}:${x.ayah}` !== key)
    : [
        { ...b, id: key, at: new Date().toISOString() },
        ...list,
      ].slice(0, 40);
  db.write<Bookmark[]>("bookmarks", next);
  return next;
}

export const isBookmarked = (surah: number, ayah: number, list: Bookmark[]): boolean =>
  list.some((x) => x.surah === surah && x.ayah === ayah);

/** UI-Hook: Lesezeichen live aus dem Store lesen. */
export function useBookmarks(): Bookmark[] {
  const [list, setList] = useState<Bookmark[]>(readBookmarks);
  useEffect(() => db.subscribe(() => setList(readBookmarks())), []);
  return list;
}
