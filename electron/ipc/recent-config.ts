import { app, ipcMain } from "electron";
import fs from "node:fs/promises";
import path from "node:path";

const recentConfigPath = path.join(app.getPath("userData"), "recent-config.json");

export function registerRecentConfigIpc() {
  ipcMain.handle("recent-config:load", async () => {
    try {
      return await fs.readFile(recentConfigPath, "utf8");
    } catch {
      return null;
    }
  });

  ipcMain.handle("recent-config:save", async (_event, value: string) => {
    await fs.writeFile(recentConfigPath, value, "utf8");
  });
}
