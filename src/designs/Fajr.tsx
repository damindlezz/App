import { useEffect, useState } from "react";
import { alphabet, planItems, prayerTimes, roots, tajweedRules, vocab } from "../data/content";
import { Glyph, usePersistentState } from "../components/ui";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return now;
}

export default function Fajr() {
  const now = useClock();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const withMin = prayerTimes.map((p) => {
    const [h, m] = p.time.split(":").map(Number);
    return { ...p, min: h * 60 + m };
  });
  const next = withMin.find((p) => p.min > nowMin) ?? withMin[0];
  const diff = (next.min - nowMin + 1440) % 1440;
  const countdown = `${pad(Math.floor(diff / 60))}:${pad(diff % 60)}:${pad(59 - now.getSeconds())}`;

  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = usePersistentState<string[]>("fajr-vokabeln", []);
  const card = vocab[idx];

  const advance = (delta: number) => {
    setFlipped(false);
    window.setTimeout(() => setIdx((i) => (i + delta + vocab.length) % vocab.length), 240);
  };
  const mark = (ok: boolean) => {
    setKnown((k) => (ok ? (k.includes(card.ar) ? k : [...k, card.ar]) : k.filter((x) => x !== card.ar)));
    advance(1);
  };

  const [plan, setPlan] = useState(planItems.map((p) => p.done));
  const doneCount = plan.filter(Boolean).length;

  const [letterIdx, setLetterIdx] = useState(13);
  const letter = alphabet[letterIdx];

  const [ruleId, setRuleId] = useState("mad");
  const rule = tajweedRules.find((r) => r.id === ruleId) ?? tajweedRules[0];

  const stats = [
    { n: "12", label: "Tage Serie", color: "#F0B429" },
    { n: "312", label: "Vokabeln sicher", color: "#0E7C5B" },
    { n: "14", label: "Sūren im Ḥifẓ", color: "#3E7CB1" },
    { n: "47′", label: "heute gelernt", color: "#12332B" },
  ];

  return (
    <div className="bg-fajr-grid min-h-screen bg-paper text-inkg">
      {/* Kopfzeile */}
      <header className="sticky top-0 z-40 border-b-[3px] border-inkg bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border-2 border-inkg bg-em-600 font-kufi text-xl text-white shadow-[3px_3px_0_#12332B]">
              ف
            </span>
            <div className="leading-none">
              <p className="font-grotesk text-[22px] font-bold tracking-tight">
                FAJR<span className="text-em-600">.</span>
              </p>
              <p className="mt-0.5 text-[9.5px] font-bold uppercase tracking-[0.3em] text-inkg-soft">
                Lernen bei Tageslicht
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            {["Lesen", "Wissen", "Plan"].map((n) => (
              <span
                key={n}
                className="cursor-default border-2 border-inkg bg-card px-3.5 py-1.5 font-grotesk text-[13px] font-semibold transition-colors hover:bg-amb-400"
              >
                {n}
              </span>
            ))}
          </nav>
          <span className="flex items-center gap-2 border-2 border-inkg bg-amb-500 px-3.5 py-1.5 font-grotesk text-[13px] font-bold shadow-[3px_3px_0_#12332B]">
            <Glyph name="flame" className="h-4 w-4" /> 12 Tage
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Auftakt */}
        <section className="grid items-center gap-10 py-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p dir="rtl" className="font-kufi text-2xl font-semibold text-em-600">صَبَاحُ النُّور</p>
            <h1 className="mt-3 font-grotesk text-[2.9rem] font-bold leading-[0.98] tracking-tight sm:text-6xl xl:text-7xl">
              Guten Morgen.
              <br />
              <span className="text-em-600">Dein Lernweg</span>
              <br />
              wartet schon.
            </h1>
            <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-inkg-soft">
              <strong className="font-bold text-inkg">Faǧr</strong> ist die helle Variante des Konzepts: klar,
              direkt, verspielt — Vokabeln, Taǧwīd und Tagesplan in einem Blick. Designstudie C.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="hard-btn bg-em-600 px-6 py-3 font-grotesk text-[15px] font-bold text-white">
                Heute lernen →
              </button>
              <button className="hard-btn bg-card px-6 py-3 font-grotesk text-[15px] font-bold text-inkg">
                Fortschritt ansehen
              </button>
            </div>
          </div>

          {/* Nächstes Gebet */}
          <div className="lg:col-span-5">
            <div className="hard-card bg-card p-6 md:p-7">
              <div className="flex items-center justify-between">
                <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.24em] text-inkg-soft">
                  Nächstes Gebet
                </p>
                <span className="font-grotesk text-[13px] font-bold text-inkg tabular-nums">
                  {pad(now.getHours())}:{pad(now.getMinutes())}
                  <span className="text-inkg-faint">:{pad(now.getSeconds())}</span>
                </span>
              </div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p dir="rtl" className="font-kufi text-3xl text-em-700">{next.ar}</p>
                  <p className="font-grotesk text-2xl font-bold">{next.name}</p>
                </div>
                <p className="font-grotesk text-5xl font-bold tabular-nums text-em-600">{next.time}</p>
              </div>
              <div className="mt-5 border-t-2 border-dashed border-inkg/20 pt-4">
                <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.24em] text-inkg-soft">
                  Countdown
                </p>
                <p className="mt-1 font-grotesk text-4xl font-bold tabular-nums tracking-tight">{countdown}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {withMin.map((p) => {
                const isNext = p.name === next.name;
                return (
                  <span
                    key={p.name}
                    className={`border-2 border-inkg px-3.5 py-1.5 font-grotesk text-[13px] font-semibold transition-all ${
                      isNext ? "bg-em-600 text-white shadow-[3px_3px_0_#12332B]" : "bg-card text-inkg-soft"
                    }`}
                  >
                    {p.name} {p.time}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* Zahlenband */}
        <section className="grid grid-cols-2 gap-4 pb-14 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="hard-card bg-card px-5 py-5"
              style={{ borderLeftWidth: 8, borderLeftColor: s.color }}
            >
              <p className="font-grotesk text-5xl font-bold tracking-tight">{s.n}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-inkg-soft">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Lernen: Karten + Plan */}
        <section className="grid gap-8 pb-14 lg:grid-cols-2">
          {/* Vokabelkarten */}
          <div className="hard-card bg-card p-6 md:p-7">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.24em] text-em-600">
                  Karteikarten
                </p>
                <h2 className="mt-1 font-grotesk text-2xl font-bold tracking-tight">Wortschatz des Quran</h2>
              </div>
              <p className="font-grotesk text-lg font-bold text-em-600">
                {known.length}
                <span className="text-inkg-faint">/{vocab.length}</span>
              </p>
            </div>

            <div className="mb-4 h-3 overflow-hidden border-2 border-inkg bg-paper">
              <div
                className="h-full bg-em-600 transition-all duration-500"
                style={{ width: `${(known.length / vocab.length) * 100}%` }}
              />
            </div>

            <div className="[perspective:1400px]">
              <button
                onClick={() => setFlipped((f) => !f)}
                className={`flashcard-inner relative block h-60 w-full cursor-pointer text-left ${flipped ? "flipped" : ""}`}
                aria-label="Karte umdrehen"
              >
                <div className="backface absolute inset-0 flex flex-col items-center justify-center border-[3px] border-inkg bg-amb-400 p-6">
                  <p dir="rtl" className="font-quran text-6xl leading-tight">{card.ar}</p>
                  <p className="mt-2 font-grotesk text-sm font-semibold">{card.tr}</p>
                  <p className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.22em] text-inkg/60">
                    tippen zum Umdrehen
                  </p>
                </div>
                <div
                  className="backface absolute inset-0 flex flex-col items-center justify-center border-[3px] border-inkg bg-em-600 p-6 text-center text-white"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <p className="font-grotesk text-3xl font-bold">{card.de}</p>
                  <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/85">{card.extra}</p>
                </div>
              </button>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => advance(-1)}
                className="hard-btn bg-card px-4 py-2 font-grotesk text-sm font-bold"
                aria-label="Zurück"
              >
                ←
              </button>
              <button
                onClick={() => mark(false)}
                className="hard-btn bg-card px-5 py-2 font-grotesk text-sm font-bold text-inkg"
              >
                Nochmal
              </button>
              <button
                onClick={() => mark(true)}
                className="hard-btn bg-em-600 px-5 py-2 font-grotesk text-sm font-bold text-white"
              >
                Gewusst ✓
              </button>
              <button
                onClick={() => advance(1)}
                className="hard-btn bg-card px-4 py-2 font-grotesk text-sm font-bold"
                aria-label="Weiter"
              >
                →
              </button>
            </div>
          </div>

          {/* Tagesplan */}
          <div className="hard-card bg-card p-6 md:p-7">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.24em] text-amb-600">
                  Dein Wird
                </p>
                <h2 className="mt-1 font-grotesk text-2xl font-bold tracking-tight">Tagesplan</h2>
              </div>
              <p className="font-grotesk text-lg font-bold text-amb-600">
                {doneCount}
                <span className="text-inkg-faint">/{planItems.length}</span>
              </p>
            </div>

            <div className="mb-5 h-3 overflow-hidden border-2 border-inkg bg-paper">
              <div
                className="h-full bg-amb-500 transition-all duration-500"
                style={{ width: `${(doneCount / planItems.length) * 100}%` }}
              />
            </div>

            <ul className="space-y-1.5">
              {planItems.map((item, i) => (
                <li key={item.label}>
                  <label
                    className={`flex cursor-pointer items-center gap-3.5 border-2 px-3.5 py-3 transition-colors ${
                      plan[i] ? "border-em-600/50 bg-em-600/[0.07]" : "border-inkg/15 bg-paper hover:border-inkg/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="fajr-check"
                      checked={plan[i]}
                      onChange={() => setPlan((p) => p.map((v, j) => (j === i ? !v : v)))}
                    />
                    <span
                      className={`flex-1 font-grotesk text-[14.5px] font-semibold ${
                        plan[i] ? "text-inkg-faint line-through" : "text-inkg"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="flex items-center gap-1.5 text-[12px] font-bold text-inkg-soft">
                      <Glyph name="clock" className="h-3.5 w-3.5" />
                      {item.time}
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            {doneCount === planItems.length && (
              <p className="mt-4 border-2 border-inkg bg-em-600 px-4 py-3 text-center font-grotesk text-sm font-bold text-white shadow-[4px_4px_0_#12332B]">
                Alles erledigt — māšāʾallāh!
              </p>
            )}
          </div>
        </section>

        {/* Alphabet */}
        <section className="pb-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.24em] text-skyb-500">
                Alifbāʾ · 28 Steine
              </p>
              <h2 className="mt-1 font-grotesk text-3xl font-bold tracking-tight md:text-4xl">Das Alphabet zum Anfassen</h2>
            </div>
            <div className="flex items-center gap-3 border-2 border-inkg bg-card px-4 py-2.5 shadow-[4px_4px_0_#12332B]">
              <span dir="rtl" className="font-quran text-4xl leading-none text-em-600">{letter.l}</span>
              <span>
                <span className="block font-grotesk text-[15px] font-bold">{letter.name}</span>
                <span className="block text-[11.5px] text-inkg-soft">
                  {letter.tr} · {letter.ex} = {letter.exDe}
                </span>
              </span>
              <span
                className={`ml-2 border-2 border-inkg px-2 py-0.5 font-grotesk text-[10.5px] font-bold ${
                  letter.sun ? "bg-amb-500" : "bg-skyb-500 text-white"
                }`}
              >
                {letter.sun ? "Šamsī" : "Qamarī"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 sm:grid-cols-14">
            {alphabet.map((a, i) => (
              <button
                key={a.l}
                onClick={() => setLetterIdx(i)}
                className={`border-2 py-2.5 text-center font-quran text-2xl leading-none transition-all duration-150 ${
                  i === letterIdx
                    ? "border-inkg bg-em-600 text-white shadow-[3px_3px_0_#12332B]"
                    : "border-inkg/20 bg-card text-inkg hover:-translate-y-0.5 hover:border-inkg"
                }`}
              >
                {a.l}
              </button>
            ))}
          </div>
        </section>

        {/* Taǧwīd-Schnellwahl */}
        <section className="pb-16">
          <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.24em] text-em-600">
            Taǧwīd · Schnellwahl
          </p>
          <h2 className="mt-1 font-grotesk text-3xl font-bold tracking-tight md:text-4xl">Sieben Regeln, sieben Pillen</h2>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {tajweedRules.map((r) => (
              <button
                key={r.id}
                onClick={() => setRuleId(r.id)}
                className={`hard-btn px-4 py-2 font-grotesk text-[13.5px] font-bold ${
                  ruleId === r.id ? "bg-inkg text-white" : "bg-card text-inkg"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>

          <div
            key={rule.id}
            className="view-enter mt-5 grid items-center gap-6 border-[3px] border-inkg bg-card p-6 shadow-[6px_6px_0_#12332B] md:grid-cols-2 md:p-8"
          >
            <div>
              <p dir="rtl" className="font-quran text-5xl text-em-600">{rule.ar}</p>
              <h3 className="mt-2 font-grotesk text-2xl font-bold">{rule.name}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-inkg-soft">{rule.detail}</p>
            </div>
            <div className="space-y-3">
              {rule.examples.map((ex, i) => (
                <div key={i} className="border-2 border-inkg/15 bg-paper px-4 py-3.5 transition-colors hover:border-inkg">
                  <p dir="rtl" className="text-center font-quran text-[1.8rem] leading-normal">
                    {ex.segs.map((s, j) => (
                      <span key={j} className={s.hl ? "text-em-600" : undefined}>
                        {s.t}
                      </span>
                    ))}
                  </p>
                  <p className="mt-1.5 text-center text-[11.5px] text-inkg-soft">{ex.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Fußzeile */}
      <footer className="border-t-[3px] border-inkg bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 md:px-8">
          <p className="font-grotesk text-[12.5px] font-bold">
            FAJR<span className="text-em-600">.</span> · Designstudie C — Taglicht
          </p>
          <p dir="rtl" className="font-kufi text-lg text-em-700">
            وَجَعَلْنَا النَّهَارَ مَعَاشًا
          </p>
        </div>
      </footer>
    </div>
  );
}
