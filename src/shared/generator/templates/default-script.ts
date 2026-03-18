import { fixedEffectLabels, getLabelList } from "../../i18n/labels";
import { FormValues, TemplateDefinition } from "../../types";

function buildRegressorItems(values: FormValues, includeTreatment = false, includeCoreIndependentVariable = true, includeEntityFixedEffect = true) {
  const regressors: string[] = [];

  if (includeTreatment && values.treatmentVariable.trim()) {
    regressors.push(values.treatmentVariable.trim());
  }

  if (includeCoreIndependentVariable && values.coreIndependentVariable.trim()) {
    regressors.push(values.coreIndependentVariable.trim());
  }

  if (values.controlVariables.length > 0) {
    regressors.push(...values.controlVariables.filter(Boolean));
  }

  if (values.fixedEffects.includes("entity") && includeEntityFixedEffect) {
    regressors.push(`i.${values.panelId.trim() || "entity_id"}`);
  }

  if (values.fixedEffects.includes("year")) {
    regressors.push(`i.${values.timeVariable.trim() || "year"}`);
  }

  if (values.fixedEffects.includes("industry")) {
    regressors.push(`i.${values.industryVariable.trim() || "industry_var"}`);
  }

  if (values.fixedEffects.includes("region")) {
    regressors.push(`i.${values.regionVariable.trim() || "region_var"}`);
  }

  return regressors;
}

function buildRegressors(values: FormValues, includeTreatment = false, includeCoreIndependentVariable = true, includeEntityFixedEffect = true) {
  return buildRegressorItems(values, includeTreatment, includeCoreIndependentVariable, includeEntityFixedEffect).join(" ").trim();
}

function buildVceOption(values: FormValues) {
  if (values.fixedEffects.includes("clustered") && values.clusterVariable.trim()) {
    return `vce(cluster ${values.clusterVariable.trim()})`;
  }

  return "vce(robust)";
}

export function buildScript(values: FormValues, template: TemplateDefinition) {
  const fixedEffects = getLabelList(values.fixedEffects, fixedEffectLabels, "未设置");
  const vceOption = buildVceOption(values);

  switch (values.method) {
    case "descriptive": {
      const regressors = buildRegressors(values, false, true, false);
      return [
        `* ${template.headerComment}`,
        "* 描述统计与相关性分析",
        `summarize ${values.dependentVariable} ${regressors}`.trim(),
        `pwcorr ${values.dependentVariable} ${regressors}, sig`.trim(),
      ].join("\n");
    }
    case "panel": {
      const regressors = buildRegressors(values, false, true, false);
      const panelOptions = values.fixedEffects.includes("clustered") && values.clusterVariable.trim() ? `fe ${vceOption}` : "fe vce(robust)";
      return [
        `* ${template.headerComment}`,
        "* 面板设定",
        `xtset ${values.panelId} ${values.timeVariable}`.trim(),
        `${template.panelCommand} ${values.dependentVariable} ${regressors}, ${panelOptions}`.trim(),
        `* 固定效应设定：${fixedEffects}`,
      ].join("\n");
    }
    case "did": {
      const regressors = buildRegressors(values, true, true, true);
      return [
        `* ${template.headerComment}`,
        "* 双重差分估计",
        `${template.didCommand} ${values.dependentVariable} ${regressors}, ${vceOption}`.trim(),
        `* 固定效应设定：${fixedEffects}`,
        "* DID 提示：请在估计前确认处理时点和平行趋势假设。",
      ].join("\n");
    }
    case "iv": {
      const regressors = buildRegressors(values, false, false, true);
      const rhs = regressors ? ` ${regressors}` : "";
      return [
        `* ${template.headerComment}`,
        "* 工具变量估计",
        `${template.ivCommand} ${values.dependentVariable} (${values.coreIndependentVariable} = ${values.instrumentVariable})${rhs}, ${vceOption}`.trim(),
        `* 固定效应设定：${fixedEffects}`,
      ].join("\n");
    }
    case "baseline":
    default: {
      const regressors = buildRegressors(values, false, true, true);
      return [
        `* ${template.headerComment}`,
        "* 基准回归",
        `${template.regressionCommand} ${values.dependentVariable} ${regressors}, ${vceOption}`.trim(),
        `* 固定效应设定：${fixedEffects}`,
      ].join("\n");
    }
  }
}
