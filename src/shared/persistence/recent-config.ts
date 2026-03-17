export const RECENT_CONFIG_KEY = "stata-generator-recent-config";
export const USER_TEMPLATE_KEY = "stata-generator-user-templates";

export function serializeRecentConfig<T>(value: T) {
  return JSON.stringify(value, null, 2);
}

export function deserializeRecentConfig<T>(value: string | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
