/**
 * Offline-Datenpaket: 20 Sūren vollständig — arabischer Text, deutsche
 * Übersetzung und kuratierter Tafsīr. Alle weiteren Sūren lädt die App
 * bei Bedarf aus der alquran.cloud-API (mit Fallback).
 */
export interface BundledSurah {
  n: number;
  ayahs: { ar: string; de: string }[];
  tafsir: string;
}

const T: Record<number, BundledSurah> = {
  1: {
    n: 1,
    ayahs: [
      { ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", de: "Im Namen Allahs, des Allerbarmers, des Barmherzigen." },
      { ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", de: "Alles Lob gebührt Allah, dem Herrn der Welten," },
      { ar: "الرَّحْمَٰنِ الرَّحِيمِ", de: "dem Allerbarmer, dem Barmherzigen," },
      { ar: "مَالِكِ يَوْمِ الدِّينِ", de: "dem Herrscher am Tag des Gerichts." },
      { ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", de: "Dir allein dienen wir, und Dich allein bitten wir um Hilfe." },
      { ar: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", de: "Führe uns den geraden Weg," },
      {
        ar: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        de: "den Weg derer, denen Du Gnade erwiesen hast — nicht derer, die Zorn erregt haben, und nicht der Irregehenden.",
      },
    ],
    tafsir:
      "Al-Fātiḥa heißt „Mutter des Buches“ (Umm al-Kitāb) und wird in jeder Rakʿa des Gebets rezitiert. Sie fasst den ganzen Quran zusammen: das Lob Allahs, Seine Herrschaft und Barmherzigkeit — und die Bitte um Rechtleitung auf den geraden Weg. Im Ḥadīṯ Qudsī heißt es, Allah habe das Gebet zwischen Sich und Seinem Diener aufgeteilt: Die ersten Verse sind Sein Lob, die Bitte gehört dem Beter — und die Erhörung ist verheißen.",
  },
  93: {
    n: 93,
    ayahs: [
      { ar: "وَالضُّحَىٰ", de: "Beim Vormittag" },
      { ar: "وَاللَّيْلِ إِذَا سَجَىٰ", de: "und bei der Nacht, wenn sie still wird:" },
      { ar: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ", de: "Dein Herr hat dich weder verlassen noch verabscheut." },
      { ar: "وَلَلْآخِرَةُ خَيْرٌ لَكَ مِنَ الْأُولَىٰ", de: "Und das Jenseits ist wahrlich besser für dich als das Diesseits." },
      { ar: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ", de: "Und dein Herr wird dir gewiss geben, bis du zufrieden bist." },
      { ar: "أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ", de: "Hat Er dich nicht als Waise gefunden und geborgen?" },
      { ar: "وَوَجَدَكَ ضَالًّا فَهَدَىٰ", de: "Und Er fand dich sinnsuchend und leitete dich recht." },
      { ar: "وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ", de: "Und Er fand dich bedürftig und machte dich reich." },
      { ar: "فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ", de: "Was nun die Waise betrifft, so bedränge sie nicht," },
      { ar: "وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ", de: "und den Bittenden weise nicht ab," },
      { ar: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ", de: "und von der Gnade deines Herrn sprich!" },
    ],
    tafsir:
      "Offenbart nach einer Pause der Offenbarung, in der der Prophet ﷺ fürchtete, Allah habe Sich abgewandt. Allah schwört beim Licht des Vormittags und bei der stillen Nacht: Er hat ihn weder verlassen noch verabscheut — und erinnert an drei Gnadenerweise: Geborgenheit in der Waisenzeit, Rechtleitung im Suchen, Reichtum in der Bedürftigkeit. Daraus folgen drei Pflichten: die Waise schützen, den Bittenden nicht abweisen und Allahs Gaben dankbar aussprechen.",
  },
  94: {
    n: 94,
    ayahs: [
      { ar: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", de: "Haben Wir dir nicht die Brust geweitet" },
      { ar: "وَوَضَعْنَا عَنْكَ وِزْرَكَ", de: "und dir deine Last abgenommen," },
      { ar: "الَّذِي أَنْقَضَ ظَهْرَكَ", de: "die deinen Rücken schwer belastete," },
      { ar: "وَرَفَعْنَا لَكَ ذِكْرَكَ", de: "und dein Ansehen erhöht?" },
      { ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", de: "Wahrlich, mit der Erschwernis kommt Erleichterung," },
      { ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", de: "wahrlich, mit der Erschwernis kommt Erleichterung." },
      { ar: "فَإِذَا فَرَغْتَ فَانْصَبْ", de: "Und wenn du fertig bist, dann bemühe dich weiter," },
      { ar: "وَإِلَىٰ رَبِّكَ فَارْغَبْ", de: "und wende dich in Sehnsucht deinem Herrn zu." },
    ],
    tafsir:
      "Die Trost-Sūra, die aḍ-Ḍuḥā ergänzt: Allah erinnert an die Weitung der Brust und die Abnahme der Last. Das doppelte Versprechen „mit der Erschwernis kommt Erleichterung“ lesen die Gelehrten so: Die Erschwernis steht bestimmt (einmal), die Erleichterung unbestimmt (zweimal) — eine Erschwernis wird zwei Erleichterungen nie überwiegen. Der Schluss lehrt Taktung: Ist eine Aufgabe vollbracht, folgt die nächste — und die Sehnsucht gehört Allah allein.",
  },
  95: {
    n: 95,
    ayahs: [
      { ar: "وَالتِّينِ وَالزَّيْتُونِ", de: "Beim Feigenbaum und beim Olivenbaum," },
      { ar: "وَطُورِ سِينِينَ", de: "beim Berg Sīnīn" },
      { ar: "وَهَٰذَا الْبَلَدِ الْأَمِينِ", de: "und bei dieser sicheren Stadt (Mekka):" },
      { ar: "لَقَدْ خَلَقْنَا الْإِنْسَانَ فِي أَحْسَنِ تَقْوِيمٍ", de: "Wir haben den Menschen in schönster Gestalt erschaffen," },
      { ar: "ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ", de: "dann bringen Wir ihn zurück an den tiefsten der tiefen Orte —" },
      { ar: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ", de: "außer denjenigen, die glauben und gute Werke tun: für sie gibt es einen Lohn, der nicht abreißt." },
      { ar: "فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ", de: "Was lässt dich denn danach die Abrechnung leugnen?" },
      { ar: "أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ", de: "Ist Allah etwa nicht der weiseste der Richter?" },
    ],
    tafsir:
      "Allah schwört bei vier Orten der Offenbarung und Segnung — dem Land des Feigenbaums und Ölbaums (Syrien/Palästina), dem Sīnāʾ und der sicheren Stadt Mekka — auf die Würde des Menschen: in schönster Form erschaffen, doch fähig, tiefer zu sinken als alle. Nur Glaube und gute Werke bewahren vor dem Absturz. Die Schlussfrage ist Bestätigung und Trost zugleich: Der weiseste Richter wird gerecht entscheiden.",
  },
  97: {
    n: 97,
    ayahs: [
      { ar: "إِنَّا أَنْزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ", de: "Wir haben ihn (den Quran) in der Nacht der Bestimmung hinabgesandt." },
      { ar: "وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ", de: "Und was lässt dich wissen, was die Nacht der Bestimmung ist?" },
      { ar: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ", de: "Die Nacht der Bestimmung ist besser als tausend Monate." },
      { ar: "تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِمْ مِنْ كُلِّ أَمْرٍ", de: "In ihr steigen die Engel und der Geist mit der Erlaubnis ihres Herrn herab, für jede Angelegenheit." },
      { ar: "سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ", de: "Friede ist sie, bis die Morgenröte anbricht." },
    ],
    tafsir:
      "Die Nacht, in der der Quran zum untersten Himmel herabgesandt wurde — besser als 83 Jahre Anbetung. Die Engel steigen mit jeder festgelegten Angelegenheit des kommenden Jahres herab, und die Nacht ist lauter Frieden bis zur Morgendämmerung. Wer sie in den letzten zehn Nächten des Ramaḍān sucht, dem werden nach dem Ḥadīṯ die vergangenen Sünden vergeben.",
  },
  99: {
    n: 99,
    ayahs: [
      { ar: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا", de: "Wenn die Erde von ihrem Beben erschüttert wird" },
      { ar: "وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا", de: "und die Erde ihre Lasten herausgibt" },
      { ar: "وَقَالَ الْإِنْسَانُ مَا لَهَا", de: "und der Mensch sagt: „Was ist mit ihr?“ —" },
      { ar: "يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا", de: "an jenem Tag wird sie ihre Kunde erzählen," },
      { ar: "بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا", de: "weil dein Herr ihr eingegeben hat." },
      { ar: "يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِيُرَوْا أَعْمَالَهُمْ", de: "An jenem Tag kommen die Menschen in zerstreuten Gruppen hervor, damit ihnen ihre Werke gezeigt werden." },
      { ar: "فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ", de: "Wer Gutes im Gewicht eines Stäubchens tut, wird es sehen," },
      { ar: "وَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ", de: "und wer Böses im Gewicht eines Stäubchens tut, wird es sehen." },
    ],
    tafsir:
      "Die Abrechnung in kleinen Bildern: Die Erde bebt, gibt ihre Toten heraus und spricht — denn Allah hat ihr eingegeben. Kein Stäubchen Gute und kein Stäubchen Böses gehen verloren. Die Sūra macht aus der großen Lehre ein tägliches Gewissen: Jede Tat zählt, und die Erde selbst wird Zeugin sein.",
  },
  101: {
    n: 101,
    ayahs: [
      { ar: "الْقَارِعَةُ", de: "Die Klopfende!" },
      { ar: "مَا الْقَارِعَةُ", de: "Was ist die Klopfende?" },
      { ar: "وَمَا أَدْرَاكَ مَا الْقَارِعَةُ", de: "Und was lässt dich wissen, was die Klopfende ist?" },
      { ar: "يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ", de: "An jenem Tag werden die Menschen wie zerstreute Motten sein" },
      { ar: "وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنْفُوشِ", de: "und die Berge wie zerzauste Wolle." },
      { ar: "فَأَمَّا مَنْ ثَقُلَتْ مَوَازِينُهُ", de: "Wer dann schwere Waagschalen hat," },
      { ar: "فَهُوَ فِي عِيشَةٍ رَاضِيَةٍ", de: "der wird in einem wohlgefälligen Leben sein." },
      { ar: "وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ", de: "Wer aber leichte Waagschalen hat," },
      { ar: "فَأُمُّهُ هَاوِيَةٌ", de: "dessen Zuflucht wird der Abgrund (Hāwiya) sein." },
      { ar: "وَمَا أَدْرَاكَ مَا هِيَهْ", de: "Und was lässt dich wissen, was das ist?" },
      { ar: "نَارٌ حَامِيَةٌ", de: "Ein loderndes Feuer." },
    ],
    tafsir:
      "„Die Klopfende“ — ein Name der Stunde, die an jedes Herz pocht. Menschen wie zerstreute Motten, Berge wie gekämmte Wolle: alle gewohnte Ordnung zerfällt. Dann entscheidet die Waage: schwere Schalen führen in ein Leben des Wohlgefallens, leichte in den glühenden Abgrund. Der dreifache Auftakt hämmert die Frage ein, die jede Ausrede abschneidet.",
  },
  102: {
    n: 102,
    ayahs: [
      { ar: "أَلْهَاكُمُ التَّكَاثُرُ", de: "Das Wettstreben nach Mehr hat euch abgelenkt," },
      { ar: "حَتَّىٰ زُرْتُمُ الْمَقَابِرَ", de: "bis ihr die Gräber besucht habt." },
      { ar: "كَلَّا سَوْفَ تَعْلَمُونَ", de: "Nein! Ihr werdet es bald wissen." },
      { ar: "ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ", de: "Abermals nein! Ihr werdet es bald wissen." },
      { ar: "كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ", de: "Nein! Wenn ihr es nur mit dem Wissen der Gewissheit wüsstet:" },
      { ar: "لَتَرَوُنَّ الْجَحِيمَ", de: "Ihr würdet gewiss die Hölle sehen," },
      { ar: "ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ", de: "dann würdet ihr sie mit dem Auge der Gewissheit sehen." },
      { ar: "ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ", de: "Dann werdet ihr an jenem Tag nach dem Wohlstand befragt werden." },
    ],
    tafsir:
      "Das Wettstreben nach Mehr — Besitz, Kinder, Ansehen — beschäftigt die Menschen, bis sie an den Gräbern stehen. Das dreifache „Nein!“ (Kallā) hält die Täuschung an: Ihr werdet wissen, und ihr werdet das Feuer mit dem Auge der Gewissheit sehen. Am Ende steht die feinste Frage der Abrechnung: die nach der Dankbarkeit für jede Wohltat — vom kühlen Wasser bis zum sicheren Dach.",
  },
  103: {
    n: 103,
    ayahs: [
      { ar: "وَالْعَصْرِ", de: "Beim Zeitalter!" },
      { ar: "إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ", de: "Der Mensch befindet sich wahrlich im Verlust," },
      { ar: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", de: "außer denjenigen, die glauben und gute Werke tun und einander die Wahrheit ans Herz legen und einander die Geduld ans Herz legen." },
    ],
    tafsir:
      "Die kürzeste und dichteste Sūra: Bei der Zeit selbst — dem Ort der Taten — bezeugt Allah, dass der Mensch im Verlust ist. Gerettet ist, wer vier Eigenschaften verbindet: Glauben, gute Werke, gegenseitiges Ermahnen zur Wahrheit und zur Geduld. Von Imam aš-Šāfiʿī wird überliefert: Wenn Allah den Menschen nur diese Sūra offenbart hätte — sie hätte ihnen genügt.",
  },
  104: {
    n: 104,
    ayahs: [
      { ar: "وَيْلٌ لِكُلِّ هُمَزَةٍ لُمَزَةٍ", de: "Wehe jedem Verleumder und Nörgler," },
      { ar: "الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ", de: "der Vermögen zusammenträgt und es zählt!" },
      { ar: "يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ", de: "Er meint, sein Vermögen mache ihn unsterblich." },
      { ar: "كَلَّا لَيُنْبَذَنَّ فِي الْحُطَمَةِ", de: "Nein! Er wird gewiss in die Zermalmende (Ḥuṭama) geworfen." },
      { ar: "وَمَا أَدْرَاكَ مَا الْحُطَمَةُ", de: "Und was lässt dich wissen, was die Zermalmende ist?" },
      { ar: "نَارُ اللَّهِ الْمُوقَدَةُ", de: "Das entzündete Feuer Allahs," },
      { ar: "الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ", de: "das bis zu den Herzen vordringt." },
      { ar: "إِنَّهَا عَلَيْهِمْ مُؤْصَدَةٌ", de: "Es wird sich über ihnen schließen" },
      { ar: "فِي عَمَدٍ مُمَدَّدَةٍ", de: "in hoch aufragenden Säulen." },
    ],
    tafsir:
      "Wehe dem Spötter, der hinter dem Rücken verletzt und sein Vermögen zählt, als mache es ihn unsterblich. Seine Antwort ist die Ḥuṭama — das Feuer, das bis zu den Herzen aufsteigt und sich in Säulen über ihm schließt. Die Sūra schützt die Ehre der Menschen: Wer Würde verletzt, zerbricht vor Allah, nicht vor Menschen.",
  },
  105: {
    n: 105,
    ayahs: [
      { ar: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", de: "Hast du nicht gesehen, wie dein Herr mit den Gefährten des Elefanten verfahren ist?" },
      { ar: "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", de: "Hat Er nicht ihren Plan zunichte gemacht" },
      { ar: "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ", de: "und Vögel in Scharen über sie gesandt," },
      { ar: "تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ", de: "die sie mit Steinen aus gebranntem Ton bewarfen" },
      { ar: "فَجَعَلَهُمْ كَعَصْفٍ مَأْكُولٍ", de: "und sie wie abgefressene Blätter machte?" },
    ],
    tafsir:
      "Erinnerung an das Jahr des Elefanten (um 570 n. Chr., das Geburtsjahr des Propheten ﷺ): Abreha zog mit Kriegselefanten aus Jemen, um die Kaaba zu zerstören — Allah ließ seinen Plan scheitern und schickte Vogelschwärme mit Steinen aus Siccīl. Die Botschaft an die Qurayš: Das Haus hat einen Herrn, der es schützt — denselben Herrn, den sie anbeten sollten.",
  },
  106: {
    n: 106,
    ayahs: [
      { ar: "لِإِيلَافِ قُرَيْشٍ", de: "Weil es Gewohnheit der Qurayš ist —" },
      { ar: "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", de: "ihre Gewohnheit der Winter- und Sommerreise —" },
      { ar: "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ", de: "so sollen sie dem Herrn dieses Hauses dienen," },
      { ar: "الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ", de: "Der sie vor Hunger speist und ihnen Sicherheit vor Furcht gibt." },
    ],
    tafsir:
      "Das Gegenstück zu al-Fīl: Weil Allah das Haus schützt, konnten die Qurayš sicher reisen — die Winterkarawane nach Jemen, die Sommerkarawane nach Syrien. Aus der Sicherheit folgt die Anbetung: „Sie sollen dem Herrn dieses Hauses dienen“, Der vor Hunger speist und vor Angst schützt. Zwei Grundnöte, zwei Gaben, ein Dank.",
  },
  107: {
    n: 107,
    ayahs: [
      { ar: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", de: "Hast du den gesehen, der die Abrechnung leugnet?" },
      { ar: "فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ", de: "Das ist der, welcher die Waise wegstößt" },
      { ar: "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ", de: "und nicht zur Speisung des Armen anhält." },
      { ar: "فَوَيْلٌ لِلْمُصَلِّينَ", de: "Wehe den Betenden," },
      { ar: "الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ", de: "die in ihrem Gebet nachlässig sind," },
      { ar: "الَّذِينَ هُمْ يُرَاءُونَ", de: "die nur gesehen werden wollen" },
      { ar: "وَيَمْنَعُونَ الْمَاعُونَ", de: "und die Hilfeleistung verweigern." },
    ],
    tafsir:
      "Der Glaube misst sich am Umgang mit den Schwachen: Wer die Abrechnung leugnet, zeigt es daran, dass er die Waise zurückstößt und den Armen nicht speist. Und das Gebet selbst kann hohl werden — wehe denen, die beten und dabei nachlässig sind, die gesehen werden wollen und das Māʿūn verweigern: selbst die kleine, selbstverständliche Hilfe. Frömmigkeit ohne Mitmenschlichkeit ist Fassade.",
  },
  108: {
    n: 108,
    ayahs: [
      { ar: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", de: "Wir haben dir al-Kawṯar (die Fülle) gegeben." },
      { ar: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", de: "So bete zu deinem Herrn und opfere." },
      { ar: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", de: "Wer dich hasst, ist es, der abgeschnitten bleibt." },
    ],
    tafsir:
      "Die kürzeste Sūra des Quran — Antwort auf den Spott, der Prophet ﷺ sei „abgeschnitten“ (abtar) ohne Nachkommenschaft. Allah gibt ihm al-Kawṯar: einen Fluss im Paradies und überfließendes Gut. Zwei Befehle folgen: Gebet und Opfer, aufrichtig für den Herrn. Und das Urteil: Der Spötter selbst bleibt von allem Guten abgeschnitten.",
  },
  109: {
    n: 109,
    ayahs: [
      { ar: "قُلْ يَا أَيُّهَا الْكَافِرُونَ", de: "Sag: O ihr Ungläubigen!" },
      { ar: "لَا أَعْبُدُ مَا تَعْبُدُونَ", de: "Ich diene nicht dem, dem ihr dient," },
      { ar: "وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ", de: "und ihr dient nicht dem, dem ich diene." },
      { ar: "وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ", de: "Ich werde nie dem dienen, dem ihr gedient habt," },
      { ar: "وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ", de: "und ihr werdet nie dem dienen, dem ich diene." },
      { ar: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", de: "Ihr habt eure Religion, und ich habe meine Religion." },
    ],
    tafsir:
      "Die Sūra der Unterscheidung: Als die Qurayš dem Propheten ﷺ einen religiösen Kompromiss anboten — ein Jahr euer Gott, ein Jahr unserer —, kam diese Antwort. In der Anbetung gibt es kein Vermischen; der Umgang bleibt davon unberührt. Zusammen mit al-Iḫlāṣ gleicht sie einem Drittel des Quran und wird in den Sunna-Rakʿāt von Faǧr und Maġrib gelesen.",
  },
  110: {
    n: 110,
    ayahs: [
      { ar: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", de: "Wenn die Hilfe Allahs und der Sieg kommen" },
      { ar: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", de: "und du die Menschen in Scharen in die Religion Allahs eintreten siehst," },
      { ar: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", de: "dann lobpreise deinen Herrn und bitte Ihn um Vergebung. Er ist gewiss der Vergebende." },
    ],
    tafsir:
      "Die letzte vollständig offenbarte Sūra: Die Einnahme Mekkas und der Eintritt der Menschen in Scharen sind Zeichen, dass die Sendung vollendet ist — der Prophet ﷺ verstand daraus, dass seine Zeit gekommen war. Die Antwort auf den Sieg ist nicht Stolz, sondern Tasbīḥ und Istiġfār: Dank und Demut am Gipfel des Erfolgs.",
  },
  111: {
    n: 111,
    ayahs: [
      { ar: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", de: "Zugrunde gehen sollen die Hände Abū Lahabs, und er selbst soll zugrunde gehen!" },
      { ar: "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", de: "Sein Vermögen und sein Erwerb nützten ihm nichts." },
      { ar: "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", de: "Er wird in einem Feuer voller Flammen brennen," },
      { ar: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", de: "und seine Frau, die Feuerholzträgerin," },
      { ar: "فِي جِيدِهَا حَبْلٌ مِنْ مَسَدٍ", de: "mit einem Seil aus Palmenfaser um ihren Hals." },
    ],
    tafsir:
      "Über Abū Lahab, den Onkel des Propheten ﷺ und seinen härtesten Gegner, und seine Frau, die Dornen auf seinen Weg legte: Vermögen und Erwerb nützen nichts. Ein Wunder des Quran liegt in der Offenbarung zu seinen Lebzeiten — er hätte sich zum Islam bekennen können und das Urteil widerlegt; er tat es nie, und die Sūra blieb wahr.",
  },
  112: {
    n: 112,
    ayahs: [
      { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", de: "Sag: Er ist Allah, Einer." },
      { ar: "اللَّهُ الصَّمَدُ", de: "Allah ist der absolute Herr (aṣ-Ṣamad)." },
      { ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ", de: "Er zeugt nicht und wurde nicht gezeugt," },
      { ar: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", de: "und keiner ist Ihm ebenbürtig." },
    ],
    tafsir:
      "Die Sūra des Tauḥīd in vier Versen — nach dem Ḥadīṯ einem Drittel des Quran gleich. Erst Bejahung: Allah ist Einer (Aḥad) und der Allgenügsame (aṣ-Ṣamad), zu Dem alles aufsteigt und Der Selbst nichts bedarf. Dann Verneinung: kein Zeugen, kein Gezeugtwerden, nichts Ebenbürtiges. Sie zu rezitieren ist das kürzeste Bekenntnis der Reinheit Allahs.",
  },
  113: {
    n: 113,
    ayahs: [
      { ar: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", de: "Sag: Ich nehme Zuflucht beim Herrn des Tagesanbruchs," },
      { ar: "مِنْ شَرِّ مَا خَلَقَ", de: "vor dem Übel dessen, was Er erschaffen hat," },
      { ar: "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ", de: "vor dem Übel der Dunkelheit, wenn sie hereinbricht," },
      { ar: "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", de: "vor dem Übel der auf die Knoten Blasenden," },
      { ar: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", de: "und vor dem Übel des Neiders, wenn er neidet." },
    ],
    tafsir:
      "Die erste der beiden Schutz-Sūren (al-Muʿawwiḏātān): Zuflucht beim Herrn des Morgengrauens — dem, der das Licht aus der Dunkelheit bricht — vor vier Übeln: allem Erschaffenen, der hereinbrechenden Nacht, dem Wirken der Magie und dem Neid, wenn er handelt. Schutz ist kein Aberglaube, sondern Bindung an Allah; rezitiert am Morgen, am Abend und vor dem Schlaf.",
  },
  114: {
    n: 114,
    ayahs: [
      { ar: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", de: "Sag: Ich nehme Zuflucht beim Herrn der Menschen," },
      { ar: "مَلِكِ النَّاسِ", de: "dem König der Menschen," },
      { ar: "إِلَٰهِ النَّاسِ", de: "dem Gott der Menschen," },
      { ar: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", de: "vor dem Übel des einflüsternden (Waswās), der sich zurückzieht," },
      { ar: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", de: "der in die Herzen der Menschen einflüstert," },
      { ar: "مِنَ الْجِنَّةِ وَالنَّاسِ", de: "sei er von den Dschinnen oder von den Menschen." },
    ],
    tafsir:
      "Die letzte Sūra des Buches: Zuflucht beim Herrn, König und Gott der Menschen — drei Namen, ein Schutz — vor dem Waswās, dem Einflüsterer, der bei jedem Gedenken Allahs zurückweicht, von Dschinn oder Mensch. Der Quran endet, wie er begann: mit Schutz und Führung. Der innere Feind ist feiner als der äußere — und die Zuflucht bei Allah ist stärker als beide.",
  },
};

export const BUNDLED = T;
export const BUNDLED_NUMBERS = Object.keys(T)
  .map(Number)
  .sort((a, b) => a - b);
