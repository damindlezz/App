import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../backend/store";
import { alphabet, conjugation, roots } from "../data/content";
import { Glyph, Reveal, SectionHead } from "./ui";

export default function ArabicSection() {
  const app = useApp();
  const [rootIdx, setRootIdx] = useState(0);
  const root = roots[rootIdx];
  const [letterIdx, setLetterIdx] = useState(0);
  const letter = alphabet[letterIdx];

  /* Lektions-Tracking aus echtem Verhalten */
  const [visitedLetters, setVisitedLetters] = useState<Set<number>>(() => new Set([0]));
  const [visitedRoots, setVisitedRoots] = useState<Set<number>>(() => new Set([0]));
  const [visitedTenses, setVisitedTenses] = useState<Set<string>>(() => new Set(["past"]));
  useEffect(() => setVisitedLetters((s) => (s.has(letterIdx) ? s : new Set(s).add(letterIdx))), [letterIdx]);
  useEffect(() => setVisitedRoots((s) => (s.has(rootIdx) ? s : new Set(s).add(rootIdx))), [rootIdx]);
  useEffect(() => {
    if (visitedLetters.size >= 10) app.completeLesson("arabisch", "alphabet");
  }, [visitedLetters, app]);
  useEffect(() => {
    if (visitedRoots.size >= 4) app.completeLesson("arabisch", "wurzeln");
  }, [visitedRoots, app]);
  useEffect(() => {
    if (visitedTenses.size >= 2) app.completeLesson("arabisch", "konjugation");
  }, [visitedTenses, app]);

  const [tense, setTense] = useState<"past" | "present">("past");
  const conj = conjugation[tense];

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        kicker="Fuṣḥā · die Sprache des Quran"
        title="Arabisch von der Wurzel her"
        ar="العَرَبِيَّة"
        desc="Rund 90 % des arabischen Wortschatzes wachsen aus dreibuchstabigen Wurzeln. Wer das Muster erkennt, versteht Wörter, die er nie gelernt hat."
      />

      {/* ---------- Alphabet ---------- */}
      <Reveal>
        <div className="rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">
                Alifbāʾ · 28 Buchstaben
              </p>
              <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                Das Alphabet — Stein für Stein
              </h3>
            </div>
            <p className="max-w-md text-[12.5px] leading-relaxed text-ink-dim">
              Buchstabe wählen: <strong className="text-ink">Šamsī-Buchstaben</strong> (Sonne) assimilieren das Lām
              des Artikels, bei <strong className="text-ink">Qamarī-Buchstaben</strong> (Mond) bleibt es hörbar.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {alphabet.map((a, i) => (
              <button
                key={a.l}
                onClick={() => setLetterIdx(i)}
                className={`btn-press group rounded-lg border px-1 py-2.5 text-center transition-all ${
                  i === letterIdx
                    ? "border-gold-500 bg-gold-500/15"
                    : "border-pine-700 bg-pine-950/40 hover:-translate-y-0.5 hover:border-gold-500/40"
                }`}
              >
                <span
                  className={`block font-quran text-[1.7rem] leading-tight ${
                    i === letterIdx ? "text-gold-300" : "text-ink group-hover:text-gold-300"
                  }`}
                >
                  {a.l}
                </span>
                <span className="mt-0.5 block text-[10px] font-bold text-ink-faint">{a.tr}</span>
              </button>
            ))}
          </div>

          <div
            key={letter.l}
            className="view-enter mt-6 grid gap-5 rounded-lg border border-pine-700 bg-pine-950/50 p-5 md:grid-cols-12 md:items-center md:p-6"
          >
            <div className="text-center md:col-span-3">
              <p dir="rtl" className="font-quran text-7xl leading-none text-gold-400">
                {letter.l}
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="font-display text-2xl font-semibold text-ink">{letter.name}</p>
              <p className="mt-0.5 text-[13px] text-ink-dim">
                Aussprache: <strong className="text-gold-300">{letter.tr}</strong>
              </p>
              <p dir="rtl" className="mt-2.5 font-quran text-3xl leading-snug text-ink">
                {letter.ex}
              </p>
              <p className="text-[13px] text-ink-dim">{letter.exDe}</p>
            </div>
            <div className="md:col-span-4">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-bold ${
                  letter.sun
                    ? "border-copper-500/45 bg-copper-500/10 text-copper-400"
                    : "border-lapis-500/45 bg-lapis-500/10 text-lapis-400"
                }`}
              >
                <Glyph name={letter.sun ? "sun" : "moon"} className="h-4 w-4" />
                {letter.sun ? "Šamsī · Sonnenbuchstabe" : "Qamarī · Mondbuchstabe"}
              </span>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-dim">
                {letter.sun
                  ? "Wie in aš-Šams (الشَّمْس): das Lām verschmilzt mit dem Buchstaben."
                  : "Wie in al-Qamar (القَمَر): das Lām bleibt klar gesprochen."}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---------- Wurzel-Explorer ---------- */}
      <Reveal>
        <div className="rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Wurzel-Explorer</p>
              <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">Ein Sinnkern — viele Gewächse</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {roots.map((r, i) => (
                <button
                  key={r.root}
                  onClick={() => setRootIdx(i)}
                  className={`btn-press rounded-lg border px-4 py-2 font-kufi text-lg transition-all ${
                    i === rootIdx
                      ? "border-gold-500 bg-gold-500/15 text-gold-300"
                      : "border-pine-700 bg-pine-800/50 text-ink-dim hover:border-gold-500/40 hover:text-ink"
                  }`}
                >
                  {r.root}
                </button>
              ))}
            </div>
          </div>

          <div key={root.root} className="view-enter">
            <div className="mb-7 flex flex-wrap items-center justify-center gap-4 rounded-lg border border-pine-700 bg-pine-950/50 px-6 py-7">
              <div dir="rtl" className="flex items-center gap-3">
                {root.root.split(" ").map((l, i) => (
                  <span key={i} className="flex items-center gap-3">
                    <span className="font-quran text-6xl leading-none text-gold-400 md:text-7xl">{l}</span>
                    {i < root.root.split(" ").length - 1 && (
                      <svg width="14" height="14" viewBox="0 0 14 14" className="text-gold-600">
                        <rect x="3.5" y="3.5" width="7" height="7" transform="rotate(45 7 7)" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    )}
                  </span>
                ))}
              </div>
              <div className="text-center md:text-left">
                <p className="font-display text-xl font-semibold text-ink">
                  {root.tr} <span className="text-ink-faint">·</span>{" "}
                  <span className="italic text-gold-300">„{root.meaning}“</span>
                </p>
                <p className="mt-1 text-[13px] text-ink-dim">
                  {root.forms.length} Ableitungen aus einem einzigen Sinnkern — vom Verb bis zum Ort.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {root.forms.map((f, i) => (
                <div
                  key={f.ar}
                  className="card-hover group rounded-lg border border-pine-700 bg-pine-800/50 p-4"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500/80">{f.slot}</p>
                  <p dir="rtl" className="mt-2 font-quran text-[1.85rem] leading-tight text-ink transition-colors group-hover:text-gold-300">
                    {f.ar}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-snug text-ink-dim">{f.de}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---------- Vokabeln (zentral im Training) + Konjugation ---------- */}
      <section className="grid gap-8 py-16 lg:grid-cols-2">
        {/* Vokabeln → zentraler Trainer */}
        <Reveal>
          <Link
            to="/training"
            className="card-hover group flex h-full flex-col rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Karteikarten · Vokabeln</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Wortschatz des Quran</h3>
              </div>
              <p className="font-display text-lg text-gold-400">
                {app.vocabMastered}
                <span className="text-ink-faint"> / {app.vocabTotal} gemeistert</span>
              </p>
            </div>

            <div className="mb-4 mt-4 h-1.5 overflow-hidden rounded-full bg-pine-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500"
                style={{ width: `${(app.vocabMastered / Math.max(1, app.vocabTotal)) * 100}%` }}
              />
            </div>

            <p className="text-[13.5px] leading-relaxed text-ink-dim">
              Vokabeln werden jetzt im <strong className="text-ink">zentralen Leitner-Trainer</strong> wiederholt —
              gemeinsam mit allen anderen Fächern, mit Fälligkeits-Logik, XP und Serie.
            </p>

            <div className="mt-auto flex items-center justify-center pt-6">
              <span className="btn-press inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-pine-950 group-hover:bg-gold-400">
                <Glyph name="book" className="h-4 w-4" />
                {app.dueCount > 0 ? `${app.dueCount} Karten wiederholen` : "Zum Trainer"}
                <Glyph name="arrowR" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Konjugation */}
        <Reveal delay={120}>
          <div className="h-full rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Ṣarf · Formenlehre</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
                  كَتَبَ durchkonjugiert
                </h3>
                <p className="mt-1 text-[13px] text-ink-dim">kataba — „er schrieb“: das Muster aller regelmäßigen Verben.</p>
              </div>
              <div className="flex rounded-full border border-pine-700 bg-pine-950/50 p-1">
                {(["past", "present"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTense(t);
                      setVisitedTenses((s) => (s.has(t) ? s : new Set(s).add(t)));
                    }}
                    className={`btn-press rounded-full px-4 py-1.5 text-[12.5px] font-bold transition-all ${
                      tense === t ? "bg-gold-500 text-pine-950" : "text-ink-dim hover:text-ink"
                    }`}
                  >
                    {t === "past" ? "al-Māḍī" : "al-Muḍāriʿ"}
                  </button>
                ))}
              </div>
            </div>

            <div key={tense} className="view-enter overflow-x-auto rounded-lg border border-pine-700">
              <table className="w-full min-w-[430px] text-center">
                <thead>
                  <tr className="bg-pine-800/80 text-[10.5px] uppercase tracking-[0.18em] text-gold-500/90">
                    <th className="px-3 py-3 text-left font-bold">Person</th>
                    <th className="px-3 py-3 font-bold">
                      Singular
                      <span dir="rtl" className="mt-0.5 block font-kufi text-sm normal-case tracking-normal text-ink-dim">المفرد</span>
                    </th>
                    <th className="px-3 py-3 font-bold">
                      Dual
                      <span dir="rtl" className="mt-0.5 block font-kufi text-sm normal-case tracking-normal text-ink-dim">المثنى</span>
                    </th>
                    <th className="px-3 py-3 font-bold">
                      Plural
                      <span dir="rtl" className="mt-0.5 block font-kufi text-sm normal-case tracking-normal text-ink-dim">الجمع</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {conj.rows.map((r, i) => (
                    <tr key={i} className="border-t border-pine-700/70 transition-colors hover:bg-gold-500/[0.05]">
                      <td className="px-3 py-3 text-left text-[12.5px] font-semibold text-ink-dim">{r.label}</td>
                      <td dir="rtl" className="px-3 py-3 font-arabic text-2xl text-ink">{r.s}</td>
                      <td dir="rtl" className="px-3 py-3 font-arabic text-2xl text-ink">{r.d}</td>
                      <td dir="rtl" className="px-3 py-3 font-arabic text-2xl text-ink">{r.p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2.5 text-center">
              {[
                { ar: "فَاعِل", de: "Täterform · kātib" },
                { ar: "مَفْعُول", de: "Zielform · maktūb" },
                { ar: "مَفْعَل", de: "Ortsform · maktab" },
              ].map((m) => (
                <div key={m.ar} className="rounded-lg border border-pine-700 bg-pine-800/50 px-2 py-3 transition-colors hover:border-gold-500/35">
                  <p dir="rtl" className="font-quran text-xl text-gold-400">{m.ar}</p>
                  <p className="mt-1 text-[11px] text-ink-dim">{m.de}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
