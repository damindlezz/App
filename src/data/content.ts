/* ============================================================
   NŪR AKADEMIE — Lerninhalte (Konzeptstudie)
   ============================================================ */

export type Seg = { t: string; hl?: boolean };
export type TajweedExample = { ar: string; segs: Seg[]; note: string };
export type TajweedRule = {
  id: string;
  name: string;
  ar: string;
  color: string;
  short: string;
  detail: string;
  letters?: string;
  examples: TajweedExample[];
};

/* ---------- Taǧwīd-Regeln ---------- */
export const tajweedRules: TajweedRule[] = [
  {
    id: "mad",
    name: "al-Madd",
    ar: "الْمَدُّ",
    color: "#C9A3DE",
    short: "Dehnung der Langvokale",
    detail:
      "Ein Madd-Buchstabe — Alif nach Fatḥa, Wāw mit Sukūn nach Ḍamma, Yāʾ mit Sukūn nach Kasra — wird gedehnt: im Grundfall (Madd ṭabīʿī) um zwei Ḥarakāt. Am Wortende verlängert sich der Madd beim Anhalten zum Madd ʿāriḍ (2, 4 oder 6 Ḥarakāt).",
    letters: "ا · و · ي",
    examples: [
      { ar: "قَالُوا", segs: [{ t: "قَا", hl: true }, { t: "لُ" }, { t: "وا", hl: true }], note: "qālū — zwei natürliche Dehnungen" },
      { ar: "الْعَالَمِينَ", segs: [{ t: "الْعَ" }, { t: "ا", hl: true }, { t: "لَمِ" }, { t: "ينَ", hl: true }], note: "am Wortende: Madd ʿāriḍ" },
    ],
  },
  {
    id: "qalqala",
    name: "al-Qalqala",
    ar: "الْقَلْقَلَةُ",
    color: "#D8B25C",
    short: "Das Vibrieren: ق ط ب ج د",
    detail:
      "Steht einer der fünf Qalqala-Buchstaben mit Sukūn, „federt“ der Laut beim Aussprechen hörbar nach. In der Wortmitte ist die Qalqala klein (ṣuġrā), beim Anhalten am Wortende groß (kubrā).",
    letters: "ق · ط · ب · ج · د",
    examples: [
      { ar: "يَقْطَعُونَ", segs: [{ t: "يَ" }, { t: "قْ", hl: true }, { t: "طَعُونَ" }], note: "das sakin Qāf federt nach" },
      { ar: "يَدْخُلُونَ", segs: [{ t: "يَ" }, { t: "دْ", hl: true }, { t: "خُلُونَ" }], note: "Dāl mit Sukūn in der Wortmitte" },
    ],
  },
  {
    id: "ghunna",
    name: "al-Ghunna",
    ar: "الْغُنَّةُ",
    color: "#4FC1A6",
    short: "Der Nasalklang bei Nūn & Mīm mit Šadda",
    detail:
      "Ein Nūn oder Mīm mit Šadda wird mit einem etwa zwei Ḥarakāt gehaltenen Nasalklang aus der Nase gesprochen — ohne dass die Zunge den Buchstaben neu artikuliert. Die Ghunna ist die „Seele“ des Nūn und Mīm.",
    letters: "نَّ · مَّ",
    examples: [
      { ar: "إِنَّ", segs: [{ t: "إِ" }, { t: "نَّ", hl: true }], note: "Nūn mit Šadda — zwei Ḥarakāt nasal" },
      { ar: "ثُمَّ", segs: [{ t: "ثُ" }, { t: "مَّ", hl: true }], note: "Mīm mit Šadda — ebenso gehalten" },
    ],
  },
  {
    id: "ikhfa",
    name: "al-Iḫfāʾ",
    ar: "الإِخْفَاءُ",
    color: "#6E93D6",
    short: "Das Verbergen des Nūn vor 15 Buchstaben",
    detail:
      "Folgt auf ein Nūn mit Sukūn oder ein Tanwīn einer der 15 Iḫfāʾ-Buchstaben, wird das Nūn „verborgen“: zwischen Iẓhār und Idġām, mit Ghunna. Die Zunge berührt den Gaumen nicht vollständig.",
    letters: "ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك",
    examples: [
      { ar: "مِنْ تَحْتِهَا", segs: [{ t: "مِ" }, { t: "نْ تَ", hl: true }, { t: "حْتِهَا" }], note: "Nūn vor Tāʾ — verborgen mit Ghunna" },
      { ar: "أَنْفُسَكُمْ", segs: [{ t: "أَ" }, { t: "نْفُ", hl: true }, { t: "سَكُمْ" }], note: "Nūn vor Fāʾ" },
    ],
  },
  {
    id: "idgham",
    name: "al-Idġām",
    ar: "الإِدْغَامُ",
    color: "#D08770",
    short: "Verschmelzen — mit & ohne Ghunna",
    detail:
      "Trifft ein Nūn mit Sukūn oder Tanwīn auf die Buchstaben يرملون, verschmilzt das Nūn mit dem Folgelaut. Bei ي ن م و mit Ghunna (Idġām bi-ġunna), bei ل und ر ohne (Idġām bilā ġunna).",
    letters: "ي ر م ل و ن",
    examples: [
      { ar: "مَنْ يَعْمَلْ", segs: [{ t: "مَ" }, { t: "نْ يَ", hl: true }, { t: "عْمَلْ" }], note: "mit Ghunna — Yāʾ gehört zu ينمو" },
      { ar: "مِن رَّبِّهِمْ", segs: [{ t: "مِ" }, { t: "نْ رَّ", hl: true }, { t: "بِّهِمْ" }], note: "ohne Ghunna — Rāʾ und Lām" },
    ],
  },
  {
    id: "idhhar",
    name: "al-Iẓhār",
    ar: "الإِظْهَارُ",
    color: "#7FB069",
    short: "Das klare Nūn vor den Kehlbuchstaben",
    detail:
      "Vor den sechs Kehlbuchstaben wird das Nūn mit Sukūn oder das Tanwīn völlig klar und ohne Nasalklang gesprochen — kurz und deutlich, ohne die Artikulation zu dehnen.",
    letters: "ء هـ ع ح غ خ",
    examples: [
      { ar: "مِنْ عِلْمٍ", segs: [{ t: "مِ" }, { t: "نْ عِ", hl: true }, { t: "لْمٍ" }], note: "Nūn vor ʿAin — klar, ohne Ghunna" },
      { ar: "أَنْعَمْتَ", segs: [{ t: "أَ" }, { t: "نْعَ", hl: true }, { t: "مْتَ" }], note: "aus der Fātiḥa (Vers 7)" },
    ],
  },
  {
    id: "iqlab",
    name: "al-Iqlāb",
    ar: "الإِقْلَابُ",
    color: "#DE8BA0",
    short: "Nūn wird zu Mīm vor dem Bāʾ",
    detail:
      "Steht nach einem Nūn mit Sukūn oder Tanwīn ein Bāʾ, wird das Nūn zu einem Mīm mit Ghunna umgewandelt — die Lippen schließen sich leicht, der Klang wechselt von der Nase zu den Lippen.",
    letters: "ب",
    examples: [
      { ar: "مِنۢ بَعْدِ", segs: [{ t: "مِ" }, { t: "نۢ بَ", hl: true }, { t: "عْدِ" }], note: "das kleine Mīm-Zeichen markiert den Iqlāb" },
      { ar: "سَمِيعٌ بَصِيرٌ", segs: [{ t: "سَمِيعٌ" }, { t: " بَ", hl: true }, { t: "صِيرٌ" }], note: "Tanwīn vor Bāʾ" },
    ],
  },
];

