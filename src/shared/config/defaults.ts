import { FormValues } from "../types";

export const defaultFormValues: FormValues = {
  method: "baseline",
  dataStructure: "cross_section",
  dependentVariable: "y",
  coreIndependentVariable: "x",
  controlVariables: ["size", "lev"],
  panelId: "firm_id",
  timeVariable: "year",
  industryVariable: "industry_code",
  regionVariable: "region_code",
  treatmentVariable: "treat",
  instrumentVariable: "iv_var",
  clusterVariable: "firm_id",
  fixedEffects: ["year"],
  outputTargets: ["summary_table", "regression_table"],
  notes: "",
  robustnessNotes: "",
  heterogeneityNotes: "",
  selectedTemplateId: "stata18-modern",
};
