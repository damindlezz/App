import { Component, useEffect, type ErrorInfo, type ReactNode } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import Shell from "./components/Shell";
import Heute from "./pages/Heute";
import LearnHub from "./pages/LearnHub";
import Fortschritt from "./pages/Fortschritt";
import Einstellungen from "./pages/Einstellungen";
import QuranSection from "./components/QuranSection";
import ArabicSection from "./components/ArabicSection";
import FiqhSection from "./components/FiqhSection";
import HadithSection from "./components/HadithSection";
import SciencesSection from "./components/SciencesSection";
import MushafView from "./components/MushafView";
import TrainingSection from "./components/TrainingSection";
import { AppProvider } from "./backend/store";
import { subjectById } from "./data/content";
import { usePersistentState } from "./components/ui";
import { THEMES } from "./themes";
import type { ThemeId } from "./themes";
import DesignSwitcher from "./components/DesignSwitcher";
import type { DesignId } from "./components/DesignSwitcher";

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
];

function GirihPattern() {
  return (
    <svg className="girih-overlay absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_75%_70%_at_50%_40%,black,transparent)]" aria-hidden>
      <defs>
        <pattern id="girih" width="84" height="84" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="var(--color-gold-500)" strokeOpacity="0.06">
            <rect x="22" y="22" width="40" height="40" />
            <rect x="22" y="22" width="40" height="40" transform="rotate(45 42 42)" />
            <circle cx="42" cy="42" r="5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#girih)" />
    </svg>
  );
}

function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="breathe absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% -5%, color-mix(in srgb, var(--color-gold-500) 12%, transparent), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 0% 100%, color-mix(in srgb, var(--color-teal-500) 7%, transparent), transparent 55%)",
        }}
      />
      <GirihPattern />
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

/** Fängt Render-Fehler ab — statt grünem Nichts gibt es eine klare Meldung. */
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Nūr · Render-Fehler:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="grid min-h-screen place-items-center px-6">
          <div className="max-w-lg rounded-xl border border-copper-500/40 bg-pine-900 p-8 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-copper-400">Render-Fehler</p>
            <h1 className="mt-2 font-display text-2xl font-semibold text-ink">Etwas ist schiefgelaufen.</h1>
            <p className="mt-3 rounded-lg border border-pine-700 bg-pine-950/60 px-4 py-3 text-left font-mono text-[12px] leading-relaxed text-copper-400">
              {this.state.error.message}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-dim">
              Details in der Browser-Konsole (F12). <strong className="text-ink">Häufige Ursache:</strong> eine
              veraltete Projektkopie mit gemischten alten/neuen Dateien. Abhilfe: Dev-Server mit STRG+C beenden,
              den Ordner <code className="text-gold-300">node_modules/.vite</code> löschen, sicherstellen, dass die
              Dateien <code className="text-gold-300">Dashboard.tsx</code> und <code className="text-gold-300">TopBar.tsx</code>{" "}
              in <code className="text-gold-300">src/components</code> <em>nicht</em> existieren, dann{" "}
              <code className="text-gold-300">dev.bat</code> erneut starten.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-press mt-6 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-pine-950 hover:bg-gold-400"
            >
              Neu laden
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/** /lernen/:subject → passende Fachseite */
function LearnSubject() {
  const { subject } = useParams();
  const s = subjectById(subject ?? "");
  if (!s) return <Navigate to="/lernen" replace />;
  return (
    <div key={s.id} className="view-enter">
      {s.id === "quran" && <QuranSection />}
      {s.id === "arabisch" && <ArabicSection />}
      {s.id === "fiqh" && <FiqhSection />}
      {s.id === "hadith" && <HadithSection />}
      {s.id === "wissenschaft" && <SciencesSection />}
    </div>
  );
}

/** /mushaf/:surah? → Muṣḥaf-Browser mit Deep-Link */
function Mushaf() {
  const { surah } = useParams();
  const n = surah ? Math.min(114, Math.max(1, Number(surah) || 1)) : 1;
  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 md:px-8">
      <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-500">
        Muṣḥaf · Sūra {n} — direkt verlinkbar
      </p>
      <MushafView initialSurah={n} />
    </div>
  );
}

/** /training/... → zentrale Trainings-Engine mit Deep-Links */
function Training() {
  const { mode, cat } = useParams();
  const m: "cards" | "quiz" | "drill" =
    mode === "quiz" || mode === "drill" ? mode : "cards";
  return <TrainingSection initialMode={m} initialCat={cat} />;
}

export default function App() {
  const [theme, setTheme] = usePersistentState<ThemeId>("nur-theme", "tannengold");
  const [design, setDesign] = usePersistentState<DesignId>("nur-design", "a");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* Design-Variante (a|b|c) umschalten */
  useEffect(() => {
    document.documentElement.setAttribute("data-design", design);
  }, [design]);

  /* Fallback, falls ein unbekanntes Theme gespeichert wurde */
  const safeTheme: ThemeId = THEMES.some((t) => t.id === theme) ? theme : "tannengold";

  return (
    <ErrorBoundary>
      <AppProvider>
        <HashRouter>
        <div className="relative min-h-screen">
          <Ambient />
          <div className="relative z-10">
            <Shell>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Navigate to="/heute" replace />} />
                <Route path="/heute" element={<Heute />} />
                <Route path="/lernen" element={<LearnHub />} />
                <Route path="/lernen/:subject" element={<LearnSubject />} />
                <Route path="/mushaf" element={<Mushaf />} />
                <Route path="/mushaf/:surah" element={<Mushaf />} />
                <Route path="/training" element={<Training />} />
                <Route path="/training/:mode" element={<Training />} />
                <Route path="/training/:mode/:cat" element={<Training />} />
                <Route path="/fortschritt" element={<Fortschritt />} />
                <Route path="/einstellungen" element={<Einstellungen theme={safeTheme} setTheme={setTheme} />} />
                <Route path="*" element={<Navigate to="/heute" replace />} />
              </Routes>
            </Shell>
          </div>
          <DesignSwitcher design={design} setDesign={setDesign} />
        </div>
        </HashRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
