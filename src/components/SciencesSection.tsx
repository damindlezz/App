import { useEffect, useState } from "react";
import { useApp } from "../backend/store";
import { orderSteps, sciences } from "../data/content";
import { Glyph, Reveal, SectionHead } from "./ui";
import type { GlyphName } from "./ui";

export default function SciencesSection() {
  const app = useApp();
  const [sciId, setSciId] = useState("aqida");
  const sci = sciences.find((s) => s.id === sciId) ?? sciences[0];

  /* Lektions-Tracking: geöffnete Wissenschaften + angesehene Reihenfolge */
  const [visited, setVisited] = useState<Set<string>>(() => new Set(["aqida"]));
  useEffect(() => setVisited((s) => (s.has(sciId) ? s : new Set(s).add(sciId))), [sciId]);
  useEffect(() => {
    if (visited.size >= sciences.length) app.completeLesson("wissenschaft", "landkarte");
  }, [visited, app]);
  useEffect(() => {
    app.completeLesson("wissenschaft", "reihenfolge");
  }, [app]);

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        kicker="Landkarte des Wissens"
        title="Die Wissenschaften des Islam"
        ar="العُلُوم"
        desc="ʿAqīda, Tafsīr, Taǧwīd, Fiqh, Ḥadīṯ, Sprache, Sīra, Iḥsān — acht Äste an einem Baum. Wer die Ordnung kennt, lernt nichts zur falschen Zeit."
      />

      {/* ---------- Leit-Ḥadīṯ ---------- */}
      <Reveal>
        <div className="relative mb-14 overflow-hidden rounded-xl border border-gold-500/25 bg-gradient-to-r from-pine-800 via-pine-900 to-pine-800 px-6 py-8 text-center md:px-12">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/[0.05] blur-2xl" />
          <p dir="rtl" className="relative mx-auto max-w-3xl font-quran text-[1.5rem] leading-[2] text-gold-300 md:text-[1.85rem]">
            مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ
          </p>
          <p className="relative mt-4 font-display text-lg italic text-ink md:text-xl">
            „Wer einen Weg geht, um Wissen zu erlangen, dem erleichtert Allah dafür einen Weg ins Paradies.“
          </p>
          <p className="relative mt-2 text-[12px] font-bold uppercase tracking-[0.22em] text-ink-dim">Muslim (2699)</p>
        </div>
      </Reveal>

      {/* ---------- Baum des Wissens ---------- */}
      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="flex h-full flex-col gap-2">
            {sciences.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSciId(s.id)}
                className={`btn-press group flex items-center gap-4 rounded-lg border px-4 py-3 text-left transition-all ${
                  sciId === s.id
                    ? "border-gold-500/55 bg-gold-500/[0.08]"
                    : "border-pine-700 bg-pine-900/60 hover:border-gold-500/35 hover:bg-pine-800/60"
                }`}
              >
                <span
                  className="grid h-10 w-10 flex-none place-items-center rounded-lg transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${s.color}1a`, color: s.color }}
                >
                  <Glyph name={s.icon as GlyphName} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className={`font-display text-[15.5px] font-semibold ${sciId === s.id ? "text-gold-300" : "text-ink"}`}>
                      {s.name}
                    </span>
                    <span dir="rtl" className="font-kufi text-lg" style={{ color: `${s.color}b3` }}>
                      {s.ar}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    {s.level}
                  </span>
                </span>
                <span
                  className={`h-1.5 w-1.5 flex-none rounded-full transition-all ${sciId === s.id ? "scale-150 bg-gold-400" : "bg-pine-600"}`}
                />
              </button>
            ))}
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <div key={sci.id} className="view-enter flex h-full flex-col rounded-xl border border-gold-500/20 bg-pine-900/80 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-pine-700 pb-5">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.26em]" style={{ color: sci.color }}>
                  {sci.level}
                </p>
                <h3 className="mt-1 font-display text-3xl font-semibold text-ink">{sci.name}</h3>
              </div>
              <span dir="rtl" className="font-kufi text-5xl md:text-6xl" style={{ color: sci.color }}>
                {sci.ar}
              </span>
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-ink-dim">{sci.desc}</p>

            <div className="mt-6">
              <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-500">Klassiker der Stufe</p>
              <div className="flex flex-wrap gap-2">
                {sci.books.map((b) => (
                  <span
                    key={b}
                    className="flex items-center gap-2 rounded-full border border-pine-700 bg-pine-950/50 px-3.5 py-1.5 text-[12.5px] font-semibold text-ink transition-colors hover:border-gold-500/40"
                  >
                    <Glyph name="book" className="h-3.5 w-3.5 text-gold-500" />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="flex items-start gap-3 rounded-lg border px-4 py-3.5" style={{ borderColor: `${sci.color}33`, backgroundColor: `${sci.color}0d` }}>
                <span style={{ color: sci.color }}>
                  <Glyph name="lamp" className="mt-0.5 h-4.5 w-4.5" />
                </span>
                <p className="text-[13.5px] leading-relaxed text-ink-dim">
                  <span className="font-bold text-ink">So fängst du an: </span>
                  {sci.tip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Lernreihenfolge ---------- */}
      <section className="pb-20 pt-16">
        <Reveal>
          <div className="mb-8">
            <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-500">
              <span className="inline-block h-px w-8 bg-gold-500/70" />
              Empfohlene Reihenfolge
            </p>
            <h3 className="font-display text-3xl font-semibold text-ink md:text-4xl">So baut man auf — Stein um Stein</h3>
          </div>
        </Reveal>

        <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
          {orderSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="card-hover group flex h-full items-start gap-4 rounded-xl border border-pine-700 bg-pine-900/70 p-5">
                <span className="relative grid h-12 w-12 flex-none place-items-center">
                  <Glyph name="star8" className="absolute h-12 w-12 text-gold-500/25 transition-all duration-500 group-hover:rotate-45 group-hover:text-gold-500/50" />
                  <span className="font-display text-xl font-bold text-gold-400">{s.n}</span>
                </span>
                <span>
                  <span className="block font-display text-[17px] font-semibold text-ink">{s.title}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-ink-dim">{s.desc}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