/* ---------- Sūrat al-Fātiḥa (Wort für Wort) ---------- */
export type Word = { ar: string; de: string; rule?: string };
export type Verse = { n: number; words: Word[] };

export const fatiha: Verse[] = [
  {
    n: 1,
    words: [
      { ar: "بِسْمِ", de: "Im Namen" },
      { ar: "اللهِ", de: "Gottes" },
      { ar: "الرَّحْمَنِ", de: "des Allerbarmers", rule: "mad" },
      { ar: "الرَّحِيمِ", de: "des Barmherzigen" },
    ],
  },
  {
    n: 2,
    words: [
      { ar: "الْحَمْدُ", de: "(Alles) Lob" },
      { ar: "لِلَّهِ", de: "gebührt Allah" },
      { ar: "رَبِّ", de: "dem Herrn" },
      { ar: "الْعَالَمِينَ", de: "der Welten", rule: "mad" },
    ],
  },
  {
    n: 3,
    words: [
      { ar: "الرَّحْمَنِ", de: "dem Allerbarmers", rule: "mad" },
      { ar: "الرَّحِيمِ", de: "dem Barmherzigen" },
    ],
  },
  {
    n: 4,
    words: [
      { ar: "مَالِكِ", de: "dem Herrscher", rule: "mad" },
      { ar: "يَوْمِ", de: "am Tag", rule: "mad" },
      { ar: "الدِّينِ", de: "des Gerichts", rule: "mad" },
    ],
  },
  {
    n: 5,
    words: [
      { ar: "إِيَّاكَ", de: "Dir allein", rule: "mad" },
      { ar: "نَعْبُدُ", de: "dienen wir" },
      { ar: "وَإِيَّاكَ", de: "und Dich allein", rule: "mad" },
      { ar: "نَسْتَعِينُ", de: "bitten wir um Hilfe", rule: "mad" },
    ],
  },
  {
    n: 6,
    words: [
      { ar: "اهْدِنَا", de: "Führe uns" },
      { ar: "الصِّرَاطَ", de: "auf den Weg" },
      { ar: "الْمُسْتَقِيمَ", de: "den geraden", rule: "mad" },
    ],
  },
  {
    n: 7,
    words: [
      { ar: "صِرَاطَ", de: "den Weg" },
      { ar: "الَّذِينَ", de: "derjenigen," },
      { ar: "أَنْعَمْتَ", de: "denen Du Gnade erwiesen hast", rule: "idhhar" },
      { ar: "عَلَيْهِمْ", de: "— über sie —" },
      { ar: "غَيْرِ", de: "nicht der" },
      { ar: "الْمَغْضُوبِ", de: "Zornbeladenen", rule: "mad" },
      { ar: "عَلَيْهِمْ", de: "über sie" },
      { ar: "وَلَا", de: "und nicht der" },
      { ar: "الضَّالِّينَ", de: "Irregehenden", rule: "mad" },
    ],
  },
];

/* ---------- Ḥifẓ: Sūrat al-Iḫlāṣ ---------- */
export const ikhlasWords: string[] = [
  "قُلْ", "هُوَ", "اللهُ", "أَحَدٌ",
  "اللهُ", "الصَّمَدُ",
  "لَمْ", "يَلِدْ", "وَلَمْ", "يُولَدْ",
  "وَلَمْ", "يَكُن", "لَّهُ", "كُفُوًا", "أَحَدٌ",
];
export const ikhlasDe =
  "Sprich: Er ist Allah, ein Einziger. Allah ist der Absolute. Er zeugt nicht und ist nicht gezeugt worden. Und keiner ist Ihm ebenbürtig.";

/* ---------- Āya des Tages ---------- */
export const ayahOfDay = {
  ar: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
  de: "„Lies! Im Namen deines Herrn, der erschaffen hat.“",
  ref: "Sūrat al-ʿAlaq · 96:1 — die erste Offenbarung",
  tafsir:
    "Der erste Befehl an den Propheten ﷺ in der Höhle von Ḥirāʾ: Iqraʾ — Lies! Kein Gebot, kein Verbot, sondern das Lesen steht am Anfang der Offenbarung. Der Islam beginnt mit dem Wissen.",
};

/* ---------- Arabisch: Wurzeln ---------- */
export type RootForm = { ar: string; slot: string; de: string };
export type Root = { root: string; tr: string; meaning: string; forms: RootForm[] };

export const roots: Root[] = [
  {
    root: "ك ت ب",
    tr: "k-t-b",
    meaning: "schreiben",
    forms: [
      { ar: "كَتَبَ", slot: "Fiʿl I · Māḍī", de: "er schrieb" },
      { ar: "يَكْتُبُ", slot: "Fiʿl I · Muḍāriʿ", de: "er schreibt" },
      { ar: "كِتَابٌ", slot: "Ism · Ergebnis", de: "das Buch" },
      { ar: "كَاتِبٌ", slot: "Ism Fāʿil", de: "der Schreiber, Autor" },
      { ar: "مَكْتُوبٌ", slot: "Ism Mafʿūl", de: "geschrieben — „Maktūb“: es steht geschrieben" },
      { ar: "مَكْتَبٌ", slot: "Ism Makān", de: "Schreibtisch, Büro" },
      { ar: "مَكْتَبَةٌ", slot: "Ort · Institution", de: "Bibliothek, Buchhandlung" },
      { ar: "كِتَابَةٌ", slot: "Maṣdar", de: "das Schreiben, die Schrift" },
    ],
  },
  {
    root: "ق ر أ",
    tr: "q-r-ʾ",
    meaning: "lesen, rezitieren",
    forms: [
      { ar: "قَرَأَ", slot: "Fiʿl I · Māḍī", de: "er las" },
      { ar: "يَقْرَأُ", slot: "Fiʿl I · Muḍāriʿ", de: "er liest" },
      { ar: "قُرْآنٌ", slot: "Ism · Ergebnis", de: "die Rezitation — der Quran" },
      { ar: "قَارِئٌ", slot: "Ism Fāʿil", de: "der Rezitator, Qāriʾ" },
      { ar: "قِرَاءَةٌ", slot: "Maṣdar", de: "das Lesen, die Lesart (Qirāʾa)" },
      { ar: "أَقْرَأَ", slot: "Fiʿl IV · transitiv", de: "er ließ lesen, lehrte das Lesen" },
    ],
  },
  {
    root: "ع ل م",
    tr: "ʿ-l-m",
    meaning: "wissen",
    forms: [
      { ar: "عَلِمَ", slot: "Fiʿl I · Māḍī", de: "er wusste" },
      { ar: "يَعْلَمُ", slot: "Fiʿl I · Muḍāriʿ", de: "er weiß" },
      { ar: "عِلْمٌ", slot: "Maṣdar", de: "das Wissen, die Wissenschaft" },
      { ar: "عَالِمٌ", slot: "Ism Fāʿil", de: "der Gelehrte, der ʿĀlim" },
      { ar: "عَلَّمَ", slot: "Fiʿl II · transitiv", de: "er lehrte" },
      { ar: "مُعَلِّمٌ", slot: "Ism Fāʿil II", de: "der Lehrer" },
      { ar: "عَلَّامَةٌ", slot: "Steigerungsform", de: "hochgelehrt, der Enzyklopädist" },
    ],
  },
  {
    root: "د ر س",
    tr: "d-r-s",
    meaning: "studieren, lernen",
    forms: [
      { ar: "دَرَسَ", slot: "Fiʿl I · Māḍī", de: "er studierte, lernte" },
      { ar: "يَدْرُسُ", slot: "Fiʿl I · Muḍāriʿ", de: "er studiert" },
      { ar: "دَرْسٌ", slot: "Maṣdar / Ism", de: "die Lektion, der Unterricht" },
      { ar: "مَدْرَسَةٌ", slot: "Ism Makān", de: "die Schule" },
      { ar: "مُدَرِّسٌ", slot: "Ism Fāʿil II", de: "der Lehrer, Dozent" },
      { ar: "دِرَاسَةٌ", slot: "Maṣdar III", de: "das Studium, die Studie" },
    ],
  },
];

