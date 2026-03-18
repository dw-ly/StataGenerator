import { FormValues } from "../types";

export interface FieldDescriptor {
  key: keyof FormValues;
  label: string;
  group: string;
  advanced?: boolean;
}

export const fieldSchema: FieldDescriptor[] = [
  { key: "method", label: "研究方法", group: "core" },
  { key: "dataStructure", label: "数据结构", group: "core" },
  { key: "dependentVariable", label: "因变量", group: "variables" },
  { key: "coreIndependentVariable", label: "核心自变量", group: "variables" },
  { key: "panelId", label: "个体/面板 ID 变量", group: "variables" },
  { key: "timeVariable", label: "时间变量", group: "variables" },
  { key: "industryVariable", label: "行业变量", group: "variables" },
  { key: "regionVariable", label: "地区变量", group: "variables" },
  { key: "treatmentVariable", label: "处理变量", group: "advanced", advanced: true },
  { key: "instrumentVariable", label: "工具变量", group: "advanced", advanced: true },
  { key: "clusterVariable", label: "聚类变量", group: "advanced", advanced: true },
  { key: "notes", label: "研究备注", group: "advanced", advanced: true },
  { key: "robustnessNotes", label: "稳健性备注", group: "advanced", advanced: true },
  { key: "heterogeneityNotes", label: "异质性备注", group: "advanced", advanced: true },
  { key: "selectedTemplateId", label: "Stata 模板", group: "templates", advanced: true },
];
