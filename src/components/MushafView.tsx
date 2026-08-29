import { useEffect, useRef, useState } from "react";
import { BUNDLED, BUNDLED_NUMBERS } from "../data/quranTexts";
import {
  SURAHS,
  juzEndPage,
  juzStartPage,
  surahAtPage,
  surahMeta,
  surahsInJuz,
} from "../data/quranMeta";
import type { SurahMeta } from "../data/quranMeta";
import {
  ayahAudioUrl,
  getSurah,
  isBookmarked,
  toggleBookmark,
  useBookmarks,
  type SurahFull,
} from "../backend/quran";
import { useApp } from "../backend/store";
import { AyahMarker, Glyph, toArabicDigits } from "./ui";

type Mode = "surah" | "juz" | "page";

const MODES: { id: Mode; label: string }[] = [
  { id: "surah", label: "Sūra" },
  { id: "juz", label: "Ǧuzʾ" },
  { id: "page", label: "Seite" },
];

export default function MushafView({ initialSurah = 1 }: { initialSurah?: number }) {
  const [mode, setMode] = useState<Mode>("surah");
  const [surahN, setSurahN] = useState(initialSurah);
  const [juzN, setJuzN] = useState(30);
  const [pageN, setPageN] = useState(604);
  const [anchor, setAnchor] = useState<number | null>(null);

  useEffect(() => {
    setSurahN(initialSurah);
  }, [initialSurah]);

  return (
    <div>
      {/* ---------- Steuerleiste ---------- */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gold-500/20 bg-pine-900/80 p-3.5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.8)]">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold-500/12 text-gold-400">
          <Glyph name="book" className="h-5 w-5" />
        </span>

        {/* Modus */}
        <div className="flex rounded-full border border-pine-700 bg-pine-950/60 p-1" role="tablist" aria-label="Navigationsart">
          {MODES.map((m) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={mode === m.id}
              onClick={() => setMode(m.id)}
              className={`btn-press rounded-full px-4 py-1.5 text-[12.5px] font-bold transition-all ${
                mode === m.id ? "bg-gold-500 text-pine-950" : "text-ink-dim hover:text-ink"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Auswahl je Modus */}
        {mode === "surah" && (
          <Select
            ariaLabel="Sūra wählen"
            value={String(surahN)}
            onChange={(v) => {
              setSurahN(Number(v));
              setAnchor(null);
            }}
            options={SURAHS.map((s) => ({
              value: String(s.n),
              label: `${s.n} · ${s.tr} — ${s.de}`,
              ar: s.ar,
            }))}
          />
        )}
        {mode === "juz" && (
          <Select
            ariaLabel="Ǧuzʾ wählen"
            value={String(juzN)}
            onChange={(v) => setJuzN(Number(v))}
            options={Array.from({ length: 30 }, (_, i) => ({
              value: String(i + 1),
              label: `Ǧuzʾ ${i + 1} · ${toArabicDigits(i + 1)} — Seite ${juzStartPage(i + 1)}–${juzEndPage(i + 1)}`,
            }))}
          />
        )}
        {mode === "page" && (
          <Select
            ariaLabel="Mushaf-Seite wählen"
            value={String(pageN)}
            onChange={(v) => setPageN(Number(v))}
            groups={Array.from({ length: 30 }, (_, i) => ({
              label: `Ǧuzʾ ${i + 1}`,
              options: Array.from(
                { length: juzEndPage(i + 1) - juzStartPage(i + 1) + 1 },
                (_, k) => {
                  const p = juzStartPage(i + 1) + k;
                  return { value: String(p), label: `Seite ${p}` };
                },
              ),
            }))}
          />
        )}

        <BookmarksButton onOpen={(b) => {
          setMode("surah");
          setSurahN(b.surah);
          setAnchor(b.ayah);
        }} />
      </div>

      {/* ---------- Inhalt ---------- */}
      <div className="mt-6">
        {mode === "surah" && (
          <SurahReader
            n={surahN}
            anchor={anchor}
            onAnchorDone={() => setAnchor(null)}
            onNavigate={(n) => {
              setSurahN(n);
              setAnchor(null);
            }}
          />
        )}
        {mode === "juz" && <JuzView n={juzN} onOpen={(n) => { setMode("surah"); setSurahN(n); setAnchor(null); }} />}
        {mode === "page" && <PageView page={pageN} onOpen={(n) => { setMode("surah"); setSurahN(n); setAnchor(null); }} />}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Auswahlfeld (custom Select auf nativer Basis)                       */
/* ================================================================== */
function Select({
  value,
  onChange,
  options,
  groups,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options?: { value: string; label: string; ar?: string }[];
  groups?: { label: string; options: { value: string; label: string }[] }[];
  ariaLabel: string;
}) {
  return (
    <label className="relative min-w-0 flex-1 basis-64">
      <span className="sr-only">{ariaLabel}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="w-full cursor-pointer appearance-none rounded-lg border border-pine-700 bg-pine-950/80 py-2.5 pl-4 pr-10 text-[14px] font-semibold text-ink outline-none transition-colors hover:border-gold-500/40 focus:border-gold-500/60"
      >
        {options?.map((o) => (
          <option key={o.value} value={o.value} className="bg-pine-900 text-ink">
            {o.label}
            {o.ar ? ` · ${o.ar}` : ""}
          </option>
        ))}
        {groups?.map((g) => (
          <optgroup key={g.label} label={g.label} className="bg-pine-900">
            {g.options.map((o) => (
              <option key={o.value} value={o.value} className="bg-pine-900 text-ink">
                {o.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}

/* ================================================================== */
/* Sūra-Leser                                                          */
/* ================================================================== */
function SurahReader({
  n,
  anchor,
  onAnchorDone,
  onNavigate,
}: {
  n: number;
  anchor: number | null;
  onAnchorDone: () => void;
  onNavigate: (n: number) => void;
}) {
  const [data, setData] = useState<SurahFull | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [tafsirOpen, setTafsirOpen] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const [audioNote, setAudioNote] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bookmarks = useBookmarks();
  const app = useApp();
  const meta = surahMeta(n);

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    setData(null);
    getSurah(n)
      .then((d) => {
        if (!alive) return;
        setData(d);
        setStatus("ready");
        app.completeLesson("quran", "lesung");
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, [n, app]);

  useEffect(() => {
    if (status !== "ready" || anchor === null) return;
    const t = window.setTimeout(() => {
      document.getElementById(`aya-${n}-${anchor}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      onAnchorDone();
    }, 120);
    return () => window.clearTimeout(t);
  }, [status, anchor, n, onAnchorDone]);

  useEffect(() => () => audioRef.current?.pause(), []);

  const play = (global: number, inSurah: number) => {
    setAudioNote(null);
    if (playing === inSurah) {
      audioRef.current?.pause();
      setPlaying(null);
      return;
    }
    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;
    audio.src = ayahAudioUrl(global);
    setPlaying(inSurah);
    audio.onended = () => setPlaying(null);
    audio.onerror = () => {
      setPlaying(null);
      setAudioNote("Audio-Rezitation ist offline nicht erreichbar.");
    };
    audio.play().catch(() => {
      setPlaying(null);
      setAudioNote("Audio-Rezitation ist offline nicht erreichbar.");
    });
  };

  const prev = n > 1 ? n - 1 : null;
  const next = n < 114 ? n + 1 : null;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="overflow-hidden rounded-xl border border-gold-500/25 bg-gradient-to-b from-pine-800 to-pine-900">
          {/* Kopf */}
          <div className="border-b border-gold-500/15 px-6 py-6 text-center md:px-9">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.3em] text-gold-500/80">
              Sūra {meta.n} · {toArabicDigits(meta.n)}
            </p>
            <p dir="rtl" className="mt-1 font-kufi text-4xl text-gold-400 md:text-5xl">
              سُورَةُ {meta.ar}
            </p>
            <p className="mt-1.5 font-display text-lg italic text-ink">
              {meta.tr} — „{meta.de}“
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold">
              <span className="rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-gold-300">
                {meta.type}
              </span>
              <span className="rounded-full border border-pine-700 bg-pine-950/40 px-3 py-1 text-ink-dim">
                {meta.ayahs} Āyāt
              </span>
              <span className="rounded-full border border-pine-700 bg-pine-950/40 px-3 py-1 text-ink-dim">
                Ǧuzʾ {meta.juz}
              </span>
              <span className="rounded-full border border-pine-700 bg-pine-950/40 px-3 py-1 text-ink-dim">
                Muṣḥaf S. {meta.page}
              </span>
              {data && (
                <span
                  className={`rounded-full border px-3 py-1 ${
                    data.source === "bundled"
                      ? "border-teal-500/35 bg-teal-500/10 text-teal-400"
                      : "border-lapis-500/35 bg-lapis-500/10 text-lapis-400"
                  }`}
                >
                  {data.source === "bundled" ? "Offline-Paket · mit Tafsīr" : data.source === "cache" ? "Zwischengespeichert" : "Geladen · alquran.cloud"}
                </span>
              )}
            </div>
          </div>

          {/* Inhalt */}
          <div className="px-5 py-7 md:px-9 md:py-9">
            {status === "loading" && (
              <div className="space-y-5" aria-busy="true">
                {[80, 95, 70, 90, 60].map((w, i) => (
                  <div key={i} className="animate-pulse">
                    <div dir="rtl" className="ml-auto h-7 rounded bg-pine-700/50" style={{ width: `${w}%` }} />
                    <div className="mt-2.5 h-3.5 w-2/5 rounded bg-pine-700/35" />
                  </div>
                ))}
                <p className="pt-2 text-center text-[12px] text-ink-faint">Sūra wird geladen …</p>
              </div>
            )}

            {status === "error" && (
              <div className="py-6 text-center">
                <p className="font-display text-xl font-semibold text-ink">Sūra offline nicht verfügbar</p>
                <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-ink-dim">
                  Diese Sūra liegt nicht im Offline-Paket und die Quran-API war nicht erreichbar. Im
                  Datenpaket enthalten sind die Fātiḥa und die Kurzsūren ab aḍ-Ḍuḥā:
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {BUNDLED_NUMBERS.map((b) => {
                    const m = surahMeta(b);
                    return (
                      <button
                        key={b}
                        onClick={() => onNavigate(b)}
                        className="btn-press rounded-full border border-gold-500/30 px-3.5 py-1.5 text-[12.5px] font-semibold text-gold-300 hover:bg-gold-500/10"
                      >
                        {m.tr}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {status === "ready" && data && (
              <>
                {n !== 1 && n !== 9 && (
                  <p dir="rtl" className="mb-8 text-center font-quran text-[1.7rem] text-gold-500/90">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                )}

                <div className="space-y-7">
                  {data.ayahs.map((a) => {
                    const marked = isBookmarked(n, a.inSurah, bookmarks);
                    return (
                      <div
                        key={a.inSurah}
                        id={`aya-${n}-${a.inSurah}`}
                        className={`group rounded-lg border px-4 py-4 transition-colors md:px-5 ${
                          anchor === a.inSurah
                            ? "border-gold-500/70 bg-gold-500/[0.08]"
                            : marked
                              ? "border-gold-500/30 bg-gold-500/[0.04]"
                              : "border-transparent hover:border-pine-700 hover:bg-pine-950/40"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex w-11 flex-none flex-col items-center gap-2 pt-1.5">
                            <button
                              onClick={() => play(a.global, a.inSurah)}
                              aria-label={playing === a.inSurah ? "Rezitation stoppen" : "Āya anhören"}
                              title={playing === a.inSurah ? "Stoppen" : "Anhören (al-ʿAfāsī)"}
                              className={`btn-press grid h-9 w-9 place-items-center rounded-full border transition-all ${
                                playing === a.inSurah
                                  ? "border-gold-400 bg-gold-500/20 text-gold-300"
                                  : "border-pine-700 text-ink-dim opacity-60 hover:border-gold-500/50 hover:text-gold-300 group-hover:opacity-100"
                              }`}
                            >
                              {playing === a.inSurah ? (
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                  <rect x="7" y="6" width="3.4" height="12" rx="1" />
                                  <rect x="13.6" y="6" width="3.4" height="12" rx="1" />
                                </svg>
                              ) : (
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                  <path d="M8 5.5v13a.7.7 0 0 0 1.1.6l10-6.5a.7.7 0 0 0 0-1.2l-10-6.5A.7.7 0 0 0 8 5.5Z" />
                                </svg>
                              )}
                            </button>
                            <button
                              onClick={() => toggleBookmark({ surah: n, ayah: a.inSurah, ar: a.ar, de: a.de })}
                              aria-label={marked ? "Lesezeichen entfernen" : "Lesezeichen setzen"}
                              className={`btn-press grid h-8 w-8 place-items-center rounded-full transition-all ${
                                marked
                                  ? "text-gold-400"
                                  : "text-ink-faint opacity-50 hover:text-gold-400 group-hover:opacity-100"
                              }`}
                            >
                              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill={marked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                                <path d="M6.5 3.5h11V21l-5.5-4.2L6.5 21V3.5Z" />
                              </svg>
                            </button>
                            <span className="mt-1 font-kufi text-[11px] text-ink-faint">{toArabicDigits(a.inSurah)}</span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <p dir="rtl" className="text-right font-quran text-[1.75rem] leading-[2.1] text-ink md:text-[2.05rem] md:leading-[2.15]">
                              {a.ar}
                              <AyahMarker n={a.inSurah} />
                            </p>
                            {a.de && (
                              <p className="mt-2 border-r-2 border-gold-500/25 pr-3 text-[14px] leading-relaxed text-ink-dim">
                                <span className="mr-1.5 text-[10.5px] font-bold text-gold-500/80">({n}:{a.inSurah})</span>
                                {a.de}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {audioNote && (
                  <p className="mt-5 rounded-lg border border-copper-500/30 bg-copper-500/[0.07] px-4 py-2.5 text-center text-[12.5px] text-copper-400">
                    {audioNote}
                  </p>
                )}

                {/* Blättern */}
                <div className="mt-8 flex items-center justify-between gap-3 border-t border-gold-500/12 pt-5">
                  {prev ? (
                    <button
                      onClick={() => onNavigate(prev)}
                      className="btn-press flex items-center gap-2.5 rounded-full border border-pine-700 px-4 py-2.5 text-[13px] font-bold text-ink-dim hover:border-gold-500/40 hover:text-gold-300"
                    >
                      <Glyph name="arrowL" className="h-4 w-4" />
                      {surahMeta(prev).tr}
                    </button>
                  ) : (
                    <span />
                  )}
                  {next && (
                    <button
                      onClick={() => onNavigate(next)}
                      className="btn-press flex items-center gap-2.5 rounded-full border border-pine-700 px-4 py-2.5 text-[13px] font-bold text-ink-dim hover:border-gold-500/40 hover:text-gold-300"
                    >
                      {surahMeta(next).tr}
                      <Glyph name="arrowR" className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Seitenleiste: Tafsīr & Lesezeichen ---------- */}
      <div className="space-y-5 lg:col-span-4">
        {/* Tafsīr-Akkordeon */}
        <div className="overflow-hidden rounded-xl border border-gold-500/20 bg-pine-900/80">
          <button
            onClick={() => setTafsirOpen((o) => !o)}
            className="btn-press flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-pine-800/60"
            aria-expanded={tafsirOpen}
          >
            <span className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-500/12 text-teal-400">
                <Glyph name="lamp" className="h-4.5 w-4.5" />
              </span>
              <span>
                <span className="block font-display text-[17px] font-semibold text-ink">Tafsīr & Anmerkungen</span>
                <span className="block text-[11px] text-ink-dim">
                  {data?.tafsir ? "Kuratierte Auslegung dieser Sūra" : "Einführung & Verständnis"}
                </span>
              </span>
            </span>
            <svg
              viewBox="0 0 24 24"
              className={`h-4.5 w-4.5 flex-none text-gold-500 transition-transform duration-300 ${tafsirOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {tafsirOpen && (
            <div className="view-enter border-t border-pine-700 px-5 py-4.5">
              {data?.tafsir ? (
                <p className="text-[14px] leading-relaxed text-ink-dim">{data.tafsir}</p>
              ) : (
                <div className="space-y-3 text-[13.5px] leading-relaxed text-ink-dim">
                  <p>
                    <strong className="text-ink">{meta.tr}</strong> („{meta.de}“) ist eine {meta.type}e Sūra mit{" "}
                    {meta.ayahs} Āyāt und steht im {meta.juz}. Ǧuzʾ des Muṣḥaf, beginnend auf Seite {meta.page}.
                  </p>
                  <p className="rounded-lg border border-pine-700 bg-pine-950/50 px-3.5 py-3 text-[12.5px]">
                    Eine kuratierte deutsche Auslegung liegt im Offline-Paket für die Fātiḥa und die Kurzsūren
                    ab aḍ-Ḍuḥā vor. Für diese Sūra empfiehlt sich das Studium mit einem klassischen Tafsīr
                    (z. B. al-Ǧalālayn oder Ibn Kaṯīr) und einem Gelehrten.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lesezeichen-Liste */}
        <BookmarksPanel
          onOpen={(b) => {
            onNavigate(b.surah);
            window.setTimeout(() => {
              document.getElementById(`aya-${b.surah}-${b.ayah}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 250);
          }}
        />

        {/* Kurzhilfe */}
        <div className="rounded-xl border border-pine-700 bg-pine-950/50 px-5 py-4">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-500">So liest du hier</p>
          <ul className="mt-2.5 space-y-1.5 text-[12.5px] text-ink-dim">
            <li>▶ <span className="text-ink">Anhören:</span> Rezitation von Māhir al-ʿAfāsī je Āya</li>
            <li>
              <svg viewBox="0 0 24 24" className="mr-0.5 inline h-3.5 w-3.5 align-[-2px] text-gold-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                <path d="M6.5 3.5h11V21l-5.5-4.2L6.5 21V3.5Z" />
              </svg>{" "}
              <span className="text-ink">Lesezeichen:</span> Āyāt für später speichern
            </li>
            <li>◦ <span className="text-ink">Tafsīr:</span> oben aufklappen und mitlesen</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Ǧuzʾ-Übersicht                                                      */
/* ================================================================== */
function JuzView({ n, onOpen }: { n: number; onOpen: (surah: number) => void }) {
  const list = surahsInJuz(n);
  const before = n > 1 ? surahAtPage(juzStartPage(n) - 1) : null;
  const continues = before && before.page < juzStartPage(n) ? before : null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">
            Ǧuzʾ {n} · {toArabicDigits(n)} — Muṣḥaf-Seiten {juzStartPage(n)}–{juzEndPage(n)}
          </p>
          <h3 className="mt-1 font-display text-3xl font-semibold text-ink">
            {n === 30 ? "Ǧuzʾ ʿAmma — die Kurzsūren" : n === 29 ? "Ǧuzʾ Tabārak" : n === 1 ? "Alif Lām Mīm — der Auftakt" : "Ein Abschnitt des Quran"}
          </h3>
          <p className="mt-1.5 max-w-xl text-[13.5px] text-ink-dim">
            Diese Sūren beginnen in diesem Ǧuzʾ. Der Quran ist in 30 gleich große Leseabschnitte geteilt —
            ein Ǧuzʾ pro Tag ergibt einen Ḫatma im Monat.
          </p>
        </div>
        {continues && (
          <button
            onClick={() => onOpen(continues.n)}
            className="btn-press rounded-full border border-lapis-500/40 px-4 py-2 text-[12.5px] font-bold text-lapis-400 hover:bg-lapis-500/10"
          >
            … setzt {continues.tr} fort →
          </button>
        )}
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((s, i) => (
          <button
            key={s.n}
            onClick={() => onOpen(s.n)}
            className="card-hover group flex items-center gap-4 rounded-xl border border-pine-700 bg-pine-900/70 p-4.5 text-left"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <span className="relative grid h-12 w-12 flex-none place-items-center">
              <Glyph name="star8" className="absolute h-12 w-12 text-gold-500/30 transition-all duration-500 group-hover:rotate-45 group-hover:text-gold-500/60" />
              <span className="font-display text-lg font-bold text-gold-400">{s.n}</span>
            </span>
            <span className="min-w-0 flex-1">
              <span dir="rtl" className="block truncate font-kufi text-xl text-ink transition-colors group-hover:text-gold-300">
                {s.ar}
              </span>
              <span className="block text-[12.5px] font-semibold text-ink-dim">
                {s.tr} · {s.ayahs} Āyāt · S. {s.page}
              </span>
              {BUNDLED[s.n] && (
                <span className="mt-0.5 inline-block rounded-full bg-teal-500/10 px-2 py-0.5 text-[10px] font-bold text-teal-400">
                  mit Tafsīr
                </span>
              )}
            </span>
            <Glyph name="arrowR" className="h-4 w-4 flex-none text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-gold-400" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Seiten-Übersicht                                                    */
/* ================================================================== */
function PageView({ page, onOpen }: { page: number; onOpen: (surah: number) => void }) {
  const cur = surahAtPage(page);
  const startingHere = SURAHS.filter((s) => s.page === page);
  const isFirstOfSurah = startingHere.length > 0;

  return (
    <div>
      <div className="mb-6">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gold-500">
          Muṣḥaf-Seite {page} · {toArabicDigits(page)} — Ǧuzʾ {cur.juz}
        </p>
        <h3 className="mt-1 font-display text-3xl font-semibold text-ink">
          {isFirstOfSurah ? `Hier beginnt ${startingHere.map((s) => s.tr).join(" · ")}` : `Seite in ${cur.tr}`}
        </h3>
        <p className="mt-1.5 max-w-xl text-[13.5px] text-ink-dim">
          Der Madīna-Muṣḥaf zählt 604 Seiten. Diese Seite liegt in <strong className="text-ink">{cur.tr}</strong>{" "}
          („{cur.de}“, {cur.type}, {cur.ayahs} Āyāt), die auf Seite {cur.page} beginnt.
        </p>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
        <button
          onClick={() => onOpen(cur.n)}
          className="card-hover group flex items-center gap-4 rounded-xl border border-gold-500/40 bg-gold-500/[0.07] p-5 text-left"
        >
          <span className="grid h-12 w-12 flex-none place-items-center rounded-lg bg-gold-500/15 text-gold-400">
            <Glyph name="book" className="h-5.5 w-5.5" />
          </span>
          <span className="min-w-0 flex-1">
            <span dir="rtl" className="block truncate font-kufi text-xl text-gold-300">{cur.ar}</span>
            <span className="block text-[12.5px] font-semibold text-ink-dim">
              {cur.tr} öffnen — Verse untereinander
            </span>
          </span>
          <Glyph name="arrowR" className="h-4 w-4 flex-none text-gold-400 transition-transform group-hover:translate-x-1" />
        </button>

        {SURAHS.filter((s) => s.page > page)
          .slice(0, 2)
          .map((s) => (
            <button
              key={s.n}
              onClick={() => onOpen(s.n)}
              className="card-hover group flex items-center gap-4 rounded-xl border border-pine-700 bg-pine-900/70 p-5 text-left"
            >
              <span className="grid h-12 w-12 flex-none place-items-center rounded-lg bg-pine-800 text-ink-dim">
                <span className="font-display text-lg font-bold">{s.n}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-ink">Danach: {s.tr}</span>
                <span className="block text-[12.5px] text-ink-dim">beginnt auf Seite {s.page}</span>
              </span>
              <Glyph name="arrowR" className="h-4 w-4 flex-none text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-gold-400" />
            </button>
          ))}
      </div>

      <p className="mt-5 text-[12px] text-ink-faint">
        Tipp: Im Sūra-Modus werden alle Verse untereinander angezeigt — mit Übersetzung, Audio und Tafsīr.
      </p>
    </div>
  );
}

/* ================================================================== */
/* Lesezeichen                                                         */
/* ================================================================== */
function BookmarksButton({ onOpen }: { onOpen: (b: { surah: number; ayah: number }) => void }) {
  const [open, setOpen] = useState(false);
  const bookmarks = useBookmarks();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`btn-press flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-[13px] font-bold transition-all ${
          open ? "border-gold-500/60 bg-gold-500/12 text-gold-300" : "border-pine-700 text-ink-dim hover:border-gold-500/40 hover:text-gold-300"
        }`}
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill={bookmarks.length ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M6.5 3.5h11V21l-5.5-4.2L6.5 21V3.5Z" />
        </svg>
        {bookmarks.length > 0 ? bookmarks.length : "Lesezeichen"}
      </button>

      {open && (
        <div className="view-enter absolute right-0 top-full z-40 mt-2 w-80 rounded-xl border border-gold-500/25 bg-pine-900 p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]">
          <p className="px-2.5 pb-1.5 pt-1.5 text-[9.5px] font-bold uppercase tracking-[0.26em] text-ink-faint">
            Gespeicherte Āyāt
          </p>
          {bookmarks.length === 0 ? (
            <p className="px-2.5 pb-3 text-[12.5px] text-ink-dim">
              Noch leer — tippe beim Lesen auf das Lesezeichen-Symbol einer Āya.
            </p>
          ) : (
            <ul className="max-h-72 space-y-1 overflow-y-auto">
              {bookmarks.map((b) => {
                const m = surahMeta(b.surah);
                return (
                  <li key={b.id}>
                    <button
                      onClick={() => {
                        onOpen(b);
                        setOpen(false);
                      }}
                      className="btn-press w-full rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-pine-800"
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-[12.5px] font-bold text-ink">
                          {m.tr} {b.surah}:{b.ayah}
                        </span>
                        <span className="text-[10.5px] text-ink-faint">
                          {new Date(b.at).toLocaleDateString("de-DE")}
                        </span>
                      </span>
                      <span dir="rtl" className="mt-0.5 block truncate text-right font-quran text-lg text-gold-300/90">
                        {b.ar}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function BookmarksPanel({ onOpen }: { onOpen: (b: { surah: number; ayah: number }) => void }) {
  const bookmarks = useBookmarks();
  if (bookmarks.length === 0) return null;

  return (
    <div className="rounded-xl border border-gold-500/20 bg-pine-900/80 p-5">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-500">
        Deine Lesezeichen · {bookmarks.length}
      </p>
      <ul className="mt-3 space-y-2">
        {bookmarks.slice(0, 4).map((b) => {
          const m = surahMeta(b.surah);
          return (
            <li key={b.id}>
              <button
                onClick={() => onOpen(b)}
                className="card-hover flex w-full items-center gap-3 rounded-lg border border-pine-700 bg-pine-950/50 px-3.5 py-2.5 text-left"
              >
                <span dir="rtl" className="flex-1 truncate font-quran text-lg text-ink">{b.ar}</span>
                <span className="flex-none text-[11px] font-bold text-gold-400">
                  {m.tr} {b.surah}:{b.ayah}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
