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
      missing.push("面板回归需要填写面板 ID 变量。");
    }
    if (isBlank(values.timeVariable)) {
      missing.push("面板回归需要填写时间变量。");
    }
  }

  if (values.method === "did" && isBlank(values.treatmentVariable)) {
    missing.push("双重差分需要填写处理变量。");
  }

  if (values.method === "iv" && isBlank(values.instrumentVariable)) {
    missing.push("工具变量回归需要填写工具变量。");
  }

  if (values.clusterVariable.trim().length > 0 && !values.fixedEffects.includes("clustered")) {
    warnings.push("已填写聚类变量，但尚未勾选“聚类标准误”。");
  }

  return {
    missing,
    warnings,
    canGenerate: missing.length === 0,
  };
}
