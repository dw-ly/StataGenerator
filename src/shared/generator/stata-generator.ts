import { getLabelList, getMethodLabel, outputTargetLabels } from "../i18n/labels";
import { GenerateResult, FormValues, TemplateDefinition } from "../types";
import { validateForm } from "../validation/form-validator";
import { buildScript } from "./templates/default-script";

export function generateStataScript(values: FormValues, template: TemplateDefinition): GenerateResult {
  const validation = validateForm(values);

  if (!validation.canGenerate) {
    return {
      script: "",
      explanation: ["请先补全缺失字段，再生成脚本。"],
      missing: validation.missing,
      warnings: validation.warnings,
    };
  }

  return {
    script: buildScript(values, template),
    explanation: [
      `研究方法：${getMethodLabel(values.method)}`,
      `脚本模板：${template.label}`,
      `输出内容：${getLabelList(values.outputTargets, outputTargetLabels)}`,
    ],
    missing: [],
    warnings: validation.warnings,
  };
}
