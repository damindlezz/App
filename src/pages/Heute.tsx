import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../backend/store";
import { ayahOfDay, dhikrPresets, planItems, prayerTimes, SUBJECTS } from "../data/content";
import { greeting } from "../components/Shell";
import { AyahMarker, CornerOrn, Glyph, Reveal, Ring, usePersistentState } from "../components/ui";
import type { GlyphName } from "../components/ui";

const toSeconds = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 3600 + m * 60;
};

function hijriLabel(): string {
  try {
    return new Intl.DateTimeFormat("de-DE-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  } catch {
    return "";
  }
}

/* ---------- Gebetszeiten (Konzept-Beispielwerte) ---------- */
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
    <div className="h-full rounded-xl border border-gold-500/15 bg-pine-900/70 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Gebetszeiten · Beispiel Berlin</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink">Der Tag im Takt der Ṣalāh</h3>
        </div>
        <p className="font-display text-3xl font-semibold tabular-nums text-ink">{now.toLocaleTimeString("de-DE")}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg border border-gold-500/30 bg-gold-500/[0.07] px-4 py-2.5">
        <Glyph name="clock" className="h-4 w-4 text-gold-400" />
        <p className="text-[13px] text-ink-dim">
          Als Nächstes: <strong className="font-bold text-gold-300">{next.name}</strong>{" "}
          <span dir="rtl" className="font-kufi text-[14px] text-gold-400">{next.ar}</span>
        </p>
        <p className="ml-auto font-display text-xl font-semibold tabular-nums text-gold-300">
          {pad(Math.floor(diff / 3600))}:{pad(Math.floor((diff % 3600) / 60))}:{pad(diff % 60)}
        </p>
      </div>

      <div className="mt-3.5 grid grid-cols-5 gap-1.5">
        {prayerTimes.map((p, i) => {
          const isNext = i === nextIdx;
          const passed = !allPassed && toSeconds(p.time) <= nowSec;
          return (
            <div
              key={p.name}
              className={`rounded-lg border px-1 py-2.5 text-center transition-all duration-500 ${
                isNext ? "border-gold-500/60 bg-gold-500/10" : passed ? "border-pine-700/60 opacity-45" : "border-pine-700"
              }`}
            >
              <p className={`text-[12px] font-bold ${isNext ? "text-gold-300" : "text-ink"}`}>{p.name}</p>
              <p dir="rtl" className={`font-kufi text-sm leading-tight ${isNext ? "text-gold-400" : "text-ink-dim"}`}>{p.ar}</p>
              <p className={`mt-0.5 text-[12px] font-bold tabular-nums ${isNext ? "text-gold-300" : "text-ink-dim"}`}>{p.time}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[10.5px] text-ink-faint">Konzept: statische Beispielwerte — die fertige App berechnet astronomisch nach Standort.</p>
    </div>
  );
}

/* ---------- Tasbīḥ ---------- */
function Tasbih() {
  const [preset, setPreset] = usePersistentState("nur-tasbih-preset", 0);
  const [count, setCount] = usePersistentState("nur-tasbih-count", 0);
  const [pop, setPop] = useState(false);
  const d = dhikrPresets[preset] ?? dhikrPresets[0];
  const inRound = count % 33;
  const round = Math.floor(count / 33) + 1;
  const C = 2 * Math.PI * 44;

  const click = () => {
    setCount((c) => c + 1);
    setPop(false);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => setPop(true)));
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-gold-500/15 bg-pine-900/70 p-6">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Tasbīḥ · Dhikr</p>
      <h3 className="mt-1 font-display text-xl font-semibold text-ink">Der digitale Misbāḥ</h3>

      <div className="mt-4 grid grid-cols-2 gap-1.5">
        {dhikrPresets.map((p, i) => (
          <button
            key={p.tr}
            onClick={() => setPreset(i)}
            className={`btn-press rounded-lg border px-2.5 py-1.5 text-left transition-all ${
              i === preset ? "border-gold-500 bg-gold-500/10" : "border-pine-700 hover:border-gold-500/40"
            }`}
          >
            <span dir="rtl" className={`block font-quran text-base leading-tight ${i === preset ? "text-gold-300" : "text-ink"}`}>{p.ar}</span>
            <span className="block text-[10px] text-ink-faint">{p.tr}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-1 items-center justify-center gap-6">
        <button
          onClick={click}
          aria-label="Zähler erhöhen"
          className="btn-press relative grid h-36 w-36 flex-none place-items-center rounded-full border border-gold-500/25 bg-pine-950/60 transition-transform hover:scale-[1.03] active:scale-95"
        >
          <svg className="absolute inset-1 -rotate-90" viewBox="0 0 104 104" aria-hidden>
            <circle cx="52" cy="52" r="44" fill="none" stroke="var(--color-pine-700)" strokeWidth="5" />
            <circle
              cx="52" cy="52" r="44" fill="none" stroke="var(--color-gold-500)" strokeWidth="5" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - inRound / 33)}
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <span className="text-center">
            <span className={`block font-display text-4xl font-semibold text-ink transition-transform duration-150 ${pop ? "scale-125" : "scale-100"}`}>
              {count}
            </span>
            <span className="mt-0.5 block text-[9.5px] font-bold uppercase tracking-[0.2em] text-ink-faint">Runde {round} · /33</span>
          </span>
        </button>
        <div className="min-w-0">
          <p dir="rtl" className="font-quran text-2xl text-ink">{d.ar}</p>
          <p className="mt-1 text-[12px] italic text-ink-dim">{d.de}</p>
          <p className="mt-2 text-[11px] text-ink-faint">{count > 0 && count % 99 === 0 ? "99 vollendet — māšāʾallāh" : "33 je Runde · Ziel 99"}</p>
        </div>
      </div>

      <button
        onClick={() => setCount(0)}
        className="btn-press mt-4 flex w-fit items-center gap-2 rounded-full border border-pine-700 px-4 py-1.5 text-[12px] font-bold text-ink-dim hover:border-gold-500/40 hover:text-gold-300"
      >
        <Glyph name="reset" className="h-3.5 w-3.5" /> Nullsetzen
      </button>
    </div>
  );
}

/* ---------- Āya des Tages ---------- */
function AyahPanel() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-gold-500/25 bg-gradient-to-b from-pine-800 to-pine-900 p-6">
      <CornerOrn className="absolute left-2.5 top-2.5" />
      <CornerOrn className="absolute right-2.5 top-2.5 rotate-90" />
      <CornerOrn className="absolute bottom-2.5 right-2.5 rotate-180" />
      <CornerOrn className="absolute bottom-2.5 left-2.5 -rotate-90" />

      <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500/80">Āya des Tages · {ayahOfDay.ref}</p>
      <div dir="rtl" className="mt-4 border-y border-gold-500/15 py-5 text-center">
        <p className="font-quran text-[1.9rem] leading-[1.85] text-ink">
          <span className="text-gold-400">اقْرَأْ</span> بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
        </p>
      </div>
      <p className="mt-4 text-center font-display text-lg italic leading-snug text-gold-300">{ayahOfDay.de}</p>
      <p className="mt-4 rounded-lg border border-teal-500/20 bg-teal-500/[0.06] px-3.5 py-3 text-[12.5px] leading-relaxed text-ink-dim">
        <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-teal-400">
          <Glyph name="lamp" className="h-3 w-3" /> Tafsīr-Notiz
        </span>
        {ayahOfDay.tafsir}
      </p>
      <div className="mt-4 flex items-center justify-center gap-2 text-gold-500/50">
        <AyahMarker n={1} />
        <span className="text-[11px]">96:1</span>
      </div>
    </div>
  );
}

