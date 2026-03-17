import { ResearchMethodOption } from "../types";

export const researchMethods: ResearchMethodOption[] = [
  {
    id: "descriptive",
    label: "Descriptive Statistics",
    description: "Summary statistics and correlations for paper-ready tables.",
  },
  {
    id: "baseline",
    label: "Baseline Regression",
    description: "Cross-sectional or pooled regression with standard controls.",
  },
  {
    id: "panel",
    label: "Panel Regression",
    description: "Panel setup with entity and time effects.",
  },
  {
    id: "did",
    label: "Difference in Differences",
    description: "Treatment and post-period specification for policy evaluation.",
  },
  {
    id: "iv",
    label: "Instrumental Variables",
    description: "Two-stage estimation with an explicit instrument.",
  },
];
