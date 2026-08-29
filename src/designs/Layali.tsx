import { useState } from "react";
import { fatiha, roots, tajweedRules } from "../data/content";
import { Glyph } from "../components/ui";

/* Farbwelt B: Safran, Türkis, weiches Blau, Rose auf Lapisnacht */
const RULE_COLOR: Record<string, string> = {
  mad: "#E9A63C",
  qalqala: "#5BD8C8",
  ghunna: "#F6C877",
  ikhfa: "#8FB0E8",
  idgham: "#7FC8E8",
  idhhar: "#9BD8B0",
  iqlab: "#E88FA2",
};

function Basmala({ n }: { n: number }) {
  return (
    <span className="mx-2 inline-flex h-[1.6em] w-[1.6em] items-center justify-center rounded-full border border-saffron-500/60 align-middle text-[0.4em] font-bold text-saffron-400">
      {["١", "٢", "٣", "٤", "٥", "٦", "٧"][n - 1]}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-3 text-[10.5px] font-bold uppercase tracking-[0.3em] text-saffron-500">
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <rect x="3.5" y="3.5" width="7" height="7" transform="rotate(45 7 7)" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="7" cy="7" r="1.4" fill="currentColor" />
      </svg>
      {children}
    </p>
  );
}

export default function Layali() {
  const [sel, setSel] = useState<{ v: number; w: number } | null>({ v: 0, w: 2 });
  const [ruleId, setRuleId] = useState("qalqala");
  const [rootIdx, setRootIdx] = useState(0);

  const selWord = sel ? fatiha[sel.v].words[sel.w] : null;
  const selRuleInfo = selWord?.rule ? tajweedRules.find((r) => r.id === selWord.rule) : null;
  const rule = tajweedRules.find((r) => r.id === ruleId) ?? tajweedRules[0];
  const root = roots[rootIdx];

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-night-950 text-ivory">
      {/* Ambiente */}
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <div className="bg-lattice absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_0%,rgba(233,166,60,0.09),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_100%_100%,rgba(52,194,178,0.07),transparent_55%)]" />
      </div>

      <div className="relative z-10">
        {/* Kopfzeile */}
        <header className="sticky top-0 z-40 border-b border-saffron-500/15 bg-night-950/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
            <div className="flex items-center gap-3">
              <span className="relative grid h-10 w-10 place-items-center border border-saffron-500/50">
                <Glyph name="star8" className="spin-slow h-6 w-6 text-saffron-400" />
              </span>
              <div className="leading-none">
                <p className="font-marcellus text-[22px] tracking-[0.14em] text-ivory">
                  LAYĀLĪ <span className="text-saffron-400">·</span>
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.34em] text-ivory-dim">
                  Quran im Licht der Nacht
                </p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              {[
                ["layali-lesung", "Lesung"],
                ["layali-tajweed", "Taǧwīd"],
                ["layali-wurzeln", "Wurzeln"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => jump(id)}
                  className="font-marcellus text-[13px] uppercase tracking-[0.22em] text-ivory-dim transition-colors hover:text-saffron-300"
                >
                  {label}
                </button>
              ))}
            </nav>
            <span dir="rtl" className="font-quran text-xl text-saffron-500/80">
              اللَّيَالِي
            </span>
          </div>
        </header>

        {/* Auftakt: illuminierte Basmala */}
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:px-8 md:pt-20">
          <div className="relative mx-auto max-w-3xl">
            <Glyph
              name="star8"
              className="spin-slow pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 text-saffron-500/[0.05]"
            />
            <div className="illum-frame relative bg-night-900 px-8 py-12 text-center md:px-14 md:py-16">
              <p className="font-marcellus text-[11px] uppercase tracking-[0.4em] text-ivory-faint">
                Eröffnung des Buches
              </p>
              <p dir="rtl" className="mt-7 font-quran text-[2rem] leading-[1.9] text-saffron-300 md:text-[2.7rem]">
                بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ
              </p>
              <div className="mx-auto mt-7 flex items-center justify-center gap-3 text-saffron-500/60">
                <span className="h-px w-16 bg-saffron-500/40" />
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <rect x="3" y="3" width="6" height="6" transform="rotate(45 6 6)" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="h-px w-16 bg-saffron-500/40" />
              </div>
              <p className="mt-6 font-marcellus text-lg italic leading-relaxed text-ivory-dim md:text-xl">
                „Im Namen Allahs, des Allerbarmers, des Barmherzigen.“
              </p>
              <p className="mt-8 font-marcellus text-[12px] uppercase tracking-[0.3em] text-ivory-faint">
                Designstudie B — Manuskript & Nachtlektüre
              </p>
            </div>
          </div>
        </section>

        {/* Lesung: Buchaufschlag */}
        <section id="layali-lesung" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 md:px-8">
          <SectionLabel>Qirāʾa · die Lesung</SectionLabel>
          <h2 className="font-marcellus text-4xl tracking-wide text-ivory md:text-5xl">
            Sūrat al-Fātiḥa — <span className="text-saffron-400">Wort für Wort</span>
          </h2>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ivory-dim">
            Tippe auf ein Wort der Sūra — rechts öffnet sich seine Bedeutung, und falls es eine Taǧwīd-Regel
            trägt, wird sie benannt.
          </p>

          <div className="mt-9 grid gap-6 lg:grid-cols-12">
            {/* Textseite */}
            <div className="border border-saffron-500/25 bg-night-900/70 p-7 md:p-9 lg:col-span-7">
              <div dir="rtl" className="text-center font-quran text-[1.9rem] leading-[2.5] md:text-[2.3rem] md:leading-[2.55]">
                {fatiha.map((v, vi) => (
                  <span key={v.n}>
                    {v.words.map((w, wi) => {
                      const active = sel?.v === vi && sel?.w === wi;
                      return (
                        <button
                          key={wi}
                          onClick={() => setSel({ v: vi, w: wi })}
                          className={`relative inline-block rounded px-0.5 transition-all duration-200 hover:-translate-y-1 ${
                            active ? "bg-saffron-500/20" : "hover:bg-night-700/60"
                          }`}
                          style={w.rule ? { color: RULE_COLOR[w.rule] } : undefined}
                        >
                          {w.ar}{" "}
                        </button>
                      );
                    })}
                    <Basmala n={v.n} />
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-saffron-500/15 pt-4 text-[11px] font-semibold text-ivory-faint">
                {Object.entries(RULE_COLOR).slice(0, 4).map(([id, c]) => (
                  <span key={id} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c }} />
                    {tajweedRules.find((r) => r.id === id)?.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailseite */}
            <div className="lg:col-span-5">
              <div
                key={`${sel?.v}-${sel?.w}`}
                className="view-enter sticky top-28 h-full border border-saffron-500/25 bg-night-900/70 p-7"
              >
                <p className="font-marcellus text-[11px] uppercase tracking-[0.3em] text-saffron-500">
                  Wort {sel ? `${sel.w + 1} · Āya ${sel.v + 1}` : "—"}
                </p>
                {selWord && (
                  <>
                    <p dir="rtl" className="mt-4 font-quran text-6xl leading-tight text-saffron-300">
                      {selWord.ar}
                    </p>
                    <p className="mt-3 font-marcellus text-2xl italic text-ivory">{selWord.de}</p>
                    {selRuleInfo ? (
                      <div
                        className="mt-6 border-l-2 py-1 pl-4"
                        style={{ borderColor: RULE_COLOR[selRuleInfo.id] }}
                      >
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.24em]" style={{ color: RULE_COLOR[selRuleInfo.id] }}>
                          Taǧwīd-Regel · {selRuleInfo.name}
                        </p>
                        <p className="mt-1.5 text-[13.5px] leading-relaxed text-ivory-dim">{selRuleInfo.short}</p>
                      </div>
                    ) : (
                      <p className="mt-6 text-[13.5px] leading-relaxed text-ivory-dim">
                        Dieses Wort trägt an dieser Stelle keine besondere Ausspracheregel — es wird fließend
                        gelesen.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Taǧwīd-Kacheln */}
        <section id="layali-tajweed" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 md:px-8">
          <SectionLabel>Die sieben Kacheln</SectionLabel>
          <h2 className="font-marcellus text-4xl tracking-wide text-ivory md:text-5xl">
            Regeln wie <span className="text-turq-400">Keramikfliesen</span>
          </h2>

          <div className="mt-9 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
            {tajweedRules.map((r) => {
              const active = ruleId === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRuleId(r.id)}
                  className={`layali-tile group relative border bg-night-900/70 p-5 text-left ${
                    active ? "border-saffron-500/70 bg-night-800/80" : "border-night-600/60"
                  }`}
                >
                  <span
                    className="absolute right-3 top-3 h-2 w-2 rotate-45 transition-transform duration-300 group-hover:rotate-[135deg]"
                    style={{ backgroundColor: RULE_COLOR[r.id] }}
                  />
                  <p dir="rtl" className="font-quran text-4xl leading-tight" style={{ color: RULE_COLOR[r.id] }}>
                    {r.ar}
                  </p>
                  <p className="mt-2.5 font-marcellus text-lg tracking-wide text-ivory">{r.name}</p>
                  <p className="mt-1 text-[12px] leading-snug text-ivory-dim">{r.short}</p>
                </button>
              );
            })}
            <div className="layali-tile flex flex-col justify-center border border-dashed border-saffron-500/30 bg-transparent p-5">
              <p className="font-marcellus text-[13px] uppercase tracking-[0.22em] text-saffron-500/80">Ausgewählt</p>
              <p dir="rtl" className="mt-2 font-quran text-4xl text-saffron-300">{rule.ar}</p>
              <p className="mt-1 text-[12px] text-ivory-dim">Beispiele unten ↓</p>
            </div>
          </div>

          <div key={rule.id} className="view-enter mt-6 grid gap-4 border border-night-600/60 bg-night-900/60 p-6 md:grid-cols-2 md:p-8">
            {rule.examples.map((ex, i) => (
              <div key={i} className="layali-tile border border-night-600/50 bg-night-950/60 p-5">
                <p dir="rtl" className="text-center font-quran text-[2.1rem] leading-normal text-ivory">
                  {ex.segs.map((s, j) => (
                    <span key={j} style={s.hl ? { color: RULE_COLOR[rule.id] } : undefined}>
                      {s.t}
                    </span>
                  ))}
                </p>
                <p className="mt-3 border-t border-night-600/50 pt-3 text-center text-[12px] text-ivory-dim">{ex.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Wurzeln */}
        <section id="layali-wurzeln" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 md:px-8">
          <SectionLabel>Ǧuḏūr · die Wurzeln</SectionLabel>
          <h2 className="font-marcellus text-4xl tracking-wide text-ivory md:text-5xl">
            Drei Buchstaben, <span className="text-saffron-400">ein Gedanke</span>
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            {roots.map((r, i) => (
              <button
                key={r.root}
                onClick={() => setRootIdx(i)}
                className={`border px-5 py-2.5 font-quran text-2xl transition-all duration-300 ${
                  i === rootIdx
                    ? "border-saffron-500 bg-saffron-500/15 text-saffron-300"
                    : "border-night-600/60 text-ivory-dim hover:border-saffron-500/50 hover:text-ivory"
                }`}
              >
                {r.root}
              </button>
            ))}
          </div>

          <div key={root.root} className="view-enter mt-6">
            <p className="border-l-2 border-saffron-500 pl-4 font-marcellus text-lg italic text-ivory-dim">
              {root.tr} — <span className="text-saffron-300">„{root.meaning}“</span>
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {root.forms.map((f) => (
                <div key={f.ar} className="layali-tile border border-night-600/60 bg-night-900/70 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-turq-400/90">{f.slot}</p>
                  <p dir="rtl" className="mt-1.5 font-quran text-[1.7rem] leading-tight text-ivory">{f.ar}</p>
                  <p className="mt-1 text-[12.5px] text-ivory-dim">{f.de}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fußzeile */}
        <footer className="border-t border-saffron-500/15">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-7 md:px-8">
            <p className="flex items-center gap-3 font-marcellus text-[12px] uppercase tracking-[0.26em] text-ivory-faint">
              <Glyph name="star8" className="spin-slow h-5 w-5 text-saffron-500/70" />
              Layālī · Designstudie B
            </p>
            <p dir="rtl" className="font-quran text-lg text-saffron-500/70">
              وَجَعَلْنَا اللَّيْلَ لِبَاسًا
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
