import { USER_TEMPLATE_KEY, RECENT_CONFIG_KEY } from "../../shared/persistence/recent-config";

export async function loadRecentConfigValue() {
  if (window.desktopApi) {
    return window.desktopApi.loadRecentConfig();
  }

  return localStorage.getItem(RECENT_CONFIG_KEY);
}

export async function saveRecentConfigValue(value: string) {
  if (window.desktopApi) {
    await window.desktopApi.saveRecentConfig(value);
    return;
  }

  localStorage.setItem(RECENT_CONFIG_KEY, value);
}

export async function loadUserTemplatesValue() {
  if (window.desktopApi) {
    return window.desktopApi.loadUserTemplates();
  }

  return localStorage.getItem(USER_TEMPLATE_KEY);
}

export async function saveUserTemplatesValue(value: string) {
  if (window.desktopApi) {
    await window.desktopApi.saveUserTemplates(value);
    return;
  }

  localStorage.setItem(USER_TEMPLATE_KEY, value);
}