/* ---------- Arabisch: Konjugation كَتَبَ ---------- */
export type ConjRow = { label: string; s: string; d: string; p: string };
export const conjugation = {
  past: {
    title: "al-Māḍī — Vergangenheit",
    rows: [
      { label: "3. Person m.", s: "كَتَبَ", d: "كَتَبَا", p: "كَتَبُوا" },
      { label: "3. Person f.", s: "كَتَبَتْ", d: "كَتَبَتَا", p: "كَتَبْنَ" },
      { label: "2. Person m.", s: "كَتَبْتَ", d: "كَتَبْتُمَا", p: "كَتَبْتُمْ" },
      { label: "2. Person f.", s: "كَتَبْتِ", d: "كَتَبْتُمَا", p: "كَتَبْتُنَّ" },
      { label: "1. Person", s: "كَتَبْتُ", d: "كَتَبْنَا", p: "كَتَبْنَا" },
    ] as ConjRow[],
  },
  present: {
    title: "al-Muḍāriʿ — Gegenwart",
    rows: [
      { label: "3. Person m.", s: "يَكْتُبُ", d: "يَكْتُبَانِ", p: "يَكْتُبُونَ" },
      { label: "3. Person f.", s: "تَكْتُبُ", d: "تَكْتُبَانِ", p: "يَكْتُبْنَ" },
      { label: "2. Person m.", s: "تَكْتُبُ", d: "تَكْتُبَانِ", p: "تَكْتُبُونَ" },
      { label: "2. Person f.", s: "تَكْتُبِينَ", d: "تَكْتُبَانِ", p: "تَكْتُبْنَ" },
      { label: "1. Person", s: "أَكْتُبُ", d: "نَكْتُبُ", p: "نَكْتُبُ" },
    ] as ConjRow[],
  },
};

/* ---------- Arabisch: Karteikarten ---------- */
export type Vocab = { ar: string; tr: string; de: string; extra: string };
export const vocab: Vocab[] = [
  { ar: "نُورٌ", tr: "nūr", de: "das Licht", extra: "Pl. أَنْوَار — „Allāh ist das Licht der Himmel und der Erde“ (24:35)" },
  { ar: "عِلْمٌ", tr: "ʿilm", de: "das Wissen", extra: "Pl. عُلُوم — ṭalab al-ʿilm: das Streben nach Wissen" },
  { ar: "كِتَابٌ", tr: "kitāb", de: "das Buch", extra: "Pl. كُتُب — aus der Wurzel ك ت ب (schreiben)" },
  { ar: "قَلَمٌ", tr: "qalam", de: "der Stift, die Feder", extra: "Pl. أَقْلَام — „Sūrat al-Qalam“ (68): „Nūn. Bei dem Schreibrohr…“" },
  { ar: "صَلَاةٌ", tr: "ṣalāh", de: "das Gebet", extra: "Pl. صَلَوَات — die zweite der fünf Säulen des Islam" },
  { ar: "صَبْرٌ", tr: "ṣabr", de: "die Geduld", extra: "„Wa-ṣābirū“ — und seid geduldig (3:200)" },
  { ar: "رَحْمَةٌ", tr: "raḥma", de: "die Barmherzigkeit", extra: "ar-Raḥmān & ar-Raḥīm — zwei der schönsten Namen Allahs" },
  { ar: "مَسْجِدٌ", tr: "masǧid", de: "die Moschee", extra: "Ortsnomen von س ج د — „der Ort der Niederwerfung“" },
  { ar: "حِكْمَةٌ", tr: "ḥikma", de: "die Weisheit", extra: "„Wem die Weisheit gegeben wurde, dem wurde viel Gutes gegeben“ (2:269)" },
  { ar: "طَلَبٌ", tr: "ṭalab", de: "das Streben, Verlangen", extra: "ṭalab al-ʿilm — das Suchen nach Wissen ist Pflicht (Ibn Māǧa)" },
];

/* ---------- Fiqh: Imame & Zeitleiste ---------- */
export type Imam = { name: string; full: string; life: string; place: string; color: string; note: string };
export const imams: Imam[] = [
  {
    name: "Abū Ḥanīfa",
    full: "an-Nuʿmān b. Ṯābit",
    life: "80–150 n. H.",
    place: "Kufa",
    color: "#4FC1A6",
    note: "„al-Imām al-Aʿẓam“, der große Imam. Seine Schule denkt stark in Prinzipien (Raʾy) — getragen von Abū Yūsuf und Muḥammad aš-Šaybānī.",
  },
  {
    name: "Mālik b. Anas",
    full: "Imām Dār al-Hiǧra",
    life: "93–179 n. H.",
    place: "Medina",
    color: "#6E93D6",
    note: "Autor des Muwaṭṭaʾ, einer der frühesten Ḥadīṯ-Sammlungen. Seine Schule folgt stark dem ʿAmal — der gelebten Praxis der Leute von Medina.",
  },
  {
    name: "aš-Šāfiʿī",
    full: "Muḥammad b. Idrīs",
    life: "150–204 n. H.",
    place: "Kairo",
    color: "#D8B25C",
    note: "„Vater der Uṣūl“: Seine Risāla begründete die Rechtsmethodik als eigene Wissenschaft — zwischen den Schulen von Raʾy und Ḥadīṯ.",
  },
  {
    name: "Aḥmad b. Ḥanbal",
    full: "Aḥmad b. Muḥammad",
    life: "164–241 n. H.",
    place: "Bagdad",
    color: "#D08770",
    note: "Ḥadīṯ-Gelehrter par excellence: Sein Musnad versammelt rund 30.000 Überlieferungen; seine Schule bleibt nah am Text.",
  },
];

