import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("desktopApi", {
  openIniFile: () => ipcRenderer.invoke("ini:open"),
  saveTextFile: (payload: { defaultFileName: string; content: string }) => ipcRenderer.invoke("file:save-text", payload),
  loadRecentConfig: () => ipcRenderer.invoke("recent-config:load"),
  saveRecentConfig: (value: string) => ipcRenderer.invoke("recent-config:save", value),
  loadUserTemplates: () => ipcRenderer.invoke("template-store:load"),
  saveUserTemplates: (value: string) => ipcRenderer.invoke("template-store:save", value),
});
