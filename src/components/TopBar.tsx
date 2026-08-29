import { useEffect, useRef, useState } from "react";
import { THEMES } from "../themes";
import type { ThemeId } from "../themes";
import { Glyph } from "./ui";

export type TabId = "start" | "quran" | "arabic" | "fiqh" | "hadith" | "science";

export const TABS: { id: TabId; label: string }[] = [
  { id: "start", label: "Start" },
  { id: "quran", label: "Quran & Taǧwīd" },
  { id: "arabic", label: "Arabisch" },
  { id: "fiqh", label: "Fiqh & Uṣūl" },
  { id: "hadith", label: "Ḥadīṯ" },
  { id: "science", label: "Wissenschaften" },
];

/* ---------- Farbwahl ---------- */
function ThemePicker({ theme, setTheme }: { theme: ThemeId; setTheme: (t: ThemeId) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn-press group flex items-center gap-2 rounded-full border border-gold-500/25 bg-pine-800/80 py-1.5 pl-1.5 pr-3 hover:border-gold-500/50"
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Farbwelt wählen"
      >
        <span
          className="h-6 w-6 rounded-full border border-ink/20"
          style={{ background: `linear-gradient(135deg, ${current.base} 52%, ${current.accent} 52%)` }}
        />
        <span className="hidden text-[12px] font-bold text-ink md:block">{current.name}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 text-ink-dim transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="view-enter absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gold-500/25 bg-pine-900 p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]">
          <p className="px-2.5 pb-1.5 pt-2 text-[9.5px] font-bold uppercase tracking-[0.26em] text-ink-faint">
            Farbwelt
          </p>
          <ul role="listbox" aria-label="Farbwelten">
            {THEMES.map((t) => {
              const active = t.id === theme;
              return (
                <li key={t.id} role="option" aria-selected={active}>
                  <button
                    onClick={() => {
                      setTheme(t.id);
                      setOpen(false);
                    }}
                    className={`btn-press flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
                      active ? "bg-gold-500/12" : "hover:bg-pine-800"
                    }`}
                  >
                    <span
                      className={`h-7 w-7 flex-none rounded-full border transition-transform ${
                        active ? "scale-110 border-gold-400" : "border-ink/15"
                      }`}
                      style={{ background: `linear-gradient(135deg, ${t.base} 52%, ${t.accent} 52%)` }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[13px] font-bold ${active ? "text-gold-300" : "text-ink"}`}>
                        {t.name}
                      </span>
                      <span className="block truncate text-[10.5px] text-ink-faint">{t.hint}</span>
                    </span>
                    {active && <Glyph name="check" className="h-4 w-4 flex-none text-gold-400" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function TopBar({
  tab,
  setTab,
  theme,
  setTheme,
}: {
  tab: TabId;
  setTab: (t: TabId) => void;
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-gold-500/10 bg-pine-950/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo */}
          <button
            onClick={() => setTab("start")}
            className="btn-press group flex items-center gap-3 text-left"
            aria-label="Zur Startansicht"
          >
            <span className="relative grid h-11 w-11 place-items-center">
              <Glyph name="star8" className="spin-slow h-11 w-11 text-gold-500 transition-colors group-hover:text-gold-300" />
            </span>
            <span className="leading-none">
              <span className="font-display text-[26px] font-semibold tracking-[0.06em] text-ink">
                NŪR<span className="text-gold-500">.</span>
              </span>
              <span className="mt-1 block text-[9.5px] font-bold uppercase tracking-[0.32em] text-ink-dim">
                Quran-Akademie
              </span>
            </span>
            <span dir="rtl" className="font-kufi text-xl text-gold-500/90">
              نُور
            </span>
          </button>

          {/* Farbwahl + Serie + Datum */}
          <div className="flex items-center gap-3">
            <ThemePicker theme={theme} setTheme={setTheme} />
            <div className="pulse-glow hidden items-center gap-2.5 rounded-full border border-gold-500/25 bg-pine-800/80 py-1.5 pl-2 pr-4 sm:flex">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-500/15 text-gold-400">
                <Glyph name="flame" className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold text-ink">12 Tage</span>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-ink-dim">Lernserie</span>
              </span>
            </div>
            <div className="hidden text-right leading-tight xl:block">
              <p className="font-kufi text-sm text-gold-400">٢٥ شعبان ١٤٤٧</p>
              <p className="text-[11px] text-ink-dim">25. Šaʿbān 1447 · Freitag</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="-mb-px flex gap-1 overflow-x-auto pb-0" aria-label="Lernbereiche">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`btn-press relative shrink-0 px-3.5 py-2.5 text-[13.5px] font-semibold transition-colors ${
                  active ? "text-gold-300" : "text-ink-dim hover:text-ink"
                }`}
              >
                {t.label}
                <span
                  className={`absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 transition-all duration-300 ${
                    active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
