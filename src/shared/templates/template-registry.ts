import { TemplateDefinition } from "../types";

export const builtinTemplates: TemplateDefinition[] = [
  {
    id: "stata18-modern",
    label: "Stata 18 现代模板",
    stataVersion: "18",
    source: "builtin",
    description: "更紧凑的命令风格和较新的注释头。",
    headerComment: "适用于 Stata 18",
    regressionCommand: "reg",
    panelCommand: "xtreg",
    didCommand: "reg",
    ivCommand: "ivregress 2sls",
  },
  {
    id: "stata17-classic",
    label: "Stata 17 经典模板",
    stataVersion: "17",
    source: "builtin",
    description: "更保守的命令写法与经典注释风格。",
    headerComment: "适用于 Stata 17",
    regressionCommand: "regress",
    panelCommand: "xtreg",
    didCommand: "regress",
    ivCommand: "ivregress 2sls",
  },
];
