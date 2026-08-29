import type { CardState } from "./models";

/**
 * Leitner-System (5 Fächer) mit Tag-Intervallen.
 * Richtig  → ein Fach weiter (max. 5)
 * Falsch   → zurück ins Fach 1 (sofort wieder fällig)
 */

export const BOX_COUNT = 5;
/** Wartezeit in Tagen pro Fach (Index 0 = Fach 1) */
export const INTERVALS = [0, 1, 2, 4, 7];

export const todayISO = (): string => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

const addDays = (iso: string, n: number): string => {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + n);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

export const isDue = (c: CardState | undefined): boolean =>
  !c || c.due <= todayISO();

/** Neue Karte (noch nie gesehen) — Fach 1, sofort fällig. */
export const freshCard = (): CardState => ({
  box: 1,
  due: todayISO(),
  reps: 0,
  lapses: 0,
  last: null,
});

/** Eine Wiederholung verbuchen und den neuen Zustand berechnen. */
export function reviewCard(
  prev: CardState | undefined,
  ok: boolean,
): CardState {
  const base = prev ?? freshCard();
  const t = todayISO();
  if (ok) {
    const box = Math.min(BOX_COUNT, base.box + 1);
    return {
      ...base,
      box,
      due: addDays(t, INTERVALS[box - 1]),
      reps: base.reps + 1,
      last: t,
    };
  }
  return {
    ...base,
    box: 1,
    due: t,
    reps: base.reps + 1,
    lapses: base.lapses + 1,
    last: t,
  };
}

/** Karte gilt als „gemeistert“ ab Fach 3. */
export const isMastered = (c: CardState | undefined): boolean =>
  !!c && c.box >= 3;

/** Streak-Logik: heute schon aktiv? gestern aktiv → +1, sonst neu starten. */
export function nextStreak(streak: number, lastDay: string | null): number {
  const t = todayISO();
  if (lastDay === t) return streak;
  if (lastDay === addDays(t, -1)) return streak + 1;
  return 1;
}
