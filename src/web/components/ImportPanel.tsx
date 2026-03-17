import { ChangeEvent } from "react";
import { IniImportReport } from "../../shared/types";

interface ImportPanelProps {
  onImportContent: (content: string) => void;
  report: IniImportReport | null;
}

export function ImportPanel({ onImportContent, report }: ImportPanelProps) {
  async function handleDesktopImport() {
    if (!window.desktopApi) {
      return;
    }

    const response = await window.desktopApi.openIniFile();
    if (response.content) {
      onImportContent(response.content);
    }
  }

  function handleBrowserImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onImportContent(reader.result);
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="column-stack">
      <div className="toolbar">
        <label className="button-secondary">
          Import ini
          <input type="file" accept=".ini" hidden onChange={handleBrowserImport} />
        </label>
        {window.desktopApi ? (
          <button type="button" className="button-secondary" onClick={handleDesktopImport}>
            Open ini from desktop
          </button>
        ) : null}
      </div>
      {report ? (
        <div className="import-summary">
          <div className="muted">
            Config version: {report.configVersion ?? "missing"} · Config name: {report.configName ?? "unnamed"}
          </div>
          <div>
            <strong>Mapped fields</strong>
            <div className="tag-row">
              {report.mappedFields.length > 0 ? (
                report.mappedFields.map((field) => (
                  <span key={field} className="tag active">
                    {field}
                  </span>
                ))
              ) : (
                <span className="muted">No mapped fields</span>
              )}
            </div>
          </div>
          {report.warnings.length > 0 ? (
            <div>
              <strong>Import warnings</strong>
              <ul className="info-list">
                {report.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {report.unknownEntries.length > 0 ? (
            <div>
              <strong>Unknown entries</strong>
              <ul className="info-list">
                {report.unknownEntries.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