/* ============================================================ */
/* HEUTE                                                         */
/* ============================================================ */
export default function Heute() {
  const app = useApp();
  const { stats, dueCount, quizToday, plan, togglePlan, subjectProgress, overallPct, progress } = app;

  const now = new Date();
  const dateLabel = now.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });

  /* Weiterlernen: zuletzt aktives Fach, sonst das mit dem geringsten Fortschritt */
  const active =
    SUBJECTS.find((s) => s.id === progress.lastSubject) ??
    [...SUBJECTS].sort((a, b) => subjectProgress(a.id).pct - subjectProgress(b.id).pct)[0];
  const ap = subjectProgress(active.id);
  const minutesToday = Math.round(stats.reviewsToday * 0.75 + quizToday * 3);

  const planDone = plan.filter(Boolean).length;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-8">
      {/* ---------- Kopf ---------- */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-500">
            {dateLabel} · {hijriLabel()}
          </p>
          <h1 className="mt-1.5 font-display text-4xl font-semibold text-ink md:text-5xl">
            {greeting()}<span className="text-gold-500">.</span>
          </h1>
          <p className="mt-2 text-[14px] text-ink-dim">
            {dueCount > 0
              ? `${dueCount} Karteikarten warten auf dich — und dein Fach ${active.name} ist zu ${ap.pct} % erschlossen.`
              : `Alles wiederholt — Zeit für ${active.name} (${ap.pct} % erschlossen).`}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-2 rounded-full border border-gold-500/25 bg-pine-800/70 px-4 py-2">
            <Glyph name="flame" className="h-4 w-4 text-gold-400" />
            <span className="text-[13px] font-bold text-ink">{stats.streak} {stats.streak === 1 ? "Tag" : "Tage"} Serie</span>
          </span>
          <span className="flex items-center gap-2 rounded-full border border-pine-700 bg-pine-800/70 px-4 py-2">
            <Glyph name="star8" className="h-4 w-4 text-gold-500" />
            <span className="text-[13px] font-bold text-ink">{stats.xp} XP</span>
          </span>
        </div>
      </div>

      {/* ---------- Weiterlernen ---------- */}
      <Reveal>
        <Link
          to={ap.next ? active.route : active.route}
          className="card-hover group mt-8 flex flex-col gap-5 rounded-xl border p-6 md:flex-row md:items-center md:p-7"
          style={{ borderColor: `${active.color}45`, background: `linear-gradient(120deg, ${active.color}14, transparent 55%)` }}
        >
          <span className="grid h-14 w-14 flex-none place-items-center rounded-xl" style={{ backgroundColor: `${active.color}1f`, color: active.color }}>
            <Glyph name={active.icon as GlyphName} className="h-7 w-7" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.26em]" style={{ color: active.color }}>
                Weiterlernen
              </span>
              <span className="text-[11px] font-bold text-ink-faint">{ap.done}/{ap.total} Lektionen</span>
            </span>
            <span className="mt-1 block font-display text-2xl font-semibold text-ink md:text-[1.7rem]">
              {active.name}
              <span dir="rtl" className="ml-3 font-kufi text-xl text-ink-dim">{active.ar}</span>
            </span>
            <span className="mt-0.5 block text-[13.5px] text-ink-dim">
              {ap.next ? `Als Nächstes: ${ap.next.title}` : "Alle Lektionen abgeschlossen — neue Empfehlung unten."}
            </span>
            <span className="mt-3 flex items-center gap-3">
              <span className="h-1.5 max-w-xs flex-1 overflow-hidden rounded-full bg-pine-700">
                <span className="block h-full rounded-full transition-all duration-700" style={{ width: `${ap.pct}%`, backgroundColor: active.color }} />
              </span>
              <span className="font-display text-lg font-semibold" style={{ color: active.color }}>{ap.pct}%</span>
            </span>
          </span>
          <span className="btn-press inline-flex flex-none items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-[14px] font-bold text-pine-950 group-hover:bg-gold-400">
            Fortsetzen
            <Glyph name="arrowR" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </Reveal>

      {/* ---------- Kennzahlen ---------- */}
      <div className="mt-5 grid gap-3.5 sm:grid-cols-3">
        <Link to="/training" className="card-hover rounded-xl border border-pine-700 bg-pine-900/70 px-5 py-4">
          <p className="font-display text-3xl font-semibold text-teal-400">{dueCount}</p>
          <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-dim">Karten fällig</p>
        </Link>
        <div className="rounded-xl border border-pine-700 bg-pine-900/70 px-5 py-4">
          <p className="font-display text-3xl font-semibold text-lapis-400">{minutesToday} Min.</p>
          <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-dim">heute gelernt</p>
        </div>
        <div className="rounded-xl border border-pine-700 bg-pine-900/70 px-5 py-4">
          <p className="font-display text-3xl font-semibold text-gold-400">{stats.weekXp} XP</p>
          <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-dim">diese Woche</p>
        </div>
      </div>

      {/* ---------- Heute-Liste + Āya ---------- */}
      <section className="mt-10 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="h-full rounded-xl border border-gold-500/15 bg-pine-900/70 p-6">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Heute</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Dein Wird</h3>
              </div>
              <Ring pct={Math.round((planDone / planItems.length) * 100)} size={58} stroke={5} color="#4FC1A6">
                <span className="text-[12px] font-extrabold text-teal-400">{planDone}/{planItems.length}</span>
              </Ring>
            </div>
            <ul className="space-y-1">
              {planItems.map((item, i) => (
                <li key={item.label}>
                  <label
                    className={`flex cursor-pointer items-center gap-3.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-pine-800/80 ${
                      plan[i] ? "opacity-60" : ""
                    }`}
                  >
                    <input type="checkbox" className="plan-check" checked={plan[i] ?? false} onChange={() => togglePlan(i)} />
                    <span className={`flex-1 text-[14.5px] font-medium ${plan[i] ? "text-ink-dim line-through decoration-teal-500/60" : "text-ink"}`}>
                      {item.label}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-faint">
                      <Glyph name="clock" className="h-3.5 w-3.5" /> {item.time}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            {planDone === planItems.length && (
              <p className="mt-3 rounded-lg border border-gold-500/30 bg-gold-500/10 px-4 py-2.5 text-center text-sm font-semibold text-gold-300">
                Māšāʾallāh — der Plan ist erfüllt. <span dir="rtl" className="font-kufi">ما شاء الله</span>
              </p>
            )}
            <Link
              to="/training"
              className="btn-press mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-[14px] font-bold text-pine-950 hover:bg-gold-400"
            >
              <Glyph name="qalam" className="h-4 w-4" /> Training starten
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <AyahPanel />
        </div>
      </section>

      {/* ---------- Fächer (echter Fortschritt) ---------- */}
      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Fächer</p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Wo du wirklich stehst</h3>
          </div>
          <Link to="/fortschritt" className="btn-press flex items-center gap-2 text-[13px] font-bold text-gold-300 hover:text-gold-400">
            Gesamtfortschritt <Glyph name="arrowR" className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-5">
          {SUBJECTS.map((s, i) => {
            const p = subjectProgress(s.id);
            return (
              <Reveal key={s.id} delay={i * 60}>
                <Link to={s.route} className="card-hover group flex h-full flex-col rounded-xl border border-pine-700 bg-pine-900/70 p-4.5">
                  <span className="grid h-10 w-10 place-items-center rounded-lg" style={{ backgroundColor: `${s.color}1a`, color: s.color }}>
                    <Glyph name={s.icon as GlyphName} className="h-5 w-5" />
                  </span>
                  <span className="mt-3 font-display text-[16px] font-semibold text-ink group-hover:text-gold-300">{s.name}</span>
                  <span className="mt-0.5 text-[11.5px] text-ink-dim">{p.done}/{p.total} Lektionen</span>
                  <span className="mt-3 flex items-center gap-2.5">
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-pine-700">
                      <span className="block h-full rounded-full transition-all duration-700" style={{ width: `${p.pct}%`, backgroundColor: s.color }} />
                    </span>
                    <span className="font-display text-sm font-semibold" style={{ color: s.color }}>{p.pct}%</span>
                  </span>
                  {p.next && <span className="mt-2.5 truncate text-[11.5px] text-ink-faint">→ {p.next.title}</span>}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- Gebetszeiten + Tasbīḥ ---------- */}
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <PrayerPanel />
        <Tasbih />
      </section>

      <p className="mt-8 text-center text-[12px] text-ink-faint">
        Gesamtfortschritt: <strong className="text-gold-400">{overallPct()} %</strong> · Fortschritt entsteht aus Lektionen, Karten, Quiz, Übungen und Ḥifẓ.
      </p>
    </div>
  );
}
