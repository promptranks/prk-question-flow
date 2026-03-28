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
3. For each industry slug:
   - Use MCP tool `get_or_create_industry` to get/create industry in database
   - Store industry with real database ID
4. Create `industry.yaml` with industry definitions (including database IDs)
5. Cache existing questions from database to `.prk-question/cache/`

### With --role

1. Read `industry.yaml` to get industries with database IDs
2. For each industry:
   - Call `industry-role-generator` agent to generate role definitions
   - For each role, use MCP tool `get_or_create_role` to get/create in database
3. Create `roles.yaml` with role definitions (including database IDs)

## Output Files

- `.prk-question/state.yaml`
- `.prk-question/work-{date}-{num}/industry.yaml`
- `.prk-question/work-{date}-{num}/roles.yaml`
- `.prk-question/cache/core_questions.yaml`
