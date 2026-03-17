import { FormValues } from "../../../shared/types";

interface VariablesSectionProps {
  values: FormValues;
  onFieldChange: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
}

export function VariablesSection({ values, onFieldChange }: VariablesSectionProps) {
  return (
    <div className="form-grid">
      <div className="field">
        <label>Dependent variable</label>
        <input value={values.dependentVariable} onChange={(event) => onFieldChange("dependentVariable", event.target.value)} />
      </div>
      <div className="field">
        <label>Core independent variable</label>
        <input value={values.coreIndependentVariable} onChange={(event) => onFieldChange("coreIndependentVariable", event.target.value)} />
      </div>
      <div className="field full-span">
        <label>Control variables (comma separated)</label>
        <input
          value={values.controlVariables.join(", ")}
          onChange={(event) => onFieldChange("controlVariables", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))}
        />
      </div>
      <div className="field">
        <label>Panel id</label>
        <input value={values.panelId} onChange={(event) => onFieldChange("panelId", event.target.value)} />
      </div>
      <div className="field">
        <label>Time variable</label>
        <input value={values.timeVariable} onChange={(event) => onFieldChange("timeVariable", event.target.value)} />
      </div>
      <div className="field">
        <label>Treatment variable</label>
        <input value={values.treatmentVariable} onChange={(event) => onFieldChange("treatmentVariable", event.target.value)} />
      </div>
      <div className="field">
        <label>Instrument variable</label>
        <input value={values.instrumentVariable} onChange={(event) => onFieldChange("instrumentVariable", event.target.value)} />
      </div>
      <div className="field full-span">
        <label>Cluster variable</label>
        <input value={values.clusterVariable} onChange={(event) => onFieldChange("clusterVariable", event.target.value)} />
      </div>
    </div>
  );
}
