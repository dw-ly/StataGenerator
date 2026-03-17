import { TemplateDefinition } from "../types";

export const builtinTemplates: TemplateDefinition[] = [
  {
    id: "stata18-modern",
    label: "Stata 18 Modern",
    stataVersion: "18",
    source: "builtin",
    description: "Modern header and compact estimation commands.",
    headerComment: "Generated for Stata 18",
    regressionCommand: "reg",
    panelCommand: "xtreg",
    didCommand: "reg",
    ivCommand: "ivregress 2sls",
  },
  {
    id: "stata17-classic",
    label: "Stata 17 Classic",
    stataVersion: "17",
    source: "builtin",
    description: "Classic comments and conservative defaults.",
    headerComment: "Generated for Stata 17",
    regressionCommand: "regress",
    panelCommand: "xtreg",
    didCommand: "regress",
    ivCommand: "ivregress 2sls",
  },
];
