import { FormValues } from "../../../shared/types";

interface OutputSectionProps {
  values: FormValues;
  onFieldChange: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
}

const fixedEffectOptions = ["entity", "year", "industry", "region", "clustered"];
const outputOptions = ["summary_table", "correlation_table", "regression_table", "figure"];

function toggleItem(list: string[], item: string) {
  return list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item];
}

export function OutputSection({ values, onFieldChange }: OutputSectionProps) {
  return (
    <div className="form-grid">
      <div className="field full-span">
        <label>Fixed effects</label>
        <div className="tag-row">
          {fixedEffectOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`tag ${values.fixedEffects.includes(option) ? "active" : ""}`}
              onClick={() => onFieldChange("fixedEffects", toggleItem(values.fixedEffects, option))}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="field full-span">
        <label>Output targets</label>
        <div className="tag-row">
          {outputOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`tag ${values.outputTargets.includes(option) ? "active" : ""}`}
              onClick={() => onFieldChange("outputTargets", toggleItem(values.outputTargets, option))}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
