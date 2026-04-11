---
name: prk-task-revise
description: Regenerate tasks that failed validation
user-invocable: true
disable-model-invocation: false
---

# prk-task-revise

Regenerate PPA tasks that failed validation using QA feedback.

## Usage

```bash
prk-task-revise
```

## Workflow

1. Read `validation_results.yaml` to find revised tasks
2. For each revised task:
   - Extract QA feedback and issues
   - Call `task-generator` with revision guidance
   - Incorporate feedback to fix issues
3. Replace revised tasks in original YAML file
4. **[AUTO-QA]** Re-validate revised tasks
5. Display revision summary

## Output Format

```
========================================
Task Revision Complete
========================================
Tasks Revised: 2
- T-CORE-0002: Fixed technique hints, improved feasibility
- T-CORE-0007: Clarified success criteria, fixed rubric weights

========================================
Re-Validation Results
========================================
✓ PASSED: 2/2 tasks (100%)

All revised tasks now pass validation!

Next Steps:
→ Run 'prk-task-export' to export tasks to database
========================================
```

## Notes

- Uses QA feedback to guide regeneration
- Automatically re-validates after revision
- May require multiple iterations for complex issues
- Preserves external_id and other metadata
