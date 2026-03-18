import { fixedEffectLabels, getLabelList } from "../../i18n/labels";
import { FormValues, TemplateDefinition } from "../../types";

function joinControls(values: string[]) {
  return values.filter(Boolean).join(" ");
}

export function buildScript(values: FormValues, template: TemplateDefinition) {
  const controls = joinControls(values.controlVariables);
  const fixedEffects = getLabelList(values.fixedEffects, fixedEffectLabels, "未设置");

  switch (values.method) {
    case "descriptive":
      return [
        `* ${template.headerComment}`,
        "* 描述统计与相关性分析",
        `summarize ${values.dependentVariable} ${values.coreIndependentVariable} ${controls}`.trim(),
        `pwcorr ${values.dependentVariable} ${values.coreIndependentVariable} ${controls}, sig`.trim(),
      ].join("\n");
    case "panel":
      return [
        `* ${template.headerComment}`,
        "* 面板设定",
        `xtset ${values.panelId} ${values.timeVariable}`.trim(),
        `${template.panelCommand} ${values.dependentVariable} ${values.coreIndependentVariable} ${controls}, fe`.trim(),
        `* 固定效应设定：${fixedEffects}`,
      ].join("\n");
    case "did":
      return [
        `* ${template.headerComment}`,
        "* 双重差分估计",
        `${template.didCommand} ${values.dependentVariable} ${values.treatmentVariable} ${values.coreIndependentVariable} ${controls}, robust`.trim(),
        "* DID 提示：请在估计前确认处理时点和平行趋势假设。",
      ].join("\n");
    case "iv":
      return [
        `* ${template.headerComment}`,
        "* 工具变量估计",
        `${template.ivCommand} ${values.dependentVariable} (${values.coreIndependentVariable} = ${values.instrumentVariable}) ${controls}, robust`.trim(),
      ].join("\n");
    case "baseline":
    default:
      return [
        `* ${template.headerComment}`,
        "* 基准回归",
        `${template.regressionCommand} ${values.dependentVariable} ${values.coreIndependentVariable} ${controls}, robust`.trim(),
        `* 固定效应设定：${fixedEffects}`,
      ].join("\n");
  }
}
