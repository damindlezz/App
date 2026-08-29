import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { db, useDb } from "./db";
import { DECK } from "./bank";
import { SUBJECTS, planItems, type Lesson, type SubjectId } from "../data/content";
import {
  EMPTY_PROGRESS,
  EMPTY_STATS,
  uid,
  type CardMap,
  type CatId,
  type ProgressState,
  type QuizAttempt,
  type Stats,
} from "./models";
import { freshCard, isDue, nextStreak, reviewCard, todayISO } from "./srs";

/**
 * App-Store: zentrale API über der Datenbank.
 * Alle Aktionen laufen hier durch — unveränderliche Updates, damit
 * abgeleitete Werte (dueCount, Fortschritt …) nie veralten (P0-Fix).
 */

export interface SubjectProgress {
  done: number;
  total: number;
  pct: number;
  next: Lesson | null;
  doneIds: Set<string>;
}

export interface StoreApi {
  stats: Stats;
  cards: CardMap;
  history: QuizAttempt[];
  progress: ProgressState;

  /* abgeleitete Werte */
  dueCount: number;
  mastered: number;
  vocabMastered: number;
  vocabTotal: number;
  boxCounts: number[];
  sessionOrder: string[];
  quizToday: number;

  /* Aktionen */
  answerCard(cardId: string, ok: boolean): void;
  recordQuiz(cat: CatId, score: number, total: number): void;
  awardXp(amount: number): void;
  resetProgress(): void;

  /* Fortschritt */
  completeLesson(subject: SubjectId, lessonId: string): void;
  subjectProgress(id: SubjectId): SubjectProgress;
  overallPct(): number;

  /* Tagesplan (datumsbezogen, P1-Fix) */
  plan: boolean[];
  togglePlan(index: number): void;

  /* Ḥifẓ (zentral statt localStorage-Fragment) */
  hifzOf(surah: number): boolean[];
  setHifzWord(surah: number, index: number, revealed: boolean): void;
  hifzFraction(surah: number): number;
}

const Ctx = createContext<StoreApi | null>(null);

/** Montag der ISO-Woche als ISO-Tag. */
function mondayOf(d: Date): string {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - day);
  const m = String(x.getMonth() + 1).padStart(2, "0");
  const dd = String(x.getDate()).padStart(2, "0");
  return `${x.getFullYear()}-${m}-${dd}`;
}

