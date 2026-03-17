import { app, ipcMain } from "electron";
import fs from "node:fs/promises";
import path from "node:path";

const templateStorePath = path.join(app.getPath("userData"), "user-templates.json");

export function registerTemplateStoreIpc() {
  ipcMain.handle("template-store:load", async () => {
    try {
      return await fs.readFile(templateStorePath, "utf8");
    } catch {
      return null;
    }
  });

  ipcMain.handle("template-store:save", async (_event, value: string) => {
    await fs.writeFile(templateStorePath, value, "utf8");
  });
}
