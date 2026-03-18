import { methodLabels } from "../i18n/labels";
import { ResearchMethodOption } from "../types";

export const researchMethods: ResearchMethodOption[] = [
  {
    id: "descriptive",
    label: methodLabels.descriptive,
    description: "生成描述统计与相关性分析的脚本骨架。",
  },
  {
    id: "baseline",
    label: methodLabels.baseline,
    description: "生成常规基准回归脚本，并保留常用控制变量位。",
  },
  {
    id: "panel",
    label: methodLabels.panel,
    description: "生成面板设定、个体/时间效应相关脚本骨架。",
  },
  {
    id: "did",
    label: methodLabels.did,
    description: "生成政策评估常用的处理组与时点差分脚本。",
  },
  {
    id: "iv",
    label: methodLabels.iv,
    description: "生成包含工具变量设定的两阶段回归脚本。",
  },
];
