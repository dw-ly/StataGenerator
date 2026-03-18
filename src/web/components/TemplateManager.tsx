import { getTemplateSourceLabel } from "../../shared/i18n/labels";
import { TemplateDefinition } from "../../shared/types";

interface TemplateManagerProps {
  templates: TemplateDefinition[];
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  onSaveTemplate: (name: string) => void;
  onDeleteTemplate: (templateId: string) => void;
}

export function TemplateManager({
  templates,
  selectedTemplateId,
  onSelectTemplate,
  onSaveTemplate,
  onDeleteTemplate,
}: TemplateManagerProps) {
  return (
    <div className="column-stack">
      <div className="toolbar">
        <button
          type="button"
          className="button-secondary"
          onClick={() => {
            const name = window.prompt("请输入自定义模板名称");
            if (name?.trim()) {
              onSaveTemplate(name.trim());
            }
          }}
        >
          保存为自定义模板
        </button>
      </div>
      {templates.map((template) => {
        const isSelected = template.id === selectedTemplateId;
        return (
          <div key={template.id} className="template-row">
            <div>
              <strong>{template.label}</strong>
              <div className="muted">
                Stata {template.stataVersion} · {getTemplateSourceLabel(template.source)}
              </div>
              <div className="muted">{template.description}</div>
            </div>
            <div className="toolbar">
              <button
                type="button"
                className={isSelected ? "button-primary" : "button-secondary"}
                onClick={() => onSelectTemplate(template.id)}
              >
                {isSelected ? "当前使用中" : "使用此模板"}
              </button>
              {template.source === "user" ? (
                <button type="button" className="button-danger" onClick={() => onDeleteTemplate(template.id)}>
                  删除
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
