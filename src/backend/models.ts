/** Gemeinsame Typen des Nūr-Backends. */

/** Eine Lernkarte im Leitner-System. */
export interface CardState {
  /** Fach 1–5 (5 = sicher im Langzeitgedächtnis) */
  box: number;
  /** Fälligkeitsdatum als ISO-Tag (YYYY-MM-DD) */
  due: string;
  /** Anzahl Wiederholungen insgesamt */
  reps: number;
  /** Anzahl Rückschritte ins erste Fach */
  lapses: number;
  /** Letzte Bearbeitung als ISO-Tag */
  last: string | null;
}

export type CardMap = Record<string, CardState>;

/** Kategorie für Quiz & Übungen */
export type CatId = "tajweed" | "fiqh" | "hadith" | "grammar";

/** Eine Quiz-Frage aus der Fragenbank. */
export interface Question {
  id: string;
  cat: CatId;
  prompt: string;
  /** Großes arabisches Beispiel (optional) */
  ar?: string;
  opts: string[];
  /** Index der richtigen Antwort */
  a: number;
  /** Erklärung nach der Antwort */
  why: string;
}

/** Ein gespeicherter Quiz-Durchlauf. */
export interface QuizAttempt {
  id: string;
  cat: CatId;
  score: number;
  total: number;
  date: string; // ISO-Zeitstempel
}

/** Globale Nutzerstatistik. */
export interface Stats {
  xp: number;
  streak: number;
  best: number;
  /** Letzter aktiver Tag (ISO-Tag) */
  lastDay: string | null;
  /** Wiederholungen heute */
  reviewsToday: number;
  reviewsDay: string;
  /** XP der laufenden Woche */
  weekXp: number;
  /** Montag der laufenden Woche (ISO-Tag) */
  weekStart: string;
}

export const EMPTY_STATS: Stats = {
  xp: 0,
  streak: 0,
  best: 0,
  lastDay: null,
  reviewsToday: 0,
  reviewsDay: "",
  weekXp: 0,
  weekStart: "",
};

/**
 * Zentraler Lernfortschritt — die einzige Quelle für „Wo stehe ich?“.
 * Ersetzt verstreute localStorage-Schlüssel (Tagesplan, Ḥifẓ, Lektionen …).
 */
export interface ProgressState {
  /** Abgeschlossene Lektionen je Fach: Fach-Id → Lektions-Ids */
  lessons: Record<string, string[]>;
  /** Tagesplan: Datum + Erledigt-Flags */
  planDay: string;
  plan: boolean[];
  /** Ḥifẓ-Status je Sūra: aufgedeckte Wörter */
  hifz: Record<string, boolean[]>;
  /** Zuletzt aktiv besuchtes Fach (für „Weiterlernen“) */
  lastSubject: string | null;
}

export const EMPTY_PROGRESS: ProgressState = {
  lessons: {},
  planDay: "",
  plan: [],
  hifz: {},
  lastSubject: null,
};

/** Definition einer Lernkarte (Inhalt, kein Zustand). */
export interface CardDef {
  id: string;
  front: string; // Arabisch
  back: string; // Deutsch
  hint: string; // Transliteration + Kontext
}

/** Eine Übungsaufgabe (Konjugation, Wurzelzuordnung …). */
export interface DrillItem {
  id: string;
  prompt: string;
  ar: string;
  opts: string[];
  a: number;
  info: string;
}

export const uid = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
