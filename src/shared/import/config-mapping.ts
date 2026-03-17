import { defaultFormValues } from "../config/defaults";
import { FormValues, IniImportReport, IniImportResult, ParsedIni } from "../types";

type CanonicalKey =
  | "config_version"
  | "config_name"
  | "method"
  | "data_structure"
  | "dependent_variable"
  | "core_independent_variable"
  | "control_variables"
  | "panel_id"
  | "time_variable"
  | "treatment_variable"
  | "instrument_variable"
  | "cluster_variable"
  | "fixed_effects"
  | "output_targets"
  | "notes"
  | "robustness_notes"
  | "heterogeneity_notes"
  | "selected_template_id";

interface MapIniContext {
  validTemplateIds?: string[];
}

const keyAliases: Record<CanonicalKey, string[]> = {
  config_version: ["config_version", "version"],
  config_name: ["config_name", "name"],
  method: ["method"],
  data_structure: ["data_structure", "datastructure"],
  dependent_variable: ["dependent_variable", "dv"],
  core_independent_variable: ["core_independent_variable", "main_iv", "independent_variable"],
  control_variables: ["control_variables", "controls"],
  panel_id: ["panel_id", "entity_id"],
  time_variable: ["time_variable", "time_id"],
  treatment_variable: ["treatment_variable", "treat"],
  instrument_variable: ["instrument_variable", "instrument"],
  cluster_variable: ["cluster_variable", "cluster"],
  fixed_effects: ["fixed_effects", "fe"],
  output_targets: ["output_targets", "outputs"],
  notes: ["notes"],
  robustness_notes: ["robustness_notes"],
  heterogeneity_notes: ["heterogeneity_notes"],
  selected_template_id: ["selected_template_id", "template_id"],
};

const aliasLookup = Object.entries(keyAliases).reduce<Record<string, CanonicalKey>>((lookup, [canonicalKey, aliases]) => {
  aliases.forEach((alias) => {
    lookup[alias.toLowerCase()] = canonicalKey as CanonicalKey;
  });
  return lookup;
}, {});

function splitList(value: string | undefined) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function dedupe(items: string[]) {
  return [...new Set(items)];
}

function coerceMethod(value: string | undefined, warnings: string[]) {
  if (!value) {
    return defaultFormValues.method;
  }

  const normalized = value.toLowerCase() as FormValues["method"];
  if (["descriptive", "baseline", "panel", "did", "iv"].includes(normalized)) {
    return normalized;
  }

  warnings.push(`Unsupported method "${value}" in ini; fallback to "${defaultFormValues.method}".`);
  return defaultFormValues.method;
}

function coerceDataStructure(value: string | undefined, warnings: string[]) {
  if (!value) {
    return defaultFormValues.dataStructure;
  }

  const normalized = value.toLowerCase() as FormValues["dataStructure"];
  if (["cross_section", "panel", "time_series"].includes(normalized)) {
    return normalized;
  }

  warnings.push(`Unsupported data structure "${value}" in ini; fallback to "${defaultFormValues.dataStructure}".`);
  return defaultFormValues.dataStructure;
}

function collectKnownValues(parsedIni: ParsedIni, report: IniImportReport) {
  const known: Partial<Record<CanonicalKey, string>> = {};

  for (const [sectionName, entries] of Object.entries(parsedIni.sections)) {
    for (const [rawKey, value] of Object.entries(entries)) {
      const canonicalKey = aliasLookup[rawKey.toLowerCase()];

      if (!canonicalKey) {
        report.unknownEntries.push(`${sectionName}.${rawKey}=${value}`);
        continue;
      }

      known[canonicalKey] = value;
      report.mappedFields.push(canonicalKey);
    }
  }

  return known;
}

export function mapIniToFormValues(parsedIni: ParsedIni, context: MapIniContext = {}): IniImportResult {
  const report: IniImportReport = {
    configVersion: null,
    configName: null,
    mappedFields: [],
    unknownEntries: [],
    warnings: [],
  };
  const known = collectKnownValues(parsedIni, report);
  const selectedTemplateId = known.selected_template_id ?? defaultFormValues.selectedTemplateId;
  const validTemplateIds = context.validTemplateIds ?? [];
  const resolvedTemplateId =
    validTemplateIds.length === 0 || validTemplateIds.includes(selectedTemplateId)
      ? selectedTemplateId
      : defaultFormValues.selectedTemplateId;

  if (!known.config_version) {
    report.warnings.push("Missing meta.config_version; expected ini format version 1.");
  } else if (known.config_version !== "1") {
    report.warnings.push(`Unsupported config_version "${known.config_version}". Version 1 is expected.`);
  }

  if (selectedTemplateId !== resolvedTemplateId) {
    report.warnings.push(`Template "${selectedTemplateId}" is not available in the current app; fallback to "${resolvedTemplateId}".`);
  }

  report.configVersion = known.config_version ?? null;
  report.configName = known.config_name ?? null;

  return {
    values: {
      ...defaultFormValues,
      method: coerceMethod(known.method, report.warnings),
      dataStructure: coerceDataStructure(known.data_structure, report.warnings),
      dependentVariable: known.dependent_variable ?? defaultFormValues.dependentVariable,
      coreIndependentVariable: known.core_independent_variable ?? defaultFormValues.coreIndependentVariable,
      controlVariables: splitList(known.control_variables),
      panelId: known.panel_id ?? defaultFormValues.panelId,
      timeVariable: known.time_variable ?? defaultFormValues.timeVariable,
      treatmentVariable: known.treatment_variable ?? defaultFormValues.treatmentVariable,
      instrumentVariable: known.instrument_variable ?? defaultFormValues.instrumentVariable,
      clusterVariable: known.cluster_variable ?? defaultFormValues.clusterVariable,
      fixedEffects: splitList(known.fixed_effects),
      outputTargets: splitList(known.output_targets),
      notes: known.notes ?? defaultFormValues.notes,
      robustnessNotes: known.robustness_notes ?? defaultFormValues.robustnessNotes,
      heterogeneityNotes: known.heterogeneity_notes ?? defaultFormValues.heterogeneityNotes,
      selectedTemplateId: resolvedTemplateId,
    },
    report: {
      ...report,
      mappedFields: dedupe(report.mappedFields),
      unknownEntries: dedupe(report.unknownEntries),
      warnings: dedupe(report.warnings),
    },
  };
}
