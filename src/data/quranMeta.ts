/**
 * Metadaten aller 114 Sūren — Madīna-Muṣḥaf (604 Seiten, 30 Ǧuzʾ).
 * Seiten- und Ǧuzʾ-Angaben entsprechen dem Standard-Muṣḥaf.
 */
export interface SurahMeta {
  n: number;
  ar: string;
  tr: string;
  de: string;
  type: "mekkanisch" | "medinensisch";
  ayahs: number;
  page: number;
  juz: number;
}

const M = "mekkanisch" as const;
const D = "medinensisch" as const;

export const SURAHS: SurahMeta[] = [
  { n: 1, ar: "الفاتحة", tr: "al-Fātiḥa", de: "Die Eröffnende", type: M, ayahs: 7, page: 1, juz: 1 },
  { n: 2, ar: "البقرة", tr: "al-Baqara", de: "Die Kuh", type: D, ayahs: 286, page: 2, juz: 1 },
  { n: 3, ar: "آل عمران", tr: "Āl ʿImrān", de: "Die Sippe ʿImrāns", type: D, ayahs: 200, page: 50, juz: 3 },
  { n: 4, ar: "النساء", tr: "an-Nisāʾ", de: "Die Frauen", type: D, ayahs: 176, page: 77, juz: 4 },
  { n: 5, ar: "المائدة", tr: "al-Māʾida", de: "Der Tisch", type: D, ayahs: 120, page: 106, juz: 6 },
  { n: 6, ar: "الأنعام", tr: "al-Anʿām", de: "Das Vieh", type: M, ayahs: 165, page: 128, juz: 7 },
  { n: 7, ar: "الأعراف", tr: "al-Aʿrāf", de: "Die Höhen", type: M, ayahs: 206, page: 151, juz: 8 },
  { n: 8, ar: "الأنفال", tr: "al-Anfāl", de: "Die Kriegsbeute", type: D, ayahs: 75, page: 177, juz: 9 },
  { n: 9, ar: "التوبة", tr: "at-Tauba", de: "Die Reue", type: D, ayahs: 129, page: 187, juz: 10 },
  { n: 10, ar: "يونس", tr: "Yūnus", de: "Jonas", type: M, ayahs: 109, page: 208, juz: 11 },
  { n: 11, ar: "هود", tr: "Hūd", de: "Hūd", type: M, ayahs: 123, page: 221, juz: 11 },
  { n: 12, ar: "يوسف", tr: "Yūsuf", de: "Josef", type: M, ayahs: 111, page: 235, juz: 12 },
  { n: 13, ar: "الرعد", tr: "ar-Raʿd", de: "Der Donner", type: D, ayahs: 43, page: 249, juz: 13 },
  { n: 14, ar: "إبراهيم", tr: "Ibrāhīm", de: "Abraham", type: M, ayahs: 52, page: 255, juz: 13 },
  { n: 15, ar: "الحجر", tr: "al-Ḥiǧr", de: "Das steinige Land", type: M, ayahs: 99, page: 262, juz: 14 },
  { n: 16, ar: "النحل", tr: "an-Naḥl", de: "Die Bienen", type: M, ayahs: 128, page: 267, juz: 14 },
  { n: 17, ar: "الإسراء", tr: "al-Isrāʾ", de: "Die Nachtreise", type: M, ayahs: 111, page: 282, juz: 15 },
  { n: 18, ar: "الكهف", tr: "al-Kahf", de: "Die Höhle", type: M, ayahs: 110, page: 293, juz: 15 },
  { n: 19, ar: "مريم", tr: "Maryam", de: "Maria", type: M, ayahs: 98, page: 305, juz: 16 },
  { n: 20, ar: "طه", tr: "Ṭā-Hā", de: "Ṭā-Hā", type: M, ayahs: 135, page: 312, juz: 16 },
  { n: 21, ar: "الأنبياء", tr: "al-Anbiyāʾ", de: "Die Propheten", type: M, ayahs: 112, page: 322, juz: 17 },
  { n: 22, ar: "الحج", tr: "al-Ḥaǧǧ", de: "Die Pilgerfahrt", type: D, ayahs: 78, page: 332, juz: 17 },
  { n: 23, ar: "المؤمنون", tr: "al-Muʾminūn", de: "Die Gläubigen", type: M, ayahs: 118, page: 342, juz: 18 },
  { n: 24, ar: "النور", tr: "an-Nūr", de: "Das Licht", type: D, ayahs: 64, page: 350, juz: 18 },
  { n: 25, ar: "الفرقان", tr: "al-Furqān", de: "Die Unterscheidung", type: M, ayahs: 77, page: 359, juz: 18 },
  { n: 26, ar: "الشعراء", tr: "aš-Šuʿarāʾ", de: "Die Dichter", type: M, ayahs: 227, page: 367, juz: 19 },
  { n: 27, ar: "النمل", tr: "an-Naml", de: "Die Ameisen", type: M, ayahs: 93, page: 377, juz: 19 },
  { n: 28, ar: "القصص", tr: "al-Qaṣaṣ", de: "Die Geschichten", type: M, ayahs: 88, page: 385, juz: 20 },
  { n: 29, ar: "العنكبوت", tr: "al-ʿAnkabūt", de: "Die Spinne", type: M, ayahs: 69, page: 396, juz: 20 },
  { n: 30, ar: "الروم", tr: "ar-Rūm", de: "Die Römer", type: M, ayahs: 60, page: 404, juz: 21 },
  { n: 31, ar: "لقمان", tr: "Luqmān", de: "Luqmān", type: M, ayahs: 34, page: 411, juz: 21 },
  { n: 32, ar: "السجدة", tr: "as-Saǧda", de: "Die Niederwerfung", type: M, ayahs: 30, page: 415, juz: 21 },
  { n: 33, ar: "الأحزاب", tr: "al-Aḥzāb", de: "Die Verbündeten", type: D, ayahs: 73, page: 418, juz: 21 },
  { n: 34, ar: "سبأ", tr: "Sabaʾ", de: "Die Sabäer", type: M, ayahs: 54, page: 428, juz: 22 },
  { n: 35, ar: "فاطر", tr: "Fāṭir", de: "Der Schöpfer", type: M, ayahs: 45, page: 434, juz: 22 },
  { n: 36, ar: "يس", tr: "Yā-Sīn", de: "Yā-Sīn", type: M, ayahs: 83, page: 440, juz: 22 },
  { n: 37, ar: "الصافات", tr: "aṣ-Ṣāffāt", de: "Die Sich-Reihenden", type: M, ayahs: 182, page: 446, juz: 23 },
  { n: 38, ar: "ص", tr: "Ṣād", de: "Ṣād", type: M, ayahs: 88, page: 453, juz: 23 },
  { n: 39, ar: "الزمر", tr: "az-Zumar", de: "Die Scharen", type: M, ayahs: 75, page: 458, juz: 23 },
  { n: 40, ar: "غافر", tr: "Ġāfir", de: "Der Vergebende", type: M, ayahs: 85, page: 467, juz: 24 },
  { n: 41, ar: "فصلت", tr: "Fuṣṣilat", de: "Ausführlich dargelegt", type: M, ayahs: 54, page: 477, juz: 24 },
  { n: 42, ar: "الشورى", tr: "aš-Šūrā", de: "Die Beratung", type: M, ayahs: 53, page: 483, juz: 25 },
  { n: 43, ar: "الزخرف", tr: "az-Zuḫruf", de: "Der Schmuck", type: M, ayahs: 89, page: 489, juz: 25 },
  { n: 44, ar: "الدخان", tr: "ad-Duḫān", de: "Der Rauch", type: M, ayahs: 59, page: 496, juz: 25 },
  { n: 45, ar: "الجاثية", tr: "al-Ǧāṯiya", de: "Die Kniende", type: M, ayahs: 37, page: 499, juz: 25 },
  { n: 46, ar: "الأحقاف", tr: "al-Aḥqāf", de: "Die Sanddünen", type: M, ayahs: 35, page: 502, juz: 26 },
  { n: 47, ar: "محمد", tr: "Muḥammad", de: "Muḥammad", type: D, ayahs: 38, page: 507, juz: 26 },
  { n: 48, ar: "الفتح", tr: "al-Fatḥ", de: "Der Sieg", type: D, ayahs: 29, page: 511, juz: 26 },
  { n: 49, ar: "الحجرات", tr: "al-Ḥuǧurāt", de: "Die Gemächer", type: D, ayahs: 18, page: 515, juz: 26 },
  { n: 50, ar: "ق", tr: "Qāf", de: "Qāf", type: M, ayahs: 45, page: 518, juz: 26 },
  { n: 51, ar: "الذاريات", tr: "aḏ-Ḏāriyāt", de: "Die Zerstreuenden", type: M, ayahs: 60, page: 520, juz: 26 },
  { n: 52, ar: "الطور", tr: "aṭ-Ṭūr", de: "Der Berg", type: M, ayahs: 49, page: 523, juz: 27 },
  { n: 53, ar: "النجم", tr: "an-Naǧm", de: "Der Stern", type: M, ayahs: 62, page: 526, juz: 27 },
  { n: 54, ar: "القمر", tr: "al-Qamar", de: "Der Mond", type: M, ayahs: 55, page: 528, juz: 27 },
  { n: 55, ar: "الرحمن", tr: "ar-Raḥmān", de: "Der Allerbarmer", type: D, ayahs: 78, page: 531, juz: 27 },
  { n: 56, ar: "الواقعة", tr: "al-Wāqiʿa", de: "Das eintreffende Ereignis", type: M, ayahs: 96, page: 534, juz: 27 },
  { n: 57, ar: "الحديد", tr: "al-Ḥadīd", de: "Das Eisen", type: D, ayahs: 29, page: 537, juz: 27 },
  { n: 58, ar: "المجادلة", tr: "al-Muǧādala", de: "Die Streitende", type: D, ayahs: 22, page: 542, juz: 28 },
  { n: 59, ar: "الحشر", tr: "al-Ḥašr", de: "Die Versammlung", type: D, ayahs: 24, page: 545, juz: 28 },
  { n: 60, ar: "الممتحنة", tr: "al-Mumtaḥana", de: "Die Geprüfte", type: D, ayahs: 13, page: 549, juz: 28 },
  { n: 61, ar: "الصف", tr: "aṣ-Ṣaff", de: "Die Reihe", type: D, ayahs: 14, page: 551, juz: 28 },
  { n: 62, ar: "الجمعة", tr: "al-Ǧumuʿa", de: "Der Freitag", type: D, ayahs: 11, page: 553, juz: 28 },
  { n: 63, ar: "المنافقون", tr: "al-Munāfiqūn", de: "Die Heuchler", type: D, ayahs: 11, page: 554, juz: 28 },
  { n: 64, ar: "التغابن", tr: "at-Taġābun", de: "Der Betrug", type: D, ayahs: 18, page: 556, juz: 28 },
  { n: 65, ar: "الطلاق", tr: "aṭ-Ṭalāq", de: "Die Scheidung", type: D, ayahs: 12, page: 558, juz: 28 },
  { n: 66, ar: "التحريم", tr: "at-Taḥrīm", de: "Das Verbot", type: D, ayahs: 12, page: 560, juz: 28 },
  { n: 67, ar: "الملك", tr: "al-Mulk", de: "Die Herrschaft", type: M, ayahs: 30, page: 562, juz: 29 },
  { n: 68, ar: "القلم", tr: "al-Qalam", de: "Das Schreibrohr", type: M, ayahs: 52, page: 564, juz: 29 },
  { n: 69, ar: "الحاقة", tr: "al-Ḥāqqa", de: "Die Unvermeidliche", type: M, ayahs: 52, page: 566, juz: 29 },
  { n: 70, ar: "المعارج", tr: "al-Maʿāriǧ", de: "Die Aufstiegswege", type: M, ayahs: 44, page: 568, juz: 29 },
  { n: 71, ar: "نوح", tr: "Nūḥ", de: "Noach", type: M, ayahs: 28, page: 570, juz: 29 },
  { n: 72, ar: "الجن", tr: "al-Ǧinn", de: "Die Dschinn", type: M, ayahs: 28, page: 572, juz: 29 },
  { n: 73, ar: "المزمل", tr: "al-Muzzammil", de: "Der Eingehüllte", type: M, ayahs: 20, page: 574, juz: 29 },
  { n: 74, ar: "المدثر", tr: "al-Muddaṯṯir", de: "Der Zugedeckte", type: M, ayahs: 56, page: 575, juz: 29 },
  { n: 75, ar: "القيامة", tr: "al-Qiyāma", de: "Die Auferstehung", type: M, ayahs: 40, page: 577, juz: 29 },
  { n: 76, ar: "الإنسان", tr: "al-Insān", de: "Der Mensch", type: D, ayahs: 31, page: 578, juz: 29 },
  { n: 77, ar: "المرسلات", tr: "al-Mursalāt", de: "Die Entsandten", type: M, ayahs: 50, page: 580, juz: 29 },
  { n: 78, ar: "النبأ", tr: "an-Nabaʾ", de: "Die Kunde", type: M, ayahs: 40, page: 582, juz: 30 },
  { n: 79, ar: "النازعات", tr: "an-Nāziʿāt", de: "Die Entreißenden", type: M, ayahs: 46, page: 583, juz: 30 },
  { n: 80, ar: "عبس", tr: "ʿAbasa", de: "Er runzelte die Stirn", type: M, ayahs: 42, page: 585, juz: 30 },
  { n: 81, ar: "التكوير", tr: "at-Takwīr", de: "Das Zusammenrollen", type: M, ayahs: 29, page: 586, juz: 30 },
  { n: 82, ar: "الانفطار", tr: "al-Infiṭār", de: "Das Zerreißen", type: M, ayahs: 19, page: 587, juz: 30 },
  { n: 83, ar: "المطففين", tr: "al-Muṭaffifīn", de: "Die das Maß Kürzenden", type: M, ayahs: 36, page: 587, juz: 30 },
  { n: 84, ar: "الانشقاق", tr: "al-Inšiqāq", de: "Die Spaltung", type: M, ayahs: 25, page: 589, juz: 30 },
  { n: 85, ar: "البروج", tr: "al-Burūǧ", de: "Die Türme", type: M, ayahs: 22, page: 590, juz: 30 },
  { n: 86, ar: "الطارق", tr: "aṭ-Ṭāriq", de: "Der Pochende", type: M, ayahs: 17, page: 591, juz: 30 },
  { n: 87, ar: "الأعلى", tr: "al-Aʿlā", de: "Der Höchste", type: M, ayahs: 19, page: 591, juz: 30 },
  { n: 88, ar: "الغاشية", tr: "al-Ġāšiya", de: "Die Überdeckende", type: M, ayahs: 26, page: 592, juz: 30 },
  { n: 89, ar: "الفجر", tr: "al-Faǧr", de: "Die Morgendämmerung", type: M, ayahs: 30, page: 593, juz: 30 },
  { n: 90, ar: "البلد", tr: "al-Balad", de: "Das Land", type: M, ayahs: 20, page: 594, juz: 30 },
  { n: 91, ar: "الشمس", tr: "aš-Šams", de: "Die Sonne", type: M, ayahs: 15, page: 595, juz: 30 },
  { n: 92, ar: "الليل", tr: "al-Layl", de: "Die Nacht", type: M, ayahs: 21, page: 595, juz: 30 },
  { n: 93, ar: "الضحى", tr: "aḍ-Ḍuḥā", de: "Der Vormittag", type: M, ayahs: 11, page: 596, juz: 30 },
  { n: 94, ar: "الشرح", tr: "aš-Šarḥ", de: "Das Weiten", type: M, ayahs: 8, page: 596, juz: 30 },
  { n: 95, ar: "التين", tr: "at-Tīn", de: "Der Feigenbaum", type: M, ayahs: 8, page: 597, juz: 30 },
  { n: 96, ar: "العلق", tr: "al-ʿAlaq", de: "Das Blutklümpchen", type: M, ayahs: 19, page: 597, juz: 30 },
  { n: 97, ar: "القدر", tr: "al-Qadr", de: "Die Bestimmung", type: M, ayahs: 5, page: 598, juz: 30 },
  { n: 98, ar: "البينة", tr: "al-Bayyina", de: "Der klare Beweis", type: D, ayahs: 8, page: 598, juz: 30 },
  { n: 99, ar: "الزلزلة", tr: "az-Zalzala", de: "Das Beben", type: D, ayahs: 8, page: 599, juz: 30 },
  { n: 100, ar: "العاديات", tr: "al-ʿĀdiyāt", de: "Die Rennenden", type: M, ayahs: 11, page: 599, juz: 30 },
  { n: 101, ar: "القارعة", tr: "al-Qāriʿa", de: "Das Klopfende", type: M, ayahs: 11, page: 600, juz: 30 },
  { n: 102, ar: "التكاثر", tr: "at-Takāṯur", de: "Die Vermehrung", type: M, ayahs: 8, page: 600, juz: 30 },
  { n: 103, ar: "العصر", tr: "al-ʿAṣr", de: "Das Zeitalter", type: M, ayahs: 3, page: 601, juz: 30 },
  { n: 104, ar: "الهمزة", tr: "al-Humaza", de: "Der Verleumder", type: M, ayahs: 9, page: 601, juz: 30 },
  { n: 105, ar: "الفيل", tr: "al-Fīl", de: "Der Elefant", type: M, ayahs: 5, page: 601, juz: 30 },
  { n: 106, ar: "قريش", tr: "Qurayš", de: "Die Qurayš", type: M, ayahs: 4, page: 602, juz: 30 },
  { n: 107, ar: "الماعون", tr: "al-Māʿūn", de: "Die Hilfeleistung", type: M, ayahs: 7, page: 602, juz: 30 },
  { n: 108, ar: "الكوثر", tr: "al-Kawṯar", de: "Die Fülle", type: M, ayahs: 3, page: 602, juz: 30 },
  { n: 109, ar: "الكافرون", tr: "al-Kāfirūn", de: "Die Ungläubigen", type: M, ayahs: 6, page: 603, juz: 30 },
  { n: 110, ar: "النصر", tr: "an-Naṣr", de: "Die Hilfe", type: D, ayahs: 3, page: 603, juz: 30 },
  { n: 111, ar: "المسد", tr: "al-Masad", de: "Das Palmfaserseil", type: M, ayahs: 5, page: 603, juz: 30 },
  { n: 112, ar: "الإخلاص", tr: "al-Iḫlāṣ", de: "Die Aufrichtigkeit", type: M, ayahs: 4, page: 604, juz: 30 },
  { n: 113, ar: "الفلق", tr: "al-Falaq", de: "Der Tagesanbruch", type: M, ayahs: 5, page: 604, juz: 30 },
  { n: 114, ar: "الناس", tr: "an-Nās", de: "Die Menschen", type: M, ayahs: 6, page: 604, juz: 30 },
];

