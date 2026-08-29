import { useState } from "react";
import {
  ayahOfDay,
  marqueeWords,
  planItems,
  tracks,
} from "../data/content";
import type { TabId } from "./TopBar";
import { AyahMarker, CornerOrn, Glyph, Reveal, Ring } from "./ui";
import type { GlyphName } from "./ui";

const chips = ["Fuṣḥā A1–C1", "Taǧwīd & Ḥifẓ", "Fiqh · 4 Madhāhib", "Ḥadīṯ & Uṣūl", "ʿUlūm"];

export default function Dashboard({ setTab }: { setTab: (t: TabId) => void }) {
  const [plan, setPlan] = useState(planItems.map((p) => p.done));
  const doneCount = plan.filter(Boolean).length;
  const pct = Math.round((doneCount / plan.length) * 100);

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      {/* ---------- Auftakt ---------- */}
      <section className="grid gap-10 pb-16 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="mb-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-gold-500/20 bg-pine-800/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-400/90"
              >
                {c}
              </span>
            ))}
          </div>

          <h1 className="font-display text-[2.55rem] font-semibold leading-[1.02] text-ink sm:text-6xl xl:text-[4.4rem]">
            <span className="line-mask">
              <span style={{ animationDelay: "0.05s" }}>Wissen, das</span>
            </span>
            <span className="line-mask">
              <span style={{ animationDelay: "0.18s" }}>
                im <em className="font-light italic text-gold-400">Herzen</em>
              </span>
            </span>
            <span className="line-mask">
              <span style={{ animationDelay: "0.31s" }}>Wurzeln schlägt.</span>
            </span>
          </h1>

          <Reveal delay={350}>
            <p dir="rtl" className="mt-7 font-kufi text-2xl leading-relaxed text-gold-500/95 md:text-[1.7rem]">
              طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
            </p>
            <p className="mt-1.5 text-sm italic text-ink-dim">
              „Das Streben nach Wissen ist jedem Muslim zur Pflicht gemacht.“ — Ibn Māǧa
            </p>
          </Reveal>

          <Reveal delay={450}>
            <p className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-ink-dim">
              <strong className="font-bold text-ink">Nūr</strong> ist ein Lernbegleiter für den ganzen Weg: Arabisch
              Fuṣḥā aus der Wurzel heraus, Quran-Lektüre mit Taǧwīd, Fiqh in den vier Rechtsschulen,
              Ḥadīṯ mit Isnad-Verständnis — und die Landkarte der islamischen Wissenschaften dazu.
            </p>
          </Reveal>

          <Reveal delay={550}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setTab("quran")}
                className="btn-press group inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-7 py-3.5 text-[15px] font-bold text-pine-950 shadow-[0_10px_30px_-12px_rgba(216,178,92,0.6)] hover:bg-gold-400"
              >
                Mit der Fātiḥa beginnen
                <Glyph name="arrowR" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => setTab("science")}
                className="btn-press inline-flex items-center gap-2.5 rounded-full border border-gold-500/35 px-7 py-3.5 text-[15px] font-semibold text-gold-300 hover:bg-gold-500/10"
              >
                <Glyph name="compass" className="h-4.5 w-4.5" />
                Die Karte des Wissens
              </button>
            </div>
          </Reveal>

          {/* Zahlenband */}
          <Reveal delay={650}>
            <div className="mt-12 grid grid-cols-2 gap-y-6 border-t border-gold-500/12 pt-7 sm:grid-cols-4">
              <div>
                <p className="font-display text-4xl font-semibold text-gold-400">12</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-dim">Tage Serie</p>
              </div>
              <div>
                <p className="font-display text-4xl font-semibold text-teal-400">14</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-dim">Sūren im Ḥifẓ</p>
              </div>
              <div>
                <p className="font-display text-4xl font-semibold text-lapis-400">312</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-dim">Vokabeln sicher</p>
              </div>
              <div>
                <p className="font-display text-4xl font-semibold text-plum-400">4,2h</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-dim">diese Woche</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- Āya des Tages ---------- */}
        <div className="lg:col-span-5">
          <Reveal delay={250} className="h-full">
            <div className="relative h-full overflow-hidden rounded-xl border border-gold-500/25 bg-gradient-to-b from-pine-800 to-pine-900 p-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] md:p-8">
              <CornerOrn className="absolute left-3 top-3" />
              <CornerOrn className="absolute right-3 top-3 rotate-90" />
              <CornerOrn className="absolute bottom-3 right-3 rotate-180" />
              <CornerOrn className="absolute bottom-3 left-3 -rotate-90" />

              <p className="mb-1 text-center text-[10.5px] font-bold uppercase tracking-[0.3em] text-gold-500/80">
                Āya des Tages · ورد اليوم
              </p>
              <p className="text-center font-kufi text-xs text-ink-faint">{ayahOfDay.ref}</p>

              <div dir="rtl" className="mt-6 border-y border-gold-500/15 py-7 text-center">
                <p className="font-quran text-[2.3rem] leading-[1.9] text-ink md:text-[2.6rem]">
                  <span className="text-gold-400">اقْرَأْ</span> بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
                </p>
              </div>

              <p className="mt-5 text-center font-display text-xl italic leading-snug text-gold-300">
                {ayahOfDay.de}
              </p>

              <p className="mt-5 rounded-lg border border-teal-500/20 bg-teal-500/[0.06] px-4 py-3.5 text-[13px] leading-relaxed text-ink-dim">
                <span className="mb-1 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-teal-400">
                  <Glyph name="lamp" className="h-3.5 w-3.5" /> Tafsīr-Notiz
                </span>
                {ayahOfDay.tafsir}
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 text-gold-500/50">
                <AyahMarker n={1} />
                <span className="text-[11px] tracking-wide">96:1</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Laufband der Disziplinen ---------- */}
      <Reveal>
        <div className="relative -mx-5 overflow-hidden border-y border-gold-500/12 bg-pine-900/60 py-4 md:-mx-8">
          <div className="marquee-track flex w-max items-center gap-8">
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={i} className="flex items-center gap-8">
                <span dir="rtl" className="font-kufi text-2xl text-gold-500/45 transition-colors hover:text-gold-400">
                  {w}
                </span>
                <svg width="10" height="10" viewBox="0 0 10 10" className="text-gold-600/40">
                  <rect x="2.4" y="2.4" width="5.2" height="5.2" transform="rotate(45 5 5)" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---------- Tagesplan + Lernpfade ---------- */}
      <section className="grid gap-8 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="h-full rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Tagesplan</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Dein Wird für heute</h3>
                </div>
                <Ring pct={pct} size={64} stroke={5} color="#4FC1A6">
                  <span className="text-[13px] font-extrabold text-teal-400">{pct}%</span>
                </Ring>
              </div>

              <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-pine-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-700 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <ul className="space-y-1">
                {planItems.map((item, i) => (
                  <li key={item.label}>
                    <label
                      className={`flex cursor-pointer items-center gap-3.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-pine-800/80 ${
                        plan[i] ? "opacity-60" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="plan-check"
                        checked={plan[i]}
                        onChange={() => setPlan((p) => p.map((v, j) => (j === i ? !v : v)))}
                      />
                      <span
                        className={`flex-1 text-[14.5px] font-medium ${
                          plan[i] ? "text-ink-dim line-through decoration-teal-500/60" : "text-ink"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-faint">
                        <Glyph name="clock" className="h-3.5 w-3.5" />
                        {item.time}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>

              {doneCount === plan.length && (
                <p className="mt-4 rounded-lg border border-gold-500/30 bg-gold-500/10 px-4 py-3 text-center text-sm font-semibold text-gold-300">
                  Māšāʾallāh — der Plan ist erfüllt. <span dir="rtl" className="font-kufi">ما شاء الله</span>
                </p>
              )}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={120}>
            <div className="h-full rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7">
              <div className="mb-5">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Lernpfade</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Wo du gerade stehst</h3>
              </div>
              <ul className="space-y-2.5">
                {tracks.map((t, i) => (
                  <li key={t.id}>
                    <Reveal delay={i * 90}>
                      <button
                        onClick={() => setTab(t.id as TabId)}
                        className="card-hover group flex w-full items-center gap-4 rounded-lg border border-pine-700 bg-pine-800/50 px-4 py-3.5 text-left"
                      >
                        <span
                          className="grid h-11 w-11 flex-none place-items-center rounded-lg"
                          style={{ backgroundColor: `${t.color}1f`, color: t.color }}
                        >
                          <Glyph name={t.icon as GlyphName} className="h-5.5 w-5.5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-3">
                            <span className="font-display text-[17px] font-semibold text-ink">{t.name}</span>
                            <span className="font-display text-lg font-semibold" style={{ color: t.color }}>
                              {t.pct}%
                            </span>
                          </span>
                          <span className="mt-0.5 block truncate text-[12.5px] text-ink-dim">{t.sub}</span>
                          <span className="mt-2 block h-1 overflow-hidden rounded-full bg-pine-700">
                            <span
                              className="block h-full rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${t.pct}%`, backgroundColor: t.color }}
                            />
                          </span>
                        </span>
                        <Glyph
                          name="arrowR"
                          className="h-4 w-4 flex-none text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-gold-400"
                        />
                      </button>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
