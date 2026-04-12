---
name: prk-psv-export
description: Export validated PSV samples to SQL/JSON for database import
user-invocable: true
disable-model-invocation: false
---

# prk-psv-export

Export validated PSV samples to SQL or JSON format for database import.

## Usage

```bash
prk-psv-export --format=sql
prk-psv-export --format=json
prk-psv-export --format=sql --file=psv_samples_batch2.yaml
```

## Parameters

- `--format`: Export format - "sql" (default) or "json"
- `--file`: Specific YAML file to export (optional, defaults to most recent)

## Workflow

1. Read validated PSV sample YAML file
2. Verify all samples have PASSED status
3. Generate SQL INSERT statements or JSON array
4. Save to export file
5. Display import instructions

## Output Format

### SQL Export

```sql
-- PromptRanks PSV Samples Export
-- Generated: 2026-04-12T00:00:00Z
-- Total Samples: 10

INSERT INTO psv_samples (
  id, external_id, title, pillar, difficulty,
  task_context, prompt_text, output_text,
  ground_truth_level, ground_truth_rationale,
  content_tier, is_active, version, created_at
) VALUES
  ('3f8a9b2c-5d6e-4f7a-9b8c-1d2e3f4a5b6c', 'PSV-CORE-0001', 'Basic Data Extraction', 'P', 2,
   'You were asked to...', 'Please extract...', 'Here are the results...',
   2, 'Level 2 because...', 'core', true, 1, '2026-04-12T00:00:00Z'),
  ...
;

-- Rollback (if needed)
DELETE FROM psv_samples WHERE external_id IN ('PSV-CORE-0001', 'PSV-CORE-0002', ...);
```

### JSON Export

```json
{
  "samples": [
    {
      "id": "3f8a9b2c-5d6e-4f7a-9b8c-1d2e3f4a5b6c",
      "external_id": "PSV-CORE-0001",
      "title": "Basic Data Extraction",
      "pillar": "P",
      "difficulty": 2,
      "task_context": "You were asked to...",
      "prompt_text": "Please extract...",
      "output_text": "Here are the results...",
      "ground_truth_level": 2,
      "ground_truth_rationale": "Level 2 because...",
      "content_tier": "core",
      "is_active": true,
      "version": 1,
      "created_at": "2026-04-12T00:00:00Z"
    }
  ],
  "metadata": {
    "total_samples": 10,
    "export_date": "2026-04-12T00:00:00Z",
    "version": "1.0.0"
  }
}
```

## Output

```
========================================
PSV Sample Export Complete
========================================
Format: SQL
Samples Exported: 10
File: psv_samples_core_batch1.sql

Distribution:
- Pillars: P(2), E(2), C(2), A(2), M(2)
- Levels: L1(2), L2(2), L3(2), L4(2), L5(2)
- Difficulties: Easy(3), Medium(4), Hard(3)

Import Instructions:
→ PostgreSQL: psql -U promptranks -d promptranks < psv_samples_core_batch1.sql
→ Or use backoffice import GUI

Rollback SQL included in file for safety.

========================================
```

## Notes

- Only exports samples with PASSED status
- SQL format ready for PostgreSQL
- JSON format for API import
- Includes rollback SQL for safety
- Verifies no duplicate external_ids before export