/* ---------- Fiqh: Vergleichsfragen ---------- */
export type MadhabId = "hanafi" | "maliki" | "shafi" | "hanbali";
export const madhabMeta: Record<MadhabId, { name: string; ar: string; color: string }> = {
  hanafi: { name: "Ḥanafitisch", ar: "الحنفية", color: "#4FC1A6" },
  maliki: { name: "Mālikitisch", ar: "المالكية", color: "#6E93D6" },
  shafi: { name: "Šāfiʿitisch", ar: "الشافعية", color: "#D8B25C" },
  hanbali: { name: "Ḥanbalitisch", ar: "الحنابلة", color: "#D08770" },
};

export type Position = { madhab: MadhabId; ruling: string; evidence: string };
export type Issue = { id: string; q: string; context: string; positions: Position[] };

export const issues: Issue[] = [
  {
    id: "beruehrung",
    q: "Berührung zwischen Mann & Frau — bricht sie das Wuḍūʾ?",
    context: "Die Auslegung von „… oder ihr Frauen berührt habt“ (Sūra 4:43).",
    positions: [
      { madhab: "hanafi", ruling: "Nein — das Wuḍūʾ bleibt gültig.", evidence: "„lāmastum“ wird als Beischlaf verstanden; der Prophet ﷺ küsste eine seiner Frauen und betete, ohne das Wuḍūʾ zu erneuern (Abū Dāwūd, at-Tirmiḏī)." },
      { madhab: "maliki", ruling: "Ja — bei Berührung mit Lust (Šahwa).", evidence: "Wortlaut von 4:43, eingeschränkt durch die Praxis der Gefährten: Berührung mit Empfinden bricht, ohne Empfinden nicht." },
      { madhab: "shafi", ruling: "Ja — bei jeder Hautberührung (Nicht-Maḥram).", evidence: "Der Wortlaut „lāmastum“ gilt uneingeschränkt — so die feststehende Stellungnahme der Schule ohne Zusatzbedingung." },
      { madhab: "hanbali", ruling: "Ja — bei Berührung mit Lust.", evidence: "Der Wortlaut wird mit dem Ḥadīṯ vom Kuss verbunden: mit Lust bricht das Wuḍūʾ, ohne Lust nicht — die bevorzugte Stellungnahme der Schule." },
    ],
  },
  {
    id: "qunut",
    q: "Qunūt im Faǧr-Gebet?",
    context: "Das Bittgebet im Stehen nach dem Rukūʿ der zweiten Rakʿa.",
    positions: [
      { madhab: "hanafi", ruling: "Nur im Witir-Gebet.", evidence: "Der Qunūt des Propheten ﷺ im Faǧr war ein Qunūt an-Nāzila bei Unglück und wurde wieder verlassen — so die kufische Überlieferung." },
      { madhab: "maliki", ruling: "Empfohlen (Mustaḥabb) im Faǧr — leise, vor dem Rukūʿ.", evidence: "Der fortdauernde ʿAmal der Leute von Medina; Imām Mālik selbst pflegte den Qunūt im Faǧr." },
      { madhab: "shafi", ruling: "Sunnah im Faǧr — nach dem Rukūʿ der zweiten Rakʿa.", evidence: "Anas b. Mālik: „Der Gesandte Allahs ﷺ sprach den Qunūt im Faǧr, bis er die Welt verließ“ (ad-Dāraquṭnī, al-Ḥākim)." },
      { madhab: "hanbali", ruling: "Nicht im Faǧr — nur im Witir und bei Nāzila.", evidence: "Ṭāriq b. Ašyam hörte den Propheten ﷺ den Qunūt nur bei Unglücksfällen sprechen (Muslim) — so die Muʿtamad-Stellungnahme." },
    ],
  },
  {
    id: "basmala",
    q: "Die Basmala — Teil der Fātiḥa? Laut oder leise?",
    context: "Bismillāhi r-Raḥmāni r-Raḥīm als Āya und ihre Rezitation im Gebet.",
    positions: [
      { madhab: "hanafi", ruling: "Āya zum Sūrenbeginn — wird aber leise rezitiert.", evidence: "Die Praxis der Ṣaḥāba, das Gebet leise mit „al-Ḥamdu lillāh“ zu eröffnen; die Basmala trennt die Sūren voneinander." },
      { madhab: "maliki", ruling: "Kein Bestandteil — im Pflichtgebet nicht zu rezitieren.", evidence: "Der ʿAmal von Medina: Imām Mālik eröffnete das Gebet direkt mit „al-Ḥamdu lillāhi Rabbi l-ʿĀlamīn“." },
      { madhab: "shafi", ruling: "Erste Āya der Fātiḥa — im lauten Gebet laut.", evidence: "Umm Salama überliefert die Basmala als Āya der Eröffnung; der Prophet ﷺ zählte sie zur Fātiḥa (ad-Dāraquṭnī, al-Ḥākim)." },
      { madhab: "hanbali", ruling: "Āya der Fātiḥa — aber leise, auch im lauten Gebet.", evidence: "Anas: „Ich betete hinter dem Propheten ﷺ, Abū Bakr und ʿUmar — sie begannen mit ‚al-Ḥamdu lillāhi Rabbi l-ʿĀlamīn‘“ (Buḫārī, Muslim)." },
    ],
  },
  {
    id: "niyya",
    q: "Ist die Niyya Bedingung für das Wuḍūʾ?",
    context: "„Die Taten sind entsprechend den Absichten“ — gilt das für jede rituelle Handlung?",
    positions: [
      { madhab: "hanafi", ruling: "Keine Bedingung — aber Sunna.", evidence: "Das Wuḍūʾ kennt auch eine ʿādah-Seite (Gewohnheitshandlung); die Reinigung vollzieht sich durch die Handlung — die Absicht erhöht den Lohn." },
      { madhab: "maliki", ruling: "Ja — eine der Pflichten (Farḍ) des Wuḍūʾ.", evidence: "„Innamā l-aʿmāl bi-n-niyyāt“ (muttafaq ʿalayh) — verbunden mit der Medinenser Praxis, die Absicht zur Ṭahāra vorauszusetzen." },
      { madhab: "shafi", ruling: "Ja — Bedingung der Gültigkeit.", evidence: "Das Wuḍūʾ ist reine ʿIbāda; ohne Absicht keine ʿIbāda — unmittelbar aus dem Niyya-Ḥadīṯ abgeleitet." },
      { madhab: "hanbali", ruling: "Ja — Bedingung der Gültigkeit.", evidence: "Wie šāfiʿitisch: die Absicht geht der rituellen Handlung voraus; Imām Aḥmad folgt hier dem Wortlaut des Ḥadīṯ." },
    ],
  },
];

/* ---------- Uṣūl al-Fiqh ---------- */
export type Source = { name: string; ar: string; color: string; desc: string };
export const usulSources: Source[] = [
  { name: "al-Qurʾān", ar: "القرآن", color: "#F0D48A", desc: "Die erste Quelle: wortwörtliche Offenbarung, qaṭʿī (gesichert) in der Überlieferung. Jede Rechtsfindung beginnt beim Text." },
  { name: "as-Sunna", ar: "السنة", color: "#E4C071", desc: "Aussagen, Taten und Billigungen des Propheten ﷺ — sie erklärt den Quran, konkretisiert ihn und ergänzt ihn." },
  { name: "al-Iǧmāʿ", ar: "الإجماع", color: "#D8B25C", desc: "Der Konsens der Gelehrten einer Epoche über eine Rechtsfrage — wo er feststeht, ist er bindend." },
  { name: "al-Qiyās", ar: "القياس", color: "#B8923E", desc: "Der Analogieschluss: ein Urteil wird wegen einer gemeinsamen Ursache (ʿIlla) auf einen neuen Fall übertragen — z. B. das Verbot berauschender Mittel über den Wein hinaus." },
];

