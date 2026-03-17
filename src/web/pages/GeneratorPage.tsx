import { useEffect, useMemo, useState } from "react";
import { defaultFormValues } from "../../shared/config/defaults";
import { mapIniToFormValues } from "../../shared/import/config-mapping";
import { parseIni } from "../../shared/import/ini-parser";
import { generateStataScript } from "../../shared/generator/stata-generator";
import { ResultSchema } from "../../shared/output/result-schema";
import { deserializeRecentConfig, serializeRecentConfig } from "../../shared/persistence/recent-config";
import { builtinTemplates } from "../../shared/templates/template-registry";
import { canDeleteTemplate, createUserTemplate, mergeTemplates } from "../../shared/templates/template-store";
import { FormValues, HostEnvironment, IniImportReport, TemplateDefinition } from "../../shared/types";
import { loadRecentConfigValue, loadUserTemplatesValue, saveRecentConfigValue, saveUserTemplatesValue } from "../persistence/local-storage";
import { AdvancedSection } from "../components/AdvancedSection";
import { ExportActions } from "../components/ExportActions";
import { CoreSetupSection } from "../components/FormSections/CoreSetupSection";
import { OutputSection } from "../components/FormSections/OutputSection";
import { VariablesSection } from "../components/FormSections/VariablesSection";
import { ImportPanel } from "../components/ImportPanel";
import { ResultPanel } from "../components/ResultPanel";
import { SectionCard } from "../components/SectionCard";
import { TemplateManager } from "../components/TemplateManager";

const emptyResult: ResultSchema = {
  script: "",
  explanation: ["Select a method, review the template, and generate a script."],
  missing: [],
  warnings: [],
};

interface GeneratorPageProps {
  host: HostEnvironment;
}

export function GeneratorPage({ host }: GeneratorPageProps) {
  const [values, setValues] = useState<FormValues>(defaultFormValues);
  const [userTemplates, setUserTemplates] = useState<TemplateDefinition[]>([]);
  const [result, setResult] = useState<ResultSchema>(emptyResult);
  const [importReport, setImportReport] = useState<IniImportReport | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const templates = useMemo(() => mergeTemplates(userTemplates), [userTemplates]);
  const selectedTemplate = templates.find((template) => template.id === values.selectedTemplateId) ?? builtinTemplates[0];

  useEffect(() => {
    void (async () => {
      const recentConfig = deserializeRecentConfig<FormValues>(await loadRecentConfigValue());
      const recentTemplates = deserializeRecentConfig<TemplateDefinition[]>(await loadUserTemplatesValue());

      if (recentTemplates) {
        setUserTemplates(recentTemplates);
      }

      if (recentConfig) {
        setValues(recentConfig);
      }

      setHydrated(true);
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    void saveRecentConfigValue(serializeRecentConfig(values));
  }, [hydrated, values]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    void saveUserTemplatesValue(serializeRecentConfig(userTemplates));
  }, [hydrated, userTemplates]);

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleImportContent(content: string) {
    const imported = mapIniToFormValues(parseIni(content), {
      validTemplateIds: templates.map((template) => template.id),
    });
    setValues(imported.values);
    setImportReport(imported.report);
  }

  function handleGenerate() {
    setResult(generateStataScript(values, selectedTemplate));
  }

  function handleSaveTemplate(name: string) {
    const template = createUserTemplate(selectedTemplate, name);
    setUserTemplates((current) => [...current.filter((item) => item.id !== template.id), template]);
    updateField("selectedTemplateId", template.id);
  }

  function handleDeleteTemplate(templateId: string) {
    const template = templates.find((item) => item.id === templateId);
    if (!template || !canDeleteTemplate(template)) {
      return;
    }

    setUserTemplates((current) => current.filter((item) => item.id !== templateId));
    if (values.selectedTemplateId === templateId) {
      updateField("selectedTemplateId", builtinTemplates[0].id);
    }
  }

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Stata Paper Script Generator</h1>
        <p>
          Minimal scaffold for {host === "desktop" ? "Windows EXE" : "web"} with shared logic, ini import, version template management,
          and a dedicated advanced section.
        </p>
      </header>
      <div className="grid-layout">
        <div className="column-stack">
          <SectionCard title="Core Setup" description="Choose the estimation method, data shape, and template baseline.">
            <CoreSetupSection values={values} onFieldChange={updateField} />
          </SectionCard>
          <SectionCard title="Variable Mapping" description="Define the working variable names for the script template.">
            <VariablesSection values={values} onFieldChange={updateField} />
          </SectionCard>
          <SectionCard title="Output Choices" description="Control fixed effects, outputs, and high-level estimation options.">
            <OutputSection values={values} onFieldChange={updateField} />
          </SectionCard>
          <SectionCard title="Import ini" description="Import a versioned ini config and review the mapped fields and warnings.">
            <ImportPanel onImportContent={handleImportContent} report={importReport} />
          </SectionCard>
          <SectionCard title="Template Management" description="Use built-in templates or save and delete your own.">
            <TemplateManager
              templates={templates}
              selectedTemplateId={selectedTemplate.id}
              onSelectTemplate={(templateId) => updateField("selectedTemplateId", templateId)}
              onSaveTemplate={handleSaveTemplate}
              onDeleteTemplate={handleDeleteTemplate}
            />
          </SectionCard>
          <SectionCard title="Advanced Options" description="Advanced functionality is grouped here instead of split by user mode.">
            <AdvancedSection values={values} onFieldChange={updateField} />
          </SectionCard>
        </div>
        <div className="column-stack">
          <SectionCard title="Generated Result" description="Generate, review, and export the current Stata script.">
            <div className="toolbar">
              <button type="button" className="button-primary" onClick={handleGenerate}>
                Generate script
              </button>
            </div>
            <ResultPanel result={result} />
            <ExportActions script={result.script} explanation={result.explanation} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
