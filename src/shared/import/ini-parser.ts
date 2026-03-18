import { ParsedIni } from "../types";

function decodeIniValue(value: string) {
  return value.replace(/\\\\/g, "\\").replace(/\\n/g, "\n").replace(/\\r/g, "\r");
}

export function parseIni(content: string): ParsedIni {
  const sections: ParsedIni["sections"] = {};
  const sectionOrder: string[] = [];
  let currentSection = "default";
  sections[currentSection] = {};
  sectionOrder.push(currentSection);

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith(";") || line.startsWith("#")) {
      continue;
    }

    if (line.startsWith("[") && line.endsWith("]")) {
      currentSection = line.slice(1, -1).trim().toLowerCase();
      if (!sections[currentSection]) {
        sections[currentSection] = {};
        sectionOrder.push(currentSection);
      }
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex < 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim().toLowerCase();
    const value = decodeIniValue(line.slice(separatorIndex + 1).trim());
    sections[currentSection][key] = value;
  }

  return { sections, sectionOrder };
}
