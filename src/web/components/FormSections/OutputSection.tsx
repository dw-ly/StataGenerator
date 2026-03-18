import { getFixedEffectLabel, getOutputTargetLabel } from "../../../shared/i18n/labels";
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
        <label>固定效应与标准误</label>
        <div className="tag-row">
          {fixedEffectOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`tag ${values.fixedEffects.includes(option) ? "active" : ""}`}
              onClick={() => onFieldChange("fixedEffects", toggleItem(values.fixedEffects, option))}
            >
              {getFixedEffectLabel(option)}
            </button>
          ))}
        </div>
      </div>
      <div className="field full-span">
        <label>输出内容</label>
        <div className="tag-row">
          {outputOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`tag ${values.outputTargets.includes(option) ? "active" : ""}`}
              onClick={() => onFieldChange("outputTargets", toggleItem(values.outputTargets, option))}
            >
              {getOutputTargetLabel(option)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
