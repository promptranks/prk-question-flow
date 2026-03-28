---
name: prk-question-init
description: Initialize question generation workspace with industries and roles
user-invocable: true
disable-model-invocation: true
---

# prk-question-init

Initialize a new question generation workspace with industries and roles.

## Usage

```bash
prk-question-init --industry=core,tech,finance
prk-question-init --role
```

## Parameters

- `--industry`: Comma-separated industry slugs (default: core)
- `--role`: Generate roles based on industries

## Workflow

### With --industry

1. Create timestamped working folder: `.prk-question/work-YYYY-MM-DD-NNN/`
2. Update `state.yaml` with current_work_folder
3. Call `industry-role-generator` agent with industry_slugs
4. Create `industry.yaml` with industry definitions
5. Cache existing questions from database to `.prk-question/cache/`

### With --role

1. Call `industry-role-generator` agent with industry_yaml_path
2. Fetch roles from database for each industry
3. Create `roles.yaml` with role definitions

## Output Files

- `.prk-question/state.yaml`
- `.prk-question/work-{date}-{num}/industry.yaml`
- `.prk-question/work-{date}-{num}/roles.yaml`
- `.prk-question/cache/core_questions.yaml`
