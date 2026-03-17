import { ResultSchema } from "../../shared/output/result-schema";

interface ResultPanelProps {
  result: ResultSchema;
}

export function ResultPanel({ result }: ResultPanelProps) {
  return (
    <div className="column-stack">
      {result.missing.length > 0 ? (
        <div>
          <h3>Missing fields</h3>
          <ul className="alert-list">
            {result.missing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {result.warnings.length > 0 ? (
        <div>
          <h3>Warnings</h3>
          <ul className="info-list">
            {result.warnings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div>
        <h3>Notes</h3>
        <ul className="info-list">
          {result.explanation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="result-box">
        <pre>{result.script || "Generate a script to see output here."}</pre>
      </div>
    </div>
  );
}
