import { TemplateDefinition } from "../types";
import { builtinTemplates } from "./template-registry";

export function mergeTemplates(userTemplates: TemplateDefinition[]) {
  return [...builtinTemplates, ...userTemplates];
}

export function canDeleteTemplate(template: TemplateDefinition) {
  return template.source === "user";
}

export function createUserTemplate(baseTemplate: TemplateDefinition, name: string): TemplateDefinition {
  return {
    ...baseTemplate,
    id: `user-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    label: name,
    source: "user",
    description: `Custom template based on ${baseTemplate.label}`,
  };
}
