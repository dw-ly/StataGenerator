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

  function saveExplanation() {
    if (explanation.length === 0) {
      return;
    }

    downloadTextFile(buildOutputFileName("stata-script-notes", "txt"), explanation.join("\n"));
  }

  return (
    <div className="toolbar">
      <button type="button" className="button-primary" onClick={copyScript}>
        Copy script
      </button>
      <button type="button" className="button-secondary" onClick={saveScript}>
        Download .do
      </button>
      <button type="button" className="button-secondary" onClick={saveExplanation}>
        Download notes
      </button>
    </div>
  );
}
