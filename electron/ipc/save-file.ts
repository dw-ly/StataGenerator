import { dialog, ipcMain } from "electron";
import fs from "node:fs/promises";

export function registerSaveFileIpc() {
  ipcMain.handle("ini:open", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "INI 配置", extensions: ["ini"] }],
    });

    if (result.canceled || result.filePaths.length === 0) {
      return { content: null, path: null };
    }

    const targetPath = result.filePaths[0];
    const content = await fs.readFile(targetPath, "utf8");
    return { content, path: targetPath };
  });

  ipcMain.handle("file:save-text", async (_event, payload: { defaultFileName: string; content: string }) => {
    const result = await dialog.showSaveDialog({
      defaultPath: payload.defaultFileName,
      filters: [{ name: "Stata 脚本与说明", extensions: ["do", "txt", "ini"] }],
    });

    if (result.canceled || !result.filePath) {
      return false;
    }

    await fs.writeFile(result.filePath, payload.content, "utf8");
    return true;
  });
}