export type Method = { name: string; ar: string; desc: string };
export const usulMethods: Method[] = [
  { name: "al-Istiḥsān", ar: "الاستحسان", desc: "Das Vorziehen eines angemesseneren Urteils gegenüber dem strengen Qiyās — vor allem in der ḥanafitischen Schule gepflegt." },
  { name: "al-Maṣlaḥa al-Mursala", ar: "المصلحة المرسلة", desc: "Berücksichtigung des Allgemeinwohls dort, wo kein Text vorliegt — ein Markenzeichen der mālikitischen Schule." },
  { name: "al-ʿUrf", ar: "العرف", desc: "Das Gewohnheitsrecht als Quelle — solange es dem Text nicht widerspricht. „Was die Menschen als gut kennen, ist auch bei Allah gut.“" },
  { name: "Sadd aḏ-Ḏarāʾiʿ", ar: "سد الذرائع", desc: "Das Versperren von Wegen, die zum Verbotenen führen — prägend bei Mālik und Aḥmad." },
  { name: "al-ʿĀmm wa-l-Ḫāṣṣ", ar: "العام والخاص", desc: "Allgemeine und spezifische Aussagen — und die Kunst, beide in Einklang zu lesen." },
  { name: "an-Nāsiḫ wa-l-Mansūḫ", ar: "الناسخ والمنسوخ", desc: "Aufhebende und aufgehobene Bestimmungen — entscheidend für die zeitliche Ordnung der Texte." },
  { name: "al-Amr wa-n-Nahy", ar: "الأمر والنهي", desc: "Befehl und Verbot — wann begründen sie Wāǧib, Nadb, Taḥrīm oder Karāha?" },
  { name: "al-Iǧtihād & at-Taqlīd", ar: "الاجتهاد والتقليد", desc: "Die selbständige Urteilsfindung des Gelehrten — und das verantwortete Befolgen durch den Lernenden." },
];

/* ---------- Ḥadīṯ ---------- */
export type Hadith = {
  id: number;
  ar: string;
  de: string;
  rawi: string;
  src: string;
  grade: string;
  topic: string;
  note: string;
  chain?: string[];
};
export const hadiths: Hadith[] = [
  {
    id: 1,
    ar: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    de: "„Die Taten sind entsprechend den Absichten, und jedem Menschen steht das zu, was er beabsichtigt hat.“",
    rawi: "ʿUmar b. al-Ḫaṭṭāb (raḍiya llāhu ʿanh)",
    src: "Ṣaḥīḥ al-Buḫārī (1) & Ṣaḥīḥ Muslim (1907)",
    grade: "Ṣaḥīḥ · muttafaq ʿalayh",
    topic: "Niyya — die Absicht",
    note: "Das erste Ḥadīṯ im Ṣaḥīḥ al-Buḫārī. Imām an-Nawawī eröffnet damit seine 40 Ḥadīṯe — die Gelehrten nennen es „ein Drittel des Wissens“.",
    chain: [
      "der Prophet ﷺ",
      "ʿUmar b. al-Ḫaṭṭāb",
      "ʿAlqama b. Waqqāṣ al-Layṯī",
      "Muḥammad b. Ibrāhīm at-Taymī",
      "Yaḥyā b. Saʿīd al-Anṣārī",
      "Sufyān b. ʿUyayna",
      "al-Ḥumaydī (ʿAbdullāh b. az-Zubayr)",
      "Imām al-Buḫārī",
    ],
  },
  {
    id: 2,
    ar: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    de: "„Wer an Allah und den Jüngsten Tag glaubt, der sage Gutes — oder er schweige.“",
    rawi: "Abū Hurayra (raḍiya llāhu ʿanh)",
    src: "Ṣaḥīḥ al-Buḫārī (6018) & Ṣaḥīḥ Muslim (47)",
    grade: "Ṣaḥīḥ",
    topic: "Adab — die Zunge hüten",
    note: "Drei soziale Pflichten in einem Satz: Gutes sagen, schweigen, gastfreundlich sein. Das Ḥadīṯ verbindet ʿAqīda unmittelbar mit Alltagsverhalten.",
  },
  {
    id: 3,
    ar: "الدِّينُ النَّصِيحَةُ",
    de: "„Die Religion ist aufrichtiger Rat (Naṣīḥa).“",
    rawi: "Tamīm ad-Dārī (raḍiya llāhu ʿanh)",
    src: "Ṣaḥīḥ Muslim (55)",
    grade: "Ṣaḥīḥ",
    topic: "Naṣīḥa — Aufrichtigkeit",
    note: "Auf die Frage „Für wen?“ antwortete der Prophet ﷺ: „Für Allah, Sein Buch, Seinen Gesandten, die Verantwortlichen der Muslime und ihre Allgemeinheit.“",
  },
  {
    id: 4,
    ar: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    de: "„Der Beste von euch ist, wer den Quran lernt und ihn lehrt.“",
    rawi: "ʿUṯmān b. ʿAffān (raḍiya llāhu ʿanh)",
    src: "Ṣaḥīḥ al-Buḫārī (5027)",
    grade: "Ṣaḥīḥ",
    topic: "Quran lernen & lehren",
    note: "Der Leitspruch dieser Akademie: Lernen und Lehren gehören zusammen — wer Wissen empfängt, trägt Verantwortung, es weiterzugeben.",
  },
];

/* ---------- Uṣūl al-Ḥadīṯ ---------- */
export const sahihConditions: string[] = [
  "Ittiṣāl as-Sanad — die Kette ist lückenlos, jeder Überlieferer hörte von seinem Vorgänger",
  "ʿAdāla — Rechtschaffenheit und Zuverlässigkeit jedes Überlieferers",
  "Ḍabṭ — präzises Gedächtnis bzw. fehlerfreie schriftliche Aufzeichnung",
  "Kein Šuḏūḏ — kein Widerspruch zu verlässlicheren Überlieferungen",
  "Keine ʿIlla — kein verborgener Mangel in Kette oder Text",
];

export type Grade = { grade: string; ar: string; desc: string; w: number; color: string };
export const grades: Grade[] = [
  { grade: "Ṣaḥīḥ", ar: "صحيح", desc: "Gesund: alle fünf Bedingungen erfüllt — lückenlose Kette, ʿAdāla, Ḍabṭ, kein Šuḏūḏ, keine ʿIlla.", w: 100, color: "#4FC1A6" },
  { grade: "Ḥasan", ar: "حسن", desc: "Gut: wie ṣaḥīḥ, doch die Präzision (Ḍabṭ) eines Überlieferers ist geringer — als Beleg voll tauglich.", w: 74, color: "#D8B25C" },
  { grade: "Ḍaʿīf", ar: "ضعيف", desc: "Schwach: eine Bedingung fehlt, z. B. eine Unterbrechung der Kette — für Rechtsurteile ungeeignet.", w: 40, color: "#D08770" },
  { grade: "Mawḍūʿ", ar: "موضوع", desc: "Fabriziert: keine Überlieferung des Propheten ﷺ — darf nur mit Klarstellung erwähnt werden.", w: 10, color: "#C05A6E" },
];

