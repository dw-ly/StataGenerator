import { buildOutputFileName } from "../../shared/output/file-naming";
import { downloadTextFile } from "../utils/download";

interface ExportActionsProps {
  script: string;
  explanation: string[];
}

export function ExportActions({ script, explanation }: ExportActionsProps) {
  async function copyScript() {
    if (!script) {
      return;
    }

    await navigator.clipboard.writeText(script);
  }

  async function saveScript() {
    if (!script) {
      return;
    }

    const defaultFileName = buildOutputFileName("stata-script", "do");
    if (window.desktopApi) {
      await window.desktopApi.saveTextFile({ defaultFileName, content: script });
      return;
    }

    downloadTextFile(defaultFileName, script);
  }

  async function saveExplanation() {
    if (explanation.length === 0) {
      return;
    }

    const content = explanation.join("\n");
    const defaultFileName = buildOutputFileName("stata-script-notes", "txt");
    if (window.desktopApi) {
      await window.desktopApi.saveTextFile({ defaultFileName, content });
      return;
    }

    downloadTextFile(defaultFileName, content);
  }

  return (
    <div className="toolbar">
      <button type="button" className="button-primary" onClick={copyScript}>
        复制脚本
      </button>
      <button type="button" className="button-secondary" onClick={saveScript}>
        导出 .do 文件
      </button>
      <button type="button" className="button-secondary" onClick={saveExplanation}>
        导出说明
      </button>
    </div>
  );
}
