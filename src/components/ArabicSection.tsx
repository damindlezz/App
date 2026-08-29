import { useState } from "react";
import { conjugation, roots, vocab } from "../data/content";
import { Glyph, Reveal, SectionHead } from "./ui";

export default function ArabicSection() {
  const [rootIdx, setRootIdx] = useState(0);
  const root = roots[rootIdx];

  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [seen, setSeen] = useState(1);
  const card = vocab[idx];

  const advance = (delta: number) => {
    setFlipped(false);
    window.setTimeout(() => {
      setIdx((i) => (i + delta + vocab.length) % vocab.length);
      setSeen((s) => Math.min(vocab.length, s + 1));
    }, 240);
  };

  const mark = (isKnown: boolean) => {
    setKnown((k) => {
      const n = new Set(k);
      if (isKnown) n.add(card.ar);
      else n.delete(card.ar);
      return n;
    });
    advance(1);
  };

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

      {/* ---------- Karteikarten + Konjugation ---------- */}
      <section className="grid gap-8 py-16 lg:grid-cols-2">
        {/* Karteikarten */}
        <Reveal>
          <div className="h-full rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Karteikarten · Vokabeln</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Wortschatz des Quran</h3>
              </div>
              <p className="font-display text-lg text-gold-400">
                {known.size}
                <span className="text-ink-faint"> / {vocab.length} gewusst</span>
              </p>
            </div>

            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-pine-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500"
                style={{ width: `${(known.size / vocab.length) * 100}%` }}
              />
            </div>

            <div className="[perspective:1400px]">
              <button
                onClick={() => setFlipped((f) => !f)}
                className={`flashcard-inner relative block h-64 w-full cursor-pointer text-left md:h-72 ${flipped ? "flipped" : ""}`}
                aria-label="Karte umdrehen"
              >
                {/* Vorderseite */}
                <div className="backface absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-gold-500/25 bg-gradient-to-b from-pine-800 to-pine-950/80 p-6">
                  <p dir="rtl" className="font-quran text-[3.4rem] leading-tight text-gold-300 md:text-6xl">
                    {card.ar}
                  </p>
                  <p className="mt-3 text-sm italic text-ink-dim">{card.tr}</p>
                  <p className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">
                    <Glyph name="reset" className="h-3.5 w-3.5" /> Zum Umdrehen tippen
                  </p>
                </div>
                {/* Rückseite */}
                <div
                  className="backface absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-teal-500/30 bg-gradient-to-b from-pine-800 to-pine-950/80 p-6 text-center"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <p className="font-display text-3xl font-semibold text-ink">{card.de}</p>
                  <p dir="rtl" className="mt-2 font-kufi text-xl text-teal-400">{card.ar}</p>
                  <p className="mt-4 max-w-sm border-t border-pine-700 pt-3.5 text-[13px] leading-relaxed text-ink-dim">
                    {card.extra}
                  </p>
                </div>
              </button>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2.5">
              <button
                onClick={() => advance(-1)}
                className="btn-press grid h-10 w-10 place-items-center rounded-full border border-pine-700 text-ink-dim hover:border-gold-500/40 hover:text-gold-300"
                aria-label="Vorherige Karte"
              >
                <Glyph name="arrowL" className="h-4 w-4" />
              </button>
              <button
                onClick={() => mark(false)}
                className="btn-press rounded-full border border-copper-500/45 px-5 py-2.5 text-sm font-bold text-copper-400 hover:bg-copper-500/10"
              >
                Nochmal
              </button>
              <button
                onClick={() => mark(true)}
                className="btn-press rounded-full border border-teal-500/45 bg-teal-500/10 px-5 py-2.5 text-sm font-bold text-teal-400 hover:bg-teal-500/20"
              >
                Gewusst ✓
              </button>
              <button
                onClick={() => advance(1)}
                className="btn-press grid h-10 w-10 place-items-center rounded-full border border-pine-700 text-ink-dim hover:border-gold-500/40 hover:text-gold-300"
                aria-label="Nächste Karte"
              >
                <Glyph name="arrowR" className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-center text-[12px] text-ink-faint">Karte {idx + 1} von {vocab.length} · {seen} gesehen</p>
          </div>
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
                    onClick={() => setTense(t)}
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
