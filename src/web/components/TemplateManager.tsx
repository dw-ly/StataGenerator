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
            const name = window.prompt("Enter a name for the custom template");
            if (name) {
              onSaveTemplate(name);
            }
          }}
        >
          Save custom template
        </button>
      </div>
      {templates.map((template) => {
        const isSelected = template.id === selectedTemplateId;
        return (
          <div key={template.id} className="template-row">
            <div>
              <strong>{template.label}</strong>
              <div className="muted">
                Stata {template.stataVersion} · {template.source}
              </div>
            </div>
            <div className="toolbar">
              <button
                type="button"
                className={isSelected ? "button-primary" : "button-secondary"}
                onClick={() => onSelectTemplate(template.id)}
              >
                {isSelected ? "Selected" : "Use"}
              </button>
              {template.source === "user" ? (
                <button type="button" className="button-danger" onClick={() => onDeleteTemplate(template.id)}>
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
