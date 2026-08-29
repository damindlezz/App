import { conjugation, roots, tajweedQuiz, vocab } from "../data/content";
import type { CardDef, CatId, DrillItem, Question } from "./models";

/**
 * Fragenbank & Kartensätze des Nūr-Backends.
 * Inhalte sind normalisiert: jede Frage trägt Kategorie, Erklärung
 * und eindeutige ID — so lassen sie sich beliebig mischen und auswerten.
 */

/* ------------------------------------------------------------------ */
/* Karteikarten                                                        */
/* ------------------------------------------------------------------ */

const EXTRA_VOCAB: CardDef[] = [
  { id: "v-سماء", front: "سَمَاء", back: "der Himmel", hint: "samāʾ — „Er hat den Himmel ohne Säulen emporgehoben.“ (31:10)" },
  { id: "v-قلب", front: "قَلْب", back: "das Herz", hint: "qalb — „Gewiss, im Gedenken Allahs finden die Herzen Ruhe.“ (13:28)" },
  { id: "v-نور", front: "نُور", back: "das Licht", hint: "nūr — Namensgeberin dieser App: „Allah ist das Licht der Himmel und der Erde.“ (24:35)" },
  { id: "v-صبر", front: "صَبْر", back: "die Geduld", hint: "ṣabr — „Allah ist mit den Standhaften.“ (2:153)" },
  { id: "v-علم", front: "عِلْم", back: "das Wissen", hint: "ʿilm — aus der Wurzel ع ل م: wissen, kennen, ein Zeichen erkennen." },
  { id: "v-رحمة", front: "رَحْمَة", back: "die Barmherzigkeit", hint: "raḥma — aus derselben Wurzel wie ar-Raḥmān und ar-Raḥīm." },
  { id: "v-تقوى", front: "تَقْوَى", back: "die Gottesfurcht", hint: "taqwā — „Die Edelsten von euch sind die Gottesfürchtigsten.“ (49:13)" },
  { id: "v-دعاء", front: "دُعَاء", back: "das Bittgebet", hint: "duʿāʾ — „Ruft Mich an, so erhöre Ich euch.“ (40:60)" },
  { id: "v-جنة", front: "جَنَّة", back: "das Paradies", hint: "ǧanna — wörtl. „Garten“; die Wurzel ج ن ن meint das Verborgene." },
  { id: "v-خشوع", front: "خُشُوع", back: "die Demut", hint: "ḫušūʿ — die innere Ruhe im Gebet." },
];

export const DECK: CardDef[] = [
  ...vocab.map((v) => ({ id: "v-" + v.ar, front: v.ar, back: v.de, hint: `${v.tr} — ${v.extra}` })),
  ...EXTRA_VOCAB,
];

/* ------------------------------------------------------------------ */
/* Quiz-Fragen: Taǧwīd (aus dem Muṣḥaf-Modul übernommen)               */
/* ------------------------------------------------------------------ */

const tajweedQuestions: Question[] = tajweedQuiz.map((q, i) => ({
  id: "taj-" + i,
  cat: "tajweed",
  prompt: q.q,
  ar: q.ex.map((s) => s.t).join(""),
  opts: q.opts,
  a: q.a,
  why: q.why,
}));

/* ------------------------------------------------------------------ */
/* Quiz-Fragen: Fiqh & Uṣūl                                            */
/* ------------------------------------------------------------------ */

