import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../backend/store";
import { CATS } from "../backend/bank";
import { SUBJECTS } from "../data/content";
import { Glyph, Reveal, Ring } from "../components/ui";
import type { GlyphName } from "../components/ui";

export default function Fortschritt() {
  const app = useApp();
  const { stats, subjectProgress, overallPct, history, cards, mastered, vocabTotal, resetProgress } = app;
  const [confirmReset, setConfirmReset] = useState(false);

  const spark = history.slice(0, 12).reverse();
  const points = spark
    .map((a, i) => {
      const pct = a.score / a.total;
      const x = 10 + (i / Math.max(1, spark.length - 1)) * 180;
      const y = 42 - pct * 34;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-500">Fortschritt</p>
      <h1 className="mt-1.5 font-display text-4xl font-semibold text-ink md:text-5xl">
        Nur <em className="italic text-gold-400">echte</em> Daten.
      </h1>
      <p className="mt-2 max-w-2xl text-[14.5px] text-ink-dim">
        Jede Zahl hier stammt aus deinem Lernverhalten — Lektionen, Karten im Leitner-System, Quiz-Runden,
        Übungen und Ḥifẓ. Nichts ist vorbefüllt.
      </p>

      {/* ---------- Kopfzeile ---------- */}
      <div className="mt-9 grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="flex h-full items-center gap-6 rounded-xl border border-gold-500/20 bg-pine-900/70 p-6">
            <Ring pct={overallPct()} size={110} stroke={9} color="#D8B25C">
              <span className="text-center">
                <span className="block font-display text-2xl font-semibold text-gold-400">{overallPct()}%</span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-ink-faint">Gesamt</span>
              </span>
            </Ring>
            <div className="space-y-2.5">
              {[
                { v: `${stats.xp}`, l: "XP gesamt" },
                { v: `${stats.weekXp}`, l: "XP diese Woche" },
                { v: `${stats.streak} / ${stats.best}`, l: "Serie / Rekord" },
              ].map((x) => (
                <p key={x.l} className="flex items-baseline gap-2.5">
                  <span className="font-display text-xl font-semibold text-ink">{x.v}</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint">{x.l}</span>
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={90} className="lg:col-span-4">
          <div className="h-full rounded-xl border border-pine-700 bg-pine-900/70 p-6">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-500">Karteikarten · Leitner</p>
            <p className="mt-2 font-display text-4xl font-semibold text-teal-400">
              {mastered}
              <span className="text-xl text-ink-faint"> / {vocabTotal} gemeistert</span>
            </p>
            <ul className="mt-4 space-y-1.5">
              {app.boxCounts.map((c, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="w-12 flex-none text-[11px] font-bold text-ink-faint">Fach {i + 1}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-pine-700">
                    <span className="block h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400" style={{ width: `${Math.min(100, (c / Math.max(1, vocabTotal)) * 100)}%` }} />
                  </span>
                  <span className="w-6 flex-none text-right text-[12px] font-bold text-gold-400">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={180} className="lg:col-span-4">
          <div className="h-full rounded-xl border border-pine-700 bg-pine-900/70 p-6">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-500">Quiz-Genauigkeit</p>
            {spark.length > 1 ? (
              <svg viewBox="0 0 200 48" className="mt-4 h-16 w-full">
                <line x1="10" y1="42" x2="190" y2="42" stroke="rgba(216,178,92,0.18)" strokeWidth="1" />
                <polyline points={points} fill="none" stroke="#E4C071" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {spark.map((a, i) => (
                  <circle
                    key={i}
                    cx={10 + (i / Math.max(1, spark.length - 1)) * 180}
                    cy={42 - (a.score / a.total) * 34}
                    r="2.6" fill="var(--color-pine-800)" stroke="#E4C071" strokeWidth="1.4"
                  />
                ))}
              </svg>
            ) : (
              <p className="mt-4 text-[13px] text-ink-dim">Noch keine Quiz-Runden — die Arena wartet im Training.</p>
            )}
            <ul className="mt-3 space-y-1.5">
              {CATS.map((c) => {
                const att = history.filter((h) => h.cat === c.id);
                const score = att.reduce((s, a) => s + a.score, 0);
                const total = att.reduce((s, a) => s + a.total, 0);
                return (
                  <li key={c.id} className="flex items-center gap-2.5 text-[12px]">
                    <span className="h-2 w-2 flex-none rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="flex-1 font-semibold text-ink-dim">{c.name}</span>
                    <span className="font-bold text-ink">{total ? `${Math.round((score / total) * 100)} %` : "—"}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* ---------- Fächer ---------- */}
      <section className="mt-12">
        <h2 className="mb-5 font-display text-2xl font-semibold text-ink">Fachbereiche</h2>
        <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-5">
          {SUBJECTS.map((s) => {
            const p = subjectProgress(s.id);
            return (
              <Link key={s.id} to={s.route} className="card-hover group rounded-xl border border-pine-700 bg-pine-900/70 p-5">
                <span className="flex items-center justify-between">
                  <span style={{ color: s.color }}>
                    <Glyph name={s.icon as GlyphName} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-lg font-semibold" style={{ color: s.color }}>{p.pct}%</span>
                </span>
                <span className="mt-3 block text-[14.5px] font-bold text-ink group-hover:text-gold-300">{s.name}</span>
                <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-pine-700">
                  <span className="block h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: s.color }} />
                </span>
                <span className="mt-2 block text-[11.5px] text-ink-faint">{p.done}/{p.total} Lektionen</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------- Aktivität + Daten ---------- */}
      <section className="mt-12 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="h-full rounded-xl border border-gold-500/15 bg-pine-900/70 p-6">
            <h2 className="font-display text-xl font-semibold text-ink">Letzte Aktivitäten</h2>
            {history.length === 0 ? (
              <p className="mt-4 rounded-lg border border-dashed border-pine-600 px-4 py-6 text-center text-[13px] text-ink-dim">
                Noch keine Quiz-Runde gespielt.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {history.slice(0, 9).map((a) => {
                  const c = CATS.find((x) => x.id === a.cat)!;
                  const d = new Date(a.date);
                  return (
                    <li key={a.id} className="flex items-center gap-3 rounded-lg border border-pine-700 bg-pine-950/40 px-3.5 py-2.5">
                      <span className="h-2 w-2 flex-none rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="flex-1 text-[13px] font-semibold text-ink">{c.name}</span>
                      <span className="font-display text-sm font-semibold text-gold-400">{a.score}/{a.total}</span>
                      <span className="w-24 flex-none text-right text-[11px] text-ink-faint">
                        {d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })} {d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="h-full rounded-xl border border-pine-700 bg-pine-900/70 p-6">
            <h2 className="font-display text-xl font-semibold text-ink">Deine Daten</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
              Alles liegt lokal in deinem Browser (localStorage): Karten, Quiz-Verlauf, Lektionen, Ḥifẓ,
              Tagesplan und Serie. Kein Konto, kein Server.
            </p>
            <div className="mt-4 space-y-2 text-[13px]">
              <p className="flex justify-between border-b border-pine-700/70 pb-2"><span className="text-ink-dim">Karten gesehen</span><span className="font-bold text-ink">{Object.keys(cards).length}</span></p>
              <p className="flex justify-between border-b border-pine-700/70 pb-2"><span className="text-ink-dim">Quiz-Runden</span><span className="font-bold text-ink">{history.length}</span></p>
              <p className="flex justify-between"><span className="text-ink-dim">Wiederholungen heute</span><span className="font-bold text-ink">{stats.reviewsToday}</span></p>
            </div>
            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="btn-press mt-5 w-full rounded-full border border-copper-500/40 px-4 py-2.5 text-[12.5px] font-bold text-copper-400 hover:bg-copper-500/10"
              >
                Fortschritt zurücksetzen …
              </button>
            ) : (
              <div className="mt-5 rounded-lg border border-copper-500/40 bg-copper-500/[0.07] p-3.5 text-center">
                <p className="text-[12.5px] font-semibold text-ink-dim">Wirklich alles löschen? XP, Karten, Lektionen und Verlauf gehen verloren.</p>
                <div className="mt-3 flex justify-center gap-2">
                  <button
                    onClick={() => { resetProgress(); setConfirmReset(false); }}
                    className="btn-press rounded-full bg-copper-500 px-4 py-2 text-[12px] font-bold text-pine-950"
                  >
                    Ja, löschen
                  </button>
                  <button onClick={() => setConfirmReset(false)} className="btn-press rounded-full border border-pine-600 px-4 py-2 text-[12px] font-bold text-ink-dim">
                    Behalten
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
