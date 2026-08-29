import { ReactNode, useEffect, useRef, useState } from "react";

/* ---------- Scroll-Reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${vis ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Arabisch-indische Ziffern ---------- */
export function toArabicDigits(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
}

/* ---------- Āya-Marker ---------- */
export function AyahMarker({ n }: { n: number }) {
  return <span className="ayah-marker">{toArabicDigits(n)}</span>;
}

/* ---------- Sektions-Kopf ---------- */
export function SectionHead({
  kicker,
  title,
  ar,
  desc,
}: {
  kicker: string;
  title: string;
  ar: string;
  desc?: string;
}) {
  return (
    <Reveal>
      <header className="mb-10 md:mb-14">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-gold-500/15 pb-6">
          <div className="max-w-2xl">
            <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-500">
              <span className="inline-block h-px w-8 bg-gold-500/70" />
              {kicker}
            </p>
            <h2 className="font-display text-[2rem] font-semibold leading-[1.05] text-ink md:text-5xl">
              <span className="line-mask">
                <span style={{ animationDelay: "0.08s" }}>{title}</span>
              </span>
            </h2>
            {desc && (
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">{desc}</p>
            )}
          </div>
          <p dir="rtl" className="font-kufi text-3xl leading-none text-gold-500/85 md:text-5xl">
            {ar}
          </p>
        </div>
      </header>
    </Reveal>
  );
}

/* ---------- Ornamentale Trennlinie ---------- */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-l from-gold-500/60 to-transparent" />
      <svg width="14" height="14" viewBox="0 0 14 14" className="text-gold-500">
        <rect x="3.2" y="3.2" width="7.6" height="7.6" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <rect x="3.2" y="3.2" width="7.6" height="7.6" fill="none" stroke="currentColor" strokeWidth="1.1" transform="rotate(45 7 7)" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-r from-gold-500/60 to-transparent" />
    </div>
  );
}

