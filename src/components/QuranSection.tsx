import { useMemo, useState } from "react";
import { fatiha, ikhlasDe, ikhlasWords, tajweedRules } from "../data/content";
import { AyahMarker, CornerOrn, Glyph, Reveal, SectionHead } from "./ui";

export default function QuranSection() {
  const [ruleId, setRuleId] = useState("mad");
  const rule = tajweedRules.find((r) => r.id === ruleId) ?? tajweedRules[0];

  const [shown, setShown] = useState<boolean[]>(() => ikhlasWords.map(() => false));
  const revealed = shown.filter(Boolean).length;

  const ruleColor = useMemo(() => {
    const map: Record<string, string> = {};
    tajweedRules.forEach((r) => (map[r.id] = r.color));
    return map;
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        kicker="Muṣḥaf & Regelkunde"
        title="Die Eröffnung lesen — und verstehen"
        ar="الفَاتِحَة"
        desc="Sūrat al-Fātiḥa, Wort für Wort übersetzt. Fahre über ein arabisches Wort, um seine Bedeutung zu sehen — farbig markierte Wörter tragen eine Taǧwīd-Regel."
      />

      {/* ---------- Muṣḥaf-Lesepanel ---------- */}
      <Reveal>
        <div className="relative overflow-hidden rounded-xl border border-gold-500/25 bg-gradient-to-b from-pine-800 to-pine-900 px-5 py-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] md:px-10 md:py-10">
          <CornerOrn className="absolute left-3 top-3" />
          <CornerOrn className="absolute right-3 top-3 rotate-90" />
          <CornerOrn className="absolute bottom-3 right-3 rotate-180" />
          <CornerOrn className="absolute bottom-3 left-3 -rotate-90" />

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gold-500/12 pb-5">
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">Sūrat al-Fātiḥa</h3>
              <p className="text-[12.5px] text-ink-dim">Die Eröffnende · 7 Āyāt · Mekkanisch</p>
            </div>
            <div dir="rtl" className="font-kufi text-3xl text-gold-500/90">
              سُورَةُ الفَاتِحَة
            </div>
          </div>

          <div dir="rtl" className="text-center font-quran text-[1.9rem] leading-[2.4] text-ink md:text-[2.45rem] md:leading-[2.5]">
            {fatiha.map((v) => (
              <span key={v.n} className="inline">
                {v.words.map((w, i) => (
                  <span
                    key={i}
                    tabIndex={0}
                    className="group/w relative inline-block cursor-help rounded transition-transform duration-200 hover:-translate-y-1 focus:outline-none"
                    style={w.rule ? { color: ruleColor[w.rule] } : undefined}
                  >
                    {w.ar}
                    <span className="word-tip rounded-md border border-gold-500/30 bg-pine-700 px-2.5 py-1 font-body text-[11.5px] font-semibold text-ink shadow-xl">
                      {w.de}
                    </span>{" "}
                  </span>
                ))}
                <AyahMarker n={v.n} />
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-gold-500/12 pt-5 text-[11.5px] font-semibold text-ink-dim">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ruleColor.mad }} />
              Madd (Dehnung)
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ruleColor.idhhar }} />
              Iẓhār (klares Nūn)
            </span>
            <span className="text-ink-faint">· Tooltip per Hover oder Fokus (Tab)</span>
          </div>
        </div>
      </Reveal>

      {/* ---------- Taǧwīd-Werkstatt ---------- */}
      <section className="pt-16">
        <Reveal>
          <div className="mb-8">
            <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-500">
              <span className="inline-block h-px w-8 bg-gold-500/70" />
              Taǧwīd-Werkstatt · sieben Regeln
            </p>
            <h3 className="font-display text-3xl font-semibold text-ink md:text-4xl">
              Wähle ein Beispiel — die Regel erklärt sich
            </h3>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-wrap gap-2.5">
            {tajweedRules.map((r) => (
              <button
                key={r.id}
                onClick={() => setRuleId(r.id)}
                className={`btn-press rounded-lg border px-4 py-2.5 transition-all ${
                  ruleId === r.id
                    ? "border-transparent shadow-lg"
                    : "border-pine-700 bg-pine-900/60 hover:border-gold-500/40"
                }`}
                style={
                  ruleId === r.id
                    ? { backgroundColor: `${r.color}22`, boxShadow: `inset 0 0 0 1.5px ${r.color}` }
                    : undefined
                }
              >
                <span dir="rtl" className="font-quran text-2xl leading-none" style={{ color: r.color }}>
                  {r.examples[0].segs.map((s, i) => (
                    <span key={i} style={s.hl ? { color: r.color } : { color: "#EFE8D6" }}>
                      {s.t}
                    </span>
                  ))}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div key={rule.id} className="view-enter mt-6 grid gap-6 rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:grid-cols-5 md:p-8">
          <div className="md:col-span-2">
            <p dir="rtl" className="font-kufi text-4xl leading-tight md:text-5xl" style={{ color: rule.color }}>
              {rule.ar}
            </p>
            <h4 className="mt-2 font-display text-2xl font-semibold text-ink">{rule.name}</h4>
            <p className="mt-1 text-sm font-semibold text-ink-dim">{rule.short}</p>
            {rule.letters && (
              <div className="mt-5 rounded-lg border border-pine-700 bg-pine-800/60 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-ink-faint">Beteiligte Buchstaben</p>
                <p dir="rtl" className="mt-1.5 font-quran text-2xl" style={{ color: rule.color }}>
                  {rule.letters}
                </p>
              </div>
            )}
          </div>
          <div className="md:col-span-3">
            <p className="text-[15px] leading-relaxed text-ink-dim">{rule.detail}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {rule.examples.map((ex, i) => (
                <div key={i} className="rounded-lg border border-pine-700 bg-pine-800/50 p-4 transition-colors hover:border-gold-500/35">
                  <p dir="rtl" className="text-center font-quran text-[2rem] leading-normal">
                    {ex.segs.map((s, j) => (
                      <span key={j} style={s.hl ? { color: rule.color } : undefined}>
                        {s.t}
                      </span>
                    ))}
                  </p>
                  <p className="mt-2.5 border-t border-pine-700 pt-2.5 text-center text-[11.5px] text-ink-dim">{ex.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Ḥifẓ-Trainer ---------- */}
      <section className="pb-20 pt-16">
        <Reveal>
          <div className="rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-9">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-500">
                  <span className="inline-block h-px w-8 bg-gold-500/70" />
                  Ḥifẓ-Trainer · Auswendiglernen
                </p>
                <h3 className="font-display text-3xl font-semibold text-ink md:text-4xl">Sūrat al-Iḫlāṣ — Wort für Wort</h3>
                <p className="mt-2 max-w-xl text-[14px] text-ink-dim">
                  Sprich jedes Wort aus dem Gedächtnis — und decke es per Klick auf, um dich zu prüfen.
                </p>
              </div>
              <p className="font-display text-lg text-gold-400">
                {revealed}
                <span className="text-ink-faint"> / {ikhlasWords.length} aufgedeckt</span>
              </p>
            </div>

            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-pine-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500 ease-out"
                style={{ width: `${(revealed / ikhlasWords.length) * 100}%` }}
              />
            </div>

            <div dir="rtl" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-5 rounded-lg border border-pine-700 bg-pine-950/50 px-5 py-9 font-quran text-[1.9rem] leading-relaxed text-ink md:text-[2.3rem]">
              {ikhlasWords.map((w, i) => (
                <span
                  key={i}
                  onClick={() => setShown((s) => s.map((v, j) => (j === i ? true : v)))}
                  title={shown[i] ? w : "Zum Aufdecken klicken"}
                  className={`inline-block transition-all duration-300 ${
                    shown[i] ? "text-ink" : "hifz-hidden"
                  }`}
                >
                  {w}
                  {(i === 3 || i === 5 || i === 9) && <AyahMarker n={i === 3 ? 1 : i === 5 ? 2 : 3} />}
                </span>
              ))}
              <AyahMarker n={4} />
            </div>

            <p dir="ltr" className="mt-4 text-center text-[13.5px] italic text-ink-dim">{ikhlasDe}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShown(ikhlasWords.map(() => false))}
                className="btn-press inline-flex items-center gap-2 rounded-full border border-gold-500/30 px-5 py-2.5 text-sm font-semibold text-gold-300 hover:bg-gold-500/10"
              >
                <Glyph name="reset" className="h-4 w-4" /> Zurücksetzen
              </button>
              <button
                onClick={() => setShown(ikhlasWords.map(() => Math.random() > 0.55))}
                className="btn-press inline-flex items-center gap-2 rounded-full border border-lapis-500/40 px-5 py-2.5 text-sm font-semibold text-lapis-400 hover:bg-lapis-500/10"
              >
                <Glyph name="shuffle" className="h-4 w-4" /> Neu mischen
              </button>
              <button
                onClick={() => setShown(ikhlasWords.map(() => true))}
                className="btn-press inline-flex items-center gap-2 rounded-full border border-teal-500/40 px-5 py-2.5 text-sm font-semibold text-teal-400 hover:bg-teal-500/10"
              >
                <Glyph name="eye" className="h-4 w-4" /> Alles zeigen
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
