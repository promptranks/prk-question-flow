---
name: prk-task-create
description: Generate PPA tasks with automatic validation
user-invocable: true
disable-model-invocation: false
---

# prk-task-create

Generate PPA tasks for PromptRanks assessments with automatic quality validation.

## Usage

```bash
prk-task-create [number]
prk-task-create [number] --quick
prk-task-create [number] --skip-qa
```

## Parameters

- `number`: Number of tasks to generate (default: 10)
- `--quick`: Mark tasks as `is_quick=True` for free/quick assessments
- `--skip-qa`: Skip automatic validation (for debugging only)

## Workflow

1. Determine task parameters (industry, role, pillar, difficulty)
2. Call `task-generator` agent with parameters
3. Save tasks to YAML file
4. **[AUTO-QA]** Automatically invoke `task-validator` agent (unless `--skip-qa`)
5. Display generation + validation summary
6. If tasks need revision, prompt user to run `prk-task-revise`

## Output Format

```
========================================
Task Generation Complete
========================================
Tasks Generated: 10
File: tasks_core_batch1.yaml

========================================
Auto-Validation Complete
========================================
Total Validated: 10
✓ PASSED: 8 tasks
✗ REVISED: 2 tasks

Tasks requiring revision:
  - T-CORE-0002 (score: 6.5) - Technique hints detected
  - T-CORE-0007 (score: 6.8) - Poor feasibility

Next Steps:
→ Run 'prk-task-revise' to regenerate revised tasks
→ Or run 'prk-task-create' again to generate more tasks
========================================
```

## Notes

- Auto-validation is enabled by default
- Use `--skip-qa` only for debugging
- Tasks are selected randomly from pool (no distribution needed)
- Mark appropriate tasks as `--quick` for free tier
