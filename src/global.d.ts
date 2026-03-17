interface DesktopApi {
  openIniFile: () => Promise<{ content: string | null; path: string | null }>;
  saveTextFile: (payload: { defaultFileName: string; content: string }) => Promise<boolean>;
  loadRecentConfig: () => Promise<string | null>;
  saveRecentConfig: (value: string) => Promise<void>;
  loadUserTemplates: () => Promise<string | null>;
  saveUserTemplates: (value: string) => Promise<void>;
}

declare global {
  interface Window {
    desktopApi?: DesktopApi;
  }
}

export {};