const fiqhQuestions: Question[] = [
  {
    id: "fq-1",
    cat: "fiqh",
    prompt: "Welcher Imam lehrte in Medina und stützte sich stark auf die Praxis ihrer Bewohner?",
    opts: ["Imam Abū Ḥanīfa", "Imam Mālik ibn Anas", "Imam Aḥmad ibn Ḥanbal"],
    a: 1,
    why: "Imam Mālik (gest. 179 n. H.) galt als „Imam Dār al-Hiǧra“ — der ʿAmal Ahl al-Madīna, die gelebte Praxis Medinas, ist bei ihm eine eigene Rechtsquelle.",
  },
  {
    id: "fq-2",
    cat: "fiqh",
    prompt: "Welche vier Hauptquellen nennt die klassische Uṣūl-Lehre?",
    opts: [
      "Quran, Sunna, Iǧmāʿ, Qiyās",
      "Quran, Fatwa, Brauch, Vernunft",
      "Sunnah, Iǧmāʿ, Istiḥsān, ʿUrf",
    ],
    a: 0,
    why: "In der Hierarchie folgen auf Quran und Sunna der Konsens der Gelehrten (Iǧmāʿ) und der Analogieschluss (Qiyās) — die weiteren Methoden bauen darauf auf.",
  },
  {
    id: "fq-3",
    cat: "fiqh",
    prompt: "Welche Rechtsschule ist heute weltweit am weitesten verbreitet?",
    opts: ["Die mālikitische", "Die hanafitische", "Die hanbalitische"],
    a: 1,
    why: "Die ḥanafitische Schule — historisch durch das Osmanische Reich getragen, heute vor allem in der Türkei, Süd- und Zentralasien sowie auf dem Balkan.",
  },
  {
    id: "fq-4",
    cat: "fiqh",
    prompt: "Was bedeutet Qiyās?",
    opts: [
      "Der Analogieschluss: eine Regelung wird wegen desselben Rechtsgrunds auf einen neuen Fall übertragen",
      "Die wörtliche Auslegung jedes Textes",
      "Das Folgen der Mehrheit der Menschen",
    ],
    a: 0,
    why: "Beim Qiyās wird ein im Text geregelter Fall (Aṣl) mit einem neuen Fall (Farʿ) verglichen — entscheidend ist die gemeinsame ʿIllah, der Rechtsgrund.",
  },
  {
    id: "fq-5",
    cat: "fiqh",
    prompt: "Wer verfasste mit der „ar-Risāla“ das erste große Werk über Uṣūl al-Fiqh?",
    opts: ["Imam as-Sarakhsī", "Imam aš-Šāfiʿī", "Imam Ibn Qudāma"],
    a: 1,
    why: "Imam aš-Šāfiʿī (gest. 204 n. H.) systematisierte die Rechtsmethodik — er war Schüler Imams Mālik und Lehrer der hanbalitischen Überlieferung.",
  },
  {
    id: "fq-6",
    cat: "fiqh",
    prompt: "Was ist Iǧmāʿ?",
    opts: [
      "Die persönliche Meinung eines Muftis",
      "Der Konsens der Gelehrten einer Zeit über eine Rechtsfrage",
      "Ein Mehrheitsbeschluss der Gemeinde",
    ],
    a: 1,
    why: "Iǧmāʿ ist der übereinstimmende Konsens der anerkannten Gelehrten einer Epoche — einmal erreicht, gilt er als verbindlich.",
  },
  {
    id: "fq-7",
    cat: "fiqh",
    prompt: "Welche Quelle steht in der Rangordnung direkt nach Quran und Sunna?",
    opts: ["Qiyās", "Der Iǧmāʿ", "Maṣlaḥa Mursala"],
    a: 1,
    why: "Erst wenn Quran und Sunna keine Antwort geben, greift der Konsens — und erst danach der Analogieschluss.",
  },
  {
    id: "fq-8",
    cat: "fiqh",
    prompt: "Imam Aḥmad ibn Ḥanbal ist besonders bekannt für …",
    opts: [
      "seine große Ḥadīṯ-Sammlung, den Musnad, und seine Texttreue",
      "die Erfindung des Qiyās",
      "seine Ablehnung der Sunna",
    ],
    a: 0,
    why: "Der Musnad Aḥmads umfasst rund 27.000 Überlieferungen. Seine Schule folgt den Texten besonders eng — er selbst war vor allem Ḥadīṯ-Gelehrter.",
  },
];

/* ------------------------------------------------------------------ */
/* Quiz-Fragen: Ḥadīṯ & Überlieferungswissenschaft                     */
/* ------------------------------------------------------------------ */

