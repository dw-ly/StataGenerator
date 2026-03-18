import { ResultSchema } from "../../shared/output/result-schema";

interface ResultPanelProps {
  result: ResultSchema;
}

export function ResultPanel({ result }: ResultPanelProps) {
  return (
    <div className="column-stack">
      {result.missing.length > 0 ? (
        <div>
          <h3>缺失字段</h3>
          <ul className="alert-list">
            {result.missing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {result.warnings.length > 0 ? (
        <div>
          <h3>提示</h3>
          <ul className="info-list">
            {result.warnings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div>
        <h3>说明</h3>
        <ul className="info-list">
          {result.explanation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="result-box">
        <pre>{result.script || "点击“生成脚本”后，这里会显示当前结果。"}</pre>
      </div>
    </div>
  );
}
