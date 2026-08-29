import { THEMES } from "../themes";
import type { ThemeId } from "../themes";
import { usePersistentState } from "../components/ui";

export const DAILY_GOALS = [5, 10, 20, 30];

export default function Einstellungen({
  theme,
  setTheme,
}: {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}) {
  const [goal, setGoal] = usePersistentState<number>("nur-daily-goal", 10);

  return (
    <div className="mx-auto max-w-4xl px-5 pb-16 pt-10 md:px-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-500">Einstellungen</p>
      <h1 className="mt-1.5 font-display text-4xl font-semibold text-ink md:text-5xl">Dein Nūr.</h1>

      {/* Farbwelt */}
      <section className="mt-9 rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7">
        <h2 className="font-display text-xl font-semibold text-ink">Farbwelt</h2>
        <p className="mt-1 text-[13px] text-ink-dim">Die gesamte App färbt sich um — die Wahl wird gespeichert.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {THEMES.map((t) => {
            const active = t.id === theme;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`btn-press flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all ${
                  active ? "border-gold-500 bg-gold-500/10" : "border-pine-700 hover:border-gold-500/40"
                }`}
              >
                <span
                  className={`h-10 w-10 flex-none rounded-full border transition-transform ${active ? "scale-110 border-gold-400" : "border-ink/15"}`}
                  style={{ background: `linear-gradient(135deg, ${t.base} 52%, ${t.accent} 52%)` }}
                />
                <span className="min-w-0">
                  <span className={`block text-[14.5px] font-bold ${active ? "text-gold-300" : "text-ink"}`}>{t.name}</span>
                  <span className="block text-[11.5px] text-ink-faint">{t.hint}</span>
                </span>
                {active && (
                  <svg viewBox="0 0 24 24" className="ml-auto h-4.5 w-4.5 flex-none text-gold-400" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Lernziel */}
      <section className="mt-6 rounded-xl border border-gold-500/15 bg-pine-900/70 p-6 md:p-7">
        <h2 className="font-display text-xl font-semibold text-ink">Tägliches Lernziel</h2>
        <p className="mt-1 text-[13px] text-ink-dim">Karteikarten pro Tag — dein Richtwert für die Wiederholung.</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {DAILY_GOALS.map((g) => (
            <button
              key={g}
              onClick={() => setGoal(g)}
              className={`btn-press rounded-full border px-5 py-2.5 text-[14px] font-bold transition-all ${
                goal === g ? "border-gold-500 bg-gold-500 text-pine-950" : "border-pine-700 text-ink-dim hover:border-gold-500/40 hover:text-ink"
              }`}
            >
              {g} Karten
            </button>
          ))}
        </div>
      </section>

      {/* Daten */}
      <section className="mt-6 rounded-xl border border-pine-700 bg-pine-900/70 p-6 md:p-7">
        <h2 className="font-display text-xl font-semibold text-ink">Daten & Adab</h2>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-dim">
          Alle Fortschrittsdaten liegen lokal in deinem Browser. Diese App ist ein Lernbegleiter — sie ersetzt
          keinen qualifizierten Gelehrten (ʿĀlim), keine Iǧāza und keine Fetwa. Fiqh-Vergleiche sind
          vereinfachte Lernübersichten; Überlieferungen sind mit Quelle und Echtheitsstufe gekennzeichnet.
        </p>
        <p className="mt-4 border-t border-pine-700 pt-4 text-[12.5px] text-ink-faint">
          Fortschritt zurücksetzen kannst du auf der <strong className="text-ink-dim">Fortschritt</strong>-Seite.
        </p>
      </section>
    </div>
  );
}