const hadithQuestions: Question[] = [
  {
    id: "hq-1",
    cat: "hadith",
    prompt: "Was bezeichnet der Begriff Isnād?",
    opts: ["Den Text des Ḥadīṯ", "Die Überliefererkette", "Die Einordnung in ein Buch"],
    a: 1,
    why: "Der Isnād ist die Kette der Namen — von Person zu Person zurück bis zum Propheten ﷺ. Der Maṭn ist der eigentliche Text.",
  },
  {
    id: "hq-2",
    cat: "hadith",
    prompt: "Welche der folgenden ist KEINE der fünf Ṣaḥīḥ-Bedingungen?",
    opts: ["Ununterbrochene Kette", "Der Überlieferer muss Araber sein", "Keine Anomalie (Šuḏūḏ)"],
    a: 1,
    why: "Entscheidend sind Religion, Gedächtnis und Genauigkeit des Überlieferers — nicht seine Herkunft. Gelehrte aller Sprachen haben Ḥadīṯ bewahrt.",
  },
  {
    id: "hq-3",
    cat: "hadith",
    prompt: "Welche Sammlung gilt als das authentischste Buch nach dem Buch Allahs?",
    opts: ["Ṣaḥīḥ al-Buḫārī", "Sunan at-Tirmiḏī", "Muwaṭṭaʾ Mālik"],
    a: 0,
    why: "Imam al-Buḫārī (gest. 256 n. H.) nahm nur Überlieferungen auf, deren Überlieferer sich nachweislich begegnet waren — sein Ṣaḥīḥ genießt höchste Anerkennung.",
  },
  {
    id: "hq-4",
    cat: "hadith",
    prompt: "Ein Ḥadīṯ, das stärkeren Überlieferungen widerspricht, heißt …",
    opts: ["Muʿallaq", "Šāḏḏ", "Mutawātir"],
    a: 1,
    why: "Šāḏḏ (anomal) ist eine Überlieferung eines Vertrauenswürdigen, die im Widerspruch zu noch zuverlässigeren Quellen steht — ein Ausschlusskriterium für Ṣaḥīḥ.",
  },
  {
    id: "hq-5",
    cat: "hadith",
    prompt: "Was ist ein Muʿallaq?",
    opts: [
      "Ein Ḥadīṯ, bei dem am Anfang der Kette Überlieferer weggelassen sind",
      "Ein Ḥadīṯ mit besonders vielen Überlieferern",
      "Ein Ḥadīṯ über hängende Dinge",
    ],
    a: 0,
    why: "Beim Muʿallaq („aufgehängt“) fehlt mindestens ein Überlieferer am Beginn der Kette — die Verbindung ist unterbrochen.",
  },
  {
    id: "hq-6",
    cat: "hadith",
    prompt: "Was kennzeichnet einen Ḥadīṯ Qudsī?",
    opts: [
      "Der Prophet ﷺ gibt darin Worte Allahs sinngemäß wieder",
      "Er steht im Quran",
      "Er hat keine Überliefererkette",
    ],
    a: 0,
    why: "Im Ḥadīṯ Qudsī überliefert der Prophet ﷺ eine Aussage Allahs — anders als der Quran aber nicht als Offenbarungstext, sondern in seinen eigenen Worten.",
  },
  {
    id: "hq-7",
    cat: "hadith",
    prompt: "Wie heißen die sechs kanonischen Ḥadīṯ-Sammlungen?",
    opts: ["Kutub as-Sitta", "Kutub al-Fiqh", "Aṭ-Ṭabaqāt"],
    a: 0,
    why: "Buḫārī, Muslim, Abū Dāwūd, Tirmiḏī, Nasāʾī und Ibn Māǧa — die sechs Bücher (as-Sitta) bilden das Kernkorpus der Sunna.",
  },
  {
    id: "hq-8",
    cat: "hadith",
    prompt: "Was bedeutet eine Überlieferung mit „ʿan … ʿan …“ (Muʿanʿan)?",
    opts: [
      "Die Glieder sind nur mit „von“ verbunden, ohne Nennung des Hörens",
      "Der Text wurde schriftlich fixiert",
      "Die Kette ist doppelt belegt",
    ],
    a: 0,
    why: "ʿAn bedeutet „von“ — ob der Überlieferer wirklich hörte, wird dann geprüft. Buḫārī verlangte nachweisliche Begegnung, Muslim genügte Zeitgenossenschaft.",
  },
];

