import { useEffect, useState } from "react";
import {
  ayahOfDay,
  dhikrPresets,
  marqueeWords,
  planItems,
  prayerTimes,
  tracks,
} from "../data/content";
import type { TabId } from "./TopBar";
import { AyahMarker, CornerOrn, Glyph, Reveal, Ring, usePersistentState } from "./ui";
import type { GlyphName } from "./ui";

const chips = ["Fuṣḥā A1–C1", "Taǧwīd & Ḥifẓ", "Fiqh · 4 Madhāhib", "Ḥadīṯ & Uṣūl", "ʿUlūm"];

const toSeconds = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 3600 + m * 60;
};

/* ---------- Gebetszeiten mit Live-Uhr & Countdown ---------- */
function PrayerPanel() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const nowSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  let nextIdx = prayerTimes.findIndex((p) => toSeconds(p.time) > nowSec);
  if (nextIdx === -1) nextIdx = 0;
  const allPassed = prayerTimes.every((p) => toSeconds(p.time) <= nowSec);
  let diff = toSeconds(prayerTimes[nextIdx].time) - nowSec;
  if (diff < 0) diff += 86400;
  const pad = (n: number) => String(n).padStart(2, "0");
  const next = prayerTimes[nextIdx];

  return (
    <div className="h-full rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">
            Gebetszeiten · Beispiel: Berlin
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Der Tag im Takt der Ṣalāh</h3>
        </div>
        <div className="text-right">
          <p className="font-display text-4xl font-semibold tabular-nums text-ink">
            {now.toLocaleTimeString("de-DE")}
          </p>
          <p className="mt-0.5 text-[11.5px] text-ink-dim">
            {now.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-gold-500/30 bg-gold-500/[0.07] px-4 py-3">
        <Glyph name="clock" className="h-4.5 w-4.5 text-gold-400" />
        <p className="text-[13.5px] text-ink-dim">
          Nächstes Gebet: <strong className="font-bold text-gold-300">{next.name}</strong>{" "}
          <span dir="rtl" className="font-kufi text-[15px] text-gold-400">{next.ar}</span>
        </p>
        <p className="ml-auto font-display text-2xl font-semibold tabular-nums text-gold-300">
          {pad(Math.floor(diff / 3600))}:{pad(Math.floor((diff % 3600) / 60))}:{pad(diff % 60)}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {prayerTimes.map((p, i) => {
          const isNext = i === nextIdx;
          const passed = !allPassed && toSeconds(p.time) <= nowSec;
          return (
            <div
              key={p.name}
              className={`rounded-lg border px-2 py-3.5 text-center transition-all duration-500 ${
                isNext
                  ? "border-gold-500/60 bg-gold-500/10"
                  : passed
                    ? "border-pine-700/60 bg-pine-950/30 opacity-45"
                    : "border-pine-700 bg-pine-950/40"
              }`}
            >
              <p className={`font-display text-[15px] font-semibold ${isNext ? "text-gold-300" : "text-ink"}`}>
                {p.name}
              </p>
              <p dir="rtl" className={`font-kufi text-lg leading-tight ${isNext ? "text-gold-400" : "text-ink-dim"}`}>
                {p.ar}
              </p>
              <p className={`mt-1 text-[13px] font-bold tabular-nums ${isNext ? "text-gold-300" : "text-ink-dim"}`}>
                {p.time}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[11.5px] leading-relaxed text-ink-faint">
        Statische Beispielzeiten für das Konzept — die fertige App berechnet die Zeiten astronomisch aus dem Standort.
      </p>
    </div>
  );
}

/* ---------- Tasbīḥ-Zähler (digitaler Misbāḥ) ---------- */
function Tasbih() {
  const [preset, setPreset] = usePersistentState("nur-tasbih-preset", 0);
  const [count, setCount] = usePersistentState("nur-tasbih-count", 0);
  const [pop, setPop] = useState(false);
  const d = dhikrPresets[preset] ?? dhikrPresets[0];
  const inRound = count % 33;
  const round = Math.floor(count / 33) + 1;
  const C = 2 * Math.PI * 52;

  const click = () => {
    setCount((c) => c + 1);
    setPop(false);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => setPop(true)));
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7">
      <div>
        <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Tasbīḥ · Dhikr</p>
        <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Der digitale Misbāḥ</h3>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {dhikrPresets.map((p, i) => (
          <button
            key={p.tr}
            onClick={() => setPreset(i)}
            className={`btn-press rounded-lg border px-3 py-2 text-left transition-all ${
              i === preset
                ? "border-gold-500 bg-gold-500/10"
                : "border-pine-700 bg-pine-950/40 hover:border-gold-500/40"
            }`}
          >
            <span dir="rtl" className={`block font-quran text-lg leading-tight ${i === preset ? "text-gold-300" : "text-ink"}`}>
              {p.ar}
            </span>
            <span className="block text-[11px] text-ink-faint">{p.tr}</span>
          </button>
        ))}
      </div>

      <p dir="rtl" className="mt-6 text-center font-quran text-3xl text-ink">{d.ar}</p>
      <p className="mt-1 text-center text-[12.5px] italic text-ink-dim">{d.de}</p>

      <button
        onClick={click}
        aria-label="Zähler erhöhen"
        className="btn-press relative mx-auto mt-6 grid h-44 w-44 place-items-center rounded-full border border-gold-500/25 bg-pine-950/60 shadow-[inset_0_0_30px_rgba(216,178,92,0.06)] transition-transform hover:scale-[1.03] active:scale-95"
      >
        <svg className="absolute inset-1 -rotate-90" viewBox="0 0 120 120" aria-hidden>
          <circle cx="60" cy="60" r="52" fill="none" stroke="#124437" strokeWidth="5" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#D8B25C"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - inRound / 33)}
            className="transition-all duration-300 ease-out"
          />
        </svg>
        <span className="text-center">
          <span
            className={`block font-display text-5xl font-semibold text-ink transition-transform duration-150 ${
              pop ? "scale-125" : "scale-100"
            }`}
          >
            {count}
          </span>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.22em] text-ink-faint">
            Runde {round} · /33
          </span>
        </span>
      </button>

      <div className="mt-auto flex items-center justify-between pt-6">
        <button
          onClick={() => setCount(0)}
          className="btn-press flex items-center gap-2 rounded-full border border-pine-700 px-4 py-2 text-[12.5px] font-bold text-ink-dim hover:border-gold-500/40 hover:text-gold-300"
        >
          <Glyph name="reset" className="h-3.5 w-3.5" /> Nullsetzen
        </button>
        {count > 0 && count % 99 === 0 ? (
          <span className="text-[12.5px] font-bold text-teal-400">99 vollendet — māšāʾallāh</span>
        ) : (
          <span className="text-[12px] text-ink-faint">33 je Runde · Ziel 99</span>
        )}
      </div>
    </div>
  );
}

export default function Dashboard({ setTab }: { setTab: (t: TabId) => void }) {
  const [plan, setPlan] = usePersistentState<boolean[]>("nur-tagesplan", planItems.map((p) => p.done));
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

      {/* ---------- Gebetszeiten + Tasbīḥ ---------- */}
      <section className="grid gap-8 py-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <PrayerPanel />
        </Reveal>
        <Reveal delay={140} className="lg:col-span-5">
          <Tasbih />
        </Reveal>
      </section>

      {/* ---------- Tagesplan + Lernpfade ---------- */}
      <section className="grid gap-8 pb-16 lg:grid-cols-12">
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
                        checked={plan[i] ?? false}
                        onChange={() =>
                          setPlan((p) => planItems.map((_, j) => (j === i ? !(p[j] ?? false) : (p[j] ?? false))))
                        }
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
