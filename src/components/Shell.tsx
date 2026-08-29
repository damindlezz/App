import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../backend/store";
import { SUBJECTS } from "../data/content";
import { Glyph } from "./ui";
import type { GlyphName } from "./ui";

/** Hijri-Datum (Umm-al-Qurā) — berechnet, nicht hartcodiert. */
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

export function greeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return "Guten Morgen";
  if (h >= 11 && h < 17) return "Guten Tag";
  if (h >= 17 && h < 22) return "Guten Abend";
  return "Gute Nacht";
}

const NAV: { to: string; label: string; icon: GlyphName }[] = [
  { to: "/heute", label: "Heute", icon: "sun" },
  { to: "/lernen", label: "Lernen", icon: "tree" },
  { to: "/mushaf", label: "Muṣḥaf", icon: "book" },
  { to: "/training", label: "Training", icon: "qalam" },
  { to: "/fortschritt", label: "Fortschritt", icon: "flame" },
];

function LearnMenu({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const { subjectProgress } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const active = useLocation().pathname.startsWith("/lernen");

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`btn-press flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-semibold transition-colors ${
          active ? "text-gold-300" : "text-ink-dim hover:text-ink"
        }`}
      >
        <Glyph name="tree" className="h-4 w-4" />
        Lernen
        <svg
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="view-enter absolute left-0 top-full z-50 mt-1.5 w-72 rounded-xl border border-gold-500/25 bg-pine-900 p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]">
          <p className="px-2.5 pb-1 pt-1.5 text-[9.5px] font-bold uppercase tracking-[0.26em] text-ink-faint">Fächer</p>
          {SUBJECTS.map((s) => {
            const p = subjectProgress(s.id);
            return (
              <Link
                key={s.id}
                to={s.route}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-pine-800"
              >
                <span className="grid h-8 w-8 flex-none place-items-center rounded-lg" style={{ backgroundColor: `${s.color}1a`, color: s.color }}>
                  <Glyph name={s.icon as GlyphName} className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-[13.5px] font-bold text-ink group-hover:text-gold-300">{s.name}</span>
                    <span dir="rtl" className="font-kufi text-sm" style={{ color: `${s.color}b3` }}>{s.ar}</span>
                  </span>
                  <span className="mt-1 flex items-center gap-2">
                    <span className="h-1 flex-1 overflow-hidden rounded-full bg-pine-700">
                      <span className="block h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: s.color }} />
                    </span>
                    <span className="text-[10px] font-bold text-ink-faint">{p.pct}%</span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const { stats, dueCount } = useApp();
  const [learnOpen, setLearnOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLearnOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 z-40 border-b border-gold-500/10 bg-pine-950/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-center justify-between gap-3 py-3">
            <Link to="/heute" className="btn-press group flex items-center gap-3" aria-label="Nūr — zur Heute-Ansicht">
              <Glyph name="star8" className="spin-slow h-10 w-10 text-gold-500 transition-colors group-hover:text-gold-300" />
              <span className="leading-none">
                <span className="font-display text-2xl font-semibold tracking-[0.06em] text-ink">
                  NŪR<span className="text-gold-500">.</span>
                </span>
                <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.3em] text-ink-dim">Quran-Akademie</span>
              </span>
            </Link>

            {/* Desktop-Navigation */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
              {NAV.map((n) =>
                n.to === "/lernen" ? (
                  <LearnMenu key={n.to} open={learnOpen} setOpen={setLearnOpen} />
                ) : (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    className={({ isActive }) =>
                      `btn-press flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-semibold transition-colors ${
                        isActive ? "text-gold-300" : "text-ink-dim hover:text-ink"
                      }`
                    }
                  >
                    <Glyph name={n.icon} className="h-4 w-4" />
                    {n.label}
                  </NavLink>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2.5">
              {dueCount > 0 && (
                <button
                  onClick={() => navigate("/training")}
                  className="btn-press hidden items-center gap-2 rounded-full border border-teal-500/30 bg-pine-800/80 py-1.5 pl-2 pr-3.5 sm:flex"
                  title="Fällige Karten wiederholen"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-teal-500/15 text-teal-400">
                    <Glyph name="book" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[12.5px] font-bold text-ink">{dueCount} fällig</span>
                </button>
              )}
              <div className="pulse-glow flex items-center gap-2 rounded-full border border-gold-500/25 bg-pine-800/80 py-1.5 pl-2 pr-3.5">
                <Glyph name="flame" className="h-4 w-4 text-gold-400" />
                <span className="text-[12.5px] font-bold text-ink">
                  {stats.streak} {stats.streak === 1 ? "Tag" : "Tage"}
                </span>
              </div>
              <Link
                to="/einstellungen"
                className="btn-press grid h-9 w-9 place-items-center rounded-full border border-pine-700 text-ink-dim transition-colors hover:border-gold-500/50 hover:text-gold-300"
                aria-label="Einstellungen"
                title="Einstellungen"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3.2" />
                  <path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l2-1.5-2-3.4-2.4 1a7.7 7.7 0 0 0-2.6-1.5L14 2.6h-4L9.6 5.1a7.7 7.7 0 0 0-2.6 1.5l-2.4-1-2 3.4 2 1.5a7.6 7.6 0 0 0 0 3l-2 1.5 2 3.4 2.4-1a7.7 7.7 0 0 0 2.6 1.5l.4 2.5h4l.4-2.5a7.7 7.7 0 0 0 2.6-1.5l2.4 1 2-3.4-2-1.5Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {/* Mobile-Navigation (statt horizontalem Scrollen) */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-500/15 bg-pine-950/95 backdrop-blur-md lg:hidden"
        aria-label="Mobile Navigation"
      >
        <div className="mx-auto grid max-w-md grid-cols-5">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors ${
                  isActive ? "text-gold-300" : "text-ink-faint"
                }`
              }
            >
              <Glyph name={n.icon} className="h-5 w-5" />
              {n.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <footer className="border-t border-gold-500/10 pb-20 pt-8 lg:pb-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 md:px-8">
          <p className="flex items-center gap-2.5 text-[12px] text-ink-faint">
            <Glyph name="star8" className="h-4 w-4 text-gold-500/60" />
            Nūr · Lernbegleiter — ersetzt keinen Gelehrten, keine Iǧāza, keine Fetwa.
            <span className="rounded-full border border-pine-700 px-2 py-0.5 text-[10px] font-bold text-ink-faint">v2.0</span>
          </p>
          <p dir="rtl" className="font-kufi text-sm text-gold-500/70">{hijriLabel()}</p>
        </div>
      </footer>
    </div>
  );
}