export type Transmission = { name: string; ar: string; desc: string; w: number };
export const transmission: Transmission[] = [
  { name: "al-Mutawātir", ar: "المتواتر", desc: "Von so vielen Überlieferern je Stufe, dass eine Absprache zur Lüge ausgeschlossen ist — sicheres Wissen.", w: 100 },
  { name: "al-Mašhūr", ar: "المشهور", desc: "Āḥād mit drei oder mehr Überlieferern pro Stufe.", w: 70 },
  { name: "al-ʿAzīz", ar: "العزيز", desc: "Āḥād mit mindestens zwei Überlieferern pro Stufe.", w: 44 },
  { name: "al-Ġarīb", ar: "الغريب", desc: "Āḥād mit nur einem Überlieferer an mindestens einer Stufe.", w: 20 },
];

/* ------------------------------------------------------------------ */
/* Gebetszeiten (statische Beispielwerte — Konzept)                     */
/* ------------------------------------------------------------------ */
export interface PrayerTime {
  name: string;
  ar: string;
  time: string;
}

export const prayerTimes: PrayerTime[] = [
  { name: "Faǧr", ar: "الفجر", time: "05:12" },
  { name: "Ẓuhr", ar: "الظهر", time: "12:14" },
  { name: "ʿAṣr", ar: "العصر", time: "15:02" },
  { name: "Maġrib", ar: "المغرب", time: "17:38" },
  { name: "ʿIšāʾ", ar: "العشاء", time: "19:02" },
];

/* ------------------------------------------------------------------ */
/* Dhikr-Vorgaben für den Tasbīḥ-Zähler                                 */
/* ------------------------------------------------------------------ */
export interface Dhikr {
  ar: string;
  tr: string;
  de: string;
}

export const dhikrPresets: Dhikr[] = [
  { ar: "سُبْحَانَ الله", tr: "Subḥānallāh", de: "Preis sei Allah" },
  { ar: "الْحَمْدُ لِلَّه", tr: "Alḥamdu lillāh", de: "Alles Lob gebührt Allah" },
  { ar: "اللهُ أَكْبَر", tr: "Allāhu akbar", de: "Allah ist am Größten" },
  { ar: "أَسْتَغْفِرُ الله", tr: "Astaġfirullāh", de: "Ich bitte Allah um Vergebung" },
];

/* ------------------------------------------------------------------ */
/* Arabisches Alphabet — 28 Buchstaben mit Šamsī/Qamarī-Klasse          */
/* ------------------------------------------------------------------ */
export interface Letter {
  l: string;
  name: string;
  tr: string;
  ex: string;
  exDe: string;
  sun: boolean;
}

export const alphabet: Letter[] = [
  { l: "ا", name: "Alif", tr: "ā", ex: "أَرْض", exDe: "Erde", sun: false },
  { l: "ب", name: "Bāʾ", tr: "b", ex: "بَحْر", exDe: "Meer", sun: false },
  { l: "ت", name: "Tāʾ", tr: "t", ex: "تُراب", exDe: "Staub, Erde", sun: true },
  { l: "ث", name: "Ṯāʾ", tr: "ṯ", ex: "ثَمَر", exDe: "Frucht", sun: true },
  { l: "ج", name: "Ǧīm", tr: "ǧ", ex: "جَنَّة", exDe: "Paradiesgarten", sun: false },
  { l: "ح", name: "Ḥāʾ", tr: "ḥ", ex: "حَقّ", exDe: "Wahrheit", sun: false },
  { l: "خ", name: "Ḫāʾ", tr: "ḫ", ex: "خَيْر", exDe: "das Gute", sun: false },
  { l: "د", name: "Dāl", tr: "d", ex: "دُنْيا", exDe: "Diesseits", sun: true },
  { l: "ذ", name: "Ḏāl", tr: "ḏ", ex: "ذِكْر", exDe: "Gedenken", sun: true },
  { l: "ر", name: "Rāʾ", tr: "r", ex: "رَحْمَة", exDe: "Barmherzigkeit", sun: true },
  { l: "ز", name: "Zāy", tr: "z", ex: "زَيْتون", exDe: "Olive", sun: true },
  { l: "س", name: "Sīn", tr: "s", ex: "سَلام", exDe: "Friede", sun: true },
  { l: "ش", name: "Šīn", tr: "š", ex: "شَمْس", exDe: "Sonne", sun: true },
  { l: "ص", name: "Ṣād", tr: "ṣ", ex: "صَبْر", exDe: "Geduld", sun: true },
  { l: "ض", name: "Ḍād", tr: "ḍ", ex: "ضِياء", exDe: "Lichtglanz", sun: true },
  { l: "ط", name: "Ṭāʾ", tr: "ṭ", ex: "طَريق", exDe: "Weg", sun: true },
  { l: "ظ", name: "Ẓāʾ", tr: "ẓ", ex: "ظِلّ", exDe: "Schatten", sun: true },
  { l: "ع", name: "ʿAyn", tr: "ʿ", ex: "عِلْم", exDe: "Wissen", sun: false },
  { l: "غ", name: "Ġayn", tr: "ġ", ex: "غَفور", exDe: "der Vergebende", sun: false },
  { l: "ف", name: "Fāʾ", tr: "f", ex: "فَوْز", exDe: "Erfolg", sun: false },
  { l: "ق", name: "Qāf", tr: "q", ex: "قَلْب", exDe: "Herz", sun: false },
  { l: "ك", name: "Kāf", tr: "k", ex: "كِتاب", exDe: "Buch", sun: false },
  { l: "ل", name: "Lām", tr: "l", ex: "لَيْل", exDe: "Nacht", sun: true },
  { l: "م", name: "Mīm", tr: "m", ex: "ماء", exDe: "Wasser", sun: false },
  { l: "ن", name: "Nūn", tr: "n", ex: "نُور", exDe: "Licht", sun: true },
  { l: "ه", name: "Hāʾ", tr: "h", ex: "هُدًى", exDe: "Rechtleitung", sun: false },
  { l: "و", name: "Wāw", tr: "w", ex: "وَحْي", exDe: "Offenbarung", sun: false },
  { l: "ي", name: "Yāʾ", tr: "y", ex: "يَقين", exDe: "Gewissheit", sun: false },
];

/* ------------------------------------------------------------------ */
/* Taǧwīd-Quiz                                                          */
/* ------------------------------------------------------------------ */
export interface QuizQ {
  ex: { t: string; hl?: boolean }[];
  q: string;
  opts: string[];
  a: number;
  why: string;
}