export const surahMeta = (n: number): SurahMeta =>
  SURAHS.find((s) => s.n === n) ?? SURAHS[0];

/** Startseiten der Ǧuzʾ (Madinah-Mushaf): Ǧuzʾ 1 ab S. 1, 2–29 je 20 S., Ǧuzʾ 30 ab S. 582. */
export const juzStartPage = (j: number): number =>
  j <= 1 ? 1 : j <= 29 ? 2 + (j - 1) * 20 : 582;

export const juzEndPage = (j: number): number =>
  j >= 30 ? 604 : juzStartPage(j + 1) - 1;

/** Alle Sūren, die (teilweise) im gegebenen Ǧuzʾ liegen. */
export const surahsInJuz = (j: number): SurahMeta[] => {
  const a = juzStartPage(j);
  const b = juzEndPage(j);
  return SURAHS.filter((s) => s.page >= a && s.page <= b);
};

/** Die Sūra, in der eine Mushaf-Seite liegt. */
export const surahAtPage = (p: number): SurahMeta => {
  let cur = SURAHS[0];
  for (const s of SURAHS) {
    if (s.page <= p) cur = s;
    else break;
  }
  return cur;
};

/** Seiten, auf denen eine Sūra beginnt. */
export const pagesOfSurahStart = (n: number): number => surahMeta(n).page;
