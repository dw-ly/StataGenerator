import { GenerateResult, FormValues, TemplateDefinition } from "../types";
import { validateForm } from "../validation/form-validator";
import { buildScript } from "./templates/default-script";

export function generateStataScript(values: FormValues, template: TemplateDefinition): GenerateResult {
  const validation = validateForm(values);

  if (!validation.canGenerate) {
    return {
      script: "",
      explanation: ["Complete the missing fields before generating a script."],
      missing: validation.missing,
      warnings: validation.warnings,
    };
  }

  return {
    script: buildScript(values, template),
    explanation: [
      `Method: ${values.method}`,
      `Template: ${template.label}`,
      `Outputs: ${values.outputTargets.join(", ") || "none"}`,
    ],
    missing: [],
    warnings: validation.warnings,
  };
}
