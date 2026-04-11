---
name: prk-task-export
description: Export validated tasks to SQL/JSON for database import
user-invocable: true
disable-model-invocation: false
---

# prk-task-export

Export validated PPA tasks to SQL or JSON format for database import.

## Usage

```bash
prk-task-export --format=sql
prk-task-export --format=json
```

## Parameters

- `--format`: Export format - "sql" (default) or "json"

## Workflow

1. Read validated task YAML file
2. Verify all tasks have PASSED status
3. Generate SQL INSERT statements or JSON array
4. Include industry/role associations
5. Save to export file
6. Display import instructions

## Output Format

### SQL Export

```sql
-- PromptRanks PPA Tasks Export
-- Generated: 2026-04-11T22:00:00Z
-- Total Tasks: 10

INSERT INTO tasks (
  id, external_id, title, pillar, pillars_tested, difficulty,
  brief, input_data, success_criteria, scoring_rubric,
  max_attempts, time_limit_seconds, is_quick, content_tier,
  source, version, is_active, created_at
) VALUES
  ('8f3a1b2c-4d5e-6f7a-8b9c-0d1e2f3a4b5c', 'T-CORE-0001', 'Extract Action Items', 'P', '["P"]', 2, ...),
  ...
;
```

### JSON Export

```json
{
  "tasks": [
    {
      "id": "8f3a1b2c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
      "external_id": "T-CORE-0001",
      "title": "Extract Action Items",
      ...
    }
  ],
  "metadata": {
    "total_tasks": 10,
    "export_date": "2026-04-11T22:00:00Z",
    "version": "1.0.0"
  }
}
```

## Output

```
========================================
Task Export Complete
========================================
Format: SQL
Tasks Exported: 10
File: tasks_core_batch1.sql

Import Instructions:
→ PostgreSQL: psql -U user -d database < tasks_core_batch1.sql
→ Or use backoffice import GUI

========================================
```

## Notes

- Only exports tasks with PASSED status
- SQL format ready for PostgreSQL
- JSON format for API import
- Includes rollback SQL for safety
