const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const rootDir = path.resolve(__dirname, "..");
const releaseDir = path.join(rootDir, "release");
const targets = [
  path.join(releaseDir, "win-unpacked"),
  path.join(releaseDir, "builder-debug.yml"),
  path.join(releaseDir, "builder-effective-config.yaml"),
];
const retryableErrorCodes = new Set(["EBUSY", "EPERM", "ENOTEMPTY"]);

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function tryKillRunningApp() {
  try {
    execSync('taskkill /IM "Stata Script Generator.exe" /F /T', { stdio: "ignore" });
    console.log("已关闭正在运行的桌面程序进程。");
  } catch {
    console.log("未发现正在运行的桌面程序进程。");
  }
}

function removePath(targetPath, options = {}) {
  const { retries = 6, delayMs = 400 } = options;

  if (!fs.existsSync(targetPath)) {
    return true;
  }

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      fs.rmSync(targetPath, { recursive: true, force: true, maxRetries: 0 });
      console.log(`已清理: ${path.relative(rootDir, targetPath)}`);
      return true;
    } catch (error) {
      if (!retryableErrorCodes.has(error.code) || attempt === retries) {
        console.warn(`跳过清理: ${path.relative(rootDir, targetPath)} (${error.code ?? "UNKNOWN"})`);
        return false;
      }

      sleep(delayMs * attempt);
    }
  }

  return false;
}

function removeReleaseArtifacts() {
  if (!fs.existsSync(releaseDir)) {
    return;
  }

  for (const entry of fs.readdirSync(releaseDir, { withFileTypes: true })) {
    if (!entry.isFile()) {
      continue;
    }

    if (entry.name.endsWith(".exe") || entry.name.endsWith(".blockmap") || entry.name === "latest.yml") {
      removePath(path.join(releaseDir, entry.name));
    }
  }
}

tryKillRunningApp();
for (const target of targets) {
  removePath(target);
}
removeReleaseArtifacts();
console.log("桌面打包清理完成。");
