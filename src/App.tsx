import { useState } from "react";
import ArabicSection from "./components/ArabicSection";
import Dashboard from "./components/Dashboard";
import FiqhSection from "./components/FiqhSection";
import HadithSection from "./components/HadithSection";
import QuranSection from "./components/QuranSection";
import SciencesSection from "./components/SciencesSection";
import TopBar, { TABS } from "./components/TopBar";
import type { TabId } from "./components/TopBar";
import { Glyph } from "./components/ui";

const LETTERS: { ch: string; left: string; dur: number; delay: number; size: string; o: number }[] = [
  { ch: "ا", left: "5%", dur: 52, delay: 0, size: "2.3rem", o: 0.05 },
  { ch: "ن", left: "13%", dur: 64, delay: 8, size: "1.6rem", o: 0.06 },
  { ch: "ق", left: "23%", dur: 48, delay: 16, size: "2.9rem", o: 0.045 },
  { ch: "ر", left: "32%", dur: 58, delay: 4, size: "1.8rem", o: 0.055 },
  { ch: "ع", left: "43%", dur: 66, delay: 22, size: "2rem", o: 0.05 },
  { ch: "ل", left: "54%", dur: 50, delay: 12, size: "2.4rem", o: 0.05 },
  { ch: "م", left: "63%", dur: 60, delay: 2, size: "1.7rem", o: 0.06 },
  { ch: "س", left: "72%", dur: 54, delay: 18, size: "2.1rem", o: 0.05 },
  { ch: "ب", left: "81%", dur: 62, delay: 9, size: "1.9rem", o: 0.055 },
  { ch: "ت", left: "90%", dur: 46, delay: 26, size: "2.3rem", o: 0.045 },
  { ch: "ي", left: "37%", dur: 70, delay: 30, size: "1.5rem", o: 0.06 },
  { ch: "ح", left: "49%", dur: 56, delay: 35, size: "2.6rem", o: 0.04 },
];

function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_-5%,rgba(216,178,92,0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(79,193,166,0.07),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_90%,rgba(110,147,214,0.06),transparent_55%)]" />
      <div className="bg-girih absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_75%_70%_at_50%_40%,black,transparent)]" />
      {LETTERS.map((l, i) => (
        <span
          key={i}
          className="float-letter absolute top-0 font-quran text-gold-500"
          style={
            {
              left: l.left,
              animationDuration: `${l.dur}s`,
              animationDelay: `-${l.delay}s`,
              fontSize: l.size,
              "--fo": l.o,
            } as React.CSSProperties
          }
        >
          {l.ch}
        </span>
      ))}
      <div className="noise absolute inset-0" />
    </div>
  );
}

function Footer({ setTab }: { setTab: (t: TabId) => void }) {
  return (
    <footer className="relative z-10 mt-8 border-t border-gold-500/12 bg-pine-950/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Glyph name="star8" className="h-9 w-9 text-gold-500" />
            <div className="leading-none">
              <p className="font-display text-xl font-semibold tracking-[0.06em] text-ink">
                NŪR<span className="text-gold-500">.</span>
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.3em] text-ink-dim">Quran-Akademie</p>
            </div>
            <span dir="rtl" className="font-kufi text-lg text-gold-500/85">نُور</span>
          </div>
          <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-ink-dim">
            Konzeptstudie einer Lern-App: Arabisch Fuṣḥā, Quran & Taǧwīd, Fiqh der vier Schulen, Ḥadīṯ mit
            Isnad-Verständnis und die Landkarte der islamischen Wissenschaften.
          </p>
          <p dir="rtl" className="mt-5 font-quran text-xl text-gold-500/70">
            بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="mb-3.5 text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Module</p>
          <ul className="space-y-2">
            {TABS.filter((t) => t.id !== "start").map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => setTab(t.id)}
                  className="group flex items-center gap-2 text-[13.5px] font-semibold text-ink-dim transition-colors hover:text-gold-300"
                >
                  <span className="h-px w-3 bg-gold-600/50 transition-all group-hover:w-5 group-hover:bg-gold-400" />
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="mb-3.5 text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">Adab des Lernens</p>
          <p className="text-[13.5px] leading-relaxed text-ink-dim">
            Diese App ist ein Lernbegleiter — sie ersetzt keinen qualifizierten Gelehrten (ʿĀlim) und keine
            Iǧāza. Fiqh-Vergleiche sind vereinfachte Lernübersichten, keine Fetwen. Überlieferungen sind mit
            Quelle und Echtheitsstufe gekennzeichnet.
          </p>
          <p className="mt-4 flex items-center gap-2 text-[12.5px] text-ink-faint">
            <Glyph name="beads" className="h-4 w-4 text-gold-500/70" />
            Wer Wissen sucht, sucht zuerst die Aufrichtigkeit.
          </p>
        </div>
      </div>

      <div className="border-t border-gold-500/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-8">
          <p className="text-[11.5px] text-ink-faint">
            Nūr · Konzeptstudie <span className="text-gold-600">✦</span> 1447 n. H. / 2026
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="btn-press flex items-center gap-2 rounded-full border border-pine-700 px-4 py-1.5 text-[11.5px] font-bold text-ink-dim hover:border-gold-500/40 hover:text-gold-300"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
            </svg>
            Nach oben
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [tab, setTabState] = useState<TabId>("start");
  const setTab = (t: TabId) => {
    setTabState(t);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen">
      <Ambient />
      <div className="relative z-10">
        <TopBar tab={tab} setTab={setTab} />
        <main key={tab} className="view-enter">
          {tab === "start" && <Dashboard setTab={setTab} />}
          {tab === "quran" && <QuranSection />}
          {tab === "arabic" && <ArabicSection />}
          {tab === "fiqh" && <FiqhSection />}
          {tab === "hadith" && <HadithSection />}
          {tab === "science" && <SciencesSection />}
        </main>
        <Footer setTab={setTab} />
      </div>
    </div>
  );
}
