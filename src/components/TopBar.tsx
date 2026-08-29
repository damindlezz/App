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

export default function TopBar({
  tab,
  setTab,
}: {
  tab: TabId;
  setTab: (t: TabId) => void;
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

          {/* Serie + Datum */}
          <div className="flex items-center gap-4">
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
