# ini Import Guide

## Supported structure

The app expects a versioned ini file with these sections:

```ini
[meta]
config_version=1
config_name=my-paper-config

[research]
method=panel
data_structure=panel

[variables]
dependent_variable=roa
core_independent_variable=digital
control_variables=size,lev,age
panel_id=firm_id
time_variable=year
treatment_variable=treat
instrument_variable=shock_index
cluster_variable=firm_id
fixed_effects=entity,year

[output]
output_targets=summary_table,regression_table

[template]
selected_template_id=stata18-modern

[advanced]
notes=Main regression specification.
robustness_notes=Winsorize at 1%.
heterogeneity_notes=Split by ownership type.
```

## Supported keys

`[meta]`

- `config_version`
- `config_name`

`[research]`

- `method`
- `data_structure`

`[variables]`

- `dependent_variable`
- `core_independent_variable`
- `control_variables`
- `panel_id`
- `time_variable`
- `treatment_variable`
- `instrument_variable`
- `cluster_variable`
- `fixed_effects`

`[output]`

- `output_targets`

`[template]`

- `selected_template_id`

`[advanced]`

- `notes`
- `robustness_notes`
- `heterogeneity_notes`

## Alias compatibility

The importer also accepts a small alias set for backward compatibility:

- `version` -> `config_version`
- `name` -> `config_name`
- `dv` -> `dependent_variable`
- `main_iv` or `independent_variable` -> `core_independent_variable`
- `controls` -> `control_variables`
- `entity_id` -> `panel_id`
- `time_id` -> `time_variable`
- `treat` -> `treatment_variable`
- `instrument` -> `instrument_variable`
- `cluster` -> `cluster_variable`
- `fe` -> `fixed_effects`
- `outputs` -> `output_targets`
- `template_id` -> `selected_template_id`

## Import behavior

- Unknown keys are ignored and shown in the import report.
- Missing `config_version` generates a warning.
- Unsupported method or data structure values fall back to defaults.
- Unknown template ids fall back to the default built-in template.
