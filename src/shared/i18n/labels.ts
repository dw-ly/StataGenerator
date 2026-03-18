import { DataStructure, HostEnvironment, ResearchMethod, TemplateSource } from "../types";

export const methodLabels: Record<ResearchMethod, string> = {
  descriptive: "描述统计",
  baseline: "基准回归",
  panel: "面板回归",
  did: "双重差分",
  iv: "工具变量",
};

export const dataStructureLabels: Record<DataStructure, string> = {
  cross_section: "截面数据",
  panel: "面板数据",
  time_series: "时间序列",
};

export const fixedEffectLabels: Record<string, string> = {
  entity: "个体固定效应",
  year: "年份固定效应",
  industry: "行业固定效应",
  region: "地区固定效应",
  clustered: "聚类标准误",
};

export const outputTargetLabels: Record<string, string> = {
  summary_table: "描述统计表",
  correlation_table: "相关系数表",
  regression_table: "回归结果表",
  figure: "图形",
};

export const templateSourceLabels: Record<TemplateSource, string> = {
  builtin: "内置模板",
  user: "用户模板",
};

export const hostLabels: Record<HostEnvironment, string> = {
  web: "Web 网页版",
  desktop: "Windows EXE 桌面版",
};

export const iniFieldLabels: Record<string, string> = {
  config_version: "配置版本",
  config_name: "配置名称",
  method: "研究方法",
  data_structure: "数据结构",
  dependent_variable: "因变量",
  core_independent_variable: "核心自变量",
  control_variables: "控制变量",
  panel_id: "面板 ID 变量",
  time_variable: "时间变量",
  treatment_variable: "处理变量",
  instrument_variable: "工具变量",
  cluster_variable: "聚类变量",
  fixed_effects: "固定效应",
  output_targets: "输出内容",
  notes: "研究备注",
  robustness_notes: "稳健性备注",
  heterogeneity_notes: "异质性备注",
  selected_template_id: "模板 ID",
};

export function getMethodLabel(method: ResearchMethod) {
  return methodLabels[method];
}

export function getDataStructureLabel(dataStructure: DataStructure) {
  return dataStructureLabels[dataStructure];
}

export function getFixedEffectLabel(value: string) {
  return fixedEffectLabels[value] ?? value;
}

export function getOutputTargetLabel(value: string) {
  return outputTargetLabels[value] ?? value;
}

export function getTemplateSourceLabel(source: TemplateSource) {
  return templateSourceLabels[source];
}

export function getHostLabel(host: HostEnvironment) {
  return hostLabels[host];
}

export function getImportFieldLabel(field: string) {
  return iniFieldLabels[field] ?? field;
}

export function getLabelList(values: string[], labels: Record<string, string>, emptyLabel = "未选择") {
  if (values.length === 0) {
    return emptyLabel;
  }

  return values.map((value) => labels[value] ?? value).join("、");
}
