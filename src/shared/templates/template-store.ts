import { TemplateDefinition } from "../types";
import { builtinTemplates } from "./template-registry";

function buildTemplateSlug(name: string) {
  const normalized = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (normalized) {
    return normalized;
  }

  const encoded = Array.from(name.trim())
    .map((character) => character.codePointAt(0)?.toString(16) ?? "")
    .filter(Boolean)
    .join("-");

  return encoded || "template";
}

function buildUniqueTemplateId(name: string) {
  const slug = buildTemplateSlug(name);
  const timestamp = Date.now().toString(36);
  const randomSuffix = Math.random().toString(36).slice(2, 8);
  return `user-${slug}-${timestamp}-${randomSuffix}`;
}

export function mergeTemplates(userTemplates: TemplateDefinition[]) {
  return [...builtinTemplates, ...userTemplates];
}

export function canDeleteTemplate(template: TemplateDefinition) {
  return template.source === "user";
}

export function createUserTemplate(baseTemplate: TemplateDefinition, name: string): TemplateDefinition {
  return {
    ...baseTemplate,
    id: buildUniqueTemplateId(name),
    label: name,
    source: "user",
    description: `基于 ${baseTemplate.label} 保存的自定义模板。`,
  };
}
