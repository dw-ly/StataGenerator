import { useEffect, useMemo, useState } from "react";
import { defaultFormValues } from "../../shared/config/defaults";
import { generateStataScript } from "../../shared/generator/stata-generator";
import { getHostLabel, getMethodLabel } from "../../shared/i18n/labels";
import { mapIniToFormValues, serializeFormValuesToIni } from "../../shared/import/config-mapping";
import { parseIni } from "../../shared/import/ini-parser";
import { buildOutputFileName } from "../../shared/output/file-naming";
import { ResultSchema } from "../../shared/output/result-schema";
import { deserializeRecentConfig, serializeRecentConfig } from "../../shared/persistence/recent-config";
import { builtinTemplates } from "../../shared/templates/template-registry";
import { canDeleteTemplate, createUserTemplate, mergeTemplates } from "../../shared/templates/template-store";
import { FormValues, HostEnvironment, IniImportReport, TemplateDefinition } from "../../shared/types";
import { AdvancedSection } from "../components/AdvancedSection";
import { ExportActions } from "../components/ExportActions";
import { CoreSetupSection } from "../components/FormSections/CoreSetupSection";
import { OutputSection } from "../components/FormSections/OutputSection";
import { VariablesSection } from "../components/FormSections/VariablesSection";
import { ImportPanel } from "../components/ImportPanel";
import { ResultPanel } from "../components/ResultPanel";
import { SectionCard } from "../components/SectionCard";
import { TemplateManager } from "../components/TemplateManager";
import { loadRecentConfigValue, loadUserTemplatesValue, saveRecentConfigValue, saveUserTemplatesValue } from "../persistence/local-storage";
import { downloadTextFile } from "../utils/download";

const emptyResult: ResultSchema = {
  script: "",
  explanation: ["请选择研究方法、确认模板后再生成脚本。"],
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

  async function handleExportIni() {
    const iniContent = serializeFormValuesToIni(values, {
      configName: `论文脚本配置-${getMethodLabel(values.method)}`,
    });
    const defaultFileName = buildOutputFileName("stata-config", "ini");

    if (window.desktopApi) {
      await window.desktopApi.saveTextFile({ defaultFileName, content: iniContent });
      return;
    }

    downloadTextFile(defaultFileName, iniContent);
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
        <h1>Stata 论文脚本生成器</h1>
        <p>
          当前运行于 {getHostLabel(host)}。首版聚焦论文实证场景，提供共享生成逻辑、ini 配置导入导出、模板管理、最近配置恢复和集中展示的高级功能区。
        </p>
      </header>
      <div className="grid-layout">
        <div className="column-stack">
          <SectionCard title="基础设定" description="选择研究方法、数据结构和脚本模板基线。">
            <CoreSetupSection values={values} onFieldChange={updateField} />
          </SectionCard>
          <SectionCard title="变量配置" description="填写脚本生成所需的变量名和核心字段。">
            <VariablesSection values={values} onFieldChange={updateField} />
          </SectionCard>
          <SectionCard title="输出与固定效应" description="配置固定效应、标准误和预期输出内容。">
            <OutputSection values={values} onFieldChange={updateField} />
          </SectionCard>
          <SectionCard title="ini 导入导出" description="导入版本化 ini 配置、查看映射报告，或导出当前表单。">
            <ImportPanel onImportContent={handleImportContent} onExportIni={handleExportIni} report={importReport} />
          </SectionCard>
          <SectionCard title="模板管理" description="使用内置模板，或保存、删除你自己的模板。">
            <TemplateManager
              templates={templates}
              selectedTemplateId={selectedTemplate.id}
              onSelectTemplate={(templateId) => updateField("selectedTemplateId", templateId)}
              onSaveTemplate={handleSaveTemplate}
              onDeleteTemplate={handleDeleteTemplate}
            />
          </SectionCard>
          <SectionCard title="高级功能" description="首版不区分新手/高手模式，相关补充项统一放在这里。">
            <AdvancedSection values={values} onFieldChange={updateField} />
          </SectionCard>
        </div>
        <div className="column-stack">
          <SectionCard title="生成结果" description="生成、查看并导出当前 Stata 脚本与说明。">
            <div className="toolbar">
              <button type="button" className="button-primary" onClick={handleGenerate}>
                生成脚本
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
