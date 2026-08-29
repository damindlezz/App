export type ThemeId = "tannengold" | "lapis" | "sand" | "smaragd" | "wein" | "schiefer";

export interface Theme {
  id: ThemeId;
  name: string;
  hint: string;
  /** Farbwerte für die Vorschau-Kachel */
  base: string;
  accent: string;
}

export const THEMES: Theme[] = [
  {
    id: "tannengold",
    name: "Tannengold",
    hint: "Tiefes Tannengrün · warmes Gold",
    base: "#0D352B",
    accent: "#D8B25C",
  },
  {
    id: "lapis",
    name: "Lapisnacht",
    hint: "Lapislazuli · Safran",
    base: "#10224C",
    accent: "#E9A63C",
  },
  {
    id: "sand",
    name: "Nachtsand",
    hint: "Dunkle Erde · Kupferamber",
    base: "#292015",
    accent: "#D98E4A",
  },
  {
    id: "smaragd",
    name: "Smaragd",
    hint: "Kühles Tiefgrün · Minze",
    base: "#06302C",
    accent: "#4FC9A4",
  },
  {
    id: "wein",
    name: "Maulbeere",
    hint: "Tiefe Beere · Roségold",
    base: "#381722",
    accent: "#D98D6E",
  },
  {
    id: "schiefer",
    name: "Schiefer",
    hint: "Kühles Graphit · Eisblau",
    base: "#1A222B",
    accent: "#7FAFD9",
  },
];
