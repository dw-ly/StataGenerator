import { FormValues } from "../types";

export function shouldShowPanelFields(values: FormValues) {
  return values.method === "panel" || values.dataStructure === "panel";
}

export function shouldShowDidFields(values: FormValues) {
  return values.method === "did";
}

export function shouldShowIvFields(values: FormValues) {
  return values.method === "iv";
}
