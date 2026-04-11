---
name: prk-task-qa
description: Validate generated PPA tasks with feasibility testing
user-invocable: true
disable-model-invocation: false
---

# prk-task-qa

Validate generated PPA tasks for quality, feasibility, and fairness.

## Usage

```bash
prk-task-qa
prk-task-qa --mode=quick
```

## Parameters

- `--mode`: Validation mode - "quick" (basic checks) or "full" (includes feasibility testing, default)

## Workflow

1. Find latest task YAML file
2. Call `task-validator` agent with file path
3. Run format validation
4. Score content quality (brief, input_data, success_criteria, rubric)
5. Check for technique hints
6. **[Full mode]** Test feasibility with sample prompts
7. Check difficulty calibration
8. Detect semantic duplicates
9. Generate validation report
10. Display summary with pass/fail status

## Output Format

```
========================================
Task Validation Complete
========================================
File: tasks_core_batch1.yaml
Total Tasks: 10
Passed: 8 (80%)
Revised: 2 (20%)
Average Score: 8.5/10

Validation Mode: FULL (with feasibility testing)

========================================
Quality Breakdown
========================================
Brief Quality: 8.7/10
Input Data Quality: 8.3/10
Success Criteria Quality: 8.5/10
Rubric Quality: 8.9/10

========================================
Feasibility Results
========================================
Excellent: 6 tasks (60%)
Good: 2 tasks (20%)
Poor: 2 tasks (20%)

========================================
Tasks Requiring Revision
========================================
1. T-CORE-0002 (Score: 6.5)
   - Technique hints in brief
   - Poor feasibility
   
2. T-CORE-0007 (Score: 6.8)
   - Vague success criteria
   - Rubric weights incorrect

Next Steps:
→ Run 'prk-task-revise' to regenerate revised tasks
========================================
```

## Notes

- Full mode includes feasibility testing (generates sample prompts)
- Quick mode skips feasibility testing (faster but less thorough)
- Validation results saved to `validation_results.yaml`
