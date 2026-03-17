export type ResearchMethod = "descriptive" | "baseline" | "panel" | "did" | "iv";
export type DataStructure = "cross_section" | "panel" | "time_series";
export type StdErrorType = "plain" | "robust" | "cluster";
export type TemplateSource = "builtin" | "user";
export type HostEnvironment = "web" | "desktop";

export interface ResearchMethodOption {
  id: ResearchMethod;
  label: string;
  description: string;
}

export interface TemplateDefinition {
  id: string;
  label: string;
  stataVersion: string;
  source: TemplateSource;
  description: string;
  headerComment: string;
  regressionCommand: string;
  panelCommand: string;
  didCommand: string;
  ivCommand: string;
}

export interface FormValues {
  method: ResearchMethod;
  dataStructure: DataStructure;
  dependentVariable: string;
  coreIndependentVariable: string;
  controlVariables: string[];
  panelId: string;
  timeVariable: string;
  treatmentVariable: string;
  instrumentVariable: string;
  clusterVariable: string;
  fixedEffects: string[];
  outputTargets: string[];
  notes: string;
  robustnessNotes: string;
  heterogeneityNotes: string;
  selectedTemplateId: string;
}

export interface ParsedIni {
  sections: Record<string, Record<string, string>>;
  sectionOrder: string[];
}

export interface IniImportReport {
  configVersion: string | null;
  configName: string | null;
  mappedFields: string[];
  unknownEntries: string[];
  warnings: string[];
}

export interface IniImportResult {
  values: FormValues;
  report: IniImportReport;
}

export interface ValidationResult {
  missing: string[];
  warnings: string[];
  canGenerate: boolean;
}

export interface GenerateResult {
  script: string;
  explanation: string[];
  missing: string[];
  warnings: string[];
}