/* ------------------------------------------------------------------ */
/* Quiz-Fragen: Grammatik (Naḥw & Ṣarf)                                */
/* ------------------------------------------------------------------ */

const grammarQuestions: Question[] = [
  {
    id: "gq-1",
    cat: "grammar",
    prompt: "Wie viele Kasus kennt das arabische Substantiv?",
    opts: ["Zwei", "Drei", "Vier"],
    a: 1,
    why: "Nominativ (Rafʿ), Genitiv (Ǧarr) und Akkusativ (Naṣb) — die Endung zeigt, welche Rolle das Wort im Satz spielt.",
  },
  {
    id: "gq-2",
    cat: "grammar",
    prompt: "Welches Zeichen markiert den Nominativ Singular?",
    opts: ["Die Fatḥa", "Die Ḍamma", "Die Kasra"],
    a: 1,
    why: "Die Ḍamma (ُ ) zeigt den Nominativ — z. B. مُحَمَّدٌ als Satzanfang (Subjekt).",
  },
  {
    id: "gq-3",
    cat: "grammar",
    prompt: "Was geschieht mit dem Lām des Artikels vor einem Šamsī-Buchstaben?",
    opts: ["Es wird assimiliert — man schreibt es, spricht es aber nicht", "Es wird gedehnt", "Es entfällt auch in der Schrift"],
    a: 0,
    why: "In aš-Šams (الشَّمْس) verschmilzt das Lām mit dem Šīn — der Buchstabe wird dafür verdoppelt. Vor Qamarī-Buchstaben bleibt es hörbar: al-Qamar.",
  },
  {
    id: "gq-4",
    cat: "grammar",
    prompt: "Wie lautet der Dual von كِتَاب (Buch)?",
    opts: ["كِتَابَات", "كِتَابَانِ", "كُتُبَانِ"],
    a: 1,
    why: "Der Dual wird mit ـَانِ (Nominativ) bzw. ـَيْنِ (Genitiv/Akkusativ) gebildet: kитābāni — zwei Bücher.",
  },
  {
    id: "gq-5",
    cat: "grammar",
    prompt: "Wie heißt der Ism Fāʿil (Täterform) von كَتَبَ?",
    opts: ["مَكْتُوب", "كِتَاب", "كَاتِب"],
    a: 2,
    why: "Kātib — „der Schreibende“. Das Muster فَاعِل entsteht aus den Wurzelbuchstaben mit langem Ā nach dem ersten Radikal.",
  },
  {
    id: "gq-6",
    cat: "grammar",
    prompt: "Welcher Ausdruck ist bestimmt (Maʿrifa)?",
    opts: ["كِتَابٌ", "هَذَا الكِتَابُ", "كِتَابٌ كَبِيرٌ"],
    a: 1,
    why: "Der Demonstrativartikel hāḏā plus der Artikel al- machen das Buch eindeutig — ein bestimmtes, bekanntes Buch.",
  },
  {
    id: "gq-7",
    cat: "grammar",
    prompt: "In welche Zeiten teilt sich das arabische Verb?",
    opts: ["Vergangenheit, Gegenwart, Zukunft", "al-Māḍī, al-Muḍāriʿ und der Imperativ (Amr)", "Präteritum und Futur"],
    a: 1,
    why: "Māḍī (Abgeschlossenes), Muḍāriʿ (Gegenwärtiges/Zukünftiges) und Amr (Befehl) — drei Formen genügen dem Arabischen.",
  },
  {
    id: "gq-8",
    cat: "grammar",
    prompt: "Was ist ein gebrochener Plural (Ǧamʿ at-Taksīr)?",
    opts: [
      "Ein Plural, der die Form des Wortes verändert — كُتُب zu كِتَاب",
      "Ein Plural mit angehängtem ـَات",
      "Ein Plural, der nur im Dual vorkommt",
    ],
    a: 0,
    why: "Beim Taksīr wird das Wort „gebrochen“: kитāb → kutub. Die Muster sind unregelmäßig — sie werden mit dem Wortschatz mitgelernt.",
  },
];