/* ---------- Fortschritts-Ring ---------- */
export function Ring({
  pct,
  size = 96,
  stroke = 7,
  color = "#D8B25C",
  children,
}: {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
  children?: ReactNode;
}) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 120);
    return () => clearTimeout(t);
  }, []);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(216,178,92,0.14)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={on ? c * (1 - pct / 100) : c}
          style={{
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.22,1,0.36,1)",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

/* ---------- Ecken-Ornament für Muṣḥaf-Paneele ---------- */
export function CornerOrn({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" className={`h-8 w-8 text-gold-500/70 ${className}`} aria-hidden>
      <path d="M2 42V16A14 14 0 0 1 16 2h26" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 30V22A20 20 0 0 1 22 2h8" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="8" cy="8" r="1.7" fill="currentColor" />
    </svg>
  );
}

/* ---------- Eigene Glyphen ---------- */
export type GlyphName =
  | "star8"
  | "book"
  | "qalam"
  | "scale"
  | "scroll"
  | "tree"
  | "compass"
  | "flame"
  | "beads"
  | "lamp"
  | "wave"
  | "check"
  | "shuffle"
  | "reset"
  | "arrowL"
  | "arrowR"
  | "eye"
  | "clock"
  | "sun"
  | "moon";

export function Glyph({ name, className = "h-5 w-5" }: { name: GlyphName; className?: string }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  let body: ReactNode = null;
  switch (name) {
    case "star8":
      body = (
        <>
          <rect x="6.4" y="6.4" width="11.2" height="11.2" {...stroke} />
          <rect x="6.4" y="6.4" width="11.2" height="11.2" transform="rotate(45 12 12)" {...stroke} />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        </>
      );
      break;
    case "book":
      body = (
        <>
          <path d="M12 6.3C10 4.9 7.4 4.4 4 4.4v14.3c3.4 0 6 .5 8 1.9 2-1.4 4.6-1.9 8-1.9V4.4c-3.4 0-6 .5-8 1.9Z" {...stroke} />
          <path d="M12 6.3v14.3" {...stroke} />
          <path d="M6.6 9h2.6M6.6 12h2.6M14.8 9h2.6M14.8 12h2.6" {...stroke} strokeWidth={1.3} />
        </>
      );
      break;
    case "qalam":
      body = (
        <>
          <path d="M17.2 3.4 20.6 6.8 8.4 19l-4.9 1.5L5 15.6 17.2 3.4Z" {...stroke} />
          <path d="M14.6 6 18 9.4" {...stroke} />
          <path d="M4.5 20.5 5 15.6" {...stroke} />
        </>
      );
      break;
    case "scale":
      body = (
        <>
          <path d="M12 4.6v14.6" {...stroke} />
          <path d="M5.2 19.4h13.6" {...stroke} />
          <path d="M4.6 7h14.8" {...stroke} />
          <path d="M4.6 7 2.9 11.9a2.8 2.8 0 0 0 5.4 0L6.6 7" {...stroke} />
          <path d="M19.4 7l-1.7 4.9a2.8 2.8 0 0 0 5.4 0L21.4 7" {...stroke} />
          <circle cx="12" cy="4" r="1.1" {...stroke} />
        </>
      );
      break;
    case "scroll":
      body = (
        <>
          <path d="M6.6 4.4h10.9a1.9 1.9 0 0 1 1.9 1.9v11.3a1.9 1.9 0 0 1-1.9 1.9H6.6a2.1 2.1 0 0 1-2.1-2.1V6.5a2.1 2.1 0 0 1 2.1-2.1Z" {...stroke} />
          <path d="M19.4 8.4v-2a1.9 1.9 0 0 1 2.1 1.9v9.3a2 2 0 1 1-4 0" {...stroke} />
          <path d="M7.6 9.2h6.4M7.6 12.2h6.4M7.6 15.2h4.2" {...stroke} strokeWidth={1.3} />
        </>
      );
      break;
    case "tree":
      body = (
        <>
          <path d="M12 20.5V9.8" {...stroke} />
          <path d="M12 9.8C12 5.8 9 4 5 4c0 4 3 5.8 7 5.8Z" {...stroke} />
          <path d="M12 13.2c0-3.2 2.4-4.8 5.6-4.8 0 3.2-2.4 4.8-5.6 4.8Z" {...stroke} />
          <path d="M12 20.5c-1.6-1.5-3.2-2.2-5.2-2.2M12 20.5c1.6-1.5 3.2-2.2 5.2-2.2" {...stroke} />
        </>
      );
      break;
    case "compass":
      body = (
        <>
          <circle cx="12" cy="12" r="8.4" {...stroke} />
          <path d="M15.6 8.4 13.4 13.4 8.4 15.6l2.2-5 5-2.2Z" {...stroke} />
          <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
        </>
      );
      break;
    case "flame":
      body = (
        <path
          d="M12 3.2c1.5 2.7 4.8 4.5 4.8 8.2a4.8 4.8 0 0 1-9.6 0c0-1.5.6-2.8 1.6-4 .3 1.1 1 1.9 2 2 .9.1 1.6-.6 1.7-1.5.1-.8-.1-1.7-.5-2.7L12 3.2Z"
          {...stroke}
        />
      );
      break;
    case "beads":
      body = (
        <>
          <path d="M7.4 10.9c2.5-2.4 6.7-2.4 9.2 0" {...stroke} />
          <circle cx="5.4" cy="12.4" r="2" {...stroke} />
          <circle cx="12" cy="13.4" r="2" {...stroke} />
          <circle cx="18.6" cy="12.4" r="2" {...stroke} />
          <path d="M12 15.4v3.4M12 18.8l-1.6 2M12 18.8l1.6 2" {...stroke} strokeWidth={1.3} />
        </>
      );
      break;
    case "lamp":
      body = (
        <>
          <path d="M12 3.6c.8 1.3 2 2.1 2 3.5a2 2 0 1 1-4 0c0-1.4 1.2-2.2 2-3.5Z" {...stroke} />
          <path d="M7.6 11.8h8.8l-1.1 2.9a2.1 2.1 0 0 1-2 1.4h-2.6a2.1 2.1 0 0 1-2-1.4l-1.1-2.9Z" {...stroke} />
          <path d="M12 9.1v2.7M8.5 19.9h7" {...stroke} />
        </>
      );
      break;
    case "wave":
      body = <path d="M3 12c2-4.2 4-4.2 6 0s4 4.2 6 0 4-4.2 6 0" {...stroke} />;
      break;
    case "check":
      body = <path d="M5 12.6 9.5 17 19 7.4" {...stroke} strokeWidth={2} />;
      break;
    case "shuffle":
      body = (
        <>
          <path d="M4 6.6h3.4c5.2 0 5.2 10.8 10.4 10.8H20" {...stroke} />
          <path d="m17.6 15 2.4 2.4-2.4 2.4" {...stroke} />
          <path d="M4 17.4h3.4c2 0 3.3-1.5 4.3-3.2M14 9.8c1-1.6 2.3-3.2 3.8-3.2H20" {...stroke} />
          <path d="m17.6 4.2 2.4 2.4-2.4 2.4" {...stroke} />
        </>
      );
      break;
    case "reset":
      body = (
        <>
          <path d="M4.6 12a7.4 7.4 0 1 0 2.2-5.2L4.6 8.9" {...stroke} />
          <path d="M4.6 4.6v4.3h4.3" {...stroke} />
        </>
      );
      break;
    case "arrowL":
      body = <path d="M15 5l-7 7 7 7" {...stroke} strokeWidth={1.8} />;
      break;
    case "arrowR":
      body = <path d="M9 5l7 7-7 7" {...stroke} strokeWidth={1.8} />;
      break;
    case "eye":
      body = (
        <>
          <path d="M2.6 12S6.2 5.6 12 5.6 21.4 12 21.4 12 17.8 18.4 12 18.4 2.6 12 2.6 12Z" {...stroke} />
          <circle cx="12" cy="12" r="2.6" {...stroke} />
        </>
      );
      break;
    case "clock":
      body = (
        <>
          <circle cx="12" cy="12" r="8" {...stroke} />
          <path d="M12 7.6V12l3 2" {...stroke} />
        </>
      );
      break;
    case "sun":
      body = (
        <>
          <circle cx="12" cy="12" r="4.2" {...stroke} />
          <path
            d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"
            {...stroke}
          />
        </>
      );
      break;
    case "moon":
      body = <path d="M19.5 14.2A8 8 0 0 1 9.8 4.5a8 8 0 1 0 9.7 9.7Z" {...stroke} />;
      break;
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {body}
    </svg>
  );
}

/** Zustand, der localStorage übersteht — mit sicherem Fallback. */
export function usePersistentState<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw) as T;
    } catch {
      /* Speicher nicht verfügbar — Standardwert nutzen */
    }
    return initial;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(val));
    } catch {
      /* still weiterarbeiten */
    }
  }, [key, val]);

  return [val, setVal] as const;
}
