import { FormValues, ValidationResult } from "../types";

function isBlank(value: string) {
  return value.trim().length === 0;
}

export function validateForm(values: FormValues): ValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (isBlank(values.dependentVariable)) {
    missing.push("请填写因变量。");
  }

  if (values.method !== "descriptive" && isBlank(values.coreIndependentVariable)) {
    missing.push("当前研究方法需要填写核心自变量。");
  }

  if (values.method === "panel") {
    if (isBlank(values.panelId)) {
      missing.push("面板回归需要填写个体/面板 ID 变量。");
    }
    if (isBlank(values.timeVariable)) {
      missing.push("面板回归需要填写时间变量。");
    }
  }

  if (values.fixedEffects.includes("entity") && isBlank(values.panelId)) {
    missing.push("勾选个体固定效应时，需要填写个体/面板 ID 变量。");
  }

  if (values.fixedEffects.includes("year") && isBlank(values.timeVariable)) {
    missing.push("勾选年份固定效应时，需要填写时间变量。");
  }

  if (values.fixedEffects.includes("industry") && isBlank(values.industryVariable)) {
    missing.push("勾选行业固定效应时，需要填写行业变量。");
  }

  if (values.fixedEffects.includes("region") && isBlank(values.regionVariable)) {
    missing.push("勾选地区固定效应时，需要填写地区变量。");
  }

  if (values.method === "did" && isBlank(values.treatmentVariable)) {
    missing.push("双重差分需要填写处理变量。");
  }

  if (values.method === "iv" && isBlank(values.instrumentVariable)) {
    missing.push("工具变量回归需要填写工具变量。");
  }

  if (values.fixedEffects.includes("clustered") && isBlank(values.clusterVariable)) {
    missing.push("勾选聚类标准误时，需要填写聚类变量。");
  }

  if (values.clusterVariable.trim().length > 0 && !values.fixedEffects.includes("clustered")) {
    warnings.push("已填写聚类变量，但尚未勾选“聚类标准误”。");
  }

  if (values.dataStructure === "cross_section" && values.fixedEffects.includes("entity")) {
    warnings.push("当前为截面数据，但你选择了个体固定效应；请确认该设定在方法上是否合理。");
  }

  return {
    missing,
    warnings,
    canGenerate: missing.length === 0,
  };
}
