import { TemplateDefinition } from "../../types";
import { FormValues } from "../../types";

function joinControls(values: string[]) {
  return values.filter(Boolean).join(" ");
}

export function buildScript(values: FormValues, template: TemplateDefinition) {
  const controls = joinControls(values.controlVariables);
  const fixedEffects = values.fixedEffects.length > 0 ? values.fixedEffects.join(" ") : "none";

  switch (values.method) {
    case "descriptive":
      return [
        `* ${template.headerComment}`,
        `summarize ${values.dependentVariable} ${values.coreIndependentVariable} ${controls}`.trim(),
        `pwcorr ${values.dependentVariable} ${values.coreIndependentVariable} ${controls}, sig`.trim(),
      ].join("\n");
    case "panel":
      return [
        `* ${template.headerComment}`,
        `xtset ${values.panelId} ${values.timeVariable}`.trim(),
        `${template.panelCommand} ${values.dependentVariable} ${values.coreIndependentVariable} ${controls}, fe`.trim(),
        `* Fixed effects: ${fixedEffects}`,
      ].join("\n");
    case "did":
      return [
        `* ${template.headerComment}`,
        `${template.didCommand} ${values.dependentVariable} ${values.treatmentVariable} ${values.coreIndependentVariable} ${controls}, robust`.trim(),
        `* DID note: verify treatment timing and parallel trends before estimation.`,
      ].join("\n");
    case "iv":
      return [
        `* ${template.headerComment}`,
        `${template.ivCommand} ${values.dependentVariable} (${values.coreIndependentVariable} = ${values.instrumentVariable}) ${controls}, robust`.trim(),
      ].join("\n");
    case "baseline":
    default:
      return [
        `* ${template.headerComment}`,
        `${template.regressionCommand} ${values.dependentVariable} ${values.coreIndependentVariable} ${controls}, robust`.trim(),
        `* Fixed effects: ${fixedEffects}`,
      ].join("\n");
  }
}
