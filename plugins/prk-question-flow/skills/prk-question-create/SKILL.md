---
name: prk-question-create
description: Generate questions for industries and roles
user-invocable: true
disable-model-invocation: true
---

# prk-question-create

Generate questions for all industries and roles with PECAM distribution.

## Usage

```bash
prk-question-create [number]
```

## Parameters

- `number`: Questions per role (default: 10)

## Workflow

1. Read `state.yaml` and `question_plan.md`
2. Read `create-status.yaml` to find next industry
3. If no status file, start with first industry
4. For current industry only:
   - Generate questions for all roles
   - Distribution: 2 per pillar (P,E,C,M,A), 4 easy/4 medium/2 hard
   - Call `question-generator` agent
5. Save to `questions-{industry_slug}.yaml`
6. Update `create-status.yaml` with completed industry
7. Stop and display status
8. User must run command again for next industry