export const tajweedQuiz: QuizQ[] = [
  {
    ex: [{ t: "مِنْ قَبْلُ", hl: true }],
    q: "Welche Regel verbirgt sich in «مِنْ قَبْلُ»?",
    opts: ["Iẓhār — das Nūn bleibt klar", "Iḫfāʾ — das Nūn wird verschleiert", "Iqlāb — das Nūn wird zum Mīm"],
    a: 1,
    why: "Auf das Nūn mit Sukūn folgt ein Qāf — einer der 15 Iḫfāʾ-Buchstaben. Das Nūn wird zwischen Klarheit und Verschmelzung gesprochen, begleitet von der Ghunna.",
  },
  {
    ex: [{ t: "يَ" }, { t: "دْ", hl: true }, { t: "خُلُونَ" }],
    q: "Welche Regel liegt auf dem Dāl in «يَدْخُلُونَ»?",
    opts: ["Qalqala — das Echo", "Madd — die Dehnung", "Ġunna — das Näseln"],
    a: 0,
    why: "Dāl gehört zu den fünf Qalqala-Buchstaben (ق ط ب ج د) und trägt hier ein Sukūn mitten im Wort: Beim Sprechen löst es sich mit einem leichten Echo — Qalqala ṣuġrā.",
  },
  {
    ex: [{ t: "مَ" }, { t: "نْ خَ", hl: true }, { t: "لَقَ" }],
    q: "Wie wird das Nūn in «مَنْ خَلَقَ» gesprochen?",
    opts: ["Mit Iqlāb als Mīm", "Verschleiert mit Iḫfāʾ", "Klar und deutlich — Iẓhār"],
    a: 2,
    why: "Ḫāʾ gehört zu den sechs Kehlbuchstaben — dort tritt immer Iẓhār ein: Das Nūn bleibt hell und klar, ganz ohne Ghunna.",
  },
  {
    ex: [{ t: "الضَّ" }, { t: "الِّينَ", hl: true }],
    q: "Wie viele Ḥarakāt zählt der Madd in «الضَّالِّينَ»?",
    opts: ["2 — natürlicher Madd", "4 — Madd ʿĀriḍ", "6 — Madd Lāzim"],
    a: 2,
    why: "Auf den Madd-Buchstaben folgt ein durch Verdopplung entstandener Buchstabe mit Sukūn — Madd Lāzim: die volle Dehnung von 6 Ḥarakāt, wie am Ende der Fātiḥa.",
  },
  {
    ex: [{ t: "سَمِيعٌ" }, { t: " بَصِيرٌ", hl: true }],
    q: "Was geschieht mit dem Tanwīn in «سَمِيعٌ بَصِيرٌ»?",
    opts: ["Iḫfāʾ — Verschleierung", "Iqlāb — Umwandlung zu Mīm", "Idġām — Verschmelzung"],
    a: 1,
    why: "Tanwīn trifft auf Bāʾ — den einzigen Iqlāb-Buchstaben. Das Nūn wandelt sich in ein verborgenes Mīm, gesprochen mit zwei Ḥarakāt Ghunna.",
  },
];

export type Term = { term: string; ar: string; def: string };
export const hadithTerms: Term[] = [
  { term: "as-Sanad", ar: "السَّنَد", def: "Die Überliefererkette — die Antwort auf „Wer hat es von wem gehört?“" },
  { term: "al-Matn", ar: "الْمَتْن", def: "Der eigentliche Text des Ḥadīṯ — geprüft wird Kette und Text." },
  { term: "ar-Rāwī", ar: "الرَّاوِي", def: "Ein Überlieferer; bewertet nach ʿAdāla (Rechtschaffenheit) und Ḍabṭ (Präzision)." },
  { term: "al-Muʿallaq", ar: "الْمُعَلَّق", def: "Eine Kette, deren Anfang fehlt — wie im „muʿallaq“-Kapitel bei al-Buḫārī." },
  { term: "al-Mursal", ar: "الْمُرْسَل", def: "Ein Tābiʿī überliefert direkt vom Propheten ﷺ — die Gefährtenstufe fehlt." },
  { term: "aš-Šāhiḏ & al-Mutābiʿ", ar: "الشَّاذّ وَالْمُتَابِع", def: "Der Widerspruch eines Vertrauenswürdigen zu Vertrauenswürdigeren — und seine Bestätigung durch Parallelketten." },
];

