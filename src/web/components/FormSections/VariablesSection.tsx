import { FormValues } from "../../../shared/types";

interface VariablesSectionProps {
  values: FormValues;
  onFieldChange: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
}

export function VariablesSection({ values, onFieldChange }: VariablesSectionProps) {
  return (
    <div className="form-grid">
      <div className="field">
        <label>因变量</label>
        <input value={values.dependentVariable} onChange={(event) => onFieldChange("dependentVariable", event.target.value)} />
      </div>
      <div className="field">
        <label>核心自变量</label>
        <input value={values.coreIndependentVariable} onChange={(event) => onFieldChange("coreIndependentVariable", event.target.value)} />
      </div>
      <div className="field full-span">
        <label>控制变量（逗号分隔）</label>
        <input
          value={values.controlVariables.join(", ")}
          onChange={(event) => onFieldChange("controlVariables", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))}
        />
      </div>
      <div className="field">
        <label>面板 ID 变量</label>
        <input value={values.panelId} onChange={(event) => onFieldChange("panelId", event.target.value)} />
      </div>
      <div className="field">
        <label>时间变量</label>
        <input value={values.timeVariable} onChange={(event) => onFieldChange("timeVariable", event.target.value)} />
      </div>
      <div className="field">
        <label>处理变量</label>
        <input value={values.treatmentVariable} onChange={(event) => onFieldChange("treatmentVariable", event.target.value)} />
      </div>
      <div className="field">
        <label>工具变量</label>
        <input value={values.instrumentVariable} onChange={(event) => onFieldChange("instrumentVariable", event.target.value)} />
      </div>
      <div className="field full-span">
        <label>聚类变量</label>
        <input value={values.clusterVariable} onChange={(event) => onFieldChange("clusterVariable", event.target.value)} />
      </div>
    </div>
  );
}
