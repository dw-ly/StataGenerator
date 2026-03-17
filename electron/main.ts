import { app, BrowserWindow } from "electron";
import path from "node:path";
import { registerRecentConfigIpc } from "./ipc/recent-config";
import { registerSaveFileIpc } from "./ipc/save-file";
import { registerTemplateStoreIpc } from "./ipc/template-store";

function createWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 980,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const indexPath = path.join(__dirname, "..", "dist", "index.html");
  void window.loadFile(indexPath);
}

app.whenReady().then(() => {
  registerSaveFileIpc();
  registerRecentConfigIpc();
  registerTemplateStoreIpc();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
