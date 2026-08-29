import { Link } from "react-router-dom";
import { useApp } from "../backend/store";
import { SUBJECTS } from "../data/content";
import { Glyph, Reveal } from "../components/ui";
import type { GlyphName } from "../components/ui";

export default function LearnHub() {
  const { subjectProgress, overallPct } = useApp();

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-500">Lernen · 5 Fächer</p>
          <h1 className="mt-1.5 font-display text-4xl font-semibold text-ink md:text-5xl">
            Der Weg ist <em className="italic text-gold-400">geordnet</em>.
          </h1>
          <p className="mt-2 max-w-2xl text-[14.5px] text-ink-dim">
            Fächer sind Inhalte, keine Funktionen — jede Lektion wird aus deinem echten Lernverhalten abgeleitet:
            besuchte Inhalte, gemeisterte Karten, Quiz-Ergebnisse und Ḥifẓ-Status.
          </p>
        </div>
        <div className="rounded-xl border border-gold-500/25 bg-pine-900/70 px-5 py-3.5 text-right">
          <p className="font-display text-3xl font-semibold text-gold-400">{overallPct()} %</p>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-dim">Gesamt</p>
        </div>
      </div>

      <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SUBJECTS.map((s, i) => {
          const p = subjectProgress(s.id);
          return (
            <Reveal key={s.id} delay={i * 70}>
              <Link
                to={s.route}
                className="card-hover group flex h-full flex-col rounded-xl border border-pine-700 bg-pine-900/70 p-6"
                style={{ borderTopColor: `${s.color}66`, borderTopWidth: 3 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl transition-transform group-hover:scale-110" style={{ backgroundColor: `${s.color}1a`, color: s.color }}>
                    <Glyph name={s.icon as GlyphName} className="h-6 w-6" />
                  </span>
                  <span dir="rtl" className="font-kufi text-3xl" style={{ color: `${s.color}b3` }}>{s.ar}</span>
                </div>
                <h3 className="mt-4 font-display text-[22px] font-semibold text-ink group-hover:text-gold-300">{s.name}</h3>
                <p className="mt-1 text-[13px] text-ink-dim">{s.desc}</p>

                <ul className="mt-4 flex-1 space-y-1.5">
                  {s.lessons.map((l) => {
                    const done = p.doneIds.has(l.id);
                    return (
                      <li key={l.id} className={`flex items-start gap-2.5 text-[12.5px] ${done ? "text-ink-faint" : "text-ink-dim"}`}>
                        <span className={`mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full ${done ? "bg-teal-500/20 text-teal-400" : "border border-pine-600"}`}>
                          {done && <Glyph name="check" className="h-2.5 w-2.5" />}
                        </span>
                        <span className={done ? "line-through decoration-teal-500/50" : ""}>{l.title}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-5 flex items-center gap-3">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-pine-700">
                    <span className="block h-full rounded-full transition-all duration-700" style={{ width: `${p.pct}%`, backgroundColor: s.color }} />
                  </span>
                  <span className="font-display text-lg font-semibold" style={{ color: s.color }}>{p.pct}%</span>
                  <Glyph name="arrowR" className="h-4 w-4 text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-gold-400" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
