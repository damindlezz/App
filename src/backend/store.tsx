import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { db, useDb } from "./db";
import { DECK } from "./bank";
import {
  EMPTY_STATS,
  uid,
  type CardMap,
  type CatId,
  type QuizAttempt,
  type Stats,
} from "./models";
import { freshCard, isDue, nextStreak, reviewCard, todayISO } from "./srs";

/**
 * App-Store: zentrale API über der Datenbank.
 * Alle Aktionen (Wiederholen, Quiz verbuchen, XP) laufen hier durch —
 * die UI-Komponenten müssen keine Tabelle kennen.
 */

export interface StoreApi {
  stats: Stats;
  cards: CardMap;
  history: QuizAttempt[];
  /** Karten, die heute zur Wiederholung anstehen */
  dueCount: number;
  /** Karten in Fach 3+ (gemeistert) */
  mastered: number;
  /** Leitner-Verteilung über die 5 Fächer */
  boxCounts: number[];
  /** Fällige Karten zuerst, dann ungesehene, sortiert */
  sessionOrder: string[];

  answerCard(cardId: string, ok: boolean): void;
  recordQuiz(cat: CatId, score: number, total: number): void;
  awardXp(amount: number): void;
  resetProgress(): void;
}

const Ctx = createContext<StoreApi | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  useDb();

  const stats = db.read<Stats>("stats", EMPTY_STATS);
  const cards = db.read<CardMap>("cards", {});
  const history = db.read<QuizAttempt[]>("quiz_history", []);

  /** Jede Aktivität berührt die Serie & XP. */
  const touch = useCallback((xpGain: number) => {
    const s = db.read<Stats>("stats", EMPTY_STATS);
    const t = todayISO();
    const streak = nextStreak(s.streak, s.lastDay);
    db.write<Stats>("stats", {
      ...s,
      xp: s.xp + xpGain,
      streak,
      best: Math.max(s.best, streak),
      lastDay: t,
      reviewsToday: s.reviewsDay === t ? s.reviewsToday : 0,
      reviewsDay: t,
    });
  }, []);

  const answerCard = useCallback(
    (cardId: string, ok: boolean) => {
      const map = db.read<CardMap>("cards", {});
      map[cardId] = reviewCard(map[cardId], ok);
      db.write<CardMap>("cards", map);
      const t = todayISO();
      db.write<Stats>("stats", {
        ...db.read<Stats>("stats", EMPTY_STATS),
        reviewsToday:
          db.read<Stats>("stats", EMPTY_STATS).reviewsDay === t
            ? db.read<Stats>("stats", EMPTY_STATS).reviewsToday + 1
            : 1,
        reviewsDay: t,
      });
      touch(ok ? 2 : 1);
    },
    [touch],
  );

  const recordQuiz = useCallback(
    (cat: CatId, score: number, total: number) => {
      const h = db.read<QuizAttempt[]>("quiz_history", []);
      db.write<QuizAttempt[]>("quiz_history", [
        { id: uid(), cat, score, total, date: new Date().toISOString() },
        ...h,
      ].slice(0, 60));
      touch(score * 5 + (score === total ? 10 : 0));
    },
    [touch],
  );

  const awardXp = useCallback((amount: number) => touch(amount), [touch]);

  const resetProgress = useCallback(() => {
    db.reset("stats");
    db.reset("cards");
    db.reset("quiz_history");
  }, []);

  const derived = useMemo(() => {
    const due: string[] = [];
    const fresh: string[] = [];
    const seen: string[] = [];
    for (const c of DECK) {
      const st = cards[c.id];
      if (!st) fresh.push(c.id);
      else if (isDue(st)) due.push(c.id);
      else seen.push(c.id);
    }
    const boxCounts = [0, 0, 0, 0, 0];
    for (const id of Object.keys(cards)) {
      const b = cards[id].box;
      if (b >= 1 && b <= 5) boxCounts[b - 1]++;
    }
    return {
      dueCount: due.length,
      mastered: Object.values(cards).filter((c) => c.box >= 3).length,
      boxCounts,
      sessionOrder: [...due, ...fresh, ...seen],
    };
  }, [cards]);

  const api = useMemo<StoreApi>(
    () => ({
      stats,
      cards,
      history,
      ...derived,
      answerCard,
      recordQuiz,
      awardXp,
      resetProgress,
    }),
    [stats, cards, history, derived, answerCard, recordQuiz, awardXp, resetProgress],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useApp(): StoreApi {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp muss innerhalb von <AppProvider> verwendet werden.");
  return v;
}

/** Hilfsfunktion: neue Karte für die UI */
export { freshCard };
