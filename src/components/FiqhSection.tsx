import { useEffect, useState } from "react";
import { useApp } from "../backend/store";
import { imams, issues, madhabMeta, usulMethods, usulSources } from "../data/content";
import { Glyph, Reveal, SectionHead } from "./ui";

export default function FiqhSection() {
  const app = useApp();
  const [issueIdx, setIssueIdx] = useState(0);
  const issue = issues[issueIdx];

  const [srcIdx, setSrcIdx] = useState(0);
  const [methodIdx, setMethodIdx] = useState(0);

  /* Lektions-Tracking aus echtem Verhalten */
  const [visitedIssues, setVisitedIssues] = useState<Set<number>>(() => new Set([0]));
  const [visitedSrcs, setVisitedSrcs] = useState<Set<number>>(() => new Set([0]));
  const [visitedMethods, setVisitedMethods] = useState<Set<number>>(() => new Set([0]));
  useEffect(() => setVisitedIssues((s) => (s.has(issueIdx) ? s : new Set(s).add(issueIdx))), [issueIdx]);
  useEffect(() => setVisitedSrcs((s) => (s.has(srcIdx) ? s : new Set(s).add(srcIdx))), [srcIdx]);
  useEffect(() => setVisitedMethods((s) => (s.has(methodIdx) ? s : new Set(s).add(methodIdx))), [methodIdx]);
  useEffect(() => {
    if (visitedIssues.size >= issues.length) app.completeLesson("fiqh", "madahib");
  }, [visitedIssues, app]);
  useEffect(() => {
    if (visitedSrcs.size >= usulSources.length) app.completeLesson("fiqh", "usul-quellen");
  }, [visitedSrcs, app]);
  useEffect(() => {
    if (visitedMethods.size >= 4) app.completeLesson("fiqh", "methoden");
  }, [visitedMethods, app]);

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        kicker="Fiqh der vier Schulen"
        title="Vier Schulen — ein Recht"
        ar="الفِقْه"
        desc="Ḥanafī, Mālikī, Šāfiʿī und Ḥanbalī: dieselben Quellen, verschiedene Methoden — und legitime Vielfalt in der Antwort. Der Vergleich macht die Methodik sichtbar."
      />

      {/* ---------- Imame ---------- */}
      <Reveal>
        <div className="relative">
          <div className="absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-teal-500/40 via-gold-500/40 to-copper-500/40 lg:block" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {imams.map((im, i) => (
              <div
                key={im.name}
                className="card-hover relative rounded-xl border border-pine-700 bg-pine-900/80 p-5"
                style={{ borderTopColor: `${im.color}55` }}
              >
                <span
                  className="relative z-10 mb-4 grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-extrabold"
                  style={{ borderColor: im.color, color: im.color, backgroundColor: "#082A22" }}
                >
                  {i + 1}
                </span>
                <p className="font-display text-xl font-semibold text-ink">{im.name}</p>
                <p className="text-[12.5px] text-ink-dim">{im.full}</p>
                <p className="mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ backgroundColor: `${im.color}1c`, color: im.color }}>
                  {im.life} · {im.place}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-dim">{im.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---------- Vergleichs-Werkstatt ---------- */}
      <section className="pt-16">
        <Reveal>
          <div className="mb-8">
            <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-500">
              <span className="inline-block h-px w-8 bg-gold-500/70" />
              Vergleichs-Werkstatt · Ḫilāf
            </p>
            <h3 className="font-display text-3xl font-semibold text-ink md:text-4xl">
              Eine Frage, vier Antworten
            </h3>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="flex flex-col gap-2.5 lg:sticky lg:top-32">
              {issues.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setIssueIdx(i)}
                  className={`btn-press rounded-lg border px-4 py-3.5 text-left transition-all ${
                    i === issueIdx
                      ? "border-gold-500/60 bg-gold-500/10"
                      : "border-pine-700 bg-pine-900/60 hover:border-gold-500/35"
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full font-display text-[13px] font-bold ${
                        i === issueIdx ? "bg-gold-500 text-pine-950" : "bg-pine-700 text-ink-dim"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className={`block text-[14.5px] font-bold leading-snug ${i === issueIdx ? "text-gold-300" : "text-ink"}`}>
                        {q.q}
                      </span>
                      <span className="mt-1 block text-[12px] leading-snug text-ink-dim">{q.context}</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <div key={issue.id} className="view-enter grid gap-4 md:grid-cols-2">
              {issue.positions.map((p, i) => {
                const m = madhabMeta[p.madhab];
                return (
                  <Reveal key={p.madhab} delay={i * 90}>
                    <div className="card-hover h-full rounded-xl border border-pine-700 bg-pine-900/80 p-5" style={{ borderLeftColor: m.color, borderLeftWidth: 3 }}>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span
                          className="flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-extrabold uppercase tracking-[0.14em]"
                          style={{ backgroundColor: `${m.color}1c`, color: m.color }}
                        >
                          <Glyph name="scale" className="h-3.5 w-3.5" />
                          {m.name}
                        </span>
                        <span dir="rtl" className="font-kufi text-lg" style={{ color: `${m.color}cc` }}>
                          {m.ar}
                        </span>
                      </div>
                      <p className="font-display text-[17px] font-semibold leading-snug text-ink">{p.ruling}</p>
                      <p className="mt-3 border-t border-pine-700/80 pt-3 text-[13px] leading-relaxed text-ink-dim">
                        <span className="mr-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500/80">Dalīl ·</span>
                        {p.evidence}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={200}>
              <p className="mt-5 rounded-lg border border-teal-500/20 bg-teal-500/[0.06] px-4 py-3 text-[12.5px] leading-relaxed text-ink-dim">
                <strong className="text-teal-400">Adab al-Ḫilāf:</strong> Die Schulen unterscheiden sich in der Methode, nicht im Respekt.
                Wer einer Schule folgt, ehrt auch die anderen — vereinfachte Lernübersicht, kein Fetwa-Ersatz.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Uṣūl al-Fiqh ---------- */}
      <section className="pb-20 pt-16">
        <Reveal>
          <div className="mb-8">
            <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-500">
              <span className="inline-block h-px w-8 bg-gold-500/70" />
              Uṣūl al-Fiqh · Rechtsmethodik
            </p>
            <h3 className="font-display text-3xl font-semibold text-ink md:text-4xl">Die Hierarchie der Quellen</h3>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex h-full flex-col justify-center gap-2.5">
              {usulSources.map((s, i) => {
                const widths = ["w-[52%]", "w-[68%]", "w-[84%]", "w-full"];
                return (
                  <button
                    key={s.name}
                    onClick={() => setSrcIdx(i)}
                    className={`btn-press group flex items-center justify-between gap-4 rounded-lg border px-5 py-4 text-left transition-all ${
                      srcIdx === i ? "border-gold-500/60 bg-gold-500/[0.08]" : "border-pine-700 bg-pine-900/70 hover:border-gold-500/35"
                    } ${widths[i]} mx-auto`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-7 w-7 place-items-center rounded-full font-display text-[13px] font-bold" style={{ backgroundColor: `${s.color}26`, color: s.color }}>
                        {i + 1}
                      </span>
                      <span className="font-display text-lg font-semibold text-ink md:text-xl">{s.name}</span>
                    </span>
                    <span dir="rtl" className="font-kufi text-2xl transition-colors" style={{ color: srcIdx === i ? s.color : "#6F8373" }}>
                      {s.ar}
                    </span>
                  </button>
                );
              })}
              <p className="mt-3 text-center text-[12px] text-ink-faint">▼ absteigende Verbindlichkeit — Quelle wählen für Erklärung</p>
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <div key={srcIdx} className="view-enter h-full rounded-xl border border-gold-500/20 bg-pine-900/80 p-6 md:p-7">
              <p dir="rtl" className="font-kufi text-5xl leading-tight" style={{ color: usulSources[srcIdx].color }}>
                {usulSources[srcIdx].ar}
              </p>
              <h4 className="mt-2 font-display text-2xl font-semibold text-ink">{usulSources[srcIdx].name}</h4>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">{usulSources[srcIdx].desc}</p>
              <div className="mt-6 border-t border-pine-700 pt-5">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-500">Methoden der Ableitung</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {usulMethods.map((m, i) => (
                    <button
                      key={m.name}
                      onClick={() => setMethodIdx(i)}
                      className={`btn-press rounded-full border px-3 py-1.5 text-[12px] font-bold transition-all ${
                        methodIdx === i
                          ? "border-gold-500 bg-gold-500/15 text-gold-300"
                          : "border-pine-700 text-ink-dim hover:border-gold-500/40 hover:text-ink"
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
                <div key={methodIdx} className="view-enter mt-4 rounded-lg border border-pine-700 bg-pine-950/50 px-4 py-3.5">
                  <p className="font-display text-[15px] font-semibold text-gold-300">
                    {usulMethods[methodIdx].name}{" "}
                    <span dir="rtl" className="font-kufi text-base text-gold-500/80">{usulMethods[methodIdx].ar}</span>
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-dim">{usulMethods[methodIdx].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
