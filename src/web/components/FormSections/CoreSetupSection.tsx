import { dataStructureLabels } from "../../../shared/i18n/labels";
import { researchMethods } from "../../../shared/config/research-types";
import { FormValues } from "../../../shared/types";

interface CoreSetupSectionProps {
  values: FormValues;
  onFieldChange: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
}

export function CoreSetupSection({ values, onFieldChange }: CoreSetupSectionProps) {
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
        <label>当前模板 ID</label>
        <input value={values.selectedTemplateId} onChange={(event) => onFieldChange("selectedTemplateId", event.target.value)} />
      </div>
    </div>
  );
}
