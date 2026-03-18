import { ChangeEvent } from "react";
import { getImportFieldLabel } from "../../shared/i18n/labels";
import { IniImportReport } from "../../shared/types";

interface ImportPanelProps {
  onImportContent: (content: string) => void;
  onExportIni: () => void;
  report: IniImportReport | null;
}

export function ImportPanel({ onImportContent, onExportIni, report }: ImportPanelProps) {
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
    reader.readAsText(file, "utf-8");
  }

  return (
    <div className="column-stack">
      <div className="toolbar">
        <label className="button-secondary">
          导入 ini 配置
          <input type="file" accept=".ini" hidden onChange={handleBrowserImport} />
        </label>
        <button type="button" className="button-secondary" onClick={onExportIni}>
          导出当前配置
        </button>
        {window.desktopApi ? (
          <button type="button" className="button-secondary" onClick={handleDesktopImport}>
            从桌面端打开 ini
          </button>
        ) : null}
      </div>
      {report ? (
        <div className="import-summary">
          <div className="muted">
            配置版本：{report.configVersion ?? "缺失"} · 配置名称：{report.configName ?? "未命名"}
          </div>
          <div>
            <strong>已映射字段</strong>
            <div className="tag-row">
              {report.mappedFields.length > 0 ? (
                report.mappedFields.map((field) => (
                  <span key={field} className="tag active">
                    {getImportFieldLabel(field)}
                  </span>
                ))
              ) : (
                <span className="muted">暂无已映射字段</span>
              )}
            </div>
          </div>
          {report.warnings.length > 0 ? (
            <div>
              <strong>导入提示</strong>
              <ul className="info-list">
                {report.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {report.unknownEntries.length > 0 ? (
            <div>
              <strong>未识别条目</strong>
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
