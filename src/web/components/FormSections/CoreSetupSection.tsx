import { FormValues } from "../../../shared/types";
import { researchMethods } from "../../../shared/config/research-types";

interface CoreSetupSectionProps {
  values: FormValues;
  onFieldChange: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
}

export function CoreSetupSection({ values, onFieldChange }: CoreSetupSectionProps) {
  return (
    <div className="form-grid">
      <div className="field">
        <label>Research method</label>
        <select value={values.method} onChange={(event) => onFieldChange("method", event.target.value as FormValues["method"])}>
          {researchMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>Data structure</label>
        <select value={values.dataStructure} onChange={(event) => onFieldChange("dataStructure", event.target.value as FormValues["dataStructure"])}>
          <option value="cross_section">Cross section</option>
          <option value="panel">Panel</option>
          <option value="time_series">Time series</option>
        </select>
      </div>
      <div className="field full-span">
        <label>Stata template</label>
        <input value={values.selectedTemplateId} onChange={(event) => onFieldChange("selectedTemplateId", event.target.value)} />
      </div>
    </div>
  );
}