/* ---------- Islamische Wissenschaften ---------- */
export type Science = {
  id: string;
  ar: string;
  name: string;
  icon: string;
  color: string;
  level: string;
  desc: string;
  books: string[];
  tip: string;
};
export const sciences: Science[] = [
  {
    id: "aqida", ar: "عَقِيدَة", name: "ʿAqīda & Tauḥīd", icon: "star8", color: "#F0D48A",
    level: "Stufe 1 · das Fundament",
    desc: "Die Glaubenslehre: Allahs Einheit, Seine Namen und Eigenschaften, Prophetie und das Jenseits. Das Fundament, auf dem jedes andere Wissen aufbaut — zuerst gelernt, ein Leben lang vertieft.",
    books: ["al-ʿAqīda aṭ-Ṭaḥāwiyya", "Kitāb at-Tauḥīd (al-Buḫārī)", "al-Fiqh al-Akbar (Abū Ḥanīfa)"],
    tip: "Mit einem kurzen, kommentierten Grundtext beginnen — und ʿAqīda nie allein aus Büchern ohne Lehrer studieren.",
  },
  {
    id: "quran", ar: "قُرْآن", name: "Tafsīr & ʿUlūm al-Qurʾān", icon: "book", color: "#4FC1A6",
    level: "Stufe 2 · der Mittelpunkt",
    desc: "Die Auslegung des Quran und die Wissenschaften darum: Offenbarungsanlässe, abrogierende Stellen, die sieben Lesarten, die Sprache des Textes.",
    books: ["Tafsīr al-Ǧalālayn", "Tafsīr Ibn Kaṯīr (Kurzfassung)", "al-Itqān (as-Suyūṭī)"],
    tip: "Erst einen Ǧuzʾ mit Tafsīr lesen — dann die Wissenschaften dahinter. Der Text kommt vor der Theorie.",
  },
  {
    id: "tajwid", ar: "تَجْوِيد", name: "Taǧwīd & Qirāʾāt", icon: "wave", color: "#6E93D6",
    level: "Stufe 2 · das Ohr",
    desc: "Die Kunst der korrekten Rezitation: Artikulationsorte (Maḫāriǧ), Eigenschaften der Buchstaben (Ṣifāt), Madd, Ghunna, Waqf — bis zu den kanonischen Lesarten.",
    books: ["al-Muqaddima al-Ǧazarīya", "Tuḥfat al-Aṭfāl", "Ḥirz al-Amānī (aš-Šāṭibiyya)"],
    tip: "Taǧwīd lernt man mit dem Ohr, nicht mit dem Auge: Rezitation bei einem Qāriʾ mit Iǧāza — Regelhefte begleiten nur.",
  },
  {
    id: "fiqh", ar: "فِقْه", name: "Fiqh & Uṣūl al-Fiqh", icon: "scale", color: "#D8B25C",
    level: "Stufe 3 · die Praxis",
    desc: "Die Rechtslehre: Ṭahāra, Gebet, Zakāt, Fasten, Ḥaǧǧ, Handel, Familie — und die Methodik dahinter: Wie wird aus Text ein Urteil?",
    books: ["Nūr al-Īḍāḥ (ḥanafitisch)", "al-Aḫḍarī (mālikitisch)", "Matn Abī Šuǧāʿ (šāfiʿitisch)", "ʿUmdat al-Fiqh (ḥanbalitisch)", "al-Waraqāt (Uṣūl)"],
    tip: "Eine Schule wählen und ihren Fiqh geordnet lernen — Uṣūl parallel dazu, damit das „Warum“ nicht zu kurz kommt.",
  },
  {
    id: "hadith", ar: "حَدِيث", name: "Ḥadīṯ & Muṣṭalaḥ", icon: "scroll", color: "#D08770",
    level: "Stufe 3 · die Quelle",
    desc: "Die Überlieferung des Propheten ﷺ und ihre Wissenschaft: Ketten, Überliefererbiographien, Echtheitsstufen — die strengste Quellenkritik der Vormoderne.",
    books: ["al-Arbaʿīn an-Nawawiyya", "Riyāḍ aṣ-Ṣāliḥīn", "Nuḫbat al-Fikar (Ibn Ḥaǧar)", "al-Bayqūniyya"],
    tip: "Mit den 40 an-Nawawī beginnen: erst der Text, dann die Grundlagen des Isnad — Muṣṭalaḥ kommt im dritten Schritt.",
  },
  {
    id: "arabic", ar: "عَرَبِيَّة", name: "Arabische Sprache", icon: "qalam", color: "#C9A3DE",
    level: "Stufe 1–4 · der Schlüssel",
    desc: "Naḥw (Satzlehre), Ṣarf (Formenlehre) und Balāġa (Rhetorik) — die drei Tore zum Quran. Ohne sie bleibt jede Übersetzung eine Annäherung.",
    books: ["al-Āǧurrūmiyya (Naḥw)", "al-Amṯila aṣ-Ṣarfiyya (Ṣarf)", "al-Balāġa al-Wāḍiḥa"],
    tip: "Naḥw, Ṣarf und Balāġa parallel — und täglich Vokabeln direkt aus dem Quran-Text lernen, nicht aus isolierten Listen.",
  },
  {
    id: "sira", ar: "سِيرَة", name: "Sīra & Geschichte", icon: "compass", color: "#7FB069",
    level: "Stufe 2 · der Kontext",
    desc: "Das Leben des Propheten ﷺ und die Geschichte der Gemeinschaft: Sie ordnet Offenbarung, Fiqh und Ḥadīṯ zeitlich — und macht aus Daten einen Weg.",
    books: ["ar-Raḥīq al-Maḫtūm", "Sīrat Ibn Hišām", "Tārīḫ al-Ḫulafāʾ (as-Suyūṭī)"],
    tip: "Die Sīra als roten Faden lesen: Wann wurde was offenbart? Sie beantwortet die Fragen, die Tafsīr und Fiqh stellen.",
  },
  {
    id: "ihsan", ar: "إِحْسَان", name: "Iḥsān & Taṣawwuf", icon: "lamp", color: "#DE8BA0",
    level: "Stufe 4 · die Verinnerlichung",
    desc: "„Allah zu dienen, als sähest du Ihn — und wenn du Ihn nicht siehst, so sieht Er dich.“ Die Reinigung des Herzens: Aufrichtigkeit, Dankbarkeit, Gottesfurcht.",
    books: ["al-Ḥikam al-ʿAṭāʾiyya", "Iḥyāʾ ʿUlūm ad-Dīn (al-Ġazālī)", "Riyāḍ aṣ-Ṣāliḥīn"],
    tip: "Iḥsān ist die Frucht des Wissens — nicht sein Ersatz. Zuerst ʿAqīda und Fiqh, dann die Verinnerlichung bei einem lebenden Lehrer.",
  },
];

/* ---------- Lernreihenfolge ---------- */
export const orderSteps = [
  { n: 1, title: "ʿAqīda & Fuṣḥā-Basics", desc: "Glaubensfundament + erste 300 Vokabeln, Wurzelprinzip, Naḥw-Grundgerüst." },
  { n: 2, title: "Taǧwīd & Lesen", desc: "Ḥurūf, Maḫāriǧ, die sieben Regeln — bis der Quran flüssig und korrekt gelesen wird." },
  { n: 3, title: "Fiqh einer Schule", desc: "Ṭahāra, Gebet, Fasten — die Praxis des Alltags, geordnet nach einer Madhhab." },
  { n: 4, title: "Arbaʿīn + Muṣṭalaḥ", desc: "40 Ḥadīṯe an-Nawawī mit Grundlagen der Überlieferungskritik." },
  { n: 5, title: "Uṣūl & Vertiefung", desc: "Uṣūl al-Fiqh, Tafsīr-Wissenschaften, Balāġa — das „Warum“ hinter dem „Was“." },
  { n: 6, title: "Iḥsān & Lehrer", desc: "Verinnerlichung bei einem lebenden Gelehrten — Wissen wird Haltung." },
];

/* ---------- Dashboard ---------- */
export type Track = { id: string; name: string; sub: string; pct: number; icon: string; color: string };
export const tracks: Track[] = [
  { id: "arabic", name: "Arabisch Fuṣḥā", sub: "A1 → A2 · Wurzelprinzip & Naḥw-Basics", pct: 42, icon: "qalam", color: "#D8B25C" },
  { id: "quran", name: "Quran & Taǧwīd", sub: "Ǧuzʾ ʿAmma · 7 Taǧwīd-Regeln aktiv", pct: 68, icon: "book", color: "#4FC1A6" },
  { id: "fiqh", name: "Fiqh · ḥanafitisch", sub: "Ṭahāra: Wuḍūʾ, Ġusl, Tayammum", pct: 25, icon: "scale", color: "#6E93D6" },
  { id: "hadith", name: "Ḥadīṯ & Uṣūl al-Ḥadīṯ", sub: "al-Arbaʿīn an-Nawawiyya · Ḥadīṯ 1–14", pct: 31, icon: "scroll", color: "#D08770" },
  { id: "science", name: "Islamische Wissenschaften", sub: "Karte des Wissens · ʿAqīda zuerst", pct: 12, icon: "tree", color: "#C9A3DE" },
];

export type PlanItem = { label: string; time: string; done: boolean };
export const planItems: PlanItem[] = [
  { label: "Faǧr + Morgen-Wird", time: "20 Min.", done: true },
  { label: "Taǧwīd: Idġām-Regeln wiederholen", time: "15 Min.", done: true },
  { label: "20 neue Vokabeln (Fuṣḥā A1)", time: "10 Min.", done: false },
  { label: "Fiqh-Lektion: Wuḍūʾ nach Abū Ḥanīfa", time: "25 Min.", done: false },
  { label: "3 Ḥadīṯe aus den Arbaʿīn rezitieren", time: "10 Min.", done: false },
  { label: "Ḥifẓ: Sūrat al-Iḫlāṣ festigen", time: "15 Min.", done: false },
];

export const marqueeWords = [
  "تَجْوِيد", "فِقْه", "حَدِيث", "أُصُول", "عَرَبِيَّة", "تَفْسِير", "عَقِيدَة", "سِيرَة", "صَرْف", "نَحْو", "بَلَاغَة", "إِحْسَان",
];
