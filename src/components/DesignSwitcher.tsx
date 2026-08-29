export type DesignId = "a" | "b" | "c";

export interface DesignMeta {
  id: DesignId;
  name: string;
  hint: string;
  /** Grund- und Akzentfarbe für die Vorschau-Kachel */
  base: string;
  accent: string;
}

export const DESIGNS: DesignMeta[] = [
  {
    id: "a",
    name: "Klassik",
    hint: "Tannengold · Serifen · Girih",
    base: "#0d352b",
    accent: "#d8b25c",
  },
  {
    id: "b",
    name: "Manuskript",
    hint: "Lapisnacht · Inschrift · eckig",
    base: "#10224c",
    accent: "#e9a63c",
  },
  {
    id: "c",
    name: "Hell",
    hint: "Papier · Grotesk · harte Schatten",
    base: "#f4f7f2",
    accent: "#d99a14",
  },
];

export default function DesignSwitcher({
  design,
  setDesign,
}: {
  design: DesignId;
  setDesign: (d: DesignId) => void;
}) {
  const current = DESIGNS.find((d) => d.id === design) ?? DESIGNS[0];

  return (
    <div className="fixed bottom-20 right-4 z-50 lg:bottom-6 lg:right-6">
      <div className="group relative">
        {/* Aktueller Zustand — kompakter Auslöser */}
        <button
          aria-label="Design-Variante wechseln"
          className="btn-press flex items-center gap-2.5 rounded-full border border-gold-500/40 bg-pine-900/95 py-2 pl-2.5 pr-4 shadow-[0_14px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all hover:border-gold-400"
        >
          <span
            className="h-7 w-7 flex-none rounded-full border border-ink/20 transition-transform group-hover:rotate-12"
            style={{ background: `linear-gradient(135deg, ${current.base} 52%, ${current.accent} 52%)` }}
          />
          <span className="text-left leading-none">
            <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-gold-500">
              Design
            </span>
            <span className="mt-0.5 block font-display text-sm font-semibold text-ink">
              {current.name}
            </span>
          </span>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Auswahl-Popover */}
        <div className="pointer-events-none absolute bottom-full right-0 z-50 mb-2.5 w-64 translate-y-2 rounded-xl border border-gold-500/25 bg-pine-900 p-1.5 opacity-0 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] transition-all duration-200 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <p className="px-2.5 pb-1 pt-1.5 text-[9.5px] font-bold uppercase tracking-[0.26em] text-ink-faint">
            3 Varianten im Vergleich
          </p>
          {DESIGNS.map((d) => {
            const active = d.id === design;
            return (
              <button
                key={d.id}
                onClick={() => setDesign(d.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
                  active ? "bg-gold-500/12" : "hover:bg-pine-800"
                }`}
              >
                <span
                  className={`h-9 w-9 flex-none rounded-full border transition-transform ${
                    active ? "scale-110 border-gold-400" : "border-ink/15"
                  }`}
                  style={{ background: `linear-gradient(135deg, ${d.base} 52%, ${d.accent} 52%)` }}
                />
                <span className="min-w-0 flex-1">
                  <span className={`block text-[13.5px] font-bold ${active ? "text-gold-300" : "text-ink"}`}>
                    {d.name}
                    <span className="ml-1.5 text-[10.5px] font-bold uppercase tracking-widest text-ink-faint">
                      {d.id.toUpperCase()}
                    </span>
                  </span>
                  <span className="block truncate text-[11px] text-ink-faint">{d.hint}</span>
                </span>
                {active && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none text-gold-400" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