export function AppProvider({ children }: { children: ReactNode }) {
  useDb();

  const stats = db.read<Stats>("stats", EMPTY_STATS);
  const cards = db.read<CardMap>("cards", {});
  const history = db.read<QuizAttempt[]>("quiz_history", []);
  const progress = db.read<ProgressState>("progress", EMPTY_PROGRESS);

  /** Jede Aktivität: Serie, XP, Wochen-XP, Tageszähler. */
  const touch = useCallback((xpGain: number) => {
    const s = db.read<Stats>("stats", EMPTY_STATS);
    const t = todayISO();
    const monday = mondayOf(new Date());
    const weekXp = s.weekStart === monday ? s.weekXp : 0;
    db.write<Stats>("stats", {
      ...s,
      xp: s.xp + xpGain,
      weekXp: weekXp + xpGain,
      weekStart: monday,
      streak: nextStreak(s.streak, s.lastDay),
      best: Math.max(s.best, nextStreak(s.streak, s.lastDay)),
      lastDay: t,
      reviewsToday: s.reviewsDay === t ? s.reviewsToday : 0,
      reviewsDay: t,
    });
  }, []);

  /* ---------------- Karten (P0: unveränderliches Update) ---------------- */
  const answerCard = useCallback(
    (cardId: string, ok: boolean) => {
      const current = db.read<CardMap>("cards", {});
      const next: CardMap = {
        ...current,
        [cardId]: reviewCard(current[cardId], ok),
      };
      db.write<CardMap>("cards", next);

      const t = todayISO();
      const s = db.read<Stats>("stats", EMPTY_STATS);
      db.write<Stats>("stats", {
        ...s,
        reviewsToday: s.reviewsDay === t ? s.reviewsToday + 1 : 1,
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
    db.reset("progress");
  }, []);

  /* ---------------- Fortschritt: Lektionen ---------------- */
  const completeLesson = useCallback((subject: SubjectId, lessonId: string) => {
    const p = db.read<ProgressState>("progress", EMPTY_PROGRESS);
    const list = p.lessons[subject] ?? [];
    if (list.includes(lessonId)) return;
    db.write<ProgressState>("progress", {
      ...p,
      lessons: { ...p.lessons, [subject]: [...list, lessonId] },
      lastSubject: subject,
    });
  }, []);

  /* ---------------- Tagesplan (datumsbezogen) ---------------- */
  const planToday = useMemo<boolean[]>(() => {
    const t = todayISO();
    if (progress.planDay === t && progress.plan.length === planItems.length) {
      return progress.plan;
    }
    return planItems.map((i) => i.done);
  }, [progress.planDay, progress.plan]);

  const togglePlan = useCallback(
    (index: number) => {
      const t = todayISO();
      const p = db.read<ProgressState>("progress", EMPTY_PROGRESS);
      const current =
        p.planDay === t && p.plan.length === planItems.length
          ? p.plan
          : planItems.map((i) => i.done);
      const next = current.map((v, i) => (i === index ? !v : v));
      db.write<ProgressState>("progress", { ...p, planDay: t, plan: next });
    },
    [],
  );

  /* ---------------- Ḥifẓ ---------------- */
  const hifzOf = useCallback(
    (surah: number): boolean[] => {
      const key = String(surah);
      const stored = progress.hifz[key];
      if (stored && stored.length) return stored;
      return Array.from({ length: 4 }, () => false); // al-Iḫlāṣ: 4 Wörter
    },
    [progress.hifz],
  );

  const setHifzWord = useCallback((surah: number, index: number, revealed: boolean) => {
    const p = db.read<ProgressState>("progress", EMPTY_PROGRESS);
    const key = String(surah);
    const cur = p.hifz[key]?.length ? [...p.hifz[key]] : Array.from({ length: 4 }, () => false);
    cur[index] = revealed;
    db.write<ProgressState>("progress", { ...p, hifz: { ...p.hifz, [key]: cur } });
  }, []);

  const hifzFraction = useCallback(
    (surah: number): number => {
      const arr = hifzOf(surah);
      if (!arr.length) return 0;
      return arr.filter(Boolean).length / arr.length;
    },
    [hifzOf],
  );

  /* ---------------- Abgeleitete Werte ---------------- */
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
    let masteredCount = 0;
    let vocabMasteredCount = 0;
    const vocabTotalCount = DECK.length;
    for (const c of DECK) {
      const st = cards[c.id];
      if (!st) continue;
      if (st.box >= 1 && st.box <= 5) boxCounts[st.box - 1]++;
      if (st.box >= 3) {
        masteredCount++;
        vocabMasteredCount++;
      }
    }
    const t = todayISO();
    const quizTodayCount = history.filter((h) => h.date.startsWith(t)).length;
    return {
      dueCount: due.length,
      mastered: masteredCount,
      vocabMastered: vocabMasteredCount,
      vocabTotal: vocabTotalCount,
      boxCounts,
      sessionOrder: [...due, ...fresh, ...seen],
      quizToday: quizTodayCount,
    };
  }, [cards, history]);

  /* ---------------- Fach-Fortschritt (nur echte Daten) ---------------- */
  const subjectProgress = useCallback(
    (id: SubjectId): SubjectProgress => {
      const subj = SUBJECTS.find((s) => s.id === id);
      const doneIds = new Set(progress.lessons[id] ?? []);
      if (!subj) return { done: 0, total: 0, pct: 0, next: null, doneIds };

      // abgeleitete Lektionen aus echtem Verhalten
      if (id === "arabisch" && derived.vocabMastered >= 5) doneIds.add("vokabeln");
      if (id === "quran" && hifzFraction(112) >= 0.999) doneIds.add("hifz-ikhlas");

      const done = subj.lessons.filter((l) => doneIds.has(l.id));
      const next = subj.lessons.find((l) => !doneIds.has(l.id)) ?? null;
      return {
        done: done.length,
        total: subj.lessons.length,
        pct: Math.round((done.length / subj.lessons.length) * 100),
        next,
        doneIds,
      };
    },
    [progress.lessons, derived.vocabMastered, hifzFraction],
  );

  const overallPct = useCallback(() => {
    const all = SUBJECTS.map((s) => subjectProgress(s.id));
    const total = all.reduce((s, x) => s + x.total, 0);
    const done = all.reduce((s, x) => s + x.done, 0);
    return total ? Math.round((done / total) * 100) : 0;
  }, [subjectProgress]);

  const api = useMemo<StoreApi>(
    () => ({
      stats,
      cards,
      history,
      progress,
      ...derived,
      answerCard,
      recordQuiz,
      awardXp,
      resetProgress,
      completeLesson,
      subjectProgress,
      overallPct,
      plan: planToday,
      togglePlan,
      hifzOf,
      setHifzWord,
      hifzFraction,
    }),
    [
      stats, cards, history, progress, derived,
      answerCard, recordQuiz, awardXp, resetProgress,
      completeLesson, subjectProgress, overallPct,
      planToday, togglePlan, hifzOf, setHifzWord, hifzFraction,
    ],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useApp(): StoreApi {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp muss innerhalb von <AppProvider> verwendet werden.");
  return v;
}

export { freshCard };
