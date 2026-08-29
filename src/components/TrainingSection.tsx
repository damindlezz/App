import { useMemo, useState } from "react";
import { useApp } from "../backend/store";
import { CATS, DECK, conjugationDrill, questionsOf, rootDrill } from "../backend/bank";
import type { CatId, DrillItem } from "../backend/models";
import { INTERVALS } from "../backend/srs";
import { Glyph, Reveal, SectionHead, toArabicDigits } from "./ui";
import type { GlyphName } from "./ui";

type Mode = "cards" | "quiz" | "drill" | "stats";

const MODES: { id: Mode; label: string; icon: GlyphName }[] = [
  { id: "cards", label: "Karteikarten", icon: "book" },
  { id: "quiz", label: "Quiz-Arena", icon: "compass" },
  { id: "drill", label: "Übungen", icon: "qalam" },
];

export default function TrainingSection({
  initialMode = "cards",
  initialCat,
}: {
  initialMode?: Mode;
  initialCat?: string;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const app = useApp();

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        kicker="Training & Wiederholung"
        title="Wissen, das bleibt"
        ar="المُرَاجَعَة"
        desc="Karteikarten im Leitner-System, Quiz-Duelle mit dir selbst und gezielte Übungen — alles zählt in deine Serie und dein XP-Konto."
      />

      {/* Kopfzeile mit Live-Werten */}
      <Reveal>
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "flame" as GlyphName, label: "Lernserie", value: `${app.stats.streak} ${app.stats.streak === 1 ? "Tag" : "Tage"}`, sub: `Rekord: ${app.stats.best}` },
            { icon: "star8" as GlyphName, label: "Erfahrung", value: `${app.stats.xp} XP`, sub: "+2 pro Karte · +5 pro Quiz-Treffer" },
            { icon: "book" as GlyphName, label: "Fällig heute", value: `${app.dueCount}`, sub: `${app.mastered} Karten gemeistert` },
            { icon: "check" as GlyphName, label: "Wiederholungen heute", value: `${app.stats.reviewsToday}`, sub: `Quiz-Runden: ${app.history.length}` },
          ].map((s) => (
            <div key={s.label} className="card-hover flex items-center gap-4 rounded-xl border border-gold-500/15 bg-pine-900/70 px-5 py-4">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-gold-500/12 text-gold-400">
                <Glyph name={s.icon} className="h-5.5 w-5.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-faint">{s.label}</span>
                <span className="block font-display text-[22px] font-semibold leading-tight text-ink">{s.value}</span>
                <span className="block truncate text-[11px] text-ink-dim">{s.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Modus-Umschalter */}
      <Reveal delay={100}>
        <div className="mb-10 inline-flex flex-wrap gap-1 rounded-full border border-pine-700 bg-pine-900/70 p-1.5">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`btn-press flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold transition-all ${
                mode === m.id ? "bg-gold-500 text-pine-950" : "text-ink-dim hover:text-ink"
              }`}
            >
              <Glyph name={m.icon} className="h-4 w-4" />
              {m.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div key={mode} className="view-enter pb-20">
        {mode === "cards" && <CardTrainer />}
        {mode === "quiz" && <QuizArena initialCat={initialCat} />}
        {mode === "drill" && <DrillLab />}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Karteikarten · Leitner-System                                       */
/* ================================================================== */

function CardTrainer() {
  const app = useApp();
  const [queue, setQueue] = useState<string[]>(() => app.sessionOrder);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [sessionStats, setSessionStats] = useState({ ok: 0, again: 0 });

  const cardId = queue[idx];
  const def = DECK.find((d) => d.id === cardId);
  const state = cardId ? app.cards[cardId] : undefined;

  const answer = (ok: boolean) => {
    if (!cardId) return;
    app.answerCard(cardId, ok);
    setSessionStats((s) => (ok ? { ...s, ok: s.ok + 1 } : { ...s, again: s.again + 1 }));
    setFlipped(false);
    /* P0-Fix: bei „Nochmal“ wächst die Warteschlange —
       die Längenprüfung muss die aktualisierte Queue verwenden. */
    const q = ok ? queue : [...queue, cardId];
    if (!ok) setQueue(q);
    const next = idx + 1;
    if (next >= q.length) setSessionDone(true);
    else setIdx(next);
  };

  const restart = () => {
    setQueue(app.sessionOrder);
    setIdx(0);
    setFlipped(false);
    setSessionDone(false);
    setSessionStats({ ok: 0, again: 0 });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Fächer-Übersicht */}
      <Reveal className="lg:col-span-4">
        <div className="h-full rounded-xl border border-gold-500/15 bg-pine-900/70 p-6">
          <p className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-500">Leitner-System</p>
          <h3 className="font-display text-xl font-semibold text-ink">Die fünf Fächer</h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-ink-dim">
            Richtig → ein Fach weiter. Falsch → zurück ins erste Fach. So wandert der Wortschatz ins Langzeitgedächtnis.
          </p>
          <ul className="mt-5 space-y-2.5">
            {app.boxCounts.map((count, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-14 flex-none font-display text-sm font-bold text-ink-dim">Fach {i + 1}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-pine-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700"
                    style={{ width: `${Math.min(100, (count / Math.max(1, DECK.length)) * 100)}%` }}
                  />
                </div>
                <span className="w-8 flex-none text-right font-display text-sm font-semibold text-gold-400">{count}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-1.5 border-t border-pine-700 pt-4">
            {INTERVALS.map((d, i) => (
              <p key={i} className="flex items-center justify-between text-[12px] text-ink-dim">
                <span className="text-ink-faint">Fach {i + 1}</span>
                <span>{d === 0 ? "sofort wiederholbar" : `nach ${d} ${d === 1 ? "Tag" : "Tagen"}`}</span>
              </p>
            ))}
          </div>
          {app.stats.reviewsToday > 0 && (
            <p className="mt-4 flex items-center gap-2 rounded-lg border border-teal-500/25 bg-teal-500/[0.07] px-3.5 py-2.5 text-[12.5px] font-semibold text-teal-400">
              <Glyph name="check" className="h-4 w-4" />
              Heute schon {app.stats.reviewsToday}× wiederholt
            </p>
          )}
        </div>
      </Reveal>

      {/* Karten-Bereich */}
      <Reveal delay={120} className="lg:col-span-8">
        <div className="rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-8">
          {sessionDone || !def ? (
            <div className="flex flex-col items-center px-4 py-14 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-teal-500/15 text-teal-400">
                <Glyph name="check" className="h-8 w-8" />
              </span>
              <h3 className="mt-5 font-display text-3xl font-semibold text-ink">Sitzung abgeschlossen</h3>
              <p className="mt-2 max-w-md text-[14px] leading-relaxed text-ink-dim">
                {sessionStats.ok} richtig · {sessionStats.again} wiederholt
                {app.dueCount > 0 ? ` — ${app.dueCount} Karten sind neu fällig geworden.` : " — alle Karten liegen nun in ihren Fächern."}
              </p>
              <p dir="rtl" className="mt-3 font-kufi text-2xl text-gold-500/85">بَارَكَ اللهُ فِيك</p>
              <button
                onClick={restart}
                className="btn-press mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-pine-950 hover:bg-gold-400"
              >
                <Glyph name="reset" className="h-4 w-4" /> Neue Sitzung
              </button>
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                  Karte {idx + 1} / {queue.length}
                </p>
                <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[11px] font-bold text-gold-300">
                  Fach {state?.box ?? 1}
                </span>
              </div>

              <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-pine-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500"
                  style={{ width: `${(idx / queue.length) * 100}%` }}
                />
              </div>

              <div className="[perspective:1400px]">
                <button
                  onClick={() => setFlipped((f) => !f)}
                  className={`flashcard-inner relative block h-72 w-full cursor-pointer text-left ${flipped ? "flipped" : ""}`}
                  aria-label="Karte umdrehen"
                >
                  <div className="backface absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-gold-500/25 bg-gradient-to-b from-pine-800 to-pine-950/80 p-6">
                    <p dir="rtl" className="font-quran text-[3.2rem] leading-tight text-gold-300 md:text-6xl">{def.front}</p>
                    <p className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">
                      <Glyph name="reset" className="h-3.5 w-3.5" /> Zum Umdrehen tippen
                    </p>
                  </div>
                  <div
                    className="backface absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-teal-500/30 bg-gradient-to-b from-pine-800 to-pine-950/80 p-6 text-center"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <p className="font-display text-3xl font-semibold text-ink">{def.back}</p>
                    <p dir="rtl" className="mt-1.5 font-kufi text-xl text-teal-400">{def.front}</p>
                    <p className="mt-4 max-w-md border-t border-pine-700 pt-3.5 text-[13px] leading-relaxed text-ink-dim">{def.hint}</p>
                  </div>
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => answer(false)}
                  className="btn-press inline-flex items-center gap-2 rounded-full border border-copper-500/45 px-6 py-3 text-sm font-bold text-copper-400 hover:bg-copper-500/10"
                >
                  <Glyph name="reset" className="h-4 w-4" /> Nochmal — zurück ins Fach 1
                </button>
                <button
                  onClick={() => answer(true)}
                  className="btn-press inline-flex items-center gap-2 rounded-full border border-teal-500/45 bg-teal-500/10 px-6 py-3 text-sm font-bold text-teal-400 hover:bg-teal-500/20"
                >
                  <Glyph name="check" className="h-4 w-4" /> Gewusst — ein Fach weiter
                </button>
              </div>
            </>
          )}
        </div>
      </Reveal>
    </div>
  );
}

/* ================================================================== */
/* Quiz-Arena                                                          */
/* ================================================================== */

function QuizArena({ initialCat }: { initialCat?: string }) {
  const app = useApp();
  const [cat, setCat] = useState<CatId | null>(() =>
    initialCat && CATS.some((c) => c.id === initialCat) ? (initialCat as CatId) : null,
  );
  const [runId, setRunId] = useState(0);

  if (!cat) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {CATS.map((c, i) => {
          const attempts = app.history.filter((h) => h.cat === c.id);
          const best = attempts.reduce((m, a) => Math.max(m, Math.round((a.score / a.total) * 100)), 0);
          return (
            <Reveal key={c.id} delay={i * 80}>
              <button
                onClick={() => {
                  setCat(c.id);
                  setRunId((r) => r + 1);
                }}
                className="card-hover group flex h-full w-full items-start gap-5 rounded-xl border border-pine-700 bg-pine-900/70 p-6 text-left"
              >
                <span
                  className="grid h-13 w-13 flex-none place-items-center rounded-xl p-3 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${c.color}1a`, color: c.color }}
                >
                  <Glyph name={c.icon as GlyphName} className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-xl font-semibold text-ink">{c.name}</span>
                    <span dir="rtl" className="font-kufi text-2xl" style={{ color: `${c.color}b3` }}>{c.ar}</span>
                  </span>
                  <span className="mt-1 block text-[13px] text-ink-dim">
                    {questionsOf(c.id).length} Fragen · {attempts.length} {attempts.length === 1 ? "Runde" : "Runden"} gespielt
                  </span>
                  <span className="mt-2 inline-flex items-center gap-2 text-[12px] font-bold" style={{ color: c.color }}>
                    <Glyph name="star8" className="h-3.5 w-3.5" />
                    Bestleistung: {attempts.length ? `${best} %` : "noch offen"}
                  </span>
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>
    );
  }

  return <QuizRun key={`${cat}-${runId}`} cat={cat} onExit={() => setCat(null)} />;
}

function QuizRun({ cat, onExit }: { cat: CatId; onExit: () => void }) {
  const app = useApp();
  const meta = CATS.find((c) => c.id === cat)!;
  const qs = useMemo(() => questionsOf(cat), [cat]);
  const [qi, setQi] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = qs[qi];

  const pick = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === q.a) setScore((s) => s + 1);
  };
  const next = () => {
    if (qi + 1 < qs.length) {
      setQi(qi + 1);
      setChosen(null);
    } else {
      app.recordQuiz(cat, score, qs.length);
      setDone(true);
    }
  };

  if (done) {
    const pct = Math.round((score / qs.length) * 100);
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-gold-500/2 bg-pine-900/70 p-8 text-center md:p-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: meta.color }}>
          {meta.name} · Ergebnis
        </p>
        <p className="mt-4 font-display text-7xl font-semibold text-ink">
          {score}
          <span className="text-3xl text-ink-faint"> / {qs.length}</span>
        </p>
        <div className="mx-auto mt-5 h-2 max-w-xs overflow-hidden rounded-full bg-pine-700">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct}%`, backgroundColor: meta.color }}
          />
        </div>
        <p className="mt-4 font-display text-xl italic text-ink-dim">
          {pct === 100 ? "Kāmil — fehlerfrei!" : pct >= 75 ? "Stark — fast alles sitzt." : pct >= 50 ? "Solide — weiter üben lohnt." : "Ein guter Anfang — die Arena wartet."}
        </p>
        <p className="mt-2 text-[12.5px] text-ink-faint">+{score * 5 + (score === qs.length ? 10 : 0)} XP gutgeschrieben</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={onExit}
            className="btn-press rounded-full border border-gold-500/30 px-6 py-3 text-sm font-bold text-gold-300 hover:bg-gold-500/10"
          >
            Zur Kategorienwahl
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <button
          onClick={onExit}
          className="btn-press flex items-center gap-2 rounded-full border border-pine-700 px-4 py-2 text-[12.5px] font-bold text-ink-dim hover:border-gold-500/40 hover:text-gold-300"
        >
          <Glyph name="arrowL" className="h-3.5 w-3.5" /> Abbrechen
        </button>
        <span className="rounded-full px-3.5 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em]" style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}>
          {meta.name}
        </span>
      </div>

      <div key={qi} className="view-enter rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-8">
        <div className="mb-5 flex items-center gap-2">
          {qs.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < qi || (i === qi && chosen !== null) ? "bg-gold-500" : "bg-pine-700"
              }`}
            />
          ))}
        </div>

        {q.ar && (
          <div dir="rtl" className="mb-5 rounded-lg border border-pine-700 bg-pine-950/50 px-5 py-5 text-center">
            <p className="font-quran text-[1.8rem] leading-relaxed text-ink md:text-[2.2rem]">{q.ar}</p>
          </div>
        )}

        <h3 className="font-display text-xl font-semibold leading-snug text-ink md:text-2xl">{q.prompt}</h3>

        <div className="mt-6 space-y-2.5">
          {q.opts.map((opt, i) => {
            const cls =
              chosen === null
                ? "border-pine-700 bg-pine-950/40 text-ink hover:border-gold-500/50 hover:bg-pine-800/70"
                : i === q.a
                  ? "border-teal-500/70 bg-teal-500/10 text-teal-400"
                  : i === chosen
                    ? "border-copper-500/70 bg-copper-500/10 text-copper-400"
                    : "border-pine-700/60 bg-pine-950/30 text-ink-faint opacity-60";
            return (
              <button
                key={opt}
                onClick={() => pick(i)}
                className={`btn-press w-full rounded-lg border px-4 py-3.5 text-left text-[14.5px] font-semibold transition-all ${cls}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {chosen !== null && (
          <div className={`view-enter mt-5 rounded-lg border px-5 py-4 ${chosen === q.a ? "border-teal-500/35 bg-teal-500/[0.07]" : "border-copper-500/35 bg-copper-500/[0.07]"}`}>
            <p className={`flex items-center gap-2 text-[12.5px] font-extrabold uppercase tracking-[0.18em] ${chosen === q.a ? "text-teal-400" : "text-copper-400"}`}>
              <Glyph name={chosen === q.a ? "check" : "reset"} className="h-4 w-4" />
              {chosen === q.a ? "Richtig — +5 XP" : `Richtig wäre: ${q.opts[q.a]}`}
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-dim">{q.why}</p>
            <div className="mt-4 text-right">
              <button
                onClick={next}
                className="btn-press inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-pine-950 hover:bg-gold-400"
              >
                {qi + 1 < qs.length ? "Weiter" : "Auswertung"}
                <Glyph name="arrowR" className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Übungen: Konjugations-Trainer & Wurzel-Suche                        */
/* ================================================================== */

function DrillLab() {
  const [kind, setKind] = useState<"conj" | "root">("conj");
  const [runId, setRunId] = useState(0);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex flex-wrap gap-1 rounded-full border border-pine-700 bg-pine-900/70 p-1.5">
          {(
            [
              { id: "conj", label: "Konjugations-Trainer", icon: "qalam" },
              { id: "root", label: "Wurzel-Suche", icon: "tree" },
            ] as const
          ).map((k) => (
            <button
              key={k.id}
              onClick={() => {
                setKind(k.id);
                setRunId((r) => r + 1);
              }}
              className={`btn-press flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold transition-all ${
                kind === k.id ? "bg-gold-500 text-pine-950" : "text-ink-dim hover:text-ink"
              }`}
            >
              <Glyph name={k.icon} className="h-4 w-4" />
              {k.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setRunId((r) => r + 1)}
          className="btn-press inline-flex items-center gap-2 rounded-full border border-pine-700 px-4 py-2 text-[12.5px] font-bold text-ink-dim hover:border-gold-500/40 hover:text-gold-300"
        >
          <Glyph name="shuffle" className="h-4 w-4" /> Neu mischen
        </button>
      </div>

      <DrillRun key={`${kind}-${runId}`} kind={kind} />
    </div>
  );
}

function DrillRun({ kind }: { kind: "conj" | "root" }) {
  const app = useApp();
  const items = useMemo<DrillItem[]>(
    () => (kind === "conj" ? conjugationDrill(6, Math.floor(Math.random() * 20)) : rootDrill(6, Math.floor(Math.random() * 12))),
    [kind],
  );
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [hits, setHits] = useState(0);
  const [done, setDone] = useState(false);
  const it = items[i];

  const pick = (o: number) => {
    if (chosen !== null) return;
    setChosen(o);
    if (o === it.a) setHits((h) => h + 1);
  };
  const next = () => {
    if (i + 1 < items.length) {
      setI(i + 1);
      setChosen(null);
    } else {
      app.awardXp(hits * 3 + (hits === items.length ? 8 : 0));
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-gold-500/2 bg-pine-900/70 p-10 text-center">
        <p className="font-display text-6xl font-semibold text-ink">
          {hits}
          <span className="text-2xl text-ink-faint"> / {items.length}</span>
        </p>
        <p className="mt-3 font-display text-xl italic text-ink-dim">
          {hits === items.length ? "Alle Aufgaben gelöst — Übung macht den Meister." : "Gut geübt — die nächste Runde wartet."}
        </p>
        <p className="mt-2 text-[12.5px] text-ink-faint">+{hits * 3 + (hits === items.length ? 8 : 0)} XP</p>
        <p dir="rtl" className="mt-3 font-kufi text-xl text-gold-500/85">تَدَرَّبْ كُلَّ يَوْمٍ قَلِيلًا</p>
      </div>
    );
  }

  return (
    <div key={i} className="view-enter mx-auto max-w-2xl rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-ink-faint">Aufgabe {i + 1} / {items.length}</p>
        <p className="text-[12px] font-bold text-gold-400">{hits} Treffer</p>
      </div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-pine-700">
        <div className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500" style={{ width: `${(i / items.length) * 100}%` }} />
      </div>

      <p className="text-[14px] font-semibold text-ink-dim">{it.prompt}</p>
      <div dir="rtl" className="mt-3 rounded-lg border border-pine-700 bg-pine-950/50 px-5 py-5 text-center">
        <p className="font-arabic text-[1.6rem] leading-relaxed text-gold-300 md:text-[1.9rem]">{it.ar}</p>
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
        {it.opts.map((opt, o) => {
          const cls =
            chosen === null
              ? "border-pine-700 bg-pine-950/40 text-ink hover:border-gold-500/50"
              : o === it.a
                ? "border-teal-500/70 bg-teal-500/10 text-teal-400"
                : o === chosen
                  ? "border-copper-500/70 bg-copper-500/10 text-copper-400"
                  : "border-pine-700/60 opacity-60";
          return (
            <button
              key={opt + o}
              onClick={() => pick(o)}
              className={`btn-press rounded-lg border px-3 py-4 text-center font-arabic text-2xl leading-snug transition-all ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {chosen !== null && (
        <div className={`view-enter mt-5 rounded-lg border px-4 py-3.5 ${chosen === it.a ? "border-teal-500/35 bg-teal-500/[0.07]" : "border-copper-500/35 bg-copper-500/[0.07]"}`}>
          <p className={`text-[12px] font-extrabold uppercase tracking-[0.18em] ${chosen === it.a ? "text-teal-400" : "text-copper-400"}`}>
            {chosen === it.a ? "Richtig" : "Daneben"} — {it.info}
          </p>
          <div className="mt-3 text-right">
            <button onClick={next} className="btn-press inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-pine-950 hover:bg-gold-400">
              {i + 1 < items.length ? "Weiter" : "Abschließen"}
              <Glyph name="arrowR" className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/* Statistik                                                           */
/* ================================================================== */

function StatsBoard() {
  const app = useApp();
  const [confirmReset, setConfirmReset] = useState(false);

  const spark = app.history.slice(0, 12).reverse();
  const points = spark
    .map((a, i) => {
      const pct = a.score / a.total;
      const x = 10 + (i / Math.max(1, spark.length - 1)) * 180;
      const y = 42 - pct * 34;
      return `${x},${y}`;
    })
    .join(" ");

  const catStats = CATS.map((c) => {
    const att = app.history.filter((h) => h.cat === c.id);
    const score = att.reduce((s, a) => s + a.score, 0);
    const total = att.reduce((s, a) => s + a.total, 0);
    return { ...c, att: att.length, pct: total ? Math.round((score / total) * 100) : null };
  });

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <div className="h-full rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7">
          <p className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-500">Quiz-Verlauf</p>
          <h3 className="font-display text-xl font-semibold text-ink">Genauigkeit je Kategorie</h3>

          {spark.length > 1 && (
            <div className="mt-4 rounded-lg border border-pine-700 bg-pine-950/50 p-4">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint">Letzte {spark.length} Runden</p>
              <svg viewBox="0 0 200 48" className="h-16 w-full">
                <line x1="10" y1="42" x2="190" y2="42" stroke="rgba(216,178,92,0.18)" strokeWidth="1" />
                <polyline points={points} fill="none" stroke="#E4C071" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {spark.map((a, i) => {
                  const x = 10 + (i / Math.max(1, spark.length - 1)) * 180;
                  const y = 42 - (a.score / a.total) * 34;
                  return <circle key={i} cx={x} cy={y} r="2.6" fill="#0D352B" stroke="#E4C071" strokeWidth="1.4" />;
                })}
              </svg>
            </div>
          )}

          <ul className="mt-5 space-y-3.5">
            {catStats.map((c) => (
              <li key={c.id} className="flex items-center gap-3">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-lg" style={{ backgroundColor: `${c.color}1a`, color: c.color }}>
                  <Glyph name={c.icon as GlyphName} className="h-4 w-4" />
                </span>
                <span className="w-28 flex-none text-[13px] font-bold text-ink">{c.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-pine-700">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${c.pct ?? 0}%`, backgroundColor: c.color }} />
                </div>
                <span className="w-16 flex-none text-right font-display text-sm font-semibold text-ink-dim">
                  {c.pct === null ? "—" : `${c.pct} %`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={120} className="lg:col-span-5">
        <div className="flex h-full flex-col rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7">
          <p className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-500">Verlauf</p>
          <h3 className="font-display text-xl font-semibold text-ink">Letzte Aktivitäten</h3>

          {app.history.length === 0 ? (
            <p className="mt-5 rounded-lg border border-dashed border-pine-600 px-4 py-6 text-center text-[13px] text-ink-dim">
              Noch keine Quiz-Runde gespielt — die Arena wartet oben.
            </p>
          ) : (
            <ul className="mt-4 flex-1 space-y-2 overflow-hidden">
              {app.history.slice(0, 8).map((a) => {
                const c = CATS.find((x) => x.id === a.cat)!;
                const d = new Date(a.date);
                return (
                  <li key={a.id} className="flex items-center gap-3 rounded-lg border border-pine-700 bg-pine-950/40 px-3.5 py-2.5">
                    <span className="h-2 w-2 flex-none rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="flex-1 text-[13px] font-semibold text-ink">{c.name}</span>
                    <span className="font-display text-sm font-semibold text-gold-400">
                      {a.score}/{a.total}
                    </span>
                    <span className="w-24 flex-none text-right text-[11px] text-ink-faint">
                      {d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}{" "}
                      {d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-6 border-t border-pine-700 pt-5">
            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="btn-press w-full rounded-full border border-copper-500/40 px-4 py-2.5 text-[12.5px] font-bold text-copper-400 hover:bg-copper-500/10"
              >
                Fortschritt zurücksetzen …
              </button>
            ) : (
              <div className="rounded-lg border border-copper-500/40 bg-copper-500/[0.07] p-3.5 text-center">
                <p className="text-[12.5px] font-semibold text-ink-dim">Wirklich alles löschen? XP, Karten und Verlauf gehen verloren.</p>
                <div className="mt-3 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      app.resetProgress();
                      setConfirmReset(false);
                    }}
                    className="btn-press rounded-full bg-copper-500 px-4 py-2 text-[12px] font-bold text-pine-950"
                  >
                    Ja, löschen
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="btn-press rounded-full border border-pine-600 px-4 py-2 text-[12px] font-bold text-ink-dim"
                  >
                    Behalten
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {/* Arabische Zahl als Akzent */}
      <div className="hidden items-center justify-center lg:col-span-12 lg:flex">
        <p className="font-kufi text-lg text-ink-faint">
          Gesamt: <span className="text-gold-500/80">{toArabicDigits(app.stats.xp)}</span> XP ·{" "}
          <span className="text-gold-500/80">{toArabicDigits(app.stats.streak)}</span> Tage Serie
        </p>
      </div>
    </div>
  );
}
