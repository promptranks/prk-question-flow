---
name: prk-question-plan
description: Preview generation plan and create question_plan.md
user-invocable: true
disable-model-invocation: true
---

# prk-question-plan

Preview generation plan without executing.

## Workflow

1. Read `state.yaml` to get current working folder
2. Read `industry.yaml` and `roles.yaml`
3. Calculate total questions per industry/role
4. Show PECAM distribution (2 per pillar)
5. Show difficulty distribution (4 easy, 4 medium, 2 hard)
6. Create `question_plan.md` with full plan
7. Display summary

## Output

Creates `question_plan.md` in working folder with:
- Industries and role counts
- Questions per role
- Total questions
- Distribution breakdown
- Estimated time
