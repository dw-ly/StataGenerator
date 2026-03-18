import { dataStructureLabels, getTemplateSourceLabel } from "../../../shared/i18n/labels";
import { researchMethods } from "../../../shared/config/research-types";
import { FormValues, TemplateDefinition } from "../../../shared/types";

interface CoreSetupSectionProps {
  values: FormValues;
  templates: TemplateDefinition[];
  onFieldChange: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
}

export function CoreSetupSection({ values, templates, onFieldChange }: CoreSetupSectionProps) {
  return (
    <div className="form-grid">
      <div className="field">
        <label>研究方法</label>
        <select value={values.method} onChange={(event) => onFieldChange("method", event.target.value as FormValues["method"])}>
          {researchMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>数据结构</label>
        <select value={values.dataStructure} onChange={(event) => onFieldChange("dataStructure", event.target.value as FormValues["dataStructure"])}>
          <option value="cross_section">{dataStructureLabels.cross_section}</option>
          <option value="panel">{dataStructureLabels.panel}</option>
          <option value="time_series">{dataStructureLabels.time_series}</option>
        </select>
      </div>
      <div className="field full-span">
        <label>当前脚本模板</label>
        <select value={values.selectedTemplateId} onChange={(event) => onFieldChange("selectedTemplateId", event.target.value)}>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.label}（Stata {template.stataVersion} / {getTemplateSourceLabel(template.source)}）
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
