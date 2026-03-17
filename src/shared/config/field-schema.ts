import { FormValues } from "../types";

export interface FieldDescriptor {
  key: keyof FormValues;
  label: string;
  group: string;
  advanced?: boolean;
}

export const fieldSchema: FieldDescriptor[] = [
  { key: "method", label: "Research method", group: "core" },
  { key: "dataStructure", label: "Data structure", group: "core" },
  { key: "dependentVariable", label: "Dependent variable", group: "variables" },
  { key: "coreIndependentVariable", label: "Core independent variable", group: "variables" },
  { key: "panelId", label: "Panel id", group: "variables" },
  { key: "timeVariable", label: "Time variable", group: "variables" },
  { key: "treatmentVariable", label: "Treatment variable", group: "advanced", advanced: true },
  { key: "instrumentVariable", label: "Instrument variable", group: "advanced", advanced: true },
  { key: "clusterVariable", label: "Cluster variable", group: "advanced", advanced: true },
  { key: "notes", label: "Research notes", group: "advanced", advanced: true },
  { key: "robustnessNotes", label: "Robustness notes", group: "advanced", advanced: true },
  { key: "heterogeneityNotes", label: "Heterogeneity notes", group: "advanced", advanced: true },
  { key: "selectedTemplateId", label: "Stata template", group: "templates", advanced: true },
];
