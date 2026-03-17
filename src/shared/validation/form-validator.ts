import { FormValues, ValidationResult } from "../types";

function isBlank(value: string) {
  return value.trim().length === 0;
}

export function validateForm(values: FormValues): ValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (isBlank(values.dependentVariable)) {
    missing.push("Dependent variable is required.");
  }

  if (values.method !== "descriptive" && isBlank(values.coreIndependentVariable)) {
    missing.push("Core independent variable is required for the selected method.");
  }

  if (values.method === "panel") {
    if (isBlank(values.panelId)) {
      missing.push("Panel id is required for panel regression.");
    }
    if (isBlank(values.timeVariable)) {
      missing.push("Time variable is required for panel regression.");
    }
  }

  if (values.method === "did" && isBlank(values.treatmentVariable)) {
    missing.push("Treatment variable is required for DID.");
  }

  if (values.method === "iv" && isBlank(values.instrumentVariable)) {
    missing.push("Instrument variable is required for IV.");
  }

  if (values.clusterVariable.trim().length > 0 && !values.fixedEffects.includes("clustered")) {
    warnings.push("Cluster variable is filled in, but clustered standard errors are not marked in fixed effects or notes.");
  }

  return {
    missing,
    warnings,
    canGenerate: missing.length === 0,
  };
}