export const QUESTIONS: Question[] = [
  ...tajweedQuestions,
  ...fiqhQuestions,
  ...hadithQuestions,
  ...grammarQuestions,
];

export const CATS: { id: CatId; name: string; ar: string; color: string; icon: string }[] = [
  { id: "tajweed", name: "Taǧwīd", ar: "التجويد", color: "#E4C071", icon: "wave" },
  { id: "fiqh", name: "Fiqh & Uṣūl", ar: "الفقه", color: "#5FD3B5", icon: "scale" },
  { id: "hadith", name: "Ḥadīṯ", ar: "الحديث", color: "#7FA3E0", icon: "scroll" },
  { id: "grammar", name: "Grammatik", ar: "النحو", color: "#C9A3DE", icon: "qalam" },
];

export const questionsOf = (cat: CatId): Question[] =>
  QUESTIONS.filter((q) => q.cat === cat);

/* ------------------------------------------------------------------ */
/* Übungen: Konjugations-Trainer (aus den Tabellen generiert)          */
/* ------------------------------------------------------------------ */

export function conjugationDrill(n = 6, seedOffset = 0): DrillItem[] {
  const cells: { label: string; value: string; ar: string }[] = [];
  (["past", "present"] as const).forEach((t) => {
    const conj = conjugation[t];
    conj.rows.forEach((r) => {
      (["s", "d", "p"] as const).forEach((num, i) => {
        cells.push({
          label: `${r.label} · ${num === "s" ? "Singular" : num === "d" ? "Dual" : "Plural"} · ${t === "past" ? "al-Māḍī" : "al-Muḍāriʿ"}`,
          value: r[num],
          ar: `${t === "past" ? "كَتَبَ" : "يَكْتُبُ"} — ${t === "past" ? "Vergangenheit" : "Gegenwart"}`,
        });
        void i;
      });
    });
  });

  const items: DrillItem[] = [];
  for (let k = 0; k < cells.length && items.length < n; k++) {
    const idx = (k + seedOffset) % cells.length;
    const c = cells[idx];
    const distractors = cells
      .filter((x) => x.value !== c.value)
      .sort(() => 0.5 - Math.abs(Math.sin(idx * 7 + items.length)))
      .slice(0, 2)
      .map((x) => x.value);
    const opts = [c.value, ...distractors].sort(
      () => 0.5 - Math.abs(Math.sin(idx * 13 + 1)),
    );
    items.push({
      id: "conj-" + idx,
      prompt: `Welche Form gehört hierher?`,
      ar: c.label,
      opts,
      a: opts.indexOf(c.value),
      info: `${c.value} — ${c.label}`,
    });
  }
  return items;
}

/* ------------------------------------------------------------------ */
/* Übungen: Wurzel-Suche                                               */
/* ------------------------------------------------------------------ */

export function rootDrill(n = 6, seedOffset = 0): DrillItem[] {
  const all = roots.flatMap((r) =>
    r.forms.map((f) => ({ word: f.ar, de: f.de, root: r.root, tr: r.tr })),
  );
  const items: DrillItem[] = [];
  for (let k = 0; k < all.length && items.length < n; k++) {
    const idx = (k + seedOffset) % all.length;
    const w = all[idx];
    const others = roots
      .filter((r) => r.root !== w.root)
      .sort(() => 0.5 - Math.abs(Math.sin(idx * 11 + 2)))
      .slice(0, 2)
      .map((r) => r.root);
    const opts = [w.root, ...others].sort(
      () => 0.5 - Math.abs(Math.sin(idx * 17 + 3)),
    );
    items.push({
      id: "root-" + idx,
      prompt: "Aus welcher Wurzel stammt dieses Wort?",
      ar: `${w.word} — ${w.de}`,
      opts,
      a: opts.indexOf(w.root),
      info: `${w.word} wächst aus ${w.root} (${w.tr}).`,
    });
  }
  return items;
}
