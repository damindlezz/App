import { useEffect, useState } from "react";
import { useApp } from "../backend/store";
import { grades, hadiths, hadithTerms, sahihConditions, transmission } from "../data/content";
import { Glyph, Reveal, SectionHead, toArabicDigits } from "./ui";

export default function HadithSection() {
  const app = useApp();
  const [hIdx, setHIdx] = useState(0);
  const h = hadiths[hIdx];
  const chain = hadiths[0].chain ?? [];

  /* Lektions-Tracking: gelesene Ḥadīṯe, Isnad & Skalen (beim Ansehen) */
  const [read, setRead] = useState<Set<number>>(() => new Set([0]));
  useEffect(() => setRead((s) => (s.has(hIdx) ? s : new Set(s).add(hIdx))), [hIdx]);
  useEffect(() => {
    if (read.size >= hadiths.length) app.completeLesson("hadith", "lesen");
  }, [read, app]);
  useEffect(() => {
    app.completeLesson("hadith", "isnad");
    app.completeLesson("hadith", "skalen");
  }, [app]);

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        kicker="Sunna & Überlieferung"
        title="Ḥadīṯ — das geprüfte Wort"
        ar="الحَدِيث"
        desc="Jede Überlieferung trägt ihre Beweiskette mit sich: den Isnad. Die Ḥadīṯ-Wissenschaft prüft Kette und Text — ein Apparat, der seinesgleichen sucht."
      />

      {/* ---------- Ḥadīṯ-Karussell ---------- */}
      <Reveal>
        <div key={h.id} className="view-enter relative overflow-hidden rounded-xl border border-gold-500/20 bg-gradient-to-b from-pine-800 to-pine-900 p-6 md:p-10">
          <div className="pointer-events-none absolute -right-10 -top-14 select-none font-kufi text-[11rem] leading-none text-gold-500/[0.06]">
            {toArabicDigits(h.id)}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">
              Ḥadīṯ {h.id} von {hadiths.length} · {h.topic}
            </p>
            <span className="rounded-full border border-teal-500/35 bg-teal-500/10 px-3 py-1 text-[11.5px] font-extrabold uppercase tracking-[0.14em] text-teal-400">
              {h.grade}
            </span>
          </div>

          <div dir="rtl" className="mt-7 border-y border-gold-500/12 py-8 text-center">
            <p className="mx-auto max-w-3xl font-quran text-[1.7rem] leading-[2.1] text-ink md:text-[2.15rem] md:leading-[2.15]">
              {h.ar}
            </p>
          </div>

          <p className="mt-6 text-center font-display text-xl italic leading-snug text-gold-300 md:text-2xl">{h.de}</p>

          <div className="mt-7 grid gap-2.5 text-[13px] text-ink-dim sm:grid-cols-3">
            <p className="rounded-lg border border-pine-700 bg-pine-950/40 px-3.5 py-2.5">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500/80">Überliefert von</span>
              <span className="mt-0.5 block font-semibold text-ink">{h.rawi}</span>
            </p>
            <p className="rounded-lg border border-pine-700 bg-pine-950/40 px-3.5 py-2.5">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500/80">Quelle</span>
              <span className="mt-0.5 block font-semibold text-ink">{h.src}</span>
            </p>
            <p className="rounded-lg border border-pine-700 bg-pine-950/40 px-3.5 py-2.5">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500/80">Faʾīda · Notiz</span>
              <span className="mt-0.5 block leading-snug">{h.note}</span>
            </p>
          </div>

          <div className="mt-7 flex items-center justify-center gap-4">
            <button
              onClick={() => setHIdx((i) => (i - 1 + hadiths.length) % hadiths.length)}
              className="btn-press grid h-10 w-10 place-items-center rounded-full border border-pine-700 text-ink-dim hover:border-gold-500/50 hover:text-gold-300"
              aria-label="Vorheriges Hadith"
            >
              <Glyph name="arrowL" className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {hadiths.map((x, i) => (
                <button
                  key={x.id}
                  onClick={() => setHIdx(i)}
                  aria-label={`Hadith ${x.id}`}
                  className={`h-2 rounded-full transition-all ${i === hIdx ? "w-7 bg-gold-500" : "w-2 bg-pine-600 hover:bg-gold-600/60"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setHIdx((i) => (i + 1) % hadiths.length)}
              className="btn-press grid h-10 w-10 place-items-center rounded-full border border-pine-700 text-ink-dim hover:border-gold-500/50 hover:text-gold-300"
              aria-label="Nächstes Hadith"
            >
              <Glyph name="arrowR" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Reveal>

      {/* ---------- Isnād-Kette ---------- */}
      <section className="pt-16">
        <Reveal>
          <div className="mb-7">
            <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-500">
              <span className="inline-block h-px w-8 bg-gold-500/70" />
              Isnād · die Beweiskette des Niyya-Ḥadīṯ
            </p>
            <h3 className="font-display text-3xl font-semibold text-ink md:text-4xl">
              Acht Glieder — von Mund zu Ohr, 200 Jahre lang
            </h3>
            <p className="mt-3 max-w-2xl text-[14.5px] text-ink-dim">
              Die berühmteste Kette der Ḥadīṯ-Geschichte: al-Buḫārī hörte es von al-Ḥumaydī — sieben Generationen zurück bis zum Propheten ﷺ.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div dir="rtl" className="overflow-x-auto rounded-xl border border-gold-500/15 bg-pine-900/70 p-6">
            <div className="flex min-w-max items-center gap-1.5">
              {chain.map((name, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="group flex w-36 flex-col items-center gap-2 rounded-lg border border-pine-700 bg-pine-950/50 px-2 py-4 text-center transition-all hover:-translate-y-1 hover:border-gold-500/50">
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-full font-kufi text-base ${
                        i === 0
                          ? "bg-gold-500 text-pine-950"
                          : i === chain.length - 1
                            ? "border border-teal-500/60 text-teal-400"
                            : "border border-gold-500/40 text-gold-400"
                      }`}
                    >
                      {toArabicDigits(i + 1)}
                    </span>
                    <span className="text-[11.5px] font-bold leading-tight text-ink">{name}</span>
                    <span className="text-[10px] leading-tight text-ink-faint">
                      {i === 0 ? "die Quelle" : i === chain.length - 1 ? "aufgezeichnet ca. 230 n. H." : `Glied ${i + 1}`}
                    </span>
                  </span>
                  {i < chain.length - 1 && (
                    <svg width="26" height="12" viewBox="0 0 26 12" className="flex-none text-gold-600" aria-hidden>
                      <path d="M25 6H4M9 1.5 3.5 6 9 10.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- Uṣūl al-Ḥadīṯ ---------- */}
      <section className="grid gap-8 pt-16 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Muṣṭalaḥ al-Ḥadīṯ</p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Die Echtheitsskala</h3>
            <div className="mt-6 space-y-5">
              {grades.map((g) => (
                <div key={g.grade} className="group">
                  <div className="mb-1.5 flex items-baseline justify-between gap-3">
                    <p className="font-display text-[17px] font-semibold text-ink">
                      {g.grade}{" "}
                      <span dir="rtl" className="font-kufi text-lg" style={{ color: g.color }}>
                        {g.ar}
                      </span>
                    </p>
                    <span className="text-[11px] font-bold" style={{ color: g.color }}>{g.w}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-pine-700">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-125"
                      style={{ width: `${g.w}%`, backgroundColor: g.color }}
                    />
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-dim">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="h-full rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Fünf Bedingungen</p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Wann ist ein Ḥadīṯ ṣaḥīḥ?</h3>
            <ul className="mt-6 space-y-2.5">
              {sahihConditions.map((c, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-pine-700 bg-pine-950/40 px-4 py-3 transition-colors hover:border-teal-500/40">
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-teal-500/15 text-teal-400">
                    <Glyph name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-ink-dim">{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-pine-700 pt-5">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-500">Nach Überlieferungsdichte</p>
              <div className="mt-3.5 space-y-3">
                {transmission.map((t) => (
                  <div key={t.name} className="flex items-center gap-3">
                    <p className="w-32 flex-none text-[12.5px] font-bold text-ink">
                      {t.name}{" "}
                      <span dir="rtl" className="font-kufi text-[15px] text-gold-500/80">{t.ar}</span>
                    </p>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-pine-700">
                      <div className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400" style={{ width: `${t.w}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">{transmission[0].desc}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- Glossar ---------- */}
      <section className="pb-20 pt-12">
        <Reveal>
          <h3 className="mb-6 font-display text-2xl font-semibold text-ink">Kleines Glossar der Überlieferer</h3>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {hadithTerms.map((t, i) => (
            <Reveal key={t.term} delay={i * 70}>
              <div className="card-hover flex h-full items-start gap-4 rounded-lg border border-pine-700 bg-pine-900/60 p-4">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-gold-500/10 text-gold-400">
                  <Glyph name="scroll" className="h-5 w-5" />
                </span>
                <span>
                  <span className="flex flex-wrap items-baseline gap-x-2.5">
                    <span className="font-display text-[16px] font-semibold text-ink">{t.term}</span>
                    <span dir="rtl" className="font-kufi text-lg text-gold-500/85">{t.ar}</span>
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-ink-dim">{t.def}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
