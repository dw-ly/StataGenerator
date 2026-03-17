import { FormValues } from "../../shared/types";

interface AdvancedSectionProps {
  values: FormValues;
  onFieldChange: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
}

export function AdvancedSection({ values, onFieldChange }: AdvancedSectionProps) {
  return (
    <div className="form-grid">
      <div className="field full-span">
        <label>Research notes</label>
        <textarea rows={3} value={values.notes} onChange={(event) => onFieldChange("notes", event.target.value)} />
      </div>
      <div className="field full-span">
        <label>Robustness notes</label>
        <textarea rows={3} value={values.robustnessNotes} onChange={(event) => onFieldChange("robustnessNotes", event.target.value)} />
      </div>
      <div className="field full-span">
        <label>Heterogeneity notes</label>
        <textarea rows={3} value={values.heterogeneityNotes} onChange={(event) => onFieldChange("heterogeneityNotes", event.target.value)} />
      </div>
    </div>
  );
}
